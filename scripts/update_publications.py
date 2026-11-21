#!/usr/bin/env python3
"""Fetch publications for an ORCID iD from OpenAlex (+ ORCID/Crossref for gaps)
and write assets/data/publications.json for the website.

Runs daily from .github/workflows/update-publications.yml. Standard library only.
Usage: python scripts/update_publications.py [ORCID]
"""
import json, re, sys, time, urllib.parse, urllib.request
from datetime import date
from pathlib import Path

ORCID = sys.argv[1] if len(sys.argv) > 1 else "0000-0003-1671-7631"
DISPLAY_NAME = "Godwill W.K. Ilunga"  # how your own name is written on the site
OUT = Path(__file__).resolve().parent.parent / "assets" / "data" / "publications.json"
UA = {"User-Agent": "academic-site-updater/1.0 (GitHub Actions)"}

TYPE_MAP = {
    "article": "journal", "review": "journal", "letter": "journal",
    "conference-paper": "conference", "proceedings-article": "conference",
    "book-chapter": "chapter", "book": "book",
    "preprint": "preprint", "posted-content": "preprint",
    "dataset": "dataset", "dissertation": "thesis",
    "study-registration": "registration",
}


def get(url, accept="application/json"):
    for attempt in range(4):
        try:
            req = urllib.request.Request(url, headers={**UA, "Accept": accept})
            with urllib.request.urlopen(req, timeout=40) as r:
                return json.load(r)
        except Exception as e:  # retry on rate limits / transient errors
            if attempt == 3:
                raise
            time.sleep(3 * (attempt + 1))


def norm_doi(d):
    if not d:
        return ""
    return re.sub(r"^https?://(dx\.)?doi\.org/", "", d.strip(), flags=re.I).lower()


def norm_title(t):
    return re.sub(r"[^a-z0-9]+", " ", (t or "").lower()).strip()


def venue_from_openalex(w):
    loc = w.get("primary_location") or {}
    src = (loc.get("source") or {}).get("display_name") or ""
    src = re.sub(r"\s*\(([^)]*)\)$", lambda m: "" if m.group(1) in src[:m.start()] or "University" in m.group(1) else m.group(0), src)
    doi = norm_doi(w.get("doi"))
    if "arxiv" in doi:
        return "arXiv preprint arXiv:" + doi.split("arxiv.")[-1]
    if src[1:].islower():
        src = src.title().replace(" And ", " and ").replace(" In ", " in ").replace(" Of ", " of ")
    b = w.get("biblio") or {}
    parts = [src] if src else []
    if b.get("volume"):
        parts.append(f"vol. {b['volume']}")
    if b.get("issue"):
        parts.append(f"no. {b['issue']}")
    if b.get("first_page"):
        pages = b["first_page"] + (f"–{b['last_page']}" if b.get("last_page") and b["last_page"] != b["first_page"] else "")
        parts.append(f"pp. {pages}")
    return ", ".join(parts)


def from_openalex():
    works, cursor = [], "*"
    while cursor:
        url = ("https://api.openalex.org/works?per_page=100&cursor=" + urllib.parse.quote(cursor)
               + "&filter=author.orcid:" + ORCID)
        d = get(url)
        works += d["results"]
        cursor = d["meta"].get("next_cursor")
        if not d["results"]:
            break
    pubs = []
    for w in works:
        authors = []
        for a in w.get("authorships", []):
            au = a.get("author") or {}
            if (au.get("orcid") or "").endswith(ORCID):
                authors.append(DISPLAY_NAME)
            else:
                authors.append(au.get("display_name") or a.get("raw_author_name") or "")
        doi = norm_doi(w.get("doi"))
        oa = (w.get("open_access") or {}).get("oa_url") or ""
        links = {}
        if doi:
            links["arxiv" if "arxiv" in doi else "doi"] = (
                "https://arxiv.org/abs/" + doi.split("arxiv.")[-1] if "arxiv" in doi else "https://doi.org/" + doi)
        if oa and oa not in links.values() and not oa.startswith("https://doi.org/"):
            links["pdf"] = oa
        pubs.append({
            "year": w.get("publication_year"),
            "date": w.get("publication_date") or "",
            "type": TYPE_MAP.get(w.get("type"), "other"),
            "title": re.sub(r"\s+", " ", w.get("title") or w.get("display_name") or "").strip(),
            "authors": [a for a in authors if a],
            "venue": venue_from_openalex(w),
            "doi": doi,
            "citations": w.get("cited_by_count", 0),
            "links": links,
            "source": "openalex",
        })
    return pubs


def from_orcid_gaps(known_dois, known_titles):
    """Works listed on ORCID but not (yet) in OpenAlex, completed via Crossref."""
    out = []
    try:
        d = get(f"https://pub.orcid.org/v3.0/{ORCID}/works")
    except Exception as e:
        print("ORCID unavailable:", e)
        return out
    for g in d.get("group", []):
        s = g["work-summary"][0]
        ids = {e["external-id-type"]: e["external-id-value"] for e in (s.get("external-ids") or {}).get("external-id", [])}
        doi = norm_doi(ids.get("doi"))
        title = s["title"]["title"]["value"]
        if (doi and doi in known_dois) or norm_title(title) in known_titles:
            continue
        pub = {"year": int(((s.get("publication-date") or {}).get("year") or {}).get("value") or 0) or None,
               "date": "", "type": TYPE_MAP.get(s.get("type", "").replace("journal-article", "article"), "other"),
               "title": title, "authors": [DISPLAY_NAME], "venue": ((s.get("journal-title") or {}).get("value") or ""),
               "doi": doi, "citations": 0, "links": {"doi": "https://doi.org/" + doi} if doi else {}, "source": "orcid"}
        if doi:
            try:
                m = get("https://api.crossref.org/works/" + urllib.parse.quote(doi))["message"]
                pub["authors"] = [DISPLAY_NAME if (a.get("ORCID") or "").endswith(ORCID)
                                  else f"{a.get('given', '')} {a.get('family', '')}".strip() for a in m.get("author", [])] or pub["authors"]
                pub["venue"] = pub["venue"] or ", ".join(filter(None, [(m.get("container-title") or [""])[0],
                                                                      m.get("volume") and f"vol. {m['volume']}",
                                                                      m.get("page") and f"pp. {m['page']}"]))
            except Exception:
                pass
        out.append(pub)
    return out


def main():
    pubs = from_openalex()
    dois = {p["doi"] for p in pubs if p["doi"]}
    titles = {norm_title(p["title"]) for p in pubs}
    pubs += from_orcid_gaps(dois, titles)
    pubs.sort(key=lambda p: (p["year"] or 0, p["date"]), reverse=True)

    author = get(f"https://api.openalex.org/authors/orcid:{ORCID}")
    stats = author.get("summary_stats") or {}
    data = {
        "orcid": ORCID,
        "metrics": {"citations": author.get("cited_by_count", 0), "hindex": stats.get("h_index"),
                    "i10": stats.get("i10_index"), "works": len(pubs), "source": "OpenAlex"},
        "publications": pubs,
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    old = json.loads(OUT.read_text(encoding="utf-8")) if OUT.exists() else {}
    old_cmp = {k: v for k, v in old.items() if k != "updated"}
    if old_cmp == data:
        print("No changes.")
        return
    data["updated"] = date.today().isoformat()
    OUT.write_text(json.dumps(data, ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"Wrote {len(pubs)} publications to {OUT}")


if __name__ == "__main__":
    main()

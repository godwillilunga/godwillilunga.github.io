(function () {
  const S = window.SITE;
  const $ = (s) => document.querySelector(s);
  const esc = (t) => String(t ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  // Escape text, then visually flag [placeholders] so they're easy to spot.
  const txt = (t) => esc(t).replace(/\[([^\]]+)\]/g, '<span class="placeholder">[$1]</span>');

  const ICONS = {
    email: '<path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 2v.5l8 5 8-5V6H4zm16 2.85-8 5-8-5V18h16V8.85z"/>',
    scholar: '<path d="M12 3 1 9l11 6 9-4.91V17h2V9L12 3zm-6.5 9.5V16c0 2.2 2.9 4 6.5 4s6.5-1.8 6.5-4v-3.5L12 16l-6.5-3.5z"/>',
    orcid: '<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM8.3 17H6.7V9h1.6v8zM7.5 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm5.2 9H10V9h2.7c2.6 0 3.9 1.9 3.9 4s-1.4 4-3.9 4zm-.1-6.6h-1v5.2h1c1.6 0 2.4-1.1 2.4-2.6s-.8-2.6-2.4-2.6z"/>',
    github: '<path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2z"/>',
    linkedin: '<path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.34 17.34V10H6v7.34h2.34zM7.17 8.9a1.36 1.36 0 1 0 0-2.72 1.36 1.36 0 0 0 0 2.72zm10.17 8.44v-4.02c0-2.16-1.15-3.16-2.69-3.16-1.24 0-1.8.68-2.11 1.16V10h-2.34v7.34h2.34v-4.05c0-.22.02-.43.08-.59.17-.43.56-.88 1.22-.88.86 0 1.2.66 1.2 1.62v3.9h2.3z"/>',
    researchgate: '<path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm4.5 4v10h1.6v-4h1.2l2.2 4h1.9l-2.5-4.3A2.8 2.8 0 0 0 11.4 7H8.5zm1.6 1.4h1.2a1.4 1.4 0 0 1 0 2.8h-1.2V8.4z"/>',
    cv: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm4 18H6V4h7v5h5v11zM8 12h8v2H8zm0 4h8v2H8z"/>',
    mic: '<path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.92V21h2v-3.08A7 7 0 0 0 19 11h-2z"/>',
    globe: '<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm6.93 6h-2.95a15.6 15.6 0 0 0-1.38-3.56A8.03 8.03 0 0 1 18.93 8zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14a8.2 8.2 0 0 1 0-4h3.38a16.5 16.5 0 0 0 0 4H4.26zm.81 2h2.95c.32 1.25.78 2.45 1.38 3.56A7.99 7.99 0 0 1 5.07 16zm2.95-8H5.07a7.99 7.99 0 0 1 4.33-3.56A15.6 15.6 0 0 0 8.02 8zM12 19.96A14.1 14.1 0 0 1 10.09 16h3.82A14.1 14.1 0 0 1 12 19.96zM14.34 14H9.66a14.7 14.7 0 0 1 0-4h4.68a14.7 14.7 0 0 1 0 4zm.26 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95a8.03 8.03 0 0 1-4.33 3.56zM16.36 14a16.5 16.5 0 0 0 0-4h3.38a8.2 8.2 0 0 1 0 4h-3.38z"/>',
    check: '<path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>',
    award: '<path d="M12 2a7 7 0 0 0-4 12.74V22l4-2 4 2v-7.26A7 7 0 0 0 12 2zm0 2a5 5 0 1 1 0 10 5 5 0 0 1 0-10z"/>',
  };
  const icon = (k) => `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${ICONS[k] || ""}</svg>`;
  const LABELS = { email: "Email", scholar: "Google Scholar", orcid: "ORCID", github: "GitHub", linkedin: "LinkedIn", researchgate: "ResearchGate", cv: "CV" };

  // Simple bindings
  document.querySelectorAll("[data-bind]").forEach((el) => (el.innerHTML = txt(S[el.dataset.bind])));
  $("#year").textContent = new Date().getFullYear();

  // Links
  const linkBtns = (primaryKey) =>
    Object.entries(S.links)
      .filter(([, v]) => v)
      .map(([k, v]) => {
        const href = k === "email" ? (v.startsWith("[") ? "#contact" : "mailto:" + v) : v;
        const ext = /^https?:/.test(href) ? ' target="_blank" rel="noopener"' : "";
        return `<a class="btn${k === primaryKey ? " btn--primary" : ""}" href="${esc(href)}"${ext}>${icon(k)}${LABELS[k]}</a>`;
      })
      .join("");
  $("#heroLinks").innerHTML = linkBtns(S.links.cv ? "cv" : "email");
  $("#contactLinks").innerHTML = linkBtns();

  // About
  $("#bio").innerHTML = S.bio.map((p) => `<p>${txt(p)}</p>`).join("");
  $("#interests").innerHTML = S.interests.map((i) => `<li>${txt(i)}</li>`).join("");
  $("#news").innerHTML = S.news.map((n) => `<li><time>${txt(n.date)}</time><span>${txt(n.text)}</span></li>`).join("");

  // Publications
  const types = ["all", ...new Set(S.publications.map((p) => p.type))];
  const typeLabel = (t) => (t === "all" ? "All" : t[0].toUpperCase() + t.slice(1));
  const boldMe = (a) => txt(a).replace(new RegExp(S.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"), `<strong>${esc(S.name)}</strong>`);
  function renderPubs(filter) {
    const list = S.publications.filter((p) => filter === "all" || p.type === filter).sort((a, b) => b.year - a.year);
    let html = "", year = null;
    list.forEach((p) => {
      if (p.year !== year) { year = p.year; html += `<h3 class="pub-year">${year}</h3>`; }
      const links = Object.entries(p.links || {}).filter(([, v]) => v)
        .map(([k, v]) => `<a href="${esc(v)}" target="_blank" rel="noopener">${esc(k)}</a>`).join("");
      html += `<article class="pub">
        <span class="pub__badge badge--${esc(p.type)}">${esc(typeLabel(p.type))}</span>
        <div>
          <h3>${txt(p.title)}${p.featured ? '<span class="star" title="Selected">★</span>' : ""}</h3>
          <p class="pub__authors">${boldMe(p.authors)}</p>
          <p class="pub__venue">${txt(p.venue)}</p>
          <div class="pub__links">${links}<button data-cite="${esc(p.authors + ". " + p.title + ". " + p.venue + ", " + p.year + ".")}">Cite</button></div>
        </div></article>`;
    });
    $("#pubList").innerHTML = html || "<p>No publications in this category yet.</p>";
  }
  $("#pubFilters").innerHTML = types.map((t, i) => `<button class="${i ? "" : "active"}" data-f="${t}">${typeLabel(t)}</button>`).join("");
  $("#pubFilters").addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    $("#pubFilters .active").classList.remove("active"); b.classList.add("active"); renderPubs(b.dataset.f);
  });
  $("#pubList").addEventListener("click", (e) => {
    const b = e.target.closest("[data-cite]"); if (!b) return;
    navigator.clipboard?.writeText(b.dataset.cite).then(() => { b.textContent = "Copied ✓"; setTimeout(() => (b.textContent = "Cite"), 1500); });
  });
  renderPubs("all");
  if (S.metrics) {
    const m = S.metrics;
    $("#metrics").innerHTML = `<span><b>${S.publications.length}</b> publications</span><span><b>${m.citations}</b> citations</span><span>h-index <b>${m.hindex}</b></span><span>i10-index <b>${m.i10}</b></span><span class="metrics__src">${esc(m.source)}, ${esc(m.asOf)}</span>`;
  } else $("#metrics").remove();

  // Activities
  $("#activityGrid").innerHTML = S.activities.map((a) => `
    <div class="card"><div class="card__icon">${icon(a.icon)}</div><h3>${txt(a.category)}</h3>
      <ul class="act-list">${a.items.map((i) => `<li><span class="yr">${txt(i.year)}</span><span>${txt(i.text)}${i.where ? `<span class="where">${txt(i.where)}</span>` : ""}</span></li>`).join("")}</ul>
    </div>`).join("");

  // Teaching
  $("#teachingList").innerHTML = S.teaching.map((t) => `
    <div class="t-item"><div class="t-item__top"><h3>${txt(t.course)}<span class="code">${txt(t.code)}</span></h3><span class="period">${txt(t.period)}</span></div>
      <div class="role">${txt(t.role)} · ${txt(t.institution)}</div><p>${txt(t.description)}</p></div>`).join("");
  if (S.supervision?.length) $("#supervision").innerHTML = S.supervision.map((s) => `<li>${txt(s)}</li>`).join("");
  else $("#supervisionWrap").remove();

  // Projects
  $("#projectGrid").innerHTML = S.projects.map((p) => `
    <div class="card project"><h3>${txt(p.title)}</h3><p>${txt(p.text)}</p>
      <div class="tags">${p.tags.map((t) => `<span>${esc(t)}</span>`).join("")}</div>
      ${p.link ? `<a href="${esc(p.link)}" target="_blank" rel="noopener">View project →</a>` : ""}</div>`).join("");

  // Theme toggle
  $("#themeToggle").addEventListener("click", () => {
    const root = document.documentElement;
    const dark = root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    root.dataset.theme = dark ? "light" : "dark";
    try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
  });

  // Mobile menu
  $("#menuToggle").addEventListener("click", () => $("#navLinks").classList.toggle("open"));
  $("#navLinks").addEventListener("click", (e) => e.target.tagName === "A" && $("#navLinks").classList.remove("open"));

  // Nav state + active link
  const nav = $(".nav");
  addEventListener("scroll", () => nav.classList.toggle("scrolled", scrollY > 10), { passive: true });
  const links = [...document.querySelectorAll(".nav__links a")];
  const io = new IntersectionObserver((ents) => ents.forEach((en) => {
    if (en.isIntersecting) links.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === "#" + en.target.id));
  }), { rootMargin: "-45% 0px -50% 0px" });
  document.querySelectorAll("section[id]").forEach((s) => io.observe(s));

})();

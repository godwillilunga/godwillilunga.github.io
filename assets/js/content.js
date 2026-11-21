/* =====================================================================
   SITE CONTENT — edit this file only to update your website.
   Sources: ORCID 0000-0003-1671-7631, Google Scholar, Crossref (Nov 2026).
   Add new entries by copying a block; delete what you don't need.
   ===================================================================== */

window.SITE = {
  name: "Godwill W.K. Ilunga",
  title: "PhD Candidate · Researcher & Lecturer",
  affiliation: "University of Padua · Université Nouveaux Horizons",
  location: "Padua, Italy",
  tagline:
    "I apply artificial intelligence, agent-based modelling and connected systems to problems in public health, safety and sustainable development, with a focus on Africa.",
  bio: [
    "I am a PhD candidate at the University of Padua, Italy, and a researcher and lecturer in Computer Science at Université Nouveaux Horizons, where I have taught since 2017.",
    "My research interests include artificial intelligence, epidemiology, biostatistics, public health, the Internet of Things, intelligent systems and cybersecurity. I have co-authored work on cybersecurity, machine learning, agent-based modelling and complex systems.",
  ],
  interests: [
    "Artificial Intelligence",
    "Public Health & Epidemiology",
    "Agent-Based Modelling",
    "Biostatistics",
    "Internet of Things / AIoT",
    "Cybersecurity",
    "Complex Systems",
  ],

  // Leave a link as "" to hide its button.
  links: {
    email: "",
    scholar: "https://scholar.google.com/citations?user=qRyK6fwAAAAJ&hl=en",
    orcid: "https://orcid.org/0000-0003-1671-7631",
    researchgate: "https://www.researchgate.net/profile/Godwill-Wk-Ilunga",
    github: "https://github.com/godwillilunga",
    linkedin: "",
    cv: "", // e.g. "files/CV.pdf"
  },

  news: [
    { date: "2026-11", text: "Launched my academic website." },
    { date: "2026-08", text: "Presented “Nonstandard Finite Difference Schemes for Uncertain Epidemic Dynamics: From Fuzzy ODEs to AI-Enhanced Discretization”." },
    { date: "2026", text: "First-author systematic review on speech dataset creation in low-resource contexts published in Procedia Computer Science." },
    { date: "2025", text: "Paper on evacuee categorisation in agent-based fire evacuation simulation published in IEEE Access." },
  ],

  /* PUBLICATIONS update automatically every day from OpenAlex + ORCID
     (GitHub Action → assets/data/publications.json). You don't edit them here.
     Use these settings only to fine-tune what is shown. Match papers by DOI. */
  publicationSettings: {
    featured: [                                 // papers marked with a ★
      "10.1016/j.procs.2026.04.072",
      "10.1109/access.2025.3525480",
      "10.48550/arxiv.2408.02575",
    ],
    hidden: [],                                 // DOIs you never want listed
    extra: [],                                  // papers missing from OpenAlex/ORCID, same shape as the JSON entries
  },

  /* Scientific activities, grouped by category. */
  activities: [
    {
      category: "Talks & Presentations",
      icon: "mic",
      items: [
        { year: "2026", text: "Nonstandard Finite Difference Schemes for Uncertain Epidemic Dynamics: From Fuzzy ODEs to AI-Enhanced Discretization", where: "Conference presentation" },
      ],
    },
    {
      category: "Conference Contributions",
      icon: "globe",
      items: [
        { year: "2025", text: "Int. Conference on Big Data, Knowledge and Control Systems Engineering (BdKCSE)", where: "Paper on smart irrigation for precision agriculture" },
        { year: "2024", text: "Int. Conference on Computing, Communication, Cybersecurity and AI (C3AI)", where: "London, UK · Paper on insider threats and CPTED" },
      ],
    },
  ],

  teaching: [
    {
      course: "Computer Science",
      code: "",
      role: "Researcher and Lecturer",
      institution: "Université Nouveaux Horizons",
      period: "2017 – present",
      description: "Lecturing and research in the Department of Computer Science.",
    },
  ],
  supervision: [],

  projects: [
    {
      title: "KDN Project",
      text: "Master's thesis project: an algorithm for modelling CPU consumption in knowledge-defined networks, implemented in Jupyter notebooks.",
      tags: ["Python", "Jupyter", "Networking", "ML"],
      link: "https://github.com/godwillilunga/KDN-project",
    },
  ],
};

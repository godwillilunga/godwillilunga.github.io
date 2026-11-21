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

  // Shown above the publication list. Update the date when you change the numbers.
  metrics: { citations: 86, hindex: 4, i10: 3, asOf: "Nov 2026", source: "Google Scholar" },

  news: [
    { date: "2026-11", text: "Launched my academic website." },
    { date: "2026-08", text: "Presented “Nonstandard Finite Difference Schemes for Uncertain Epidemic Dynamics: From Fuzzy ODEs to AI-Enhanced Discretization”." },
    { date: "2026", text: "First-author systematic review on speech dataset creation in low-resource contexts published in Procedia Computer Science." },
    { date: "2025", text: "Paper on evacuee categorisation in agent-based fire evacuation simulation published in IEEE Access." },
  ],

  /* type: "journal" | "conference" | "preprint" | "thesis" | "workshop"
     Write your name exactly as `name` above so it is highlighted. */
  publications: [
    {
      year: 2026, type: "conference", featured: true,
      title: "Speech Dataset Creation in Low-Resource Contexts: A Systematic Review",
      authors: "Godwill W.K. Ilunga, Selain K. Kasereka, Eliezer Mununga, Credo Kanumbedi, Onesime M. Mbulayi, Israel M.W. Mwamba, Rebecca Ryakitimbo, Tasho Tashev",
      venue: "Procedia Computer Science, vol. 280, pp. 568–575",
      links: { doi: "https://doi.org/10.1016/j.procs.2026.04.072" },
    },
    {
      year: 2026, type: "conference",
      title: "Nonstandard Finite Difference Schemes for Uncertain Epidemic Dynamics: From Fuzzy ODEs to AI-Enhanced Discretization",
      authors: "Selain K. Kasereka, Dany N. Kasongo, Godwill W.K. Ilunga, Dauphin K.W. Kamwanga, Kyandoghere Kyamakya",
      venue: "Procedia Computer Science, vol. 290, pp. 846–852",
      links: { doi: "https://doi.org/10.1016/j.procs.2026.08.471" },
    },
    {
      year: 2026, type: "conference",
      title: "From IoT to AIoT: Advancing Smart Healthcare through Connected Intelligence",
      authors: "Selain K. Kasereka, Godwill W.K. Ilunga, Heriol F. Zeufack, Alidor M. Mbayandjambe, Jean-Roger M. Bansimba, Ruffin-Benoît M. Ngoie, René Manassé N. Galekwa, Esteve Hassan, Tasho Tashev, Kyandoghere Kyamakya",
      venue: "Procedia Computer Science, vol. 280, pp. 327–336",
      links: { doi: "https://doi.org/10.1016/j.procs.2026.04.043" },
    },
    {
      year: 2025, type: "journal", featured: true,
      title: "Enhancing Building Evacuation Efficiency in Case of Fire Breakout by Integrating Evacuee Categorization Into an Agent-Based Simulation",
      authors: "Selain K. Kasereka, Noella E. Kalondji, Godwill W.K. Ilunga, Ruffin-Benoît M. Ngoie, Kyandoghere Kyamakya, Nathanaël M. Kasoro",
      venue: "IEEE Access, vol. 13, pp. 10595–10618",
      links: { doi: "https://doi.org/10.1109/ACCESS.2025.3525480" },
    },
    {
      year: 2025, type: "conference",
      title: "Enhancing Building Safety: A Brief Review of Agent-Based Modeling for Fire Evacuation Simulation",
      authors: "Selain K. Kasereka, Ortega M. Kabwe, Maria W.K. Kinyanta, Audrey L. Kasongo, Godwill W.K. Ilunga, Katya Muhambya, Tasho Tashev, Kyandoghere Kyamakya",
      venue: "Procedia Computer Science, vol. 257, pp. 668–675",
      links: { doi: "https://doi.org/10.1016/j.procs.2025.03.086" },
    },
    {
      year: 2025, type: "conference",
      title: "Smart Irrigation for Precision Agriculture: A Pathway to Sustainable Farming in Low-Income Regions",
      authors: "Selain K. Kasereka, Tasho Tashev, Yves-Christophane N. Medagbe, Okurwoth V. Ocama, Godwill W.K. Ilunga, Elam Kyungu, Kyandoghere Kyamakya",
      venue: "2025 International Conference on Big Data, Knowledge and Control Systems Engineering (BdKCSE), pp. 1–9",
      links: { doi: "https://doi.org/10.1109/BdKCSE67969.2025.11300531" },
    },
    {
      year: 2025, type: "conference",
      title: "Leveraging Artificial Intelligence for Advancements in Mental Disorders: A Short Review",
      authors: "Selain K. Kasereka, Kenny N. Tshibangu, Myriam M. Nyembo, Lionel K. Tshitenge, Marina K. Muzindusi, Godwill W.K. Ilunga, Soufian Ben Amor, Christian D. Bope, Tasho Tashev, Kyandoghere Kyamakya",
      venue: "Procedia Computer Science, vol. 257, pp. 676–683",
      links: { doi: "https://doi.org/10.1016/j.procs.2025.03.087" },
    },
    {
      year: 2025, type: "conference",
      title: "Enhancing Healthcare in Africa: A Brief Review of Lung Cancer Prediction and Detection",
      authors: "Jonathan K. Pinto, Selain K. Kasereka, Pierre T. Muchapa, Godwill W.K. Ilunga, Alidor M. Mbayandjambe, Jiregna K. Olani, Tasho Tashev, Kyandoghere Kyamakya",
      venue: "Procedia Computer Science, vol. 265, pp. 390–397",
      links: { doi: "https://doi.org/10.1016/j.procs.2025.07.196" },
    },
    {
      year: 2024, type: "preprint", featured: true,
      title: "Artificial Intelligence for Public Health Surveillance in Africa: Applications and Opportunities",
      authors: "Jean Marie Tshimula, Mitterrand Kalengayi, Dieumerci Makenga, … , Selain K. Kasereka, Maximilien V. Dialufuma, Godwill W.K. Ilunga, … , Emmanuel Kabengele Mpinga, Nathanaël M. Kasoro (31 authors)",
      venue: "arXiv preprint arXiv:2408.02575",
      links: { arxiv: "https://arxiv.org/abs/2408.02575" },
    },
    {
      year: 2024, type: "conference",
      title: "An Empirical Study on Insider Threats Towards Crime Prevention Through Environmental Design (CPTED): A Student Case Study",
      authors: "Robert Makila Beni, Landry Mbale Kasunzi Mbaherya, Jean-Auguste Muhau, Godwill W.K. Ilunga",
      venue: "Proc. International Conference on Computing, Communication, Cybersecurity and AI (C3AI 2024), London, UK. Lecture Notes in Networks and Systems, Springer, pp. 447–463",
      links: { doi: "https://doi.org/10.1007/978-3-031-74443-3_27" },
    },
  ],

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

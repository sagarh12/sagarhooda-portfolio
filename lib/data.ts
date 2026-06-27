export const profile = {
  name: "Sagarpreet Hooda",
  role: "CS Student | Cybersecurity & AI",
  status: "Open to co-op opportunities",
  email: "sagarhooda.uscan@gmail.com",
  location: "Toronto, Canada",
  linkedin: "https://linkedin.com/in/sagarhooda9868702902",
  github: "https://github.com/sagarh12",
  domain: "sagarpreethooda.com",
  resume: "/resume.pdf",
};

export const about = {
  bio: [
    "I'm an Honours BSc Computer Science student at York University (2027), currently a Senior Technical Student in Cybersecurity Operations at Toronto Hydro — where I contribute to technical solutions that safeguard critical energy infrastructure.",
    "Across roles as an AI Web Development Intern at Accio and a Web Assistant at York, I've built full-stack platforms with Next.js, integrated AI models, and shipped data-driven tooling. I sit at the intersection of security operations and software engineering, happiest solving complex problems and building scalable, well-tested systems.",
  ],
  education: {
    school: "York University – Lassonde School of Engineering",
    degree: "Honours BSc, Computer Science",
    dates: "Sep 2022 – Aug 2027",
    awards: ["Lassonde Entrance Scholarship (2022)"],
  },
};

export const stats: {
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
}[] = [
  { value: 4, suffix: "", label: "Roles / Internships" },
  { value: 3, suffix: "", label: "Flagship Projects" },
  { value: 4, suffix: "", label: "Certifications" },
];

export type Experience = {
  company: string;
  role: string;
  type: string;
  dates: string;
  bullets: string[];
};

export const experience: Experience[] = [
  {
    company: "Toronto Hydro",
    role: "Senior Technical Student — Cybersecurity Operations",
    type: "Co-op",
    dates: "Sep 2025 – Present",
    bullets: [
      "IAM: user provisioning & access reviews via BMC Remedy",
      "SIEM log triage & threat detection using IBM QRadar",
      "PowerShell & Bash automation for incident response",
      "PKI certificate lifecycle + Azure cloud ops (VMs, storage, identity)",
      "Attended SecTor 2025 — engaged with Fortinet, Zscaler, Bell, Thales",
    ],
  },
  {
    company: "Lassonde School of Engineering — York University",
    role: "Web Assistant",
    type: "Contract",
    dates: "Apr 2025 – Sep 2025",
    bullets: [
      "Maintained & updated university websites and event pages (HTML/CSS, CMS)",
      "Designed and automated weekly Mailchimp email campaigns",
      "Organized structured datasets for event logistics & outreach analytics",
    ],
  },
  {
    company: "Accio",
    role: "AI Web Development Intern",
    type: "Internship",
    dates: "Apr 2025 – Aug 2025",
    bullets: [
      "Built AI-powered web platforms with Next.js to boost user engagement",
      "Integrated Ollama-based AI models for intelligent, dynamic user experiences",
      "Developed full-stack features linking front-end UI to backend APIs & databases",
    ],
  },
  {
    company: "Self-Employed",
    role: "Mathematics & Programming Tutor",
    type: "Self-Employed",
    dates: "Sep 2023 – Apr 2025",
    bullets: [
      "Founded and ran online tutoring for high-school mathematics",
      "Tutored university students in Java & Python",
      "Built structured learning plans and interactive problem-solving sessions",
    ],
  },
];

export type Project = {
  title: string;
  blurb: string;
  stack: string[];
  metric: string;
};

export const projects: Project[] = [
  {
    title: "York University Parking System",
    blurb:
      "Desktop parking-management platform handling 500+ slots, built on a clean MVC + Singleton architecture with JSON persistence and full UML documentation.",
    stack: ["Java", "MVC", "Singleton", "JSON", "JUnit"],
    metric: "30% fewer integration errors · 50+ test cases",
  },
  {
    title: "Stock Market Price Prediction",
    blurb:
      "LSTM neural network forecasting next-day equity prices, trained on live market data pulled via yfinance with engineered time-series features.",
    stack: ["Python", "TensorFlow", "Keras", "LSTM", "yfinance"],
    metric: ">50% next-day directional accuracy",
  },
  {
    title: "Inventory Management System",
    blurb:
      "Java full-stack inventory platform tracking 100+ SKUs with automated audit reporting and a streamlined stock-reconciliation workflow.",
    stack: ["Java", "Full-Stack", "MySQL", "Automation"],
    metric: "40% less manual processing",
  },
];

export const skills: { category: string; items: string[]; accent: "primary" | "secondary" }[] = [
  {
    category: "Programming",
    accent: "primary",
    items: ["Python", "Java", "JavaScript", "C#", ".NET", "Bash", "PowerShell"],
  },
  {
    category: "Web & AI",
    accent: "secondary",
    items: ["React", "Next.js", "Node.js", "HTML/CSS", "Ollama", "CMS", "Mailchimp"],
  },
  {
    category: "Cybersecurity",
    accent: "primary",
    items: [
      "IAM",
      "SIEM (QRadar)",
      "TRC",
      "Threat Modeling",
      "PKI",
      "Azure",
      "BMC Remedy",
      "ServiceNow",
    ],
  },
  {
    category: "Tools & Data",
    accent: "secondary",
    items: ["Git", "MySQL", "Power BI", "MS Office"],
  },
  {
    category: "Certifications",
    accent: "primary",
    items: [
      "AI Coder: Claude Code & Coding Agents — Udemy (2026)",
      "Intro to AI & Machine Learning with Python — Udemy (2026)",
      "Programming Using Python — Udemy (2026)",
      "Software Engineering Job Simulation — Forage (2024)",
    ],
  },
];

export const extracurriculars = [
  {
    role: "Tutor — Excel Lassonde Society",
    dates: "2024 – Present",
  },
  {
    role: "Executive — Google Developer Club",
    dates: "2023 – 2025",
    note: "Cut event-registration manual work by 50%",
  },
];

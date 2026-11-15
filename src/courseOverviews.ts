// Overview content shown at the top of each course page.
// Written from each course's listed skills, tools, duration and level. Edit freely, and
// check module topics, prerequisites and roles against your actual syllabus before launch.
export type CourseOverview = {
  tagline: string;
  summary: string;
  unique: { title: string; text: string }[];
  modules: { title: string; topics: string[] }[];
  audience: string[];
  prerequisites: string[];
  outcomes: string[];
  roles: string[];
};

export const courseOverviews: Record<string, CourseOverview> = {
  zxCPEH: {
    tagline: "Learn to think and work like an attacker, so you can defend like a professional.",
    summary:
      "This 40-hour intermediate program teaches a complete ethical hacking methodology, from reconnaissance to privilege escalation and Active Directory attacks. You practise on industry-standard tools such as Kali Linux, Nmap, Metasploit and Burp Suite, and finish by chaining techniques together in a project.",
    unique: [
      { title: "Project-based, not slide-based", text: "You apply each technique in a hands-on project instead of only watching demonstrations." },
      { title: "Attack chains, end to end", text: "Learn how single weaknesses combine into a full compromise, and where each step can be detected or stopped." },
      { title: "Active Directory focus", text: "Enterprise networks run on Active Directory. You study how it is enumerated, attacked and defended." },
      { title: "Industry-standard toolkit", text: "Work with the same tools used by professional security teams every day." },
    ],
    modules: [
      { title: "Ethical hacking methodology and reconnaissance", topics: ["Scoping, authorization and rules of engagement", "Footprinting and enumeration with Nmap", "Identifying vulnerable services"] },
      { title: "Network and web security", topics: ["Traffic analysis with Wireshark", "Common web vulnerabilities tested with Burp Suite", "Attacking exposed network services"] },
      { title: "Advanced exploitation", topics: ["Choosing and using exploits with Metasploit", "Payloads and post-exploitation basics", "Validating findings safely"] },
      { title: "Privilege escalation", topics: ["Windows and Linux enumeration", "Misconfigurations and weak permissions", "Moving from low-privilege access to full control"] },
      { title: "Active Directory attacks", topics: ["Domain enumeration", "Credential-based attacks and lateral movement", "Defensive controls and detection ideas"] },
      { title: "Capstone project", topics: ["Chain an attack from first access to objective", "Document findings clearly", "Review mistakes and improvements"] },
    ],
    audience: ["SOC analysts and network engineers moving into offensive security", "Aspiring penetration testers with basic security knowledge", "IT professionals who want to understand how attackers think", "Students building a career in cybersecurity"],
    prerequisites: ["Basic networking (TCP/IP, DNS, HTTP)", "Comfort using the Linux command line", "Foundational security awareness"],
    outcomes: ["Run a full ethical hacking engagement from scoping to reporting", "Enumerate networks and services and identify exploitable weaknesses", "Use Nmap, Wireshark, Metasploit and Burp Suite with confidence", "Escalate privileges on Windows and Linux systems", "Explain how Active Directory environments are attacked and defended", "Document findings clearly in a capstone project"],
    roles: ["Penetration Tester", "Ethical Hacker", "Security Analyst", "Vulnerability Assessment Specialist"],
  },
  zxCPPT: {
    tagline: "Go beyond scanning: plan, execute and report professional penetration tests.",
    summary:
      "This 60-hour advanced program covers the full life of a professional engagement, including red teaming methodology, evasion techniques, custom exploit development and client-ready reporting. It is built for people who already know the basics and want to work at a higher level.",
    unique: [
      { title: "Red teaming mindset", text: "Learn how to plan and run realistic, objective-driven engagements, not only checklist scans." },
      { title: "Custom exploit development", text: "Understand how exploits work well enough to adapt them when off-the-shelf tools fail." },
      { title: "Reporting as a core skill", text: "Writing a clear, useful report is half the job. Report writing and documentation are taught as a skill, not an afterthought." },
      { title: "Advanced, 60-hour depth", text: "The longest program in the catalogue, with time to go deep on each topic." },
    ],
    modules: [
      { title: "Red team methodology and planning", topics: ["Engagement planning and objectives", "Threat modelling for the target", "Legal scope and safe testing practices"] },
      { title: "Advanced reconnaissance and attack surface", topics: ["Mapping external and internal attack surface", "Targeted enumeration with Nmap", "Prioritising likely attack paths"] },
      { title: "Evasion techniques", topics: ["How defensive controls detect activity", "Detection-aware testing approaches", "Adversary simulation concepts"] },
      { title: "Custom exploit development", topics: ["Fundamentals of memory corruption", "Analysing and adapting public exploits", "Testing exploits reliably"] },
      { title: "Web and credential attacks", topics: ["Advanced testing with Burp Suite Pro", "Password cracking with Hashcat", "Using Metasploit and C2 frameworks in authorised simulations"] },
      { title: "Report writing and documentation", topics: ["Structuring findings and risk ratings", "Writing remediation advice that teams can act on", "Presenting results to technical and business readers"] },
    ],
    audience: ["Working penetration testers and red team members", "Security engineers who want offensive depth", "Consultants who deliver assessments to clients", "Ethical hackers ready for an advanced step"],
    prerequisites: ["Solid networking and Linux knowledge", "Experience with ethical hacking basics", "Familiarity with scripting is helpful"],
    outcomes: ["Plan and run objective-driven red team and penetration test engagements", "Adapt public exploits and understand how custom exploits are built", "Test web applications and crack credentials with professional tools", "Work with detection in mind and explain how defenders see activity", "Write risk-rated reports with remediation advice teams can act on", "Present results to technical and business audiences"],
    roles: ["Senior Penetration Tester", "Red Team Operator", "Security Consultant", "Offensive Security Engineer"],
  },
  zxGAIP: {
    tagline: "Use generative AI to strengthen security operations, and learn to secure AI itself.",
    summary:
      "This 40-hour intermediate program shows how large language models can support threat hunting and security analysis, and how to deploy AI systems safely. You work with Python, LangChain, the OpenAI API and Hugging Face, and study real-world case studies.",
    unique: [
      { title: "AI for security and security for AI", text: "Covers both directions: using LLMs in security work, and protecting AI systems from misuse." },
      { title: "Hands-on with real tooling", text: "Build with Python, LangChain, OpenAI API and Hugging Face instead of only discussing concepts." },
      { title: "Automated threat hunting", text: "Learn where automation speeds up analysis and where human judgement is still essential." },
      { title: "Risk management included", text: "Understand how to assess and govern AI risk before putting systems into production." },
    ],
    modules: [
      { title: "LLM foundations for security teams", topics: ["How large language models work and where they fail", "Prompting techniques for analysis tasks", "Choosing models and APIs"] },
      { title: "Building with Python and LangChain", topics: ["Calling the OpenAI API and Hugging Face models", "Chaining prompts and tools", "Structuring outputs for reliable use"] },
      { title: "Automated threat hunting", topics: ["Summarising alerts and logs with LLMs", "Triage and enrichment workflows", "Validating AI-generated findings"] },
      { title: "Secure AI deployment", topics: ["Prompt injection and data leakage risks", "Access control and safe tool use", "Monitoring AI systems in production"] },
      { title: "AI risk management", topics: ["Identifying and rating AI risks", "Governance and responsible-use practices", "Documenting decisions and limits"] },
      { title: "Real-world case studies", topics: ["Examples of AI-assisted security work", "Lessons from failures and misuse", "Applying ideas to your own environment"] },
    ],
    audience: ["SOC analysts and threat hunters", "Security engineers exploring automation", "ML and software engineers moving into security", "Team leads evaluating AI for security operations"],
    prerequisites: ["Basic Python programming", "Familiarity with security concepts and logs", "No prior machine learning experience required"],
    outcomes: ["Apply large language models to security analysis and threat hunting", "Build simple AI workflows with Python, LangChain, the OpenAI API and Hugging Face", "Validate AI-generated findings instead of trusting them blindly", "Identify prompt injection, data leakage and other AI-specific risks", "Assess and document AI risk before deployment", "Apply lessons from real-world case studies to your own environment"],
    roles: ["Security Automation Engineer", "SOC Analyst (AI-assisted)", "Threat Hunter", "AI Security Specialist"],
  },
  zxCFD: {
    tagline: "Build modern full-stack applications with security designed in from the first line of code.",
    summary:
      "This intermediate program is for developers who want to ship secure applications. It combines a modern stack (React, Next.js, Node.js and PostgreSQL) with secure coding practices, API development and DevSecOps basics. The course is coming soon.",
    unique: [
      { title: "Security-aware from day one", text: "Secure coding is taught alongside every part of the stack, not bolted on at the end." },
      { title: "A modern, employable stack", text: "Work with React, Next.js, Node.js and PostgreSQL." },
      { title: "APIs and databases covered", text: "Learn the places where real-world applications are most often attacked." },
      { title: "DevSecOps basics", text: "See how security checks fit into a normal development workflow." },
    ],
    modules: [
      { title: "Secure coding foundations", topics: ["Common application vulnerabilities", "Input validation and output handling", "Thinking about trust boundaries"] },
      { title: "Frontend with React and Next.js", topics: ["Building components and pages", "Safe handling of user data in the browser", "Authentication flows"] },
      { title: "Backend with Node.js and API development", topics: ["Designing REST APIs", "Authentication and authorisation", "Rate limiting and error handling"] },
      { title: "Database security with PostgreSQL", topics: ["Schema design and least privilege", "Preventing injection", "Backups and sensitive data handling"] },
      { title: "DevSecOps basics", topics: ["Dependency and secret scanning", "Security checks in CI", "Deploying safely"] },
    ],
    audience: ["Developers who want to write secure code", "Students aiming for full-stack roles", "Engineers moving from front-end or back-end to full-stack"],
    prerequisites: ["Basic programming knowledge", "Familiarity with HTML, CSS and JavaScript"],
    outcomes: ["Write code that avoids common application vulnerabilities", "Build front-end and back-end features with React, Next.js and Node.js", "Design and secure REST APIs, including authentication and rate limiting", "Model and protect data in PostgreSQL", "Add dependency, secret and security checks to a CI workflow"],
    roles: ["Full-Stack Developer", "Secure Software Engineer", "Backend Developer", "DevSecOps Engineer"],
  },
  zxCCF: {
    tagline: "A clear starting point for a career in cybersecurity.",
    summary:
      "This beginner program builds the foundations: how threats work, how networks behave, how cryptography protects data and how to plan your next steps. It is delivered through partner institutions and uses beginner-friendly tools such as Linux, Wireshark, Nmap and VirtualBox.",
    unique: [
      { title: "Built for beginners", text: "No prior security knowledge needed. Concepts are introduced step by step." },
      { title: "Career roadmap included", text: "Finish with a clear idea of which skills and certifications to pursue next." },
      { title: "Hands-on from the start", text: "Practise with real tools in a safe virtual environment." },
      { title: "Ethics first", text: "Learn the legal and ethical boundaries of security work early." },
    ],
    modules: [
      { title: "Core security concepts", topics: ["Confidentiality, integrity and availability", "Threats, vulnerabilities and risk", "Common attack types"] },
      { title: "Network fundamentals", topics: ["How data moves across networks", "Inspecting traffic with Wireshark", "Scanning basics with Nmap"] },
      { title: "Cryptography basics", topics: ["Encryption and hashing", "Keys and certificates", "Where cryptography is used every day"] },
      { title: "Security ethics and law", topics: ["Responsible disclosure", "Authorisation and professional conduct", "Privacy basics"] },
      { title: "Lab setup and career roadmap", topics: ["Working with Linux and VirtualBox", "Understanding firewalls", "Planning your learning path"] },
    ],
    audience: ["Students and fresh graduates", "IT support staff moving into security", "Career changers exploring cybersecurity"],
    prerequisites: ["Basic computer skills", "No prior security knowledge required"],
    outcomes: ["Explain core security concepts such as CIA, threats, vulnerabilities and risk", "Describe how networks work and inspect traffic with Wireshark", "Understand where encryption, hashing and certificates are used", "Work within basic legal and ethical boundaries", "Set up a safe Linux and VirtualBox lab and plan your next learning steps"],
    roles: ["Junior Security Analyst", "IT Support with security focus", "SOC Trainee"],
  },
  zxCCE: {
    tagline: "Expert-level training for people who lead security strategy.",
    summary:
      "This expert program focuses on governance, risk management and enterprise security architecture, and on communicating clearly with senior leadership. It is delivered through partner institutions and works with frameworks and platforms such as NIST, ISO 27001, SIEM, Power BI and ServiceNow.",
    unique: [
      { title: "Leadership-focused", text: "Designed for security leaders, not only practitioners." },
      { title: "Framework-driven", text: "Work practically with NIST and ISO 27001 instead of treating them as theory." },
      { title: "Executive communication", text: "Learn to explain risk and strategy to boards and C-level audiences." },
      { title: "Architecture and strategy together", text: "Connect technical design to business goals." },
    ],
    modules: [
      { title: "Security governance", topics: ["Policies, roles and accountability", "Aligning security with business goals", "Working with ISO 27001"] },
      { title: "Risk management", topics: ["Identifying and assessing risk", "Maintaining risk registers", "Treating and tracking risk"] },
      { title: "Enterprise security architecture", topics: ["Designing layered defences", "Using SIEM platforms for visibility", "Applying the NIST framework"] },
      { title: "C-level communication", topics: ["Reporting risk to executives", "Building dashboards in Power BI", "Presenting clear recommendations"] },
      { title: "Strategic planning", topics: ["Building a security roadmap", "Budgeting and prioritisation", "Managing incidents and processes with ServiceNow"] },
    ],
    audience: ["Security managers and heads of IT", "Aspiring CISOs and security architects", "Risk and compliance leaders"],
    prerequisites: ["Several years of IT or security experience", "Familiarity with core security concepts"],
    outcomes: ["Build and align a security governance programme with business goals", "Run risk assessments and maintain a risk register", "Design layered, framework-based enterprise security architecture", "Report risk to executives with clear dashboards and recommendations", "Create a security roadmap with priorities and budget"],
    roles: ["CISO", "Security Architect", "Head of IT Security", "Risk and Compliance Manager"],
  },
  zxCCP: {
    tagline: "Practical defence skills for everyday security operations.",
    summary:
      "This beginner-friendly program focuses on the daily work of defenders: handling incidents, applying security controls, reading logs and following policy. It is delivered through partner institutions and uses tools such as Wireshark, firewalls, SIEM basics, Windows Event Logs and EDR.",
    unique: [
      { title: "Defence-focused", text: "Concentrates on detection, response and protection rather than attack." },
      { title: "Skills you can use at work", text: "Log analysis and incident handling are taught as real, repeatable workflows." },
      { title: "Policy and compliance covered", text: "Understand the rules and controls that keep organisations secure." },
      { title: "Institutional training", text: "Delivered through partner institutions for structured, group-based learning." },
    ],
    modules: [
      { title: "Incident response basics", topics: ["Phases of incident handling", "Identifying and containing incidents", "Documenting what happened"] },
      { title: "Security controls implementation", topics: ["Firewalls and network controls", "Endpoint protection and EDR tools", "Verifying controls work"] },
      { title: "Log analysis", topics: ["Reading Windows Event Logs", "Spotting suspicious patterns", "Using SIEM basics to search and correlate"] },
      { title: "Policy and compliance", topics: ["Writing and following security policies", "Common compliance requirements", "Evidence and audit basics"] },
      { title: "Traffic analysis", topics: ["Inspecting network traffic with Wireshark", "Recognising normal versus unusual behaviour", "Escalating findings"] },
    ],
    audience: ["IT staff taking on security duties", "Students in cybersecurity programs", "Early-career defenders and SOC trainees"],
    prerequisites: ["Basic IT and networking knowledge", "No prior security experience required"],
    outcomes: ["Follow the phases of incident handling and document incidents", "Apply and verify firewall and endpoint security controls", "Read Windows Event Logs and spot suspicious patterns with SIEM basics", "Explain common policy and compliance requirements", "Recognise unusual network traffic and escalate it correctly"],
    roles: ["SOC Analyst (Tier 1)", "Security Operations Associate", "Incident Response Assistant", "IT Security Administrator"],
  },
};

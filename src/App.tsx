import { useEffect, useRef, useState } from "react";
import { courseOverviews } from "./courseOverviews";

type IconName =
  | "arrow"
  | "award"
  | "brain"
  | "briefcase"
  | "check"
  | "chevron"
  | "clock"
  | "code"
  | "layers"
  | "menu"
  | "network"
  | "radar"
  | "shield"
  | "star"
  | "terminal"
  | "users"
  | "x";

function Icon({ name, className = "" }: { name: IconName; className?: string }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    award: <><circle cx="12" cy="8" r="5" /><path d="M8.8 12 7 22l5-3 5 3-1.8-10" /></>,
    brain: <><path d="M9.5 4A3.5 3.5 0 0 0 6 7.5c0 .4.1.8.2 1.2A3.8 3.8 0 0 0 4 12.2a3.8 3.8 0 0 0 2.7 3.6V17a3 3 0 0 0 3 3c1 0 1.8-.4 2.3-1V5.8A2.8 2.8 0 0 0 9.5 4Z" /><path d="M14.5 4A3.5 3.5 0 0 1 18 7.5c0 .4-.1.8-.2 1.2a3.8 3.8 0 0 1 2.2 3.5 3.8 3.8 0 0 1-2.7 3.6V17a3 3 0 0 1-3 3c-1 0-1.8-.4-2.3-1" /><path d="M8 9.5c1.5 0 2.5 1 2.5 2.5M16 9.5c-1.5 0-2.5 1-2.5 2.5" /></>,
    briefcase: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m8 10 4 4 4-4" />,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    code: <><path d="m8 9-3 3 3 3M16 9l3 3-3 3M14 6l-4 12" /></>,
    layers: <><path d="m12 3-9 5 9 5 9-5-9-5Z" /><path d="m3 12 9 5 9-5M3 16l9 5 9-5" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    network: <><rect x="9" y="2" width="6" height="6" rx="1.5" /><rect x="2" y="16" width="6" height="6" rx="1.5" /><rect x="16" y="16" width="6" height="6" rx="1.5" /><path d="M12 8v4M5 16v-2h14v2" /></>,
    radar: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><path d="m12 12 5-5M12 3v2M3 12h2" /></>,
    shield: <><path d="M12 3 20 6v5c0 5-3.4 8.4-8 10-4.6-1.6-8-5-8-10V6l8-3Z" /><path d="m8.5 12 2.2 2.2 4.8-5" /></>,
    star: <path d="m12 2 3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2Z" />,
    terminal: <><path d="m5 7 4 5-4 5M11 17h8" /></>,
    users: <><path d="M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 18.5V20" /><circle cx="10" cy="8" r="4" /><path d="M17 11a3 3 0 0 0 0-6M19 15.5a3 3 0 0 1 2 2.8V20" /></>,
    x: <><path d="m6 6 12 12M18 6 6 18" /></>,
  };

  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

function Logo() {
  return (
    <a href="#" className="logo" aria-label="ZecurX Certifications and Academy home">
      <img className="logo-mark" src="/assets/zecurx-icon.png" alt="" />
      <img className="logo-type" src="/assets/zecurx-wordmark.png" alt="ZecurX" />
      <span className="logo-divider" />
      <span className="logo-academy">CERTIFICATIONS &amp; TRAINING</span>
    </a>
  );
}

function HeroVisual() {
  return (
    <div
      className="hero-image-card"
      onMouseMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        event.currentTarget.style.setProperty("--hero-rotate-x", `${y * -5}deg`);
        event.currentTarget.style.setProperty("--hero-rotate-y", `${x * 6}deg`);
        event.currentTarget.style.setProperty("--hero-light-x", `${(x + 0.5) * 100}%`);
        event.currentTarget.style.setProperty("--hero-light-y", `${(y + 0.5) * 100}%`);
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.setProperty("--hero-rotate-x", "0deg");
        event.currentTarget.style.setProperty("--hero-rotate-y", "0deg");
      }}
    >
      <img src="/assets/cyber-operations.jpg" alt="Cybersecurity professional monitoring multiple systems" />
      <div className="image-scan" />
      <div className="threat-panel">
        <span className="threat-icon"><Icon name="shield" /></span>
        <span><small>Defense simulation</small><b>Scenario contained</b></span>
        <i>Secure</i>
      </div>
      <div className="signal-panel">
        <span className="signal-bars"><i /><i /><i /><i /><i /></span>
        <span><b>Active signals</b><small>Training telemetry</small></span>
      </div>
      <div className="image-orbit orbit-one" />
      <div className="image-orbit orbit-two" />
      <div className="photo-credit">
        Photo by <a href="https://unsplash.com/@abusaeid01" target="_blank" rel="noreferrer">Abu Saeid</a>
      </div>
    </div>
  );
}

const proofPoints = [
  { icon: "brain" as const, title: "AI security learning", text: "Study intelligent analysis of suspicious activity" },
  { icon: "terminal" as const, title: "Hands-on labs", text: "Practice attack and defense in guided scenarios" },
  { icon: "radar" as const, title: "Threat intelligence", text: "Interpret alerts, indicators, and security context" },
  { icon: "network" as const, title: "Interactive 3D labs", text: "Explore connected systems and attack paths" },
];

const courses = [
  {
    code: "zxCPEH",
    amount: 29999,
    title: "Certified Professional Ethical Hacker",
    description: "Advanced ethical hacking methodology. 40 Hours duration.",
    price: "₹29,999",
    originalPrice: "₹45,499",
    level: "Intermediate",
    duration: "40 Hours",
    logo: "/assets/zxCPEH.png",
    url: "https://www.zecurx.com/academy/06a10be6-115a-4a83-b338-67168abcce1a",
    skills: ["Advanced Exploitation", "Network & Web Security", "Privilege Escalation", "Active Directory Attacks", "Project-Based Learning"],
    tools: ["Kali Linux", "Nmap", "Wireshark", "Metasploit", "Burp Suite"],
  },
  {
    code: "zxCPPT",
    amount: 35999,
    title: "Certified Professional Pen Tester",
    description: "Professional penetration testing certification. 60 Hours duration.",
    price: "₹35,999",
    originalPrice: "₹59,999",
    level: "Advanced",
    duration: "60 Hours",
    logo: "/assets/zxCPPT.png",
    url: "https://www.zecurx.com/academy/1033198a-bf65-4183-9e6e-aab727903039",
    skills: ["Red Teaming Methodology", "Advanced Evasion Techniques", "Report Writing & Documentation", "Custom Exploit Development", "Industry Standard Tools"],
    tools: ["Burp Suite Pro", "Metasploit", "Cobalt Strike", "Hashcat", "Nmap"],
  },
  {
    code: "zxGAIP",
    amount: 29999,
    title: "Generative AI Professional",
    description: "Leverage Generative AI for security operations. 40 Hours duration.",
    price: "₹29,999",
    originalPrice: "₹49,999",
    level: "Intermediate",
    duration: "40 Hours",
    logo: "/assets/zxGAIP.png",
    url: "https://www.zecurx.com/academy/b5276793-8c55-4759-8206-3d1a833fe304",
    skills: ["LLMs for Security", "Automated Threat Hunting", "Secure AI Deployment", "AI Risk Management", "Real-world Case Studies"],
    tools: ["Python", "LangChain", "OpenAI API", "Hugging Face", "Wireshark"],
  },
  {
    code: "zxCFD",
    title: "Certified Fullstack Dev",
    description: "Become a security-aware fullstack developer. Build robust, secure applications from the ground up.",
    price: "Contact for Pricing",
    level: "Intermediate",
    duration: "Coming Soon",
    logo: "/assets/zxCFD.png",
    url: "https://www.zecurx.com/academy/9bce53be-103e-46b9-9fa0-2b91260f38db",
    skills: ["Secure Coding Practices", "Modern Stack (Next.js, Node)", "Database Security", "API Development", "DevSecOps Basics"],
    tools: ["VS Code", "Node.js", "React", "Next.js", "PostgreSQL"],
  },
  {
    code: "zxCCF",
    title: "Certified Cybersecurity Foundations",
    description: "Foundational knowledge for a career in cybersecurity. Understand the landscape, threats, and basic protections.",
    price: "Institution Only",
    level: "Beginner",
    duration: "Custom",
    logo: "/assets/zxCCF.png",
    url: "https://www.zecurx.com/academy/3613d162-d801-47c6-9305-719f999738c8",
    skills: ["Core Security Concepts", "Network Fundamentals", "Cryptography Basics", "Security Ethics", "Career Roadmap"],
    tools: ["Linux", "Wireshark", "Nmap", "VirtualBox", "Firewalls"],
  },
  {
    code: "zxCCE",
    title: "Certified Cybersecurity Expert",
    description: "Expert-level training for leadership roles. Strategy, governance, and advanced security architecture.",
    price: "Institution Only",
    level: "Expert",
    duration: "Custom",
    logo: "/assets/zxCCE.png",
    url: "https://www.zecurx.com/academy/ef34cbc8-c918-4e64-bd88-799863b299e1",
    skills: ["Security Governance", "Risk Management", "C-Level Communication", "Enterprise Architecture", "Strategic Planning"],
    tools: ["SIEM Platforms", "NIST & ISO 27001", "Power BI", "ServiceNow", "Risk Registers"],
  },
  {
    code: "zxCCP",
    title: "Certified Cybersecurity Practitioner",
    description: "Practical cybersecurity skills for professionals. Focus on defense, incident handling, and everyday security operations.",
    price: "Institution Only",
    level: "Beginner",
    duration: "Custom",
    logo: "/assets/zxCCP.png",
    url: "https://www.zecurx.com/academy/7f0e2cb3-82c1-4634-9a95-67a2ae14a815",
    skills: ["Incident Response Basics", "Security Controls Implementation", "Policy & Compliance", "Log Analysis", "Institutional Training"],
    tools: ["Wireshark", "Firewalls", "SIEM Basics", "Windows Event Logs", "EDR Tools"],
  },
];

type AcademyCourseRecord = {
  id?: string;
  courseCode?: string;
  code?: string;
  title?: string;
  description?: string;
  shortDescription?: string;
  level?: string;
  duration?: string | number;
};

type Review = { name: string; role: string; rating: number; date: string; text: string };
type ReviewStats = { count: number; average: number; distribution: number[] };
const MAX_VISIBLE_REVIEWS = 10;

const differentiators = [
  {
    icon: "terminal" as const,
    title: "Cyber Range & Attack-Defense Labs",
    text: "Practice realistic cyberattack and defense scenarios in isolated virtual environments.",
    status: "Platform roadmap",
    details: [
      "Guided exercises with clear objectives and completion criteria",
      "Safe environments for authorized attack-and-defense practice",
      "Post-exercise explanations focused on defensive learning",
    ],
  },
  {
    icon: "brain" as const,
    title: "AI Security Learning Copilot",
    text: "Understand security findings with contextual explanations and guided learning.",
    status: "Planned capability",
    details: [
      "Beginner-friendly explanations of vulnerabilities and defenses",
      "Progressive hints before complete solutions are revealed",
      "Next-step recommendations based on demonstrated progress",
    ],
  },
  {
    icon: "radar" as const,
    title: "Attack-to-Defense Intelligence",
    text: "Connect offensive security techniques with practical defensive strategies.",
    status: "Learning model",
    details: [
      "Relate attack techniques to detection and mitigation approaches",
      "Translate findings into actionable defensive recommendations",
      "Reference established frameworks where they support the lesson",
    ],
  },
  {
    icon: "network" as const,
    title: "Personalized Cybersecurity Skill Graph",
    text: "Visualize your skills, identify knowledge gaps, and follow a clear learning path.",
    status: "Interactive preview",
    details: [
      "Map prerequisite relationships from foundations to advanced skills",
      "Make progress and knowledge gaps easier to understand",
      "Recommend a next step without hiding the broader learning path",
    ],
  },
];

const threatCities = [
  { name: "New York", country: "United States", lat: 40.7, lon: -74 },
  { name: "London", country: "United Kingdom", lat: 51.5, lon: -0.1 },
  { name: "Frankfurt", country: "Germany", lat: 50.1, lon: 8.7 },
  { name: "Paris", country: "France", lat: 48.9, lon: 2.4 },
  { name: "Amsterdam", country: "Netherlands", lat: 52.4, lon: 4.9 },
  { name: "Moscow", country: "Russia", lat: 55.7, lon: 37.6 },
  { name: "Dubai", country: "United Arab Emirates", lat: 25.2, lon: 55.3 },
  { name: "Mumbai", country: "India", lat: 19.1, lon: 72.9 },
  { name: "Bengaluru", country: "India", lat: 12.97, lon: 77.6 },
  { name: "Singapore", country: "Singapore", lat: 1.35, lon: 103.8 },
  { name: "Beijing", country: "China", lat: 39.9, lon: 116.4 },
  { name: "Tokyo", country: "Japan", lat: 35.7, lon: 139.7 },
  { name: "Seoul", country: "South Korea", lat: 37.6, lon: 127 },
  { name: "Sydney", country: "Australia", lat: -33.9, lon: 151.2 },
  { name: "São Paulo", country: "Brazil", lat: -23.5, lon: -46.6 },
  { name: "Toronto", country: "Canada", lat: 43.7, lon: -79.4 },
  { name: "Johannesburg", country: "South Africa", lat: -26.2, lon: 28 },
];

const threatTypes = [
  { type: "Ransomware", color: "#ff4d7d" },
  { type: "DDoS Attack", color: "#35d6ff" },
  { type: "Phishing", color: "#ffb648" },
  { type: "Malware Drop", color: "#ff3ea5" },
  { type: "Botnet C2", color: "#8b7dff" },
  { type: "Zero-Day Exploit", color: "#ff7a45" },
  { type: "Credential Theft", color: "#4d8bff" },
  { type: "SQL Injection", color: "#3ddc97" },
];

type ThreatEvent = { id: number; from: number; to: number; kind: number; born: number };

function GlobalThreatMap() {
  const boardRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const eventsRef = useRef<ThreatEvent[]>([]);
  const visibleRef = useRef(true);
  const [events, setEvents] = useState<ThreatEvent[]>([]);
  const [detected, setDetected] = useState(41257);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let id = 0;
    const spawn = () => {
      const from = Math.floor(Math.random() * threatCities.length);
      let to = Math.floor(Math.random() * threatCities.length);
      while (to === from) to = Math.floor(Math.random() * threatCities.length);
      const event: ThreatEvent = { id: id++, from, to, kind: Math.floor(Math.random() * threatTypes.length), born: performance.now() };
      eventsRef.current = [event, ...eventsRef.current].slice(0, 7);
      setEvents(eventsRef.current.slice());
      setDetected((current) => current + Math.floor(3 + Math.random() * 14));
    };
    spawn();
    const interval = window.setInterval(() => {
      if (visibleRef.current) spawn();
    }, reduced ? 5000 : 1600);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const board = boardRef.current;
    const canvas = canvasRef.current;
    if (!board || !canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const visibility = new IntersectionObserver(([entry]) => { visibleRef.current = entry.isIntersecting; }, { threshold: 0.05 });
    visibility.observe(board);

    let width = 0;
    let height = 0;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const resizer = new ResizeObserver(resize);
    resizer.observe(canvas);

    const tilt = -0.35;
    const hexAlpha = (hex: string, alpha: number) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r},${g},${b},${alpha})`;
    };
    let rotation = 0;

    const project = (lat: number, lon: number, radius: number) => {
      const phi = (lat * Math.PI) / 180;
      const lambda = ((lon + rotation) * Math.PI) / 180;
      const x = Math.cos(phi) * Math.sin(lambda);
      const zTop = Math.cos(phi) * Math.cos(lambda);
      const yMid = Math.sin(phi);
      const y = yMid * Math.cos(tilt) - zTop * Math.sin(tilt);
      const z = yMid * Math.sin(tilt) + zTop * Math.cos(tilt);
      return { x: width / 2 + x * radius, y: height / 2 - y * radius, z };
    };

    const arcPoint = (from: (typeof threatCities)[number], to: (typeof threatCities)[number], t: number, radius: number) => {
      const lat = from.lat + (to.lat - from.lat) * t;
      let dLon = to.lon - from.lon;
      if (dLon > 180) dLon -= 360;
      if (dLon < -180) dLon += 360;
      const lon = from.lon + dLon * t;
      return project(lat, lon, radius * (1 + 0.3 * Math.sin(Math.PI * t)));
    };

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);
      if (width < 2 || height < 2) return;
      const radius = Math.min(width, height) / 2 - 28;

      const sphere = context.createRadialGradient(width / 2 - radius * 0.32, height / 2 - radius * 0.36, radius * 0.1, width / 2, height / 2, radius);
      sphere.addColorStop(0, "#1a3a66");
      sphere.addColorStop(0.62, "#0d2040");
      sphere.addColorStop(1, "#071325");
      context.beginPath();
      context.arc(width / 2, height / 2, radius, 0, Math.PI * 2);
      context.fillStyle = sphere;
      context.fill();
      context.lineWidth = 1;
      context.strokeStyle = "rgba(116,170,255,.42)";
      context.stroke();

      context.lineWidth = 0.7;
      for (let lon = 0; lon < 360; lon += 30) {
        context.beginPath();
        let drawing = false;
        for (let lat = -88; lat <= 88; lat += 4) {
          const p = project(lat, lon - 180, radius);
          if (p.z > 0) {
            if (drawing) context.lineTo(p.x, p.y);
            else { context.moveTo(p.x, p.y); drawing = true; }
          } else drawing = false;
        }
        context.strokeStyle = "rgba(96,146,255,.15)";
        context.stroke();
      }
      for (let lat = -60; lat <= 60; lat += 30) {
        context.beginPath();
        let drawing = false;
        for (let step = 0; step <= 360; step += 4) {
          const p = project(lat, step - 180, radius);
          if (p.z > 0) {
            if (drawing) context.lineTo(p.x, p.y);
            else { context.moveTo(p.x, p.y); drawing = true; }
          } else drawing = false;
        }
        context.strokeStyle = lat === 0 ? "rgba(116,170,255,.3)" : "rgba(96,146,255,.15)";
        context.stroke();
      }

      threatCities.forEach((city) => {
        const p = project(city.lat, city.lon, radius);
        if (p.z <= 0.02) return;
        const alpha = Math.min(1, p.z + 0.25);
        context.beginPath();
        context.arc(p.x, p.y, 2.3, 0, Math.PI * 2);
        context.fillStyle = `rgba(150,214,255,${0.9 * alpha})`;
        context.fill();
        context.beginPath();
        context.arc(p.x, p.y, 6 + Math.sin(time / 460 + city.lon) * 1.6, 0, Math.PI * 2);
        context.strokeStyle = `rgba(96,190,255,${0.26 * alpha})`;
        context.lineWidth = 1;
        context.stroke();
      });

      eventsRef.current.forEach((event) => {
        const age = (time - event.born) / 1000;
        const life = 2.8;
        if (age > life) return;
        const from = threatCities[event.from];
        const to = threatCities[event.to];
        const color = threatTypes[event.kind].color;
        const progress = Math.min(1, age / 1.35);
        const fade = age < life - 0.7 ? 1 : Math.max(0, (life - age) / 0.7);

        context.beginPath();
        let drawing = false;
        for (let i = 0; i <= 46; i++) {
          const p = arcPoint(from, to, (i / 46) * progress, radius);
          if (p.z <= 0) { drawing = false; continue; }
          if (drawing) context.lineTo(p.x, p.y);
          else { context.moveTo(p.x, p.y); drawing = true; }
        }
        context.strokeStyle = hexAlpha(color, 0.85 * fade);
        context.lineWidth = 1.6;
        context.shadowColor = color;
        context.shadowBlur = 9;
        context.stroke();
        context.shadowBlur = 0;

        if (progress < 1) {
          const head = arcPoint(from, to, progress, radius);
          if (head.z > 0) {
            context.beginPath();
            context.arc(head.x, head.y, 3, 0, Math.PI * 2);
            context.fillStyle = hexAlpha(color, fade);
            context.shadowColor = color;
            context.shadowBlur = 12;
            context.fill();
            context.shadowBlur = 0;
          }
        }
      });

      context.beginPath();
      context.arc(width / 2, height / 2, radius + 9, 0, Math.PI * 2);
      context.strokeStyle = "rgba(96,146,255,.1)";
      context.lineWidth = 1;
      context.stroke();
    };

    let raf = 0;
    let last = performance.now();
    const loop = (time: number) => {
      const dt = Math.min(64, time - last);
      last = time;
      if (visibleRef.current && !reduced) rotation += dt * 0.0038;
      draw(time);
      raf = window.requestAnimationFrame(loop);
    };
    raf = window.requestAnimationFrame(loop);
    return () => {
      window.cancelAnimationFrame(raf);
      visibility.disconnect();
      resizer.disconnect();
    };
  }, []);

  return (
    <section className="threatmap-section reveal" aria-labelledby="threatmap-heading">
      <div className="threatmap-board" ref={boardRef}>
        <div className="threatmap-head">
          <h2 id="threatmap-heading">Global threat visualization</h2>
          <span className="threatmap-tag">Illustrative preview</span>
          <span className="threatmap-live"><i /> Live feed</span>
        </div>
        <div className="threatmap-stats">
          <div><b>{detected.toLocaleString("en-IN")}</b><small>Threat events detected</small></div>
          <div><b>{threatCities.length}</b><small>Monitored regions</small></div>
          <div><b>{threatTypes.length}</b><small>Attack vectors tracked</small></div>
          <div><b>24/7</b><small>Continuous monitoring</small></div>
        </div>
        <div className="threatmap-grid">
          <div className="threatmap-canvas-wrap">
            <canvas ref={canvasRef} role="img" aria-label="Animated globe visualizing simulated live cyber threats moving between world cities" />
          </div>
          <aside className="threatmap-feed" aria-live="polite">
            <div className="feed-title"><Icon name="radar" /> Live threat feed</div>
            {events.length === 0 && <p className="feed-empty">Listening for simulated threat activity…</p>}
            {events.slice(0, 5).map((event, index) => {
              const kind = threatTypes[event.kind];
              const from = threatCities[event.from];
              const to = threatCities[event.to];
              return (
                <div className={`feed-item ${index === 0 ? "feed-new" : ""}`} key={event.id}>
                  <i style={{ background: kind.color, boxShadow: `0 0 10px ${kind.color}` }} />
                  <div>
                    <b style={{ color: kind.color }}>{kind.type}</b>
                    <span>{from.name}, {from.country} → {to.name}, {to.country}</span>
                  </div>
                  <small>{Math.max(1, Math.round((performance.now() - event.born) / 1000))}s ago</small>
                </div>
              );
            })}
            <p className="threatmap-note">
              Illustrative simulation inspired by public threat maps such as Fortinet's Threat Map. No live monitoring or real security data is shown.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}

const partners = [
  { name: "MSRIT", image: "/assets/partner-ramaiah.png", url: "https://www.msrit.edu/" },
  { name: "IIBS", image: "/assets/partner-iibs.png", url: "https://www.iibs.edu.in/" },
  { name: "Mount Carmel", image: "/assets/partner-mount-carmel.png", url: "https://mccblr.edu.in/" },
  { name: "Presidency", image: "/assets/partner-presidency.png", url: "https://presidencycollege.ac.in/" },
  { name: "St Pauls", image: "/assets/partner-st-pauls.png", url: "https://www.stpaulscollege.edu.in/" },
  { name: "Brindavan", image: "/assets/partner-brindavan.png", url: "https://www.brindavancollege.com/" },
  { name: "RIBS", image: "/assets/partner-ribs.png", url: "https://www.ribs.edu.in/" },
  { name: "KGI", image: "/assets/partner-kgi.png", url: "https://kgi.edu.in/" },
  { name: "Sapthagiri", image: "/assets/partner-sapthagiri.png", url: "https://sapthagiri.edu.in/" },
  { name: "Yenepoya", image: "/assets/partner-yenepoya.png", url: "https://www.yenepoya.edu.in/" },
  { name: "MSRCASC", image: "/assets/partner-msrcasc.png", url: "https://www.msrcasc.edu.in/" },
  { name: "Dhanwantri", image: "/assets/partner-dhanwantari.png", url: "https://dhanwantarinursingcollege.com/" },
];

function Stars({ value, size = 15 }: { value: number; size?: number }) {
  return (
    <span className="stars" style={{ fontSize: `${size}px` }} aria-label={`${value} out of 5 stars`} role="img">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={`star ${value >= star - 0.25 ? "star-on" : "star-off"}`}>
          <Icon name="star" />
        </span>
      ))}
    </span>
  );
}

function ReviewForm({ courseCode }: { courseCode: string }) {
  const [certificateId, setCertificateId] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(5);
  const [hovered, setHovered] = useState(0);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const canSubmit = certificateId.trim().length > 6 && /^\S+@\S+\.\S+$/.test(email.trim()) && text.trim().length > 3 && !busy;

  const submit = async () => {
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseCode, certificateId: certificateId.trim(), email: email.trim(), rating, text: text.trim() }),
      });
      const data = await response.json().catch(() => null);
      if (!data) throw new Error("The review service is not reachable. Run the site with `vercel dev` (or deploy it) so the /api routes are available.");
      if (!response.ok) throw new Error(data.error || "Could not post your review.");
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not post your review.");
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <div className="review-form review-done" role="status">
        <small>Thank you</small>
        <p>Your review has been submitted for approval. It will appear on this page once ZecurX approves it.</p>
      </div>
    );
  }

  return (
    <form
      className="review-form"
      onSubmit={(event) => {
        event.preventDefault();
        if (canSubmit) submit();
      }}
    >
      <small>Write a verified review</small>
      <p className="review-gate">
        <Icon name="shield" /> Only learners who completed this course and received their ZecurX certificate can post a review. Enter the certificate ID and the email it was issued to.
      </p>
      <div className="review-form-row">
        <input type="text" placeholder="Certificate ID (e.g. ZX-CPEH-2026-…)" value={certificateId} maxLength={40} onChange={(e) => setCertificateId(e.target.value)} aria-label="Certificate ID" autoComplete="off" />
        <input type="email" placeholder="Email on your certificate" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email on your certificate" autoComplete="email" />
      </div>
      <div className="star-picker" role="radiogroup" aria-label="Your rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            role="radio"
            aria-checked={rating === star}
            aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
            className={star <= (hovered || rating) ? "picked" : ""}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => setRating(star)}
          >
            <Icon name="star" />
          </button>
        ))}
      </div>
      <textarea
        placeholder="Share what you learned, what you liked, and who this course is for…"
        value={text}
        rows={3}
        maxLength={600}
        onChange={(e) => setText(e.target.value)}
        aria-label="Your comment"
      />
      {error && <p className="checkout-note checkout-error" role="alert">{error}</p>}
      <button className="button button-primary review-submit" type="submit" disabled={!canSubmit}>
        {busy ? "Verifying…" : "Verify & submit review"} <Icon name="arrow" />
      </button>
    </form>
  );
}

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void; on: (event: string, cb: (response: any) => void) => void };
  }
}

function loadRazorpay(): Promise<boolean> {
  if (window.Razorpay) return Promise.resolve(true);
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

const POLICY_VERSION = "2026-11-14";

const parseINR = (value?: string) => (value ? Number(value.replace(/[^\d]/g, "")) : 0);
const formatINR = (value: number) => `₹${value.toLocaleString("en-IN")}`;

type Route = { view: "home" | "course" | "checkout" | "refund"; code: string | null };

// The payment form now lives at the bottom of each course page. #/checkout/<code> still works and opens that section.

function parseRoute(): Route {
  const hash = window.location.hash;
  if (hash === "#/refund-policy") return { view: "refund", code: null };
  const match = hash.match(/^#\/(course|checkout)\/([A-Za-z0-9]+)$/);
  if (match && courses.some((course) => course.code === match[2])) {
    return { view: match[1] as "course" | "checkout", code: match[2] };
  }
  return { view: "home", code: null };
}

function EnrollCard({ course }: { course: (typeof courses)[number] }) {
  const payable = typeof course.amount === "number";
  return (
    <section className="detail-section enroll-card" id="payment" aria-labelledby="enroll-heading">
      <div>
        <span className="section-kicker">Enrollment</span>
        <h2 id="enroll-heading">Ready to start {course.code}?</h2>
        <p className="enroll-copy">
          {payable
            ? "Pay securely online with UPI, cards, netbanking or wallets. You will review your order before paying."
            : course.price === "Institution Only"
              ? "This program is delivered through partner institutions."
              : "Pricing for this program is shared on request."}
        </p>
        {payable && (
          <p className="enroll-policy">
            <Icon name="shield" /> All purchases are final. <a href="#/refund-policy">Read the No Refund Policy</a>
          </p>
        )}
      </div>
      <div className="enroll-action">
        {payable && (
          <strong className="detail-price">
            {course.price}
            {course.originalPrice && <del>{course.originalPrice}</del>}
          </strong>
        )}
        {payable ? (
          <a className="button button-primary" href={`#/checkout/${course.code}`}>
            Proceed to payment <Icon name="arrow" />
          </a>
        ) : (
          <a className="button button-primary" href={course.url} target="_blank" rel="noreferrer">
            Enquire on ZecurX <Icon name="arrow" />
          </a>
        )}
      </div>
    </section>
  );
}

type Receipt = { paymentId: string; orderId: string; amount: number; email: string };

function PaymentSection({ course }: { course: (typeof courses)[number] }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "paid" | "error">("idle");
  const [message, setMessage] = useState("");
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [couponInput, setCouponInput] = useState("");
  const [coupon, setCoupon] = useState<{ code: string; discount: number; label: string } | null>(null);
  const [couponStatus, setCouponStatus] = useState<"idle" | "checking">("idle");
  const [couponError, setCouponError] = useState("");

  const listPrice = typeof course.amount === "number" ? course.amount : 0;
  const couponDiscount = coupon?.discount ?? 0;
  const amount = listPrice - couponDiscount;
  const original = parseINR(course.originalPrice);
  const saving = original > listPrice ? original - listPrice : 0;
  const savingPercent = saving ? Math.round((saving / original) * 100) : 0;

  const applyCouponCode = async () => {
    const code = couponInput.trim();
    if (!code || couponStatus === "checking") return;
    setCouponStatus("checking");
    setCouponError("");
    try {
      const response = await fetch("/api/validate-coupon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseCode: course.code, couponCode: code }),
      });
      const result = await response.json().catch(() => null);
      if (!result) throw new Error("Coupon service is not reachable. Use the deployed site or run `vercel dev` so the /api routes work.");
      if (!response.ok || !result.valid) throw new Error(result.error || "This coupon code is not valid");
      setCoupon({ code: result.code, discount: result.discount, label: result.label });
      setCouponInput("");
    } catch (error) {
      setCoupon(null);
      setCouponError(error instanceof Error ? error.message : "Could not check the coupon. Try again.");
    } finally {
      setCouponStatus("idle");
    }
  };

  const removeCoupon = () => {
    setCoupon(null);
    setCouponError("");
  };

  const digits = phone.replace(/\D/g, "").slice(-10);
  const emailOk = /^\S+@\S+\.\S+$/.test(email.trim());
  const canPay = name.trim().length > 1 && emailOk && digits.length === 10 && accepted;

  const pay = async () => {
    if (!canPay || status === "loading") return;
    setStatus("loading");
    setMessage("");
    try {
      const loaded = await loadRazorpay();
      if (!loaded || !window.Razorpay) throw new Error("Could not load the payment window. Check your connection and try again.");

      const orderResponse = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseCode: course.code,
          name: name.trim(),
          email: email.trim(),
          phone: digits,
          policyAccepted: true,
          policyVersion: POLICY_VERSION,
          couponCode: coupon?.code,
        }),
      });
      const order = await orderResponse.json();
      if (!orderResponse.ok) throw new Error(order.error || "Could not start payment.");

      const checkout = new window.Razorpay({
        key: order.keyId,
        order_id: order.orderId,
        amount: order.amount,
        currency: order.currency,
        name: "ZecurX Certifications & Academy",
        description: order.courseTitle,
        image: `${window.location.origin}/assets/zecurx-icon.png`,
        prefill: { name: name.trim(), email: email.trim(), contact: digits },
        notes: { courseCode: course.code },
        theme: { color: "#315be3" },
        modal: { ondismiss: () => setStatus((current) => (current === "loading" ? "idle" : current)) },
        handler: async (response: Record<string, string>) => {
          try {
            const verifyResponse = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });
            const result = await verifyResponse.json();
            if (!result.verified) throw new Error("verification failed");
            setReceipt({ paymentId: response.razorpay_payment_id, orderId: response.razorpay_order_id, amount: order.amount / 100, email: email.trim() });
            setStatus("paid");
            window.setTimeout(() => document.getElementById("payment")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
          } catch {
            setStatus("error");
            setMessage(`We received your payment (ID: ${response.razorpay_payment_id}) but could not confirm it automatically. Please contact ZecurX with this ID.`);
          }
        },
      });
      checkout.on("payment.failed", (response: any) => {
        setStatus("error");
        setMessage(response?.error?.description || "Payment failed. No money has been taken. You can try again.");
      });
      checkout.open();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  };

  if (status === "paid" && receipt) {
    return (
      <section className="detail-section payment-section" id="payment">
        <div className="success-card">
          <span className="success-icon"><Icon name="check" /></span>
          <h1>Payment successful</h1>
          <p>Thank you for enrolling in <b>{course.title}</b>. A confirmation will be sent to {receipt.email}.</p>
          <dl className="receipt">
            <div><dt>Course</dt><dd>{course.code}</dd></div>
            <div><dt>Amount paid</dt><dd>{formatINR(receipt.amount)}</dd></div>
            <div><dt>Payment ID</dt><dd>{receipt.paymentId}</dd></div>
            <div><dt>Order ID</dt><dd>{receipt.orderId}</dd></div>
          </dl>
          <div className="success-actions">
            <button className="button button-primary" type="button" onClick={() => window.print()}>Print receipt</button>
            <a className="detail-official-link" href="#courses">Back to all courses</a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="detail-section payment-section" id="payment" aria-labelledby="payment-heading">
      <span className="section-kicker">Enrollment &amp; payment</span>

      <ol className="checkout-steps" aria-label="Checkout progress">
        <li className="done"><span><Icon name="check" /></span> Course</li>
        <li className="active"><span>2</span> Details &amp; payment</li>
        <li><span>3</span> Confirmation</li>
      </ol>

      <div className="checkout-grid">
        <section className="checkout-main">
          <h2 id="payment-heading">Complete your enrollment</h2>
          <p className="checkout-sub">Enter your details. We use them only for your enrollment and payment receipt.</p>

          <div className="checkout-fields">
            <label>
              <span>Full name</span>
              <input type="text" value={name} maxLength={60} onChange={(e) => setName(e.target.value)} autoComplete="name" placeholder="As it should appear on the certificate" />
            </label>
            <label>
              <span>Email address</span>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" placeholder="you@example.com" />
            </label>
            <label>
              <span>Mobile number</span>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" placeholder="10-digit number" />
            </label>
          </div>

          <div className="coupon-box">
            <span>Have a coupon?</span>
            {coupon ? (
              <div className="coupon-applied">
                <Icon name="check" /> <b>{coupon.code}</b> applied ({coupon.label})
                <button type="button" onClick={removeCoupon}>Remove</button>
              </div>
            ) : (
              <div className="coupon-row">
                <input
                  type="text"
                  value={couponInput}
                  maxLength={30}
                  placeholder="Enter coupon code"
                  autoCapitalize="characters"
                  aria-label="Coupon code"
                  onChange={(e) => { setCouponInput(e.target.value.toUpperCase()); setCouponError(""); }}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); applyCouponCode(); } }}
                />
                <button type="button" className="button button-primary" onClick={applyCouponCode} disabled={!couponInput.trim() || couponStatus === "checking"}>
                  {couponStatus === "checking" ? "Checking…" : "Apply"}
                </button>
              </div>
            )}
            {couponError && <p className="checkout-note checkout-error" role="alert">{couponError}</p>}
          </div>

          <div className="policy-box">
            <div className="policy-box-head"><Icon name="shield" /> No Refund Policy</div>
            <p>Course fees are non-refundable once payment is completed. Please be sure of your choice before paying.</p>
            <label className="policy-check">
              <input type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} />
              <span>
                I have read and agree to the <a href="#/refund-policy" target="_blank" rel="noreferrer">No Refund Policy</a> and understand that this payment is non-refundable.
              </span>
            </label>
          </div>

          {status === "error" && <p className="checkout-note checkout-error" role="alert">{message}</p>}

          <button className="button button-primary pay-button" type="button" onClick={pay} disabled={!canPay || status === "loading"}>
            {status === "loading" ? "Opening secure payment…" : `Pay ${formatINR(amount)} securely`} <Icon name="arrow" />
          </button>
          <p className="secure-note"><Icon name="shield" /> Payments are processed by Razorpay. UPI, cards, netbanking and wallets accepted. ZecurX never sees your card details.</p>
        </section>

        <aside className="order-summary" aria-label="Order summary">
          <span className="section-kicker">Order summary</span>
          <div className="order-course">
            <img src={course.logo} alt="" />
            <div>
              <b>{course.title}</b>
              <small>{course.code} · {course.duration} · {course.level}</small>
            </div>
          </div>
          <dl className="order-lines">
            {original > listPrice && <div><dt>Course price</dt><dd>{formatINR(original)}</dd></div>}
            {saving > 0 && <div className="order-saving"><dt>Discount ({savingPercent}% off)</dt><dd>− {formatINR(saving)}</dd></div>}
            {couponDiscount > 0 && <div className="order-saving"><dt>Coupon {coupon?.code}</dt><dd>− {formatINR(couponDiscount)}</dd></div>}
            <div className="order-total"><dt>Total payable</dt><dd>{formatINR(amount)}</dd></div>
          </dl>
          <ul className="order-assure">
            <li><Icon name="check" /> Certification program by ZecurX</li>
            <li><Icon name="check" /> Hands-on labs and project-based learning</li>
            <li><Icon name="check" /> Secure payment via Razorpay</li>
          </ul>
        </aside>
      </div>
    </section>
  );
}

function RefundPolicyPage() {
  const sections = [
    { title: "1. No refunds", body: "All payments made for ZecurX certification courses, training programs and related services are final and non-refundable. Once a payment is completed and your enrollment is confirmed, we do not offer refunds, partial refunds, credits or transfers to another course or person." },
    { title: "2. Why we have this policy", body: "Course seats, instructor time, lab environments and learning materials are reserved for you as soon as you enroll. Because these cannot be returned or resold, enrollment fees cannot be reversed." },
    { title: "3. Before you pay", body: "Please review the course overview, duration, skills, tools and pricing carefully before making a payment. You must tick the acceptance box at checkout to confirm that you have read and agreed to this policy." },
    { title: "4. Failed, duplicate or incorrect charges", body: "If money is debited from your account but you do not receive an enrollment confirmation, or if you are charged more than once for the same course, contact us with your Payment ID. Verified duplicate or failed transactions are reversed to the original payment method. Banks and payment providers typically take 5 to 7 working days to show the reversal." },
    { title: "5. Contact us", body: "For payment issues or questions about this policy, please reach out through the ZecurX website and include your name, email and Payment ID." },
  ];

  return (
    <article className="course-detail policy-page">
      <a className="detail-back" href="#courses"><Icon name="arrow" /> Back to courses</a>
      <header className="policy-hero">
        <span className="section-kicker">Legal</span>
        <h1>No Refund Policy</h1>
        <p>Last updated: 14 November 2026</p>
      </header>
      <div className="policy-notice"><Icon name="shield" /> <b>All course fees are non-refundable.</b> Please read this policy before you pay.</div>
      <section className="detail-section policy-body">
        {sections.map((section) => (
          <div key={section.title}>
            <h2>{section.title}</h2>
            <p>{section.body}</p>
          </div>
        ))}
        <a className="button button-primary" href="https://www.zecurx.com" target="_blank" rel="noreferrer">Contact ZecurX <Icon name="arrow" /></a>
      </section>
    </article>
  );
}

function DetailNav() {
  const items = [
    { id: "ov-overview", label: "Overview" },
    { id: "ov-curriculum", label: "Curriculum" },
    { id: "ov-outcomes", label: "Outcomes" },
    { id: "ov-skills", label: "Skills & tools" },
    { id: "ov-careers", label: "Careers" },
    { id: "ov-faq", label: "FAQ" },
    { id: "ov-reviews", label: "Reviews" },
    { id: "payment", label: "Enroll" },
  ];
  return (
    <nav className="detail-nav" aria-label="Course sections">
      {items.map((item) => (
        <button key={item.id} type="button" onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth", block: "start" })}>
          {item.label}
        </button>
      ))}
    </nav>
  );
}

function CourseOverviewSections({ course }: { course: (typeof courses)[number] }) {
  const overview = courseOverviews[course.code];
  if (!overview) return null;
  return (
    <>
      <div className="detail-stats">
        <div><Icon name="clock" /><b>{course.duration}</b><small>Duration</small></div>
        <div><Icon name="users" /><b>{course.level}</b><small>Level</small></div>
        <div><Icon name="award" /><b>{course.skills.length} skills</b><small>You will build</small></div>
        <div><Icon name="terminal" /><b>{course.tools.length} tools</b><small>You will use</small></div>
      </div>

      <DetailNav />

      <section className="detail-section" id="ov-overview">
        <span className="section-kicker">Course overview</span>
        <h2 className="overview-tagline">{overview.tagline}</h2>
        <p className="overview-summary">{overview.summary}</p>
        <h3 className="overview-sub">What makes this course unique</h3>
        <div className="unique-grid">
          {overview.unique.map((item) => (
            <div className="unique-card" key={item.title}>
              <span><Icon name="check" /></span>
              <b>{item.title}</b>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="detail-section" id="ov-curriculum">
        <span className="section-kicker">Course content</span>
        <h2 className="overview-sub-main">What you'll learn</h2>
        <p className="curriculum-note">{overview.modules.length} modules. Open a module to see the topics it covers.</p>
        <div className="module-list">
          {overview.modules.map((module, index) => (
            <details className="module" key={module.title} open={index === 0}>
              <summary>
                <span className="module-number">{String(index + 1).padStart(2, "0")}</span>
                <b>{module.title}</b>
                <Icon name="chevron" />
              </summary>
              <ul>
                {module.topics.map((topic) => <li key={topic}><Icon name="check" /> {topic}</li>)}
              </ul>
            </details>
          ))}
        </div>
      </section>

      <section className="detail-section" id="ov-included">
        <span className="section-kicker">What's included</span>
        <h2 className="overview-sub-main">Everything in this program</h2>
        <ul className="outcome-list">
          <li><Icon name="clock" /> {course.duration === "Coming Soon" || course.duration === "Custom" ? "Duration shared by ZecurX or your institution" : `${course.duration} of structured training`}</li>
          <li><Icon name="terminal" /> Hands-on labs and project-based practice</li>
          <li><Icon name="layers" /> Training on {course.tools.length} industry tools, including {course.tools.slice(0, 3).join(", ")}</li>
          <li><Icon name="award" /> ZecurX certificate with a unique certificate ID on completion</li>
          <li><Icon name="users" /> {course.level} level, with prerequisites listed below</li>
          <li><Icon name="briefcase" /> Career-focused outcomes and role guidance</li>
        </ul>
      </section>

      <section className="detail-section" id="ov-outcomes">
        <span className="section-kicker">Learning outcomes</span>
        <h2 className="overview-sub-main">By the end of this course you will be able to</h2>
        <ul className="outcome-list">
          {overview.outcomes.map((item) => <li key={item}><Icon name="check" /> {item}</li>)}
        </ul>
      </section>

      <section className="detail-section" id="ov-careers">
        <div className="detail-columns three">
          <div>
            <h2><Icon name="users" /> Who this is for</h2>
            <ul className="plain-list">{overview.audience.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div>
            <h2><Icon name="layers" /> Before you start</h2>
            <ul className="plain-list">{overview.prerequisites.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div>
            <h2><Icon name="briefcase" /> Career opportunities</h2>
            <ul className="plain-list">{overview.roles.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </div>
      </section>
    </>
  );
}

function CourseFaq({ course }: { course: (typeof courses)[number] }) {
  const payable = typeof course.amount === "number";
  const faqs = [
    {
      q: "How do I enroll?",
      a: payable
        ? "Select Enroll now, enter your details on the payment page, accept the No Refund Policy and pay securely online."
        : course.price === "Institution Only"
          ? "This program is delivered through partner institutions. Contact ZecurX or your institution to join a batch."
          : "Pricing is shared on request. Use the Enquire button and the ZecurX team will get back to you.",
    },
    { q: "How long is the course?", a: `Duration: ${course.duration}. Level: ${course.level}.` },
    ...(payable ? [{ q: "Which payment methods can I use?", a: "Payments are handled by Razorpay. Depending on what is enabled, you can pay with UPI, cards, netbanking or wallets. ZecurX never sees your card details." }] : []),
    { q: "Can I get a refund?", a: "No. All course fees are non-refundable once payment is completed. Please read the No Refund Policy before you pay. If you are charged twice or money is debited without an enrollment, contact us with your Payment ID." },
    { q: "Will I receive a certificate?", a: "Learners who complete the course receive a ZecurX certificate with a unique certificate ID." },
    { q: "Who can write a review?", a: "Only learners who completed this course and received their certificate. They verify with their certificate ID and email, so every review comes from a real learner." },
  ];
  return (
    <section className="detail-section" id="ov-faq">
      <span className="section-kicker">FAQ</span>
      <h2 className="overview-sub-main">Frequently asked questions</h2>
      <div className="module-list faq-list">
        {faqs.map((item) => (
          <details className="module faq" key={item.q}>
            <summary><b>{item.q}</b><Icon name="chevron" /></summary>
            <p>{item.a}{item.q === "Can I get a refund?" && <> <a href="#/refund-policy">Read the policy</a>.</>}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function CourseDetail({
  course,
  reviews,
  stats,
  focusPayment,
  onBack,
}: {
  course: (typeof courses)[number];
  reviews: Review[];
  stats?: ReviewStats;
  focusPayment: boolean;
  onBack: () => void;
}) {
  useEffect(() => {
    if (!focusPayment) return;
    const timer = window.setTimeout(() => document.getElementById("payment")?.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
    return () => window.clearTimeout(timer);
  }, [focusPayment, course.code]);

  const visibleReviews = reviews.slice(0, MAX_VISIBLE_REVIEWS);
  const totalReviews = stats?.count ?? visibleReviews.length;
  const average = stats?.average ?? (visibleReviews.length ? visibleReviews.reduce((sum, review) => sum + review.rating, 0) / visibleReviews.length : 0);
  const distribution = [5, 4, 3, 2, 1].map((stars, index) => ({
    stars,
    count: stats?.distribution[index] ?? visibleReviews.filter((review) => review.rating === stars).length,
  }));

  return (
    <article className="course-detail">
      <button className="detail-back" type="button" onClick={onBack}>
        <Icon name="arrow" /> Back to Courses
      </button>

      <header className="detail-hero">
        <img className="detail-logo" src={course.logo} alt={`${course.code} certification logo`} />
        <div>
          <span className="section-kicker">{course.code}</span>
          <h1>{course.title}</h1>
          <p className="detail-lead">{course.description}</p>
          <div className="detail-meta">
            <Stars value={average} />
            <span>{totalReviews ? `${average.toFixed(1)} (${totalReviews} ratings)` : "No ratings yet"}</span>
            <span><Icon name="users" /> {course.level}</span>
            <span><Icon name="clock" /> {course.duration}</span>
          </div>
          <div className="detail-cta-row">
            <strong className="detail-price">
              {course.price}
              {course.originalPrice && <del>{course.originalPrice}</del>}
            </strong>
            <a className="button button-primary" href={typeof course.amount === "number" ? `#/checkout/${course.code}` : course.url} {...(typeof course.amount === "number" ? {} : { target: "_blank", rel: "noreferrer" })}>
              {typeof course.amount === "number" ? "Enroll now" : "Enquire"} <Icon name="arrow" />
            </a>
          </div>
        </div>
      </header>

      <CourseOverviewSections course={course} />

      <section className="detail-section" id="ov-skills">
        <div className="detail-columns">
          <div>
            <h2><Icon name="award" /> Skills you'll gain</h2>
            <div className="detail-chips">
              {course.skills.map((skill) => <span key={skill}><Icon name="check" /> {skill}</span>)}
            </div>
          </div>
          <div>
            <h2><Icon name="layers" /> Tools you'll learn</h2>
            <div className="detail-chips tools">
              {course.tools.map((tool) => <span key={tool}>{tool}</span>)}
            </div>
          </div>
        </div>
      </section>

      <CourseFaq course={course} />

      <section className="detail-section" id="ov-reviews" aria-labelledby="reviews-heading">
        <h2 id="reviews-heading" className="reviews-heading">Ratings &amp; comments</h2>
        <div className="rating-layout">
          <aside className="rating-summary">
            <b>{average.toFixed(1)}</b>
            <Stars value={average} size={19} />
            <span>{totalReviews} ratings</span>
            <div className="rating-bars">
              {distribution.map(({ stars, count }) => (
                <div className="rating-bar" key={stars}>
                  <span>{stars} <Icon name="star" /></span>
                  <i><em style={{ width: `${totalReviews ? (count / totalReviews) * 100 : 0}%` }} /></i>
                  <small>{count}</small>
                </div>
              ))}
            </div>
          </aside>

          <div className="review-thread">
            <ReviewForm courseCode={course.code} />
            {visibleReviews.length === 0 && <p className="review-empty">No reviews yet. Reviews appear here once certified learners share their experience and ZecurX approves them.</p>}
            {totalReviews > MAX_VISIBLE_REVIEWS && <p className="review-empty">Showing the latest {MAX_VISIBLE_REVIEWS} of {totalReviews} reviews.</p>}
            <ul className="review-list">
              {visibleReviews.map((review, index) => (
                <li className="review-item" key={`${review.name}-${index}`}>
                  <div className="review-head">
                    <span className="review-avatar">{review.name.trim().charAt(0).toUpperCase()}</span>
                    <div>
                      <b>{review.name}</b>
                      <small>{review.role} · {review.date}</small>
                    </div>
                    <Stars value={review.rating} />
                  </div>
                  <p>{review.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {typeof course.amount === "number" ? <PaymentSection course={course} key={course.code} /> : <EnrollCard course={course} />}

      <div className="detail-footer-nav">
        <button className="detail-back" type="button" onClick={onBack}>
          <Icon name="arrow" /> Back to Courses
        </button>
      </div>
    </article>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [academyOpen, setAcademyOpen] = useState(false);
  const [recommendedCourse, setRecommendedCourse] = useState<string | null>(null);
  const [expandedFeature, setExpandedFeature] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [route, setRoute] = useState<Route>(parseRoute);
  const [catalogCourses, setCatalogCourses] = useState(courses);
  const [reviewsByCourse, setReviewsByCourse] = useState<Record<string, Review[]>>({});
  const [statsByCourse, setStatsByCourse] = useState<Record<string, ReviewStats>>({});

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const updateScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      document.documentElement.style.setProperty("--scroll-progress", `${height > 0 ? (window.scrollY / height) * 100 : 0}%`);
      setScrolled(window.scrollY > 20);
    };
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((element) => {
      if (prefersReducedMotion) {
        element.classList.add("is-visible");
      } else {
        observer.observe(element);
      }
    });
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateScroll);
      observer.disconnect();
    };
  }, []);

  const choosePath = (code: string) => {
    setRecommendedCourse(code);
    window.setTimeout(() => document.querySelector(`[data-course="${code}"]`)?.scrollIntoView({ behavior: "smooth", block: "center" }), 180);
  };

  const routeCourse = catalogCourses.find((course) => course.code === route.code);

  // The database supplies catalogue copy only. Prices and checkout remain in the existing
  // payment implementation and are deliberately not overwritten by this endpoint.
  useEffect(() => {
    let active = true;
    fetch("/api/academy-courses")
      .then((response) => (response.ok ? response.json() : null))
      .then((payload: { courses?: AcademyCourseRecord[] } | null) => {
        if (!active || !Array.isArray(payload?.courses)) return;
        const records = new Map(
          payload.courses
            .map((record) => [record.courseCode || record.code || "", record] as const)
            .filter(([code]) => Boolean(code)),
        );
        setCatalogCourses(courses.map((course) => {
          const record = records.get(course.code);
          if (!record) return course;
          return {
            ...course,
            title: record.title || course.title,
            description: record.shortDescription || record.description || course.description,
            level: record.level || course.level,
            duration: record.duration ? String(record.duration) : course.duration,
          };
        }));
      })
      .catch(() => undefined);
    return () => { active = false; };
  }, []);

  // Verified reviews come from the backend (only certificate holders can post).
  useEffect(() => {
    fetch("/api/reviews")
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (data?.reviews) setReviewsByCourse(data.reviews);
        if (data?.stats) setStatsByCourse(data.stats);
      })
      .catch(() => undefined);
  }, []);

  // Every page has its own URL (#/course/<code>, #/checkout/<code>, #/refund-policy). Back/forward works.
  useEffect(() => {
    const onHashChange = () => {
      const next = parseRoute();
      setRoute(next);
      if (next.view === "checkout") {
        // Same course already open: the page scrolls to the payment section itself.
      } else if (next.view !== "home") {
        window.scrollTo({ top: 0 });
      } else if (window.location.hash.length > 1) {
        const id = window.location.hash.slice(1);
        window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 80);
      }
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const openCourse = (code: string) => {
    window.location.hash = `/course/${code}`;
  };

  const closeCourse = () => {
    window.location.hash = "courses";
  };

  return (
    <div className="site-shell">
      <div className="scroll-progress" />
      <header className={`site-header ${scrolled ? "header-scrolled" : ""}`}>
        <nav className="nav-wrap" aria-label="Main navigation">
          <Logo />
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" aria-expanded={menuOpen}>
            <Icon name={menuOpen ? "x" : "menu"} />
          </button>
          <div className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
            <a href="#why">Why ZecurX</a>
            <div className="nav-dropdown" onMouseEnter={() => setAcademyOpen(true)} onMouseLeave={() => setAcademyOpen(false)}>
              <button onClick={() => setAcademyOpen(!academyOpen)} aria-expanded={academyOpen}>
                Certification Courses <Icon name="chevron" />
              </button>
              <div className={`academy-menu ${academyOpen ? "academy-open" : ""}`}>
                <a href="#courses" onClick={() => setMenuOpen(false)}>
                  <span className="menu-icon"><Icon name="award" /></span>
                  <span><b>Certified Courses</b><small>Career-ready certification programs</small></span>
                </a>
                <a href="#colloquium" onClick={() => setMenuOpen(false)}>
                  <span className="menu-icon"><Icon name="users" /></span>
                  <span><b>Colloquium</b><small>Expert talks, ideas, and discussions</small></span>
                </a>
              </div>
            </div>
            <a href="#courses">Programs</a>
            <a href="#resources">Resources</a>
          </div>
          <a className="nav-cta" href="#pathfinder">Find your course <Icon name="arrow" /></a>
        </nav>
      </header>

      <main>
        {route.view === "refund" ? (
          <RefundPolicyPage />
        ) : route.view !== "home" && routeCourse ? (
          <CourseDetail
            course={routeCourse}
            focusPayment={route.view === "checkout"}
            reviews={reviewsByCourse[routeCourse.code] ?? []}
            stats={statsByCourse[routeCourse.code]}
            onBack={closeCourse}
          />
        ) : (
        <>
        <section className="hero">
          <div className="hero-glow glow-one" />
          <div className="hero-glow glow-two" />
          <div className="hero-inner">
            <div className="hero-copy hero-enter">
              <div className="eyebrow"><span /> ZecurX Certifications</div>
              <h1>
                <span className="hero-line">Your Cyber Era</span>
                <em className="hero-line">Starts Here.</em>
              </h1>
              <p className="hero-lead">Learn to identify threats, protect digital assets, and think one step ahead.</p>
              <p className="hero-support">Build practical skills through expert-led learning, live attack labs, and certifications that carry weight beyond the classroom.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#courses">Explore programs <Icon name="arrow" /></a>
                <a className="button button-secondary" href="#pathfinder">Find your course</a>
              </div>
              <div className="learner-note">
                <span className="avatar-stack"><i>LAB</i><i>AI</i><i>3D</i></span>
                <span><b>Practice-first learning</b><small>built for emerging security professionals</small></span>
              </div>
            </div>
            <div className="hero-visual visual-enter"><HeroVisual /></div>
          </div>

          <div className="proof-grid" id="why">
            {proofPoints.map((item, index) => (
              <article className="proof-item reveal" key={item.title} style={{ transitionDelay: `${index * 80}ms` }}>
                <span className="proof-icon"><Icon name={item.icon} /></span>
                <span><h2>{item.title}</h2><p>{item.text}</p></span>
              </article>
            ))}
          </div>
        </section>

        <section className="trainer-section" aria-labelledby="trainer-heading">
          <div className="trainer-intro reveal">
            <span className="section-kicker">Learn from experience</span>
            <h2 id="trainer-heading">Meet your trainer.</h2>
            <p>Expert guidance, practical methodology, and the perspective needed to think like a security professional.</p>
          </div>
          <article className="trainer-card reveal">
            <div className="trainer-circuit circuit-one" />
            <div className="trainer-circuit circuit-two" />
            <div className="trainer-photo-wrap">
              <img
                src="/assets/trainer-profile.png"
                alt="Harsh Priyam, ZecurX Certifications and Academy cybersecurity trainer"
                className="trainer-photo"
              />
              <span className="trainer-verified"><Icon name="shield" /> Verified trainer</span>
            </div>
            <div className="trainer-details">
              <div className="trainer-label"><span /> ZecurX Certifications and Academy Faculty</div>
              <h3>Harsh Priyam</h3>
              <p className="trainer-designation">Certified Ethical Hacker &amp; Certified Penetration Tester</p>
              <div className="trainer-rule" />
              <p className="trainer-summary">
                Learn cybersecurity through a practitioner-led approach focused on ethical methodology,
                real attack scenarios, and the disciplined thinking required to protect modern systems.
              </p>
              <div className="trainer-expertise" aria-label="Training expertise">
                <span><Icon name="terminal" /> Ethical Hacking</span>
                <span><Icon name="shield" /> Penetration Testing</span>
                <span><Icon name="code" /> Live Lab Mentorship</span>
              </div>
              <blockquote>
                “The strongest security professionals don’t just know the tools—they understand how an attacker thinks.”
              </blockquote>
            </div>
          </article>
        </section>

        <section className="pathfinder reveal" id="pathfinder">
          <div>
            <span className="section-kicker">Not sure where to start?</span>
            <h2>Find the program that fits your ambition.</h2>
          </div>
          <div className="path-options">
            <button className={recommendedCourse === "zxCPEH" ? "selected-path" : ""} onClick={() => choosePath("zxCPEH")}><span>01</span><b>I’m starting in security</b><small>Build a practical foundation</small><Icon name="arrow" /></button>
            <button className={recommendedCourse === "zxCPPT" ? "selected-path" : ""} onClick={() => choosePath("zxCPPT")}><span>02</span><b>I want to go offensive</b><small>Master ethical hacking</small><Icon name="arrow" /></button>
            <button className={recommendedCourse === "zxGAIP" ? "selected-path" : ""} onClick={() => choosePath("zxGAIP")}><span>03</span><b>I’m exploring AI security</b><small>Work at the new frontier</small><Icon name="arrow" /></button>
          </div>
        </section>

        <GlobalThreatMap />


        <section className="courses-section" id="courses">
          <div className="section-heading reveal">
            <div>
              <span className="section-kicker">Certified courses</span>
              <h2>Choose your certification path.</h2>
            </div>
            <p>Focused programs designed around the skills security teams actually use—guided by practitioners, proven in live environments.</p>
          </div>
          <div className="course-grid">
            {catalogCourses.map((course, index) => (
              <div
                className={`course-card reveal course-card-click ${recommendedCourse === course.code ? "recommended" : ""}`}
                key={course.code}
                data-course={course.code}
                role="button"
                tabIndex={0}
                aria-label={`View ${course.title} course details, ratings, and comments`}
                style={{ transitionDelay: `${index * 90}ms` }}
                onClick={() => openCourse(course.code)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openCourse(course.code);
                  }
                }}
                onMouseMove={(event) => {
                  const bounds = event.currentTarget.getBoundingClientRect();
                  event.currentTarget.style.setProperty("--tilt-x", `${((event.clientY - bounds.top) / bounds.height - 0.5) * -3}deg`);
                  event.currentTarget.style.setProperty("--tilt-y", `${((event.clientX - bounds.left) / bounds.width - 0.5) * 3}deg`);
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.setProperty("--tilt-x", "0deg");
                  event.currentTarget.style.setProperty("--tilt-y", "0deg");
                }}
              >
                <div className="course-top">
                  <img className="course-logo" src={course.logo} alt={`${course.code} certification logo`} />
                  {recommendedCourse === course.code ? <span className="match-badge"><Icon name="check" /> Your match</span> : index === 1 && <span className="popular">Most popular</span>}
                </div>
                <span className="course-code">{course.code}</span>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <div className="course-price">
                  <strong>{course.price}</strong>
                  {course.originalPrice && <del>{course.originalPrice}</del>}
                </div>
                {(() => {
                  const list = reviewsByCourse[course.code] ?? [];
                  const avg = list.length ? list.reduce((s, r) => s + r.rating, 0) / list.length : 0;
                  return (
                    <div className="card-rating">
                      {list.length ? <><b>{avg.toFixed(1)}</b><Stars value={avg} /><small>({list.length} ratings)</small></> : <small>No ratings yet</small>}
                    </div>
                  );
                })()}
                <div className="course-meta">
                  <span><Icon name="clock" /> {course.duration}</span>
                  <span><Icon name="users" /> {course.level}</span>
                </div>
                <div className="course-block">
                  <small>Skills you’ll gain</small>
                  <div className="skill-list">
                    {course.skills.map((skill) => <span key={skill}><Icon name="check" /> {skill}</span>)}
                  </div>
                </div>
                <div className="course-block">
                  <small>Tools you’ll learn</small>
                  <div className="tool-list">
                    {course.tools.map((tool) => <span key={tool}>{tool}</span>)}
                  </div>
                </div>
                <span className="course-card-link">
                  View course <Icon name="arrow" />
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="apart-section" id="colloquium">
          <div className="section-heading reveal">
            <div>
              <span className="section-kicker">Why ZecurX</span>
              <h2>What sets us apart.</h2>
            </div>
            <p>We don’t just teach theory. Every program is built around practical, job-ready skills.</p>
          </div>
          <div className="apart-experience">
            <div className="apart-selector" aria-label="ZecurX platform capabilities">
              {differentiators.map((item, index) => (
                <button
                  className={`feature-tab ${expandedFeature === index ? "feature-selected" : ""}`}
                  type="button"
                  aria-pressed={expandedFeature === index}
                  key={item.title}
                  onClick={() => setExpandedFeature(index)}
                >
                  <span className="feature-icon"><Icon name={item.icon} /></span>
                  <span className="feature-tab-copy">
                    <small>{item.status}</small>
                    <strong>{item.title}</strong>
                  </span>
                  <Icon name="chevron" className="feature-tab-arrow" />
                </button>
              ))}
            </div>
            <aside className="feature-panel" aria-live="polite" aria-atomic="true">
              <div className="feature-panel-copy" key={expandedFeature}>
                <span className="feature-panel-icon"><Icon name={differentiators[expandedFeature].icon} /></span>
                <span className="feature-status">{differentiators[expandedFeature].status}</span>
                <h3>{differentiators[expandedFeature].title}</h3>
                <p>{differentiators[expandedFeature].text}</p>
                <span className="detail-label">How it is intended to work</span>
                <ul>
                  {differentiators[expandedFeature].details.map((detail) => (
                    <li key={detail}><Icon name="check" />{detail}</li>
                  ))}
                </ul>
              </div>
              <div className="feature-mini-visual" aria-hidden="true">
                <span className="mini-shield"><Icon name="shield" /></span>
                <i /><i /><i />
              </div>
            </aside>
          </div>
        </section>

        <section className="team-cta reveal">
          <div className="team-pattern" />
          <span className="section-kicker">ZecurX for teams</span>
          <h2>Turn your team into your strongest <em>security layer.</em></h2>
          <p>Custom corporate training with bulk pricing, dedicated support, and flexible scheduling—built around your organization’s real risks.</p>
          <div>
            <a className="button button-primary" href="https://www.zecurx.com/contact" target="_blank" rel="noreferrer">Build a team program <Icon name="arrow" /></a>
            <a className="button button-secondary" href="https://www.zecurx.com/contact" target="_blank" rel="noreferrer">Talk to our certifications team</a>
          </div>
        </section>

        <section className="partners-section">
          <div className="partners-title reveal">
            <span>Trusted by</span> partners who invest in future-ready talent
          </div>
          <div className="partner-marquee" aria-label="Trusted partners">
            <div className="partner-track">
              {[...partners, ...partners].map((partner, index) => (
                <a
                  className="partner-card"
                  href={partner.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Visit ${partner.name} official website`}
                  key={`${partner.name}-${index}`}
                >
                  <img src={partner.image} alt={partner.name} />
                  <span>{partner.name}</span>
                </a>
              ))}
            </div>
          </div>
        </section>
        </>
        )}
      </main>

      <footer id="resources">
        <Logo />
        <p>Practical education for the people protecting what matters.</p>
        <nav className="footer-links" aria-label="Footer">
          <a href="#courses">Courses</a>
          <a href="#/refund-policy">No Refund Policy</a>
        </nav>
        <span>© 2026 ZecurX Certifications and Academy</span>
      </footer>
    </div>
  );
}

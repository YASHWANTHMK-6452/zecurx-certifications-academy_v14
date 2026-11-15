// Server-side source of truth for what each course costs (in INR rupees).
// Never trust an amount sent from the browser. Keep in sync with `courses` in src/App.tsx.
export const coursePricesInr: Record<string, { title: string; amount: number }> = {
  zxCPEH: { title: "Certified Professional Ethical Hacker", amount: 29999 },
  zxCPPT: { title: "Certified Professional Pen Tester", amount: 35999 },
  zxGAIP: { title: "Generative AI Professional", amount: 29999 },
};

// Every course code on the site (including institution-only ones that have no online price).
export const courseCodes = ["zxCPEH", "zxCPPT", "zxGAIP", "zxCFD", "zxCCF", "zxCCE", "zxCCP"];

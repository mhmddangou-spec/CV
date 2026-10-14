export interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  city: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  city: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  level: string; // "Débutant", "Intermédiaire", "Avancé", "Expert"
}

export interface LanguageItem {
  id: string;
  name: string;
  level: string; // "Basique", "Intermédiaire", "Courant", "Bilingue"
}

export interface ResumeData {
  personalInfo: {
    firstName: string;
    lastName: string;
    jobTitle: string;
    email: string;
    phone: string;
    city: string;
    country: string;
    address: string;
    linkedin: string;
    github: string;
    portfolio: string;
    summary: string;
  };
  experiences: Experience[];
  educations: Education[];
  skills: Skill[];
  languages: LanguageItem[];
  theme: {
    color: string;
    font: string;
  };
  template: 'modern' | 'classic' | 'minimalist' | 'creative' | 'ats' | 'premium';
}

export const initialResumeData: ResumeData = {
  personalInfo: {
    firstName: "Aminata",
    lastName: "Diallo",
    jobTitle: "Lead Product Manager & Tech Strategist",
    email: "aminata.diallo@email.com",
    phone: "+225 07 12 34 56 78",
    city: "Abidjan",
    country: "Côte d'Ivoire",
    address: "Plateau, Abidjan",
    linkedin: "linkedin.com/in/aminata-diallo",
    github: "github.com/aminatadiallo",
    portfolio: "aminatadiallo.io",
    summary: "Product Manager senior avec plus de 6 ans d'expérience dans la conception, le lancement et la mise à l'échelle de produits digitaux à fort impact en Afrique et à l'international. Experte en méthodologies agiles, stratégie produit et optimisation de l'expérience utilisateur."
  },
  experiences: [
    {
      id: "1",
      jobTitle: "Lead Product Manager",
      company: "FinTech Africa Group",
      city: "Abidjan",
      startDate: "2022",
      endDate: "Présent",
      current: true,
      description: "• Direction de la roadmap produit pour l'application de paiement mobile (plus de 2 millions d'utilisateurs actifs).\n• Refonte complète de l'UX/UI ayant conduit à une augmentation de 35% du taux de conversion.\n• Management d'une équipe pluridisciplinaire de 12 personnes."
    }
  ],
  educations: [
    {
      id: "1",
      degree: "Master en Management des Systèmes d'Information",
      school: "HEC Paris / École Polytechnique",
      city: "Paris",
      startDate: "2017",
      endDate: "2019",
      description: "Spécialisation en stratégie digitale, innovation et gestion de projets complexes."
    }
  ],
  skills: [
    { id: "1", name: "Product Strategy", level: "Expert" },
    { id: "2", name: "Agile / Scrum", level: "Expert" },
    { id: "3", name: "UX / UI Design", level: "Avancé" },
    { id: "4", name: "Data Analytics", level: "Avancé" }
  ],
  languages: [
    { id: "1", name: "Français", level: "Bilingue / Maternel" },
    { id: "2", name: "Anglais", level: "Professionnel / Courant" }
  ],
  theme: {
    color: "#2563eb",
    font: "inter"
  },
  template: "modern"
};

export type SiteConfig = {
  projectSlug: string;
  siteTitle: string;
  description: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  logo: string;
  favicon: string;
  heroImage: string;
  phone: string;
  whatsapp?: string;
  address: string;
  instagram?: string;
  facebook?: string;
  menuSections: Array<{ key: string; title: string }>;
};

export const site: SiteConfig = {
  projectSlug: "template",
  siteTitle: "Nombre del Restaurante",
  description: "Descripción corta del sitio.",
  primaryColor: "#C0392B",
  secondaryColor: "#1F2937",
  accentColor: "#F59E0B",
  logo: "public/Brands/Template/logo.png",
  favicon: "public/Brands/Template/favicon.png",
  heroImage: "public/Brands/Template/hero.png",
  phone: "+54 9 11 1234-5678",
  address: "Dirección, Ciudad",
  instagram: "",
  facebook: "",
  menuSections: [
    { key: "entradas", title: "Entradas" },
    { key: "parrilla", title: "Parrilla" },
    { key: "postres",  title: "Postres" }
  ]
};

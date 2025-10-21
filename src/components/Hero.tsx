import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { site } from "@/lib/site";

interface HeroProps {
  nombre: string;
  tagline: string;
  imagenUrl?: string;
}

export const Hero = ({ nombre, tagline, imagenUrl }: HeroProps) => {
  const bg = imagenUrl || site.heroImage;

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 text-center px-4 animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">
          {nombre}
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-2xl mx-auto">
          {tagline}
        </p>
        <Link to="/menu">
          <Button
            size="lg"
            className="text-lg px-8 py-6 text-white"
            style={{ background: "var(--color-accent)" }}
          >
            Ver menú
          </Button>
        </Link>
      </div>
    </section>
  );
};

import { site } from "@/lib/site";

export const AboutSection = () => {
  return (
    <section className="py-20 px-4" style={{ background: "var(--color-secondary)", color: "#fff" }}>
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-bold text-center mb-12">Sobre Nosotros</h2>
        <div className="grid md:grid-cols-2 gap-8 opacity-95">
          <div>
            <p className="mb-4 leading-relaxed">
              {site.description || "Disfrutá una experiencia auténtica con recetas tradicionales y productos de primera calidad."}
            </p>
            <p className="leading-relaxed">
              Nuestro equipo combina técnicas clásicas con una visión moderna para ofrecer platos con identidad propia.
            </p>
          </div>
          <div>
            <p className="mb-4 leading-relaxed">
              Creemos en la estacionalidad, el respeto por el producto y la calidez en el servicio. Te esperamos.
            </p>
            <p className="leading-relaxed">
              Hacé tu reserva y vení a probar una selección pensada para compartir.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

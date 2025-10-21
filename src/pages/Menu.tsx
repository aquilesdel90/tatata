import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { MenuSection } from "@/components/MenuSection";
import { Footer } from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface Cliente {
  id: string;
  slug: string;
  nombre_restaurante: string;
  tagline: string | null;
  url_imagen_hero: string | null;
  color_primario: string | null;
}

const Menu = () => {
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [loading, setLoading] = useState(true);

  // Determinar el slug
  const resolvedSlug = import.meta.env.VITE_RESTAURANT_SLUG || 
    window.location.hostname.split('.')[0] || 
    site.projectSlug;

  useEffect(() => {
    const fetchCliente = async () => {
      const { data } = await supabase
        .from("clientes")
        .select("*")
        .eq("slug", resolvedSlug)
        .single();

      if (data) setCliente(data);
      setLoading(false);
    };

    fetchCliente();
  }, [resolvedSlug]);

  const nombre = cliente?.nombre_restaurante || site.siteTitle;

  useEffect(() => {
    document.title = `Menú - ${nombre}`;
  }, [nombre]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Menú - {nombre}</title>
        <meta name="description" content={`Descubre nuestra deliciosa carta en ${nombre}`} />
      </Helmet>

      <div className="min-h-screen" style={{ background: "var(--color-secondary)" }}>
        {/* Header con botón de regreso */}
        <header className="py-6 px-4">
          <div className="container mx-auto max-w-6xl">
            <Link to="/">
              <Button variant="ghost" className="text-white hover:bg-white/10">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver
              </Button>
            </Link>
          </div>
        </header>

        {/* Sección del menú */}
        {cliente?.id ? (
          <MenuSection clienteId={cliente.id} />
        ) : (
          <div className="py-20 text-center text-white">
            <p>Cargando menú...</p>
          </div>
        )}

        <Footer />
      </div>
    </>
  );
};

export default Menu;

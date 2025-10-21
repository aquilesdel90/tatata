import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import locationDowntown from "@/assets/location-downtown.jpg";
import locationWaterfront from "@/assets/location-waterfront.jpg";
import locationHistoric from "@/assets/location-historic.jpg";
import locationGarden from "@/assets/location-garden.jpg";

interface Ubicacion {
  id: string;
  nombre: string;
  url_imagen: string | null;
  orden: number;
}

const defaultImages = [locationDowntown, locationWaterfront, locationHistoric, locationGarden];

export const LocationsGallery = ({ clienteId }: { clienteId: string }) => {
  const [ubicaciones, setUbicaciones] = useState<Ubicacion[]>([]);

  useEffect(() => {
    const fetchUbicaciones = async () => {
      const { data } = await supabase
        .from("ubicaciones")
        .select("*")
        .eq("cliente_id", clienteId)
        .order("orden");

      if (data) setUbicaciones(data);
    };

    fetchUbicaciones();
  }, [clienteId]);

  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
          Nuestras Ubicaciones
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ubicaciones.map((ubicacion, index) => (
            <div
              key={ubicacion.id}
              className="group relative overflow-hidden rounded-lg aspect-[4/3] hover:scale-105 transition-transform duration-300"
            >
              <img
                src={ubicacion.url_imagen || defaultImages[index % defaultImages.length]}
                alt={ubicacion.nombre}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
                <p className="text-white font-semibold text-lg p-4 w-full">
                  {ubicacion.nombre}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

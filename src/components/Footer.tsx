import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react";
import { site } from "@/lib/site";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="py-12 px-4 border-t border-border" style={{ background: "var(--color-secondary)", color: "#fff" }}>
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Contacto</h3>
            <div className="space-y-3 opacity-90">
              {site.address && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>{site.address}</span>
                </div>
              )}
              {site.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  <span>{site.phone}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                <span>info@{(site.projectSlug || "resto")}.com</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Horarios</h3>
            <div className="space-y-2 opacity-90">
              <p>Lunes a Jueves: 12:00 – 23:00</p>
              <p>Viernes y Sábado: 12:00 – 00:00</p>
              <p>Domingo: 12:00 – 22:00</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Seguinos</h3>
            <div className="flex gap-4">
              {site.facebook && (
                <a
                  href={site.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {site.instagram && (
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {/* Si algún cliente usa Twitter/X */}
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/20 text-center opacity-80">
          <p>&copy; {year} {site.siteTitle}. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

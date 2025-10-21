import { useEffect, useMemo, useState } from "react"
import { Helmet } from "react-helmet-async"
import { supabase } from "@/integrations/supabase/client"
import { Hero } from "@/components/Hero"
import { AboutSection } from "@/components/AboutSection"
import { LocationsGallery } from "@/components/LocationsGallery"
import { MenuSection } from "@/components/MenuSection"
import { Footer } from "@/components/Footer"
import { site } from "@/lib/site"

interface Cliente {
  id: string
  slug: string
  nombre_restaurante: string
  tagline: string | null
  url_imagen_hero: string | null
  telefono?: string | null
  direccion?: string | null
  instagram?: string | null
  facebook?: string | null
}

export default function Index() {
  const [cliente, setCliente] = useState<Cliente | null>(null)
  const [loading, setLoading] = useState(true)

  // Resolver slug: env -> subdominio -> template
  const resolvedSlug = useMemo(() => {
    const envSlug = (import.meta as any).env?.VITE_CLIENT_SLUG as string | undefined

    let subdomainSlug: string | undefined
    if (typeof window !== "undefined") {
      const host = window.location.hostname // p.ej. parrilla.vercel.app
      const parts = host.split(".")
      if (parts.length >= 3) subdomainSlug = parts[0]
    }

    return (envSlug || subdomainSlug || site.projectSlug || "template").toLowerCase()
  }, [])

  useEffect(() => {
    let isMounted = true
    async function fetchCliente() {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from("clientes")
          .select("*")
          .eq("slug", resolvedSlug)
          .single()

        if (error) console.warn("[Supabase] clientes.single error:", error.message)
        if (isMounted) setCliente(data ?? null)
      } catch (e: any) {
        console.warn("[Supabase] fetchCliente exception:", e?.message || e)
        if (isMounted) setCliente(null)
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    fetchCliente()
    return () => { isMounted = false }
  }, [resolvedSlug])

  // Derivar props visuales con fallback al template
  const nombre = cliente?.nombre_restaurante || site.siteTitle
  const tagline = (cliente?.tagline ?? site.description) || ""
  const heroUrl = cliente?.url_imagen_hero || site.heroImage

  // util: construir URL absoluta para og:image
  const absoluteUrl = (path?: string) => {
    if (!path) return undefined
    if (/^https?:\/\//i.test(path)) return path
    if (typeof window === "undefined") return undefined
    return `${window.location.origin}/${path.replace(/^\/+/, "")}`
  }

  const pageTitle = `${nombre} – ${tagline || "Restaurante"}`.trim()
  const pageDescription = tagline || site.description || "Descubrí nuestra propuesta."
  const ogImage = absoluteUrl(heroUrl) || absoluteUrl(site.heroImage) || "/og-default.jpg"

  useEffect(() => {
    if (typeof document !== "undefined") document.title = nombre
  }, [nombre])

  if (loading && !cliente) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="animate-pulse text-xl text-muted-foreground">Cargando…</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* SEO dinámico */}
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="theme-color" content={site.primaryColor} />
        <link rel="canonical" href={typeof window !== "undefined" ? window.location.href : ""} />

        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        {ogImage && <meta property="og:image" content={ogImage} />}

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        {ogImage && <meta name="twitter:image" content={ogImage} />}

        {/* (opcional) JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context":"https://schema.org",
            "@type":"Restaurant",
            "name": nombre,
            "description": pageDescription,
            "image": ogImage,
            "telephone": site.phone || undefined,
            "address": site.address || undefined
          })}
        </script>
      </Helmet>

      <Hero nombre={nombre} tagline={tagline} imagenUrl={heroUrl || undefined} />
      <AboutSection />
      {cliente?.id ? (
        <>
          <LocationsGallery clienteId={cliente.id} />
          <MenuSection clienteId={cliente.id} />
        </>
      ) : (
        <div className="mx-auto max-w-5xl p-6 text-sm text-muted-foreground">
          Este sitio está usando los textos e imágenes del template por defecto.
        </div>
      )}
      <Footer />
    </div>
  )
}

-- Crear tabla de clientes (restaurantes)
CREATE TABLE public.clientes (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  nombre_restaurante text NOT NULL,
  tagline text,
  color_primario text DEFAULT '#ff7e36',
  url_imagen_hero text,
  url_video_intro text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Habilitar RLS en clientes (público para lectura)
ALTER TABLE public.clientes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Clientes son visibles públicamente"
ON public.clientes
FOR SELECT
USING (true);

-- Crear tabla de items del menú
CREATE TABLE public.menu_items (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  cliente_id uuid NOT NULL REFERENCES public.clientes(id) ON DELETE CASCADE,
  plato text NOT NULL,
  descripcion text,
  precio numeric(10, 2) NOT NULL,
  url_imagen text,
  orden int DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Habilitar RLS en menu_items (público para lectura)
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Menu items son visibles públicamente"
ON public.menu_items
FOR SELECT
USING (true);

-- Crear tabla de ubicaciones
CREATE TABLE public.ubicaciones (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  cliente_id uuid NOT NULL REFERENCES public.clientes(id) ON DELETE CASCADE,
  nombre text NOT NULL,
  url_imagen text,
  orden int DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Habilitar RLS en ubicaciones (público para lectura)
ALTER TABLE public.ubicaciones ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Ubicaciones son visibles públicamente"
ON public.ubicaciones
FOR SELECT
USING (true);

-- Insertar datos de ejemplo
INSERT INTO public.clientes (slug, nombre_restaurante, tagline, color_primario, url_imagen_hero)
VALUES ('tapas-bar-demo', 'Tapas Bar & Restaurant', 'Authentic Spanish Cuisine in the Heart of the City', '#ff7e36', NULL);

-- Obtener el ID del cliente insertado para los datos relacionados
DO $$
DECLARE
  cliente_uuid uuid;
BEGIN
  SELECT id INTO cliente_uuid FROM public.clientes WHERE slug = 'tapas-bar-demo';
  
  -- Insertar items del menú de ejemplo
  INSERT INTO public.menu_items (cliente_id, plato, descripcion, precio, orden)
  VALUES 
    (cliente_uuid, 'Patatas Bravas', 'Crispy potatoes with spicy tomato sauce and aioli', 8.50, 1),
    (cliente_uuid, 'Jamón Ibérico', 'Premium cured Iberian ham, served with bread and tomato', 18.00, 2),
    (cliente_uuid, 'Gambas al Ajillo', 'Sizzling garlic shrimp in olive oil', 14.50, 3),
    (cliente_uuid, 'Pulpo a la Gallega', 'Galician-style octopus with paprika and olive oil', 16.00, 4),
    (cliente_uuid, 'Croquetas de Jamón', 'Crispy ham croquettes with béchamel', 9.00, 5),
    (cliente_uuid, 'Tortilla Española', 'Traditional Spanish potato omelette', 10.00, 6),
    (cliente_uuid, 'Pimientos de Padrón', 'Fried Padrón peppers with sea salt', 7.50, 7),
    (cliente_uuid, 'Albóndigas', 'Spanish meatballs in tomato sauce', 11.00, 8);
  
  -- Insertar ubicaciones de ejemplo
  INSERT INTO public.ubicaciones (cliente_id, nombre, orden)
  VALUES 
    (cliente_uuid, 'Downtown Location', 1),
    (cliente_uuid, 'Waterfront Terrace', 2),
    (cliente_uuid, 'Historic District', 3),
    (cliente_uuid, 'Garden Patio', 4);
END $$;
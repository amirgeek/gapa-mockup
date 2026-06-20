# Supabase setup

Base inicial para mover GAPA desde `localStorage` a Supabase.

## Alcance de esta base

- Auth de Supabase como fuente real de usuarios
- Tabla `profiles` enlazada a `auth.users`
- Membresias y pagos
- Sesiones e inscripciones
- Categorias y recursos de campus
- Reglas RLS base para `admin` y usuarios con membresia activa

## Variables de entorno

Segun la quickstart oficial de React de Supabase, el cliente usa:

```bash
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
```

Estas variables ya quedaron modeladas en [.env.example](/Users/amirb/Downloads/gapa/gapa-mockup/.env.example:1).

## Archivos agregados

- Cliente frontend: [src/lib/supabaseClient.js](/Users/amirb/Downloads/gapa/gapa-mockup/src/lib/supabaseClient.js:1)
- Migracion inicial: [supabase/migrations/20260429190000_initial_schema.sql](/Users/amirb/Downloads/gapa/gapa-mockup/supabase/migrations/20260429190000_initial_schema.sql:1)

## Modelo inicial

### Auth y perfiles

- `auth.users`: fuente de identidad
- `public.profiles`: datos de app, rol, membresia, categoria interna y respuestas del onboarding

### Negocio

- `membership_payments`
- `sessions`
- `session_enrollments`
- `campus_categories`
- `campus_resources`

## Politicas

La migracion incluye helpers `is_admin()` y `has_active_membership()` para las primeras RLS:

- el usuario lee y actualiza su perfil
- admin administra todo
- solo miembros activos ven sesiones y campus
- cada usuario crea solo sus propias inscripciones

## Siguiente paso recomendado

1. Crear el proyecto en Supabase
2. Cargar `VITE_SUPABASE_URL` y `VITE_SUPABASE_PUBLISHABLE_KEY`
3. Ejecutar la migracion en SQL Editor o via CLI
4. Reemplazar gradualmente `AppContext` mock por servicios reales de auth, sesiones y campus

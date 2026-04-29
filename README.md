# GAPA v0

Base funcional para pasar del mockup a una beta navegable.

## Incluye

- Landing publica
- Login
- Registro con membresia obligatoria antes de crear usuario
- Roles `admin` y `user`
- Inicio privado para usuarios loggeados
- Sesiones con inscripcion y link de Meet visible solo para inscriptos
- Campus con contenido por categorias
- Panel admin para gestionar usuarios, sesiones y contenidos
- Persistencia local con `localStorage` para demo

## Stack

- React
- Vite
- React Router
- Supabase (base inicial preparada)

## Demo accounts

- Admin: `admin@gapa.app` / `admin123`
- Usuario: `elena@gapa.app` / `demo123`

## Scripts

```bash
npm install
npm run dev
npm run lint
npm run build
```

## Nota

Esta version usa datos mock persistidos localmente, pero ya dejamos preparada la base de Supabase para empezar la migracion. Los siguientes pasos son:

- auth real con Supabase
- base de datos y RLS
- Mercado Pago y Talio Pay
- almacenamiento real para recursos del campus
- permisos mas finos para profesionales/admin

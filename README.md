# FENILEPO
Federación Nicaragüense de Levantamiento de Potencia

Este proyecto es una aplicación web construida con React, TypeScript, Vite y TailwindCSS.

## Estructura principal
- `src/components/` – Componentes reutilizables
- `src/pages/` – Páginas principales
- `src/hooks/` – Hooks personalizados
- `src/utils/` – Funciones utilitarias
- `src/assets/` – Recursos estáticos (imágenes, fuentes, etc)
- `public/` – Archivos públicos

## Scripts principales
- `npm run dev` – Desarrollo
- `npm run build` – Build de producción
- `npm run lint` – Linter

## Actualizar el sitio
- Calendario: edita `src/data/eventsData.ts` con fechas YYYY-MM-DD. Usa un enlace HTTPS de la convocatoria solo mientras la inscripción esté abierta.
- Galería: agrega fotos oficiales en `public/` y regístralas en `src/data/galleryData.ts` con álbum, descripción y URL basada en `import.meta.env.BASE_URL`.
- Registro y contacto: el sitio dirige a los canales de FENILEPO y no recopila datos personales.
- Publicación: abre un PR para revisar la vista previa de Vercel antes de fusionar.

## Licencia
MIT

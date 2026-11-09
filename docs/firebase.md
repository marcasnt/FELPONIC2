# Activar formularios de FELPONIC

Los formularios de producción se habilitan en Vercel con `VITE_FORMS_ENABLED=true`. Para el registro también se necesita `VITE_REGISTRATION_POLICY_URL` con la URL oficial de condiciones y privacidad. Publicar ambos valores requiere un nuevo build. El formulario de contacto ofrece el correo publicado cuando el envío en línea está desactivado.

Configura `FELPONIC_FIREBASE_SERVICE_ACCOUNT` como secreto del servidor con el JSON de una cuenta de servicio de Firebase con acceso a Firestore. Nunca uses el prefijo VITE_ para este secreto. Usa un proyecto separado para Preview y verifica el destino con datos ficticios.

Antes de habilitar los formularios, comprueba que ninguna regla de Firestore permita el acceso desde clientes a `privateContactMessages` ni `privateAthleteApplications`. Las reglas de Firebase son aditivas. Un permiso global puede abrir estas colecciones. El SDK administrativo escribe desde el servidor y no depende de las reglas de clientes. El equipo autorizado consulta las solicitudes en la consola de Firebase. Configura una regla de limitación de solicitudes para POST /api/submissions antes de habilitar el envío público.

El calendario lee la colección `events`. Las nuevas fechas usan YYYY-MM-DD y las fechas anteriores de formato libre se conservan en el archivo público. Para abrir la inscripción, agrega un enlace HTTPS a la convocatoria y retíralo cuando cierre.

El proyecto original es `felponic-web`. Si cambia el bucket o la app web, configura los valores públicos `VITE_FIREBASE_*` de `.env.example`. Verifica la lectura pública de `events` y del prefijo de fotos antes de publicar. No habilites permisos globales para resolver un error de lectura.

La galería lee `gallery/` y un nivel de álbumes bajo esa carpeta. Conserva permisos de lectura pública para los archivos publicados y limita la creación y eliminación a administradores. Verifica que las reglas existentes acepten la ruta `gallery/{album}/{photo}` antes de publicar álbumes desde el panel. Revisa también que la escritura en `events` solo esté disponible para el equipo autorizado.

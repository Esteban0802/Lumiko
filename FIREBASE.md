# Activar perfiles familiares en Lumiko

Proyecto: **lumiko-4b996**. El acceso del apoderado usa Firebase Authentication; los niños tienen perfiles, sin correo ni contraseña propios.

## Configuración necesaria en la consola

1. Mantener Authentication > Correo electrónico/contraseña habilitado.
2. Abrir Cloud Firestore y crear una base de datos **Standard**, con identificador **(default)**. Elegir la región que corresponda a la familia; esta ubicación no se cambia después. Elegir **modo de producción**, con acceso cerrado.
3. En Cloud Firestore > Reglas, copiar el contenido completo de `firestore.rules` y pulsar **Publicar**. Estas reglas son para el proyecto nuevo de Lumiko; no copiarlas sobre las reglas de otros proyectos.
4. En Authentication > Configuración > Dominios autorizados, comprobar `localhost` y `esteban0802.github.io` (sin rutas).
5. Abrir Lumiko localmente, ingresar como apoderado y crear un perfil. Si Firestore o sus reglas no están listos, la aplicación muestra un error y no presenta un perfil vacío como si hubiese guardado.

La creación de la base y la publicación de reglas son pasos pendientes en la consola: modificar el archivo local no publica las reglas automáticamente.

## Datos y acceso

Cada perfil está en `users/{uidDelApoderado}/children/{idDelPerfil}`. Incluye apodo, etapa, fechas de creación/actualización, apariencia y progreso de las tres secciones existentes. Las reglas permiten leer y escribir solo dentro de la familia autenticada. El panel es de acompañamiento: actividades practicadas, pendientes y desglose por asignatura; no son notas, tiempo de estudio, intentos ni mediciones de dominio.

El botón Comenzar aventura abre `/aventura/?perfil=ID`. Primero se valida la sesión y se carga el documento privado desde el servidor. Un perfil inexistente o ajeno no abre el contenido. La aventura sin parámetro sigue siendo una práctica de invitado independiente, con el almacenamiento anterior.

El guardado usa transacciones para conservar actividades completadas en otros dispositivos. Si falla, aparece un aviso y un botón para reintentar. Se conserva una copia pendiente local bajo una clave que incluye el apoderado y el perfil; al volver a abrir ese mismo perfil con conexión se recupera. No borrar datos del navegador mientras haya avances pendientes. Los cambios simultáneos de apariencia y variantes usan el último guardado; las finalizaciones se unen. El navegador debe poder conectarse a Firestore para abrir inicialmente el perfil.

El progreso anterior de invitado sigue intacto y no se asigna automáticamente a un niño. Los historiales auxiliares de ejemplos permanecen locales; no se sincronizan. No se guardan trazos, grabaciones ni respuestas escritas. El acceso infantil usa la sesión del apoderado en este dispositivo; todavía no existe un PIN que separe el panel adulto del juego.

## Comprobación real antes de publicar

- Crear dos perfiles y personalizar sus personajes de forma distinta.
- Completar una actividad en el primero; comprobar el panel y que el segundo siga sin completar esa actividad.
- Recargar e ingresar desde otro navegador con la misma cuenta: comprobar recuperación del personaje y progreso.
- Cerrar sesión: comprobar que el panel y el enlace del perfil soliciten acceso.
- Con otra cuenta, intentar abrir el ID del primer perfil: debe rechazarse. Las reglas también deben rechazar lectura directa con otro UID.
- Simular una desconexión después de cargar la aventura, completar una actividad, recuperar conexión y reintentar guardado.

Las pruebas locales de datos y compilación no sustituyen estas pruebas del servicio ni la validación de las reglas en el simulador/emulador de Firebase.

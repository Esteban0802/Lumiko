# Publicar Lumiko en GitHub Pages

El proyecto ya genera un sitio estático y tiene publicación automática preparada.

## Crear el repositorio

1. En tu cuenta de GitHub, crea un repositorio llamado `lumiko`.
2. Elige **Public** si usas GitHub Free para publicar con Pages.
3. Déjalo vacío: no agregues README, licencia ni .gitignore desde GitHub, porque el proyecto ya tiene sus archivos.
4. Copia la dirección del repositorio, con el formato `https://github.com/TU-USUARIO/lumiko`.

## Publicar

Conecta este proyecto con el repositorio y sube la rama `main`. Luego, en el repositorio:

1. Abre **Settings → Pages**.
2. En **Build and deployment → Source**, selecciona **GitHub Actions**.
3. En **Actions**, abre **Publicar Lumiko en GitHub Pages** y ejecuta **Run workflow** si la primera ejecución no pudo completarse antes de configurar Pages.
4. Cuando la ejecución termine correctamente, GitHub mostrará el enlace de la página. Habitualmente será `https://TU-USUARIO.github.io/lumiko/`.

Las siguientes actualizaciones que se suban a `main` se publicarán automáticamente después de pasar las pruebas y la compilación.

## Compatibilidad

- El flujo obtiene la subcarpeta del sitio desde la configuración de Pages; no es necesario poner el nombre de usuario en el código.
- En local se sigue usando `http://localhost:3001`, sin subcarpeta.
- No se suben `node_modules`, los archivos de compilación, archivos `.env` ni la configuración local `.openai`.
- El personaje y el progreso se guardan en el navegador de cada dispositivo. No se trasladan automáticamente desde localhost a la página publicada ni se sincronizan entre dispositivos.

## Comprobación local con la ruta de Pages

En PowerShell:

```powershell
$env:NEXT_PUBLIC_BASE_PATH = '/lumiko'
npm run build
Remove-Item Env:NEXT_PUBLIC_BASE_PATH
```

El resultado estará en `out/`. Debe servirse mediante un servidor estático montado bajo `/lumiko/`, no abriendo el HTML como archivo.

Referencias: [Next.js: basePath](https://nextjs.org/docs/pages/api-reference/config/next-config-js/basePath), [GitHub Pages con Actions](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

# Lumiko · primera aventura

Prototipo web en español con actividades de kínder y una selección inicial de Lenguaje y Matemática de 1.º a 6.º básico. Next.js 15 + React 19 + TypeScript; Phaser 3 se carga solo en el cliente. Se exporta como sitio estático, sin Firebase, cuentas ni servidor de datos.

## Instalar y ejecutar

Requisitos: Node.js 22 o 24 y npm. Desde esta carpeta:

```sh
npm ci
npm run dev
```

Abrir http://localhost:3001. Para comprobar producción:

```sh
npm test
npm run check
npm run build
```

El resultado estático queda en `out/`; puede servirse con cualquier servidor HTTP estático. No abrir `index.html` mediante `file://`. `npm start` no se usa con esta exportación.

## Recorrido

Bienvenida → personalización o Continuar mi aventura → mapa de niveles con portales Kínder y Básica. Kínder abre el mapa de cuatro asignaturas y sus recorridos de actividades; Básica abre mapas de cursos, asignaturas y actividades. Tocar el suelo mueve al avatar y tocar un portal lo lleva al destino; también hay botones de acceso. Se conservan las estrellas y registros anteriores.

Escuchar sonido, escuchar cada palabra y pedir pista no consume intentos. Equivocarse conserva la pregunta; acertar habilita el siguiente paso. Repetir una actividad no acumula estrellas duplicadas.

`localStorage`, clave `lumiko-v1`, guarda apariencia y las actividades completadas (una estrella por actividad). No guarda la ubicación ni una pregunta a medio resolver. Sin almacenamiento disponible se puede seguir jugando durante la sesión. No se solicita nombre, edad, micrófono ni datos personales. Para reiniciar, borrar los datos del sitio desde el navegador.

## Arte y audio

Avatar y Lumi son dibujos SVG originales generados por código en `lib/art.ts`. Los escenarios se dibujan con primitivas de Phaser: perspectiva isométrica 2.5D provisional, sin modelos 3D. Los objetos de respuesta usan emojis del sistema; su apariencia varía por dispositivo. La tipografía intenta cargar Google Fonts, con alternativas locales.

La voz usa Web Speech del navegador, idioma es-CL y velocidad reducida. Requiere interacción y una voz española instalada; puede depender del sistema o de servicios del navegador. Las letras repetidas son una aproximación de los fonemas, no grabaciones fonéticas validadas. Si falla la voz se muestra una alternativa textual. El botón Sonido silencia las locuciones. No hay música ni voz grabada incluida.

## Pruebas

Las pruebas de `tests/world.test.ts` y `tests/content.test.ts` verifican rutas, obstáculos, coordenadas, alternativas de respuesta, segmentación silábica y recuperación del progreso. Ver `VALIDACION.md` para resultados y límites de la revisión manual.

## Pendientes

- Grabar fonemas y locuciones con revisión pedagógica; evitar que TTS pronuncie nombres de letras.
- Validar contenido y tamaño de controles con niños y adultos responsables.
- Pruebas físicas en iPad/Safari y Android; el navegador de escritorio no sustituye una tablet real.
- Sustituir emojis por ilustraciones originales coherentes y ampliar animaciones de caminata/dirección.
- Añadir estilos de cabello (ahora cambia el color), más misiones y navegación completa por teclado en el mundo.
- Guardar misiones en curso; panel adulto y borrado desde interfaz si se amplía la persistencia.
- Firebase y sincronización entre dispositivos solo cuando se definan consentimiento y modelo de datos.
- Voz de bienvenida y ayuda completa para quienes todavía no leen.

No es una plataforma educativa completa ni una evaluación de desempeño infantil.

## Pantalla de juego

Plaza y Bosque se adaptan a la altura de la ventana para mostrar el escenario completo y los botones al 100 % de zoom. En ventanas muy bajas se conserva el desplazamiento. Ver tamaños comprobados en `VALIDACION.md`.

## Contenido curricular

El [mapa de contenido de Lumiko](CONTENIDO.md) define las misiones propuestas, su relación con objetivos del currículum chileno y el orden de implementación. Distingue el contenido planificado de los bloques ya implementados. Prioridad: contenido → diseño UI → voces y mejoras visuales.

## Bloque de lenguaje

El arco del Bosque y el botón «Elegir aventura» abren tres actividades: Detectives de sonidos, Pasos de palabras y La mochila del cuento. Cada una tiene ejemplo, seis desafíos, pistas y una estrella propia sin duplicados al repetir. El cuento puede escucharse de nuevo o leerse con ayuda adulta. El guardado recupera la estrella antigua como la actividad de sonidos completada; conserva la apariencia. Las actividades usan contenidos de Transición, todavía sin selección de curso. La voz sigue siendo la síntesis provisional del navegador.

## Bloque de matemática

En «Elegir aventura», la opción «Matemática» abre Canastos de semillas (conteo), Una merienda para todos (más, menos e igual cantidad) y El sendero que se repite (patrones AB, AAB y ABC). Cada actividad tiene seis desafíos, ejemplo, pistas y una estrella propia. Las seis actividades de lenguaje y matemática suman 36 desafíos y hasta seis estrellas; el progreso anterior de lenguaje se conserva. Se accede desde el Bosque, sin un mapa nuevo. Consultar alcance y pendientes pedagógicos en `CONTENIDO.md`.

## Ampliación de matemática

«Semillas que llegan y se van» permite agregar y quitar semillas de una en una antes de elegir el resultado, incluido cero. «Ordenamos el huerto» permite elegir objetos por atributos y reconocer filas ordenadas por tamaño. Cada actividad añade seis desafíos y una estrella propia. El catálogo actual tiene ocho actividades, 48 desafíos y hasta ocho estrellas. Se conserva el progreso anterior. Ver alcance curricular parcial y pendientes en `CONTENIDO.md`.


## Servidor local y compilación

`npm run dev` usa el puerto fijo 3001 y guarda sus archivos en `.next-dev/`. `npm run build` usa `.next/` y exporta a `out/`, de modo que la comprobación de producción no reemplaza los archivos del prototipo abierto. Mantener una sola instancia de desarrollo por proyecto; si el puerto está ocupado, revisar la instancia existente antes de abrir otra.


## Temario de kínder · segundo semestre 2026

«Mi temario de kínder» abre 28 temas basados en la imagen entregada por la familia, organizados en lenguaje, matemática y habilidades. Incluye dictados aleatorios de cinco palabras (27 letras, incluida ñ) o números (0–20), sin repetir antes de recorrer sus bancos. También hay secuencias, recta numérica, cuerpos geométricos, cuadrículas, simetría y rompecabezas de seis piezas. Escritura y prácticas manuales requieren revisión adulta.

El registro de temas practicados es independiente de las estrellas existentes. No se guardan nombre, apellido ni trazos. Ver [cobertura y límites del temario](TEMARIO_KINDER.md).

## Variación al repetir

Las ocho aventuras y los 28 temas de kínder ofrecen «Volver a practicar con nuevos ejemplos». Cambian palabras, relatos, cantidades, problemas y modelos visuales según la habilidad. Se recuerda la ronda en este navegador, conservando estrellas y temas practicados. Los dictados mantienen sus bancos aleatorios sin repetir antes de agotarlos; los demás bancos y modelos alternan y se reutilizan por turnos. No se guardan trazos ni datos personales nuevos.

## Ejercicios propios por sección

El temario ya no reutiliza las preguntas de matemática ni los cuentos de las aventuras. Incluye formar grupos de varios objetos, construir una fila por tamaño, «Problemas de la sala» con otros materiales y «Cuentos del colegio» con relatos exclusivos. También separa los símbolos de los patrones. La diferenciación se mantiene al repetir y conserva el progreso existente.

## Bancos ampliados y menos repetición

El dictado tiene 81 palabras, conservando el progreso del banco anterior. Se ampliaron cuentos, rimas, sinónimos, sílabas, textos, secuencias y dibujos. Las ocho aventuras y los 28 temas priorizan rondas con menos ejemplos usados recientemente, guardando un historial local resumido; al agotar las opciones, favorecen las menos recientes. Se mantienen el alcance del temario, las estrellas y los temas practicados. Detalles y límites en `TEMARIO_KINDER.md`.

## Básica · 1.º a 6.º: Lenguaje y Matemática

Nueva sección basada en el PDF de Bases Curriculares entregado por la familia. Contiene 60 actividades: cinco de Lenguaje y cinco de Matemática por curso. Incluye textos graduados, escritura con pauta, operaciones, fracciones, relaciones, medición y datos. Los OA y páginas se indican en la actividad y en [BASICA_CURRICULAR.md](BASICA_CURRICULAR.md). Es una selección inicial con cobertura parcial; no incluye otras asignaturas.

Acceso desde la bienvenida o el selector de aventuras. El progreso de básica se guarda aparte; no se guardan borradores ni se califica automáticamente la escritura. Conserva el temario de kínder, sus registros y las estrellas anteriores.

## Más práctica en básica · 24 de octubre de 2026

Las 60 actividades de 1.º a 6.º básico tienen ahora ocho ejercicios por ronda (dos consignas en escritura): 444 ejercicios o pautas en total al recorrerlas todas. Hay bancos ampliados y exclusión de ejercicios idénticos dentro de una ronda. Se mantiene el progreso existente. Verificación: 41 pruebas automáticas, incluida generación de 40 rondas por actividad, y revisión de tipos.

## Selección de nivel

Elegir mi nivel y Continuar mi aventura abren el mapa de los portales Kínder y Básica. Kínder muestra cuatro asignaturas, cada una con su recorrido secuencial; Básica permite elegir de 1.º a 6.º y su asignatura. Ambos permiten volver al mapa de niveles, sin cambiar las claves del progreso guardado.

## Sonidos y letras de kínder ampliados

Kínder contiene ahora 32 actividades. Sonidos iniciales se organiza en dos partes, con seis ejercicios por intento y nuevas combinaciones al repetir. Se agregan comparación del sonido diferente, reconocimiento de la primera letra escrita de las 27 letras y más sílabas iniciales. La primera parte conserva el identificador y progreso anterior. B/V, C fuerte/K/Q y S/Z se tratan como sonidos compartidos en Chile; H, W y X se incluyen en reconocimiento escrito para evitar falsas equivalencias entre letra y sonido.

## Primeras sílabas en dos partes

La primera sílaba conserva su progreso y pasa a Parte 1 (vocales, N, B, D, T, F, M, L, P). Más primeras sílabas pasa a Parte 2 (C, G, H, J, K, Ñ, Q, R, S, V, W, X, Y, Z), conservando también su identificador. Banco de 45 pares de palabras, seis ejercicios por ronda y modelos alternos al repetir.

## Cuatro módulos de descubrimiento en kínder

Kínder reúne 36 actividades. En Lenguaje: Armamos palabras con sílabas (ordenar piezas y escuchar cada parte) y Contamos lo que vemos (describir escenas y conversar con un adulto). En Matemática: Formamos cantidades (dos descomposiciones diferentes de 4 a 10) y Guiamos a Lumi (recorridos en un tablero de 3 × 3 y descripción oral). Cada módulo tiene seis ejercicios por ronda, ejemplos variables y progreso independiente de básica. No se graban voces ni conversaciones.

## Recorrido sugerido de kínder

Las tres áreas agrupan las actividades desde las bases hacia la aplicación. Lenguaje comienza con Sonidos iniciales 1 y 2 y Primera sílaba 1 y 2. Cada área muestra tres bloques con una descripción; el orden es orientativo y no bloquea actividades. La organización está en lib/kinder-path.ts.

## Emociones y convivencia en kínder

Cuarta área, con Reconozco emociones, Expreso lo que necesito, Buscamos soluciones y Colaboramos y nos cuidamos. Kínder suma 40 actividades. Cada módulo ofrece seis situaciones por intento, de un banco de ocho situaciones propias (32 en total). Se exploran emociones y consecuencias, con audio y conversación acompañada. No hay una emoción correcta ni grabaciones. Se conserva el progreso anterior.

## Referencia visual de ejercicios de kínder

Armamos palabras con sílabas estrena un taller visual: imagen y audio, espacios para construir la palabra, fichas con escucha individual, contador de piezas y progreso de seis pasos. Lumi ofrece una pista y confirma los aciertos. Las fichas elegidas se pueden retirar individualmente o deshacer; se mantiene el contenido y progreso. Este diseño se aplica por ahora únicamente a esta actividad.

## Talleres visuales de sonidos y primeras sílabas

Sonidos iniciales 1 y 2 y Primera sílaba 1 y 2 comparten ahora el estilo del taller de palabras: referencia con apoyo visual y audio a la izquierda, tres tarjetas con escucha individual, progreso de seis pasos y Lumi con pistas y confirmación. Se mantienen las preguntas, las variantes y los identificadores de progreso.

## Taller visual de cantidades

Cantidades del 10 al 20 adopta el estilo visual de los talleres de lenguaje: objetos en filas de cinco espacios, marcas táctiles opcionales con conteo hablado, alternativas numéricas grandes y pistas de Lumi. Conserva sus once ejercicios por ronda y su progreso previo. Al repetir cambian los objetos según los bancos existentes.

## Bandejas de Formamos cantidades

Formamos cantidades usa dos bandejas interactivas: tocar un objeto lo pasa al otro lado, conservando el total y al menos uno en cada bandeja. Muestra la suma actual y dos tarjetas con las combinaciones encontradas. Una pareja invertida no cuenta como nueva. Lumi acompaña con audio y pistas; el avance permanece visible y se habilita tras encontrar ambas maneras. Conserva seis ejercicios por ronda y el progreso anterior.

## Taller visual de Problemas de la sala

Los problemas de suma y resta muestran una caja y los objetos de afuera. Se tocan los objetos para guardar o sacar la cantidad indicada; las respuestas se habilitan al completar el movimiento. Incluye reinicio, audio, pistas de Lumi, progreso de seis pasos y botón de avance presente desde el inicio. Se conserva el banco de problemas y su progreso.

## Caminos de números

Completa la recta y Antes y después comparten ahora el taller visual: números grandes con audio, espacio por completar, referencia destacada y flechas de orientación. Al acertar se completa el camino. Conservan tres y cuatro ejercicios por ronda, respectivamente, sus variantes y el progreso anterior. El avance se muestra desde el inicio, desactivado hasta acertar.

## Taller visual de ordinales

La fila del huerto muestra un inicio claro a la izquierda, cinco animales con sus posiciones del primero al quinto y alternativas con imágenes y audio. Cada animal de la fila puede escucharse junto a su lugar. Al acertar se destaca la posición correcta. Conserva los cinco ejercicios, las variantes y el progreso anterior.

## Taller visual de patrones

Patrones del semestre usa el mismo marco visual de los demás talleres: camino con imágenes y audio, alternativas visuales equivalentes, pista que resalta el grupo repetido y casilla que se completa al acertar. Conserva AB, AAB, ABB y ABC, cuatro ejercicios por ronda y el progreso anterior. En móvil se desplaza la fila horizontalmente y hay controles Inicio y Ver final.

## Taller visual de tamaños

Orden por tamaño adopta el formato de taller: figuras comparables, espacios para construir la fila, dirección de menor a mayor o al revés, retiro individual, deshacer, pistas y confirmación de Lumi. Conserva tres ejercicios por ronda y sus variantes. El avance permanece presente, desactivado hasta comprobar una fila correcta.

## Taller visual de clasificación

Forma, color y tamaño separa las pistas en tarjetas con apoyos visuales y muestra claramente las figuras que entran al grupo. Se puede alternar cada selección o quitar todas, escuchar las pistas y comprobar el grupo. Conserva tres ejercicios por ronda, las variantes y el progreso.

## Taller visual de cuerpos geométricos

Cuerpos geométricos muestra dibujos más grandes para comparar esfera, cubo, pirámide, cono y prisma rectangular alargado. Incluye audio, pistas específicas de superficies, caras o puntas y confirmación de Lumi. Conserva cinco ejercicios por ronda, referencias a objetos cotidianos al repetir y progreso anterior.

## Taller visual de historias en cuatro imágenes

Historias en cuatro imágenes adopta el formato de taller: tarjetas con audio, espacios Primero/Después/Luego/Al final, retiro individual, deshacer y escucha de la historia construida. Se mantiene el banco de historias, tres ejercicios por ronda y el progreso anterior. El avance permanece presente y se habilita al comprobar el orden correcto.

## Taller visual de recorridos

Guiamos a Lumi muestra un tablero con destino ilustrado, huellas del camino y controles grandes de dirección. Incluye deshacer, reiniciar y escuchar cada paso del recorrido. Al llegar se revisa con un adulto y se registra la práctica; cambiar el camino reinicia la confirmación. Se conservan seis recorridos por ronda y el progreso anterior.

## Taller visual de dictado numérico

Dictado de números incorpora teclado grande, entrada con el teclado del dispositivo, borrar cifras, audio repetible y pistas de Lumi. El modo Lápiz o papel permite usar papel o pizarra, mostrar el modelo después de escribir y registrar la revisión adulta. Conserva el banco 0–20, cinco números por intento y la rotación sin repetir hasta recorrer el banco.

## Taller visual de comparación de sonidos

¿Cuál comienza diferente? incorpora tres tarjetas con imágenes, audio individual y escucha conjunta. Al acertar muestra cuáles comienzan igual y cuál tiene otro sonido inicial. Conserva los seis ejercicios, variantes y progreso; el avance permanece visible y se habilita al acertar.

## Taller visual de letras escritas

Exploramos todas las letras permite comparar la inicial de una palabra ilustrada con tres tarjetas de mayúscula y minúscula. Incluye audio de palabra y nombres de letras, pista que destaca la inicial y confirmación de Lumi. Conserva seis ejercicios, abecedario completo, variantes y progreso anterior.

## Taller visual de rimas

Palabras que riman incorpora referencia ilustrada, tres alternativas con imágenes y audio, pista sobre el sonido final y comparación de terminaciones al acertar. Conserva tres ejercicios por ronda, banco de variantes y progreso. El avance permanece visible y se habilita con la respuesta correcta.

## Taller visual de conteo de palabras

Contamos palabras permite escuchar la oración, marcar y desmarcar cada palabra y quitar las marcas para recomenzar. Al acertar muestra una numeración por palabra completa. Conserva tres ejercicios por ronda, variantes y progreso; el avance permanece visible y se habilita al acertar.

## Rincón de comprensión de cuentos

Cuentos del colegio mantiene el relato disponible junto a la pregunta en escritorio y antes de ella en móvil. Permite escuchar el cuento completo, cada parte, la pregunta y las alternativas. La pista invita a volver al texto y el avance permanece visible, desactivado hasta acertar. Conserva los cuentos, tres preguntas por ronda, variantes y progreso.

## Taller visual de significados

Palabras parecidas presenta la pregunta en una tarjeta, tres alternativas con audio individual y conjunto, pistas sobre el significado y una explicación que puede volver a escucharse al acertar. Conserva tres ejercicios por ronda, variantes y progreso. El avance permanece visible, desactivado hasta acertar.

## Rincón de tipos de texto

¿Qué tipo de texto es? presenta cartas, noticias y poemas con su organización propia, y cómics en viñetas con audio individual. Incluye escucha completa, alternativas con audio, pistas y confirmación. Conserva cuatro ejercicios por ronda, variantes y progreso; el avance permanece visible y se habilita al acertar.

## Taller de escritura acompañada

Mi nombre y apellido y Dictado sorpresa de palabras comparten un taller con pizarra o papel, consigna con audio, modelo posterior al dictado y revisión adulta antes del registro. Cambiar de modo o modificar la pizarra reinicia la revisión. Conserva las palabras, rotación de cinco dictados, progreso y escritura temporal sin almacenamiento.

## Rincón de expresión oral

Contamos lo que vemos muestra una escena destacada, descripción con audio, preguntas con escucha individual y apoyos para comenzar a contar. Permite conversar hablando, señalando o con gestos; no graba ni califica la voz. Conserva seis escenas por ronda, variantes, registro acompañado y progreso. Con esta actividad, las 15 actividades de Lenguaje de kínder usan el formato de taller.

## Taller de copia de patrones visuales

Copia el patrón visual presenta modelo y copia en paneles, permite marcar y desmarcar, deshacer y borrar. La pista separa visualmente las filas e invita a comparar posiciones. Conserva tres ejercicios por ronda, variantes y progreso. El avance permanece visible y se habilita al comprobar la copia exacta.

## Taller de simetría

El otro lado del espejo destaca el eje vertical, mantiene fijo el modelo izquierdo y permite completar el derecho con deshacer y borrar. La pista recorre las filas para comparar distancias desde el eje. Conserva dos ejercicios por ronda, variantes y progreso; el avance permanece visible y se habilita al comprobar el reflejo correcto.

## Taller de rompecabezas

Rompecabezas de seis piezas distingue tablero, bandeja y modelo opcional. Permite seleccionar, retirar una pieza tocando su casilla sin selección activa, deshacer y reiniciar. Las piezas colocadas se marcan en la bandeja. Conserva dos imágenes por ronda, variantes y progreso; el avance permanece visible y se habilita tras comprobar el armado correcto.

## Taller de figura y fondo

Figura y fondo muestra el contorno central en un panel de observación y cuatro alternativas dibujadas con audio. La pista suaviza las líneas del fondo y el acierto destaca el contorno. Conserva tres ejercicios por ronda, variantes y progreso; el avance permanece visible y se habilita al acertar.

## Taller de copia de figuras

Copiamos una figura presenta el modelo visible, práctica en pizarra o papel, audio de consigna y pista para seguir las formas. La revisión adulta habilita el registro y se reinicia al editar, borrar o cambiar modo. Conserva dos modelos por ronda, variantes y progreso. No se califican automáticamente los trazos.

## Taller del cuerpo

Conocemos nuestro cuerpo presenta una persona con rasgos faciales, alternativas con audio y destaque de la parte correcta después del acierto. La práctica de movimientos ofrece audio por paso y registro acompañado. Conserva tres ejercicios por ronda, variantes y progreso; el avance permanece visible.

## Taller de derecha e izquierda

Derecha e izquierda mantiene referencias desde el lugar de quien mira la pantalla, objetos ilustrados y audio de direcciones para las flechas. La práctica corporal tiene audio por paso y registro acompañado. Conserva tres ejercicios por ronda, variantes y progreso; el avance permanece visible.

## Taller del papel

Recortar y troquelar separa materiales, plantilla y pasos con audio individual. Mantiene la práctica en papel con preparación, supervisión y revisión adulta antes del registro. Conserva dos ejercicios por ronda, variantes y progreso; el avance permanece visible. Las ocho actividades de Habilidades de kínder usan ahora el formato de taller.

## Renovación de Emociones y convivencia

Las cuatro actividades (Reconozco emociones, Expreso lo que necesito, Buscamos soluciones y Colaboramos y nos cuidamos) usan el formato de taller con tres momentos: Sentimos, Exploramos ideas y Conversamos. La situación permanece visible, se puede explorar cada acción y su consecuencia con audio, volver a cambiar elecciones y registrar con revisión adulta. Se acepta otra emoción, varias o no saber; las emociones y acciones no reciben puntos ni calificación. Cambiar emoción o acción reinicia la revisión. Se mantienen las 32 situaciones, 96 acciones, seis ejercicios por ronda, variantes y progreso anterior.


## Mapa de niveles y recorrido de Kínder

La plaza tiene dos portales interactivos, Kínder y Básica, y botones equivalentes. El mapa de kínder ofrece Lenguaje, Matemática, Habilidades y Emociones y convivencia. Cada asignatura tiene su recorrido independiente: 15, 13, 8 y 4 actividades respectivamente. Sin progreso previo solo está disponible la primera de cada asignatura; completar toda su ronda abre la siguiente dentro de esa misma asignatura. Entrar, salir o responder solo una pregunta no desbloquea otra actividad. Se puede volver a jugar lo completado. Los registros antiguos se conservan: una actividad completada fuera de orden puede repetirse, pero no abre las posteriores si hay una pendiente anterior. Los mapas isométricos muestran candados y numeración, con todas las paradas de la asignatura en una sola isla. Básica también usa mapas de curso, asignatura y actividades con avance independiente.


## Mapas de asignaturas de Kínder

Recorrido actualizado: mapa de niveles → Kínder → mapa de asignaturas → mapa de actividades → ejercicio. Las cuatro asignaturas están disponibles desde el comienzo y muestran su propio contador. Los bloqueos, la siguiente actividad y la numeración se calculan por asignatura; no es necesario terminar Lenguaje para comenzar Matemática. Se conserva el progreso anterior y la repetición de actividades completadas.


## Mapas y progresión de Básica

Básica muestra seis destinos de curso, luego Lenguaje y Matemática, y finalmente las cinco actividades de esa asignatura y curso. Cada uno de los doce recorridos tiene su primera actividad disponible y abre la siguiente solo tras completar la ronda entera. Los cursos y asignaturas pueden elegirse libremente. Las completadas pueden repetirse; registros anteriores, rondas y ejemplos recientes se conservan bajo la misma clave. Se mantienen las 60 actividades y su referencia curricular.


## Explorador en todos los mapas

Los mapas interiores de Kínder y Básica usan ahora el escenario isométrico, el explorador personalizado y Lumi. Tocar el suelo permite caminar rodeando obstáculos; tocar un portal o su botón de destino hace caminar al personaje hasta él y abre la pantalla al llegar. Las actividades bloqueadas rechazan también el toque directo sobre el portal. Kínder mantiene sus cuatro asignaturas, Básica sus seis cursos y dos asignaturas por curso. Los recorridos de actividades se presentan completos en una isla por asignatura, conservando numeración, progreso y desbloqueos independientes. Las completadas muestran una marca y pueden repetirse. Si el motor no carga, se ofrece entrada mediante los botones.


## Mapas ampliados

El escenario interior ocupa más altura y reduce el margen vacío del lienzo. Los recorridos de actividades tienen tres portales por tramo, separados entre sí, y nombres más grandes. La numeración y el desbloqueo no cambian. En móvil el escenario conserva un ancho amplio dentro de un visor desplazable horizontalmente, centrado al abrir o cambiar de tamaño; los botones siguen disponibles debajo.


## Todas las actividades en una isla

Se elimina la división por tramos. Cada mapa de actividades muestra todos sus destinos a la vez, hasta 15 en Lenguaje de kínder, con portales compactos numerados. El nombre completo se consulta al pasar sobre el portal y en los botones numerados de debajo. En ventanas bajas, esos botones se desplazan dentro de su panel. Los mapas de asignaturas y cursos mantienen portales grandes. Se conserva el desplazamiento lateral en móvil, el avatar, Lumi y los desbloqueos anteriores.

## Editor ampliado del explorador

Mi explorador abre un estudio con pestañas Apariencia, Ropa y Accesorios, y vista previa inmediata. Incluye ocho tonos de piel, ocho colores de cabello, cinco peinados, ocho colores de camiseta y tres diseños, seis colores de pantalones y seis de zapatos. Los siete accesorios incluyen ninguno, estrella, sombrero, pañuelo, gorra, corona y lentes; hay ocho colores para el accesorio. Sorpréndeme combina opciones y Restablecer apariencia vuelve al personaje inicial sin cambiar el progreso. Las apariencias antiguas conservan sus colores y accesorios al incorporar los nuevos campos. Se guarda bajo lumiko-v1 y se comparte con todos los mapas.

## Publicación en GitHub Pages

El proyecto incluye .github/workflows/pages.yml para ejecutar las pruebas, compilar la exportación estática y publicar out/ desde la rama main. La ruta del repositorio se obtiene de la configuración de Pages mediante NEXT_PUBLIC_BASE_PATH; el entorno local mantiene su ruta habitual. El enlace de inicio respeta esa subcarpeta. Instrucciones de creación del repositorio y activación en PUBLICAR_GITHUB.md. La primera publicación requiere crear el repositorio, subir el código y seleccionar GitHub Actions como fuente de Pages.

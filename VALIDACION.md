# Validación · 24 de octubre de 2026

- `npm test`: 4 pruebas aprobadas (todos los destinos transitables, obstáculos, transformación isométrica, contenido).
- `npm run check`: aprobado.
- `npm run build`: exportación estática completada; repetida después de corregir la carga SVG.
- Instalación con override de PostCSS: auditoría reporta 0 vulnerabilidades.
- Navegador integrado de escritorio: bienvenida, selección de apariencia, entrada en Plaza, render Phaser con avatar/Lumi, clic en el suelo del portal y transición a Bosque verificados.
- Misión: entrada, respuesta incorrecta con pista y permanencia en pregunta, tres respuestas correctas, recompensa de una estrella y retorno a Plaza verificados.
- Recarga: recupera el perfil y ofrece continuar.

La primera prueba encontró un error de decodificación de SVG en Phaser. Se cambió el formato de las texturas a base64 y se verificó el escenario visible.

El botón de voz se ejercitó; al cambiar rápidamente de locución apareció un aviso. Se corrigió para ignorar cancelaciones e interrupciones normales. No se ha verificado auditivamente la pronunciación de fonemas ni la disponibilidad de una voz española en todos los dispositivos. TTS requiere validación adicional y grabaciones definitivas.

No se ha probado en tablet física ni con usuarios infantiles. Hay diseño responsive y entrada Pointer de Phaser para clic/táctil, pero no se afirma compatibilidad física validada en iPad/Android. No se ha realizado una auditoría completa de accesibilidad.

## Ajuste de pantalla al 100 % de zoom

Plaza y Bosque distribuyen el espacio según la altura de la ventana: encabezado compacto, escenario proporcional completo y barra de Lumi con el botón de avance visible. No se reduce el zoom ni el tamaño mínimo de los botones. En ventanas de menos de 620 px de alto (700 px en pantallas estrechas), se permite desplazamiento para conservar una superficie de juego utilizable.

Comprobación en Edge de escritorio, con escala de página predeterminada (100 %):
- 1366 × 768, 1280 × 720 y 1024 × 768: escenario y controles visibles, sin desplazamiento vertical.
- 390 × 844: escenario y controles visibles, sin desplazamiento vertical; es una emulación de ventana, no una tablet física.
- 844 × 390: desplazamiento disponible por altura reducida.
- Transición con el botón «Ir al bosque» y presencia de «Comenzar misión»: correctas.
- Captura de Plaza revisada visualmente en 1366 × 768.
- Tras el cambio: `npm test` (4 aprobadas) y `npm run check` aprobados.

El usuario confirma que misión, estrella, personalización y voz funcionan bien en su prueba previa. Este ajuste solo afecta la distribución de Plaza y Bosque.

## Primer bloque de lenguaje · 24 de octubre de 2026

- Tres actividades jugables y 18 desafíos: sonidos iniciales, sílabas y comprensión de cuento.
- `npm test`: 7 pruebas aprobadas, incluyendo contenido y migración de progreso.
- `npm run check`: aprobado. Exportación de producción completada.
- Edge de escritorio, 1366 × 768: se completaron los seis desafíos de cada actividad; una respuesta incorrecta mantiene la pregunta y no habilita el siguiente paso; después de acertar se puede continuar.
- Se recuperó una partida del formato anterior: conserva apariencia y una estrella de sonidos. Al repetir sonidos no duplica esa estrella; al completar sílabas y cuento muestra tres estrellas.
- Tras recargar, se recuperan las tres actividades completadas. El cuento puede desplegarse de nuevo durante las preguntas.
- Vista 390 × 844: pregunta de sílabas sin desbordamiento horizontal. No equivale a prueba en dispositivo físico.
- Sin errores de ejecución capturados durante el recorrido. Se silenció la voz en esta comprobación; no se valida pronunciación nueva.
- Contenido de Transición sin rutas separadas por curso y sin revisión docente externa. El cuento usa un mismo relato para las dos rondas; falta un segundo relato para transferencia.

## Primer bloque de matemática · 24 de octubre de 2026

- Validación del usuario: las tres actividades de lenguaje funcionan bien en su prueba completa previa.
- Tres actividades nuevas y 18 desafíos: conteo de semillas, comparación de cantidades y patrones repetitivos AB/AAB/ABC.
- `npm test`: 11 pruebas aprobadas; cantidades, comparación, patrones y recuperación de progreso incluidas. `npm run check` aprobado y exportación de producción completada.
- Edge de escritorio: completados los seis desafíos de cada actividad nueva; respuesta incorrecta conserva la pregunta, no habilita avanzar y permite pedir pista y reintentar.
- Se parte de una partida con las tres estrellas de lenguaje: las conserva, permite obtener tres de matemática, repetir conteo sin duplicar y recuperar las seis al recargar. Se comprobó una respuesta de sílabas tras el recorrido.
- En conteo, el número de semillas dibujadas coincide con la respuesta en las seis preguntas. Comparación presenta ambos canastos. Patrones muestra la secuencia y una casilla por completar.
- Vistas de 390 × 844 y 320 × 700: sin desbordamiento horizontal en la última pregunta de cada actividad. Capturas de escritorio y móvil revisadas; las actividades permiten desplazamiento vertical. No es validación en tablet física.
- Sin errores de ejecución capturados. Voz silenciada durante la comprobación: la pronunciación no se volvió a validar.
- Contenido de Transición sin separar NT1/NT2; conteo y patrones cubren parte de sus OA, sin creación de colecciones ni patrones propios. Sin revisión docente externa registrada.

## Ampliación de matemática · 24 de octubre de 2026

- El usuario confirma el funcionamiento del primer bloque de matemática en su prueba previa.
- Dos actividades nuevas: agregar/quitar (seis problemas con manipulación guiada y un resultado cero) y clasificación/ordenación (seis desafíos).
- `npm test`: 15 pruebas aprobadas. Incluyen coherencia aritmética, unicidad de las respuestas por atributos, seriación y conservación de las ocho actividades. `npm run check`: aprobado. Exportación de producción completada.
- Edge de escritorio: los doce desafíos completados. En agregar/quitar no se permite responder antes de mover todas las semillas indicadas; el movimiento se reinicia correctamente y su estado se limpia al cambiar de pregunta. Los recuentos dibujados inicial y final coinciden con cada problema.
- Respuestas incorrectas mantienen la pregunta; pistas y reintentos disponibles. Clasificación muestra los tres objetos y ordenación muestra tres filas completas.
- Una partida con las seis estrellas anteriores llega a ocho. Repetir agregar/quitar conserva ocho; al recargar aparecen las tres actividades de lenguaje y las cinco de matemática completadas.
- Pantallas de agregar, resultado cero, clasificación por tres atributos y seriación comprobadas a 390 y 320 px de ancho, sin desbordamiento horizontal. Capturas revisadas visualmente. Las actividades permiten desplazamiento vertical.
- Sin errores de ejecución capturados. Voz silenciada durante esta prueba; pronunciación y dispositivos físicos pendientes. Contenido sin revisión docente externa; alcance curricular parcial documentado en `CONTENIDO.md`.

## Reparación del servidor local · 24 de octubre de 2026

El usuario reportó «Cannot find module './571.js'» en localhost:3001. Había cuatro instancias de desarrollo compartiendo `.next/`, y las compilaciones de producción reemplazaban los archivos que seguían usando. Se detuvieron únicamente los procesos Next de este proyecto y se inició una sola instancia en el puerto 3001.

La configuración ahora separa `.next-dev/` (desarrollo) de `.next/` (producción), e indica el puerto 3001 explícitamente para evitar iniciar copias en puertos sucesivos. No se borraron datos de almacenamiento del navegador.

Verificado en Edge antes y después de ejecutar `npm run build` con el servidor abierto: bienvenida, personalización, Plaza con canvas Phaser, Bosque, selector de matemática y preguntas de Ordenamos el huerto disponibles, sin errores de ejecución. Compilación y `npm run check` aprobados. README actualizado a localhost:3001.

## Temario escolar de kínder · segundo semestre 2026

- Referencia: imagen entregada por la familia con 28 puntos (9 lenguaje, 11 matemática y 8 habilidades). La familia pidió ampliar el dictado a todas las letras y mezclar rondas sucesivas.
- Se añadió «Mi temario de kínder», accesible en bienvenida o desde Bosque → Elegir aventura. Cobertura de los 28 puntos; 142 situaciones en los bancos y 104 pasos si se realiza una ronda de cada tema, sin obligación de hacerlos en una sesión.
- Dictado de palabras: 27 letras, incluida ñ; cinco palabras al azar por intento, sin repetir dentro de la ronda ni antes de recorrer el banco completo. Dictado de números: 0–20 con el mismo mecanismo. La rotación persiste entre visitas en este navegador y origen.
- `npm test`: 24 pruebas aprobadas, incluidas cobertura del temario, banco del abecedario, rotación aleatoria en varios ciclos, números, simetría, cuadrículas y recuperación segura del progreso. `npm run check` y `npm run build`: aprobados.
- Edge de escritorio: se completó una ronda de los 28 temas, incluidos selección, dictado numérico, revisión adulta de escritura, secuencias de cuatro imágenes, copia de cuadrícula, simetría y ambos rompecabezas de seis piezas. Una segunda ronda de cada dictado usa elementos distintos de la primera.
- Se comprobaron errores y reintentos, bloqueo de avance antes de resolver, modelos de dictado ocultos inicialmente y confirmación adulta antes de registrar prácticas manuales. La comprobación de escritura se hace con adulto, no por reconocimiento automático.
- El registro de 28 temas se recupera al recargar y las ocho estrellas anteriores se conservan. La clave nueva guarda únicamente IDs de temas e índices de rotación; no guarda nombres, apellidos ni trazos.
- Se comprobó la solicitud de voz para cada palabra y número de las rondas mediante una sustitución de síntesis en la prueba. No se escuchó ni validó la pronunciación real; la voz del equipo familiar sigue requiriendo comprobación auditiva.
- Capturas a 320 px de ancho de escritura, cómic, cantidades hasta 20, cuerpos geométricos, figura y fondo, copia de patrón, simetría y rompecabezas: sin desbordamiento horizontal. Revisadas visualmente las de cuerpos, simetría, rompecabezas y cantidad 20. Las actividades permiten desplazamiento vertical.
- Se repitió el recorrido después de compilar, con el servidor de desarrollo abierto: sin errores de ejecución. Acceso desde las aventuras existentes y regreso a Plaza comprobados.
- No se realizaron pruebas con el niño, revisión docente externa ni prueba física en tablet. Recorte, troquelado, escritura y movimiento corporal son prácticas acompañadas en papel o en el propio cuerpo; la pantalla registra práctica, no acredita destreza ni dominio. Ver `TEMARIO_KINDER.md`.

## Repetición con nuevos ejemplos · 24 de octubre de 2026

- Aplicada a las ocho aventuras y los 28 temas de kínder. Se conserva la rotación existente de dictado de palabras y números.
- `npm test`: 26 pruebas aprobadas. Las nuevas pruebas recorren ocho variantes por módulo y comprueban material diferente, respuestas únicas, aritmética, patrones, clasificación, seriación y simetría sin modificar los bancos originales.
- Edge: completadas una ronda original y otra nueva mediante el botón de repetición en cada uno de los 36 módulos, sin errores de ejecución. Verificadas las nuevas preguntas, cuadrículas, puzzles, dictados, secuencias y prácticas acompañadas.
- Se conservan ocho estrellas sin duplicados y 28 temas practicados tras recargar. Los contadores de las 36 rondas se guardan y recuperan. Los módulos completados antes de esta mejora empiezan por una variante nueva.
- TypeScript y compilación de producción comprobados. El servidor sigue en localhost:3001, con archivos separados para desarrollo y producción.
- La variedad editorial es finita y se reutiliza por turnos. Los mismos objetivos, figuras geométricas o nombres propios del niño pueden mantenerse con un contexto o dibujo distinto. No hay reconocimiento automático de escritura ni cambio en la revisión adulta de habilidades manuales.

## Diferenciación entre secciones · 24 de octubre de 2026

- Se eliminaron importaciones directas de ejercicios de aventuras al temario. Clasificación pasó a selección múltiple para formar grupos; seriación pasó a construir la fila; problemas usa historias con lápices, cubos y otros objetos. Cuentos y patrones escolares tienen bancos propios en las rondas iniciales y alternativas.
- Se mantienen los 28 temas, sus IDs y el progreso anterior. «El cuento de la regadera» ahora aparece como «Cuentos del colegio»; «Problemas con semillas» como «Problemas de la sala».
- `npm test`: 29 pruebas aprobadas. Nuevas comprobaciones comparan ejercicios y relatos entre secciones en 12 variantes, verifican atributos de todos los objetos del grupo, tamaños de las series y aritmética de los problemas escolares. TypeScript y producción aprobados.
- Edge: dos rondas de clasificación, seriación, problemas, cuentos y patrones completadas; reintentos de selección y orden disponibles, conservación de 28 temas y ocho estrellas tras recargar, sin errores de ejecución. Clasificación y seriación comprobadas a 320 px, sin desbordamiento horizontal; capturas revisadas visualmente.
- Las habilidades pueden coincidir entre secciones para reforzar el aprendizaje; las tareas, materiales y relatos ya no son copias directas.

## Bancos ampliados e historial de ejemplos · 24 de octubre de 2026

- Dictado ampliado a 81 palabras con tres entradas por letra y conservación de los 27 índices anteriores. Cuentos: 12 escolares exclusivos y 12 alternativos de aventura, más el original. Bancos ampliados de rimas, sinónimos, sílabas, sílaba inicial, textos, secuencias y modelos visuales.
- Selección de rondas con menor coincidencia con ejemplos recientes en los 36 módulos. Se guarda un máximo de 128 identificadores resumidos por módulo; se conserva el progreso previo y las rotaciones de dictado.
- `npm test`: 35 pruebas aprobadas. Se comprueban rondas sin repetición de cuento en doce intentos, prioridad de ejemplos nuevos y luego antiguos, estabilidad frente a cambiar posiciones de respuestas, historial acotado, bancos y correspondencia de las seis piezas con su ilustración.
- TypeScript y compilación de producción aprobados. Edge: dos rondas seleccionadas de los 28 temas y de las ocho aventuras completadas sin errores de ejecución, con recuperación del historial y los 28 temas tras recargar y conservación de ocho estrellas sin duplicados.
- Rompecabezas nuevos de barco y tren comprobados: las doce imágenes de piezas (bandeja y tablero) coinciden con el modelo completo en cada tarea. Vista de 320 px sin desbordamiento; captura revisada visualmente.
- Se corrigió el paso de la variante de ilustración a las piezas del rompecabezas: antes solo llegaba al modelo completo.
- Banco numérico limitado a 0–20 y metas del temario conservadas. Los bancos finitos se reutilizan priorizando lo menos reciente cuando no hay ejemplos nuevos. No se ha repetido la validación auditiva ni física en tablet.

## Básica · Lenguaje y Matemática de 1.º a 6.º · 24 de octubre de 2026

- Fuente: PDF entregado por la familia, `articles-22394_bases.pdf`, 414 páginas. Se extrajeron y revisaron los objetivos seleccionados de Matemática (PDF 229–256) y Lenguaje y Comunicación (PDF 310–341). Revisión visual de PDF 255 y 338 para confirmar formato, asignatura y numeración. No se incorporan las otras asignaturas.
- Se añadieron 60 actividades: cinco por asignatura y curso. Los códigos OA y páginas impresas/PDF se muestran y están trazados en `BASICA_CURRICULAR.md`. Son prácticas parciales, no cobertura total del currículum.
- `npm test`: 40 pruebas aprobadas. Comprueban cursos/asignaturas, referencias, 20 variantes de contenido por actividad, coherencia aritmética, alcance de primero/segundo, fracciones equivalentes, coma decimal, progreso y complejidad narrativa creciente. TypeScript y producción aprobados.
- Edge de escritorio: completadas dos rondas de cada una de las 60 actividades. Respuestas incorrectas permiten corregir, pistas disponibles, avance tras resolver, selección por curso y asignatura, referencias visibles y repetición con ejemplos alternativos.
- Escritura: borrador con teclado o papel y pauta de cuatro criterios; botón de registro bloqueado hasta confirmar la revisión y tener borrador o marcar trabajo en papel. No se califica automáticamente la calidad.
- Matemática: probadas respuestas con coma decimal y fracciones equivalentes al doble del numerador y denominador. Vistas de pictogramas, fracciones impropias, barras dobles y escritura revisadas a 320 px, sin desbordamiento horizontal; capturas inspeccionadas visualmente.
- Tras recargar se recuperan 60 actividades completadas. La clave nueva `lumiko-basica-v1` guarda solo IDs, contadores e historial resumido; conserva 28 temas de kínder y ocho estrellas anteriores. No se guardan borradores. Sin errores de ejecución capturados.
- Voz sustituida durante la automatización: pronunciación real no validada. Sin revisión docente externa, prueba con alumnos ni prueba física en tablet. El documento entregado presenta Bases 2012; no se afirma haber contrastado su vigencia con publicaciones posteriores.

## Más práctica en básica · 24 de octubre de 2026

Las 60 actividades de 1.º a 6.º básico tienen ahora ocho ejercicios por ronda (dos consignas en escritura): 444 ejercicios o pautas en total al recorrerlas todas. Hay bancos ampliados y exclusión de ejercicios idénticos dentro de una ronda. Se mantiene el progreso existente. Verificación: 41 pruebas automáticas, incluida generación de 40 rondas por actividad, y revisión de tipos.

La compilación de producción también finalizó correctamente.

## Navegación por niveles

Comprobado en Edge: Inicio → Elegir mi nivel → Kínder → temario → aventuras adicionales → temario → Niveles → Básica → 6.º → Matemática → Niveles. Revisión a 320 px sin desbordamiento horizontal. Revisión de tipos correcta.

## Ampliación de sonidos de kínder

43 pruebas y revisión de tipos correctas. Se verificaron 80 variantes de las actividades de sonidos: cada pregunta tiene una única respuesta correcta considerando los sonidos compartidos del español chileno. Reconocimiento escrito cubre las 27 letras. Edge: completadas las cinco actividades ampliadas o nuevas y comprobado su reinicio con seis ejercicios. El progreso previo de k-initial y k-syllabic se conserva.

## Primeras sílabas ampliadas

44 pruebas y revisión de tipos correctas. Se revisaron 80 variantes por parte: cobertura de las 27 letras, seis preguntas por ronda, opciones distintas y un único acierto considerando la sílaba hablada. H muda y coincidencias B/V y S/Z contempladas; W y X se trabajan en palabras concretas con acompañamiento. En Edge se completaron ambas partes y se comprobó la repetición.

## Cuatro módulos de descubrimiento

45 pruebas y revisión de tipos correctas. Se verificaron 40 variantes por módulo: sílabas que forman la palabra, cantidades con dos descomposiciones posibles y destinos alcanzables. Edge: finalización de los 24 ejercicios iniciales, repetición de los cuatro módulos y vista de 320 px sin desbordamiento horizontal. Se comprobó que el registro oral esté bloqueado antes de confirmar la conversación y que la composición rechace una pareja repetida. Sin errores de ejecución del navegador.

## Sílabas extra para armar palabras

Armamos palabras con sílabas presenta una sílaba extra en los dos primeros ejercicios y dos en los siguientes. Todas las piezas se mezclan, incluidas ocurrencias repetidas necesarias (como na en banana). Las piezas extra no forman parte de la respuesta. Se muestra cuántas sílabas necesita la palabra y se permite deshacer. Comprobado en Edge: rechazo de una respuesta con distractor, corrección tras deshacer, finalización de seis ejercicios, repetición y ancho móvil de 320 px. 46 pruebas y revisión de tipos correctas.

## Orden progresivo de kínder

Revisión de tipos correcta. En Edge se comprobó que las 36 actividades aparezcan exactamente una vez, ordenadas en tres bloques por área, y que se abran las actividades de Lenguaje, Matemática y Habilidades. Vista de 320 px sin desbordamiento horizontal. Se mantienen identificadores y almacenamiento del progreso.

## Emociones y convivencia

48 pruebas y revisión de tipos correctas. Se comprobó que las 40 actividades estén incluidas una sola vez en su área, que existan 32 situaciones sociales distintas y que las tareas sociales no tengan respuesta única. Edge: finalización de las 24 situaciones iniciales, elección de otras emociones, exploración de alternativas, confirmación adulta, guardado, repetición y vista de 320 px sin desbordamiento horizontal. El registro se bloquea hasta elegir emoción y acción y confirmar la conversación; cambiar una elección reinicia esa confirmación. Sin errores de ejecución.

## Alternativas sociales contextualizadas

48 pruebas y revisión de tipos correctas. Edge: verificadas las alternativas propias de 24 situaciones, su explicación al elegir la tercera opción, registro acompañado y repetición de los cuatro módulos. Vista móvil de 320 px sin desbordamiento. El contenido mantiene las 32 escenas y los identificadores de progreso.

## Taller visual de palabras

48 pruebas y revisión de tipos correctas. En Edge se completaron tres rondas del taller: selección, audio disponible por ficha, pista, rechazo de palabra incorrecta, retiro de una ficha, deshacer, confirmación y avance. Capturas de escritorio, acierto y móvil revisadas visualmente. Verificado encabezado y botón Siguiente visibles sin desplazamiento en 1366 × 680 al 100 %; ancho móvil de 320 px sin desbordamiento horizontal. Los estilos están limitados a la sesión de esta actividad.

## Diseño de sonidos y primeras sílabas

48 pruebas y revisión de tipos correctas. Edge: completadas dos rondas de cada una de las cuatro actividades (48 preguntas), con comprobación de audio solicitado para modelo y alternativas, pista, respuesta incorrecta, acierto y repetición. Capturas de sonidos, sílabas y móvil revisadas visualmente. Botones de avance o finalización visibles sin desplazamiento en todas las preguntas de la ronda inicial a 1366 × 680 al 100 %; sin desbordamiento horizontal a 320 px. Sin errores de ejecución.

## Taller de cantidades del 10 al 20

48 pruebas y revisión de tipos correctas. Edge: completadas dos rondas de once preguntas (22 en total). Verificados cantidad de objetos y filas, marcar y desmarcar, reiniciar marcas, conteo hablado solicitado, audio de alternativas, pista, respuesta incorrecta, acierto y repetición. Botones de avance y finalización visibles a 1366 × 680 al 100 %, sin desplazamiento. Capturas de 20 objetos en escritorio y móvil revisadas visualmente; sin desbordamiento horizontal a 320 px ni errores de ejecución.

## Imágenes en alternativas de patrones

Las alternativas del temario de patrones usan la misma imagen del objeto que la secuencia, según el nombre de la opción y no su posición. Edge: completadas dos rondas de cuatro patrones y verificadas todas las imágenes, incluida la repetición; sin desbordamiento horizontal a 320 px. Revisión de tipos correcta.

## Avance visible en patrones

El botón de avance se muestra desde el inicio, desactivado hasta acertar, con una indicación para elegir imagen. Se compactan los espacios del ejercicio y se mantiene el control de avance visible al desplazarse. Edge: dos rondas completas, respuesta incorrecta sin habilitar avance, acierto habilitando Siguiente o Terminar y controles dentro del viewport de 1366 × 680. Captura revisada visualmente. Avance comprobado también a 320 px sin desbordamiento horizontal. Revisión de tipos correcta.

## Taller de composición con bandejas

48 pruebas y revisión de tipos correctas. Edge: dos rondas completas (12 ejercicios) con movimiento de objetos en ambos sentidos, conservación del total, impedimento de vaciar una bandeja, rechazo de la pareja invertida, dos combinaciones distintas, bloqueo al finalizar y repetición. Botones de avance/finalización visibles a 1366 × 680. Capturas con diez objetos revisadas en escritorio y móvil; sin desbordamiento a 320 px. Sin errores de ejecución.

## Taller de problemas con objetos

48 pruebas y revisión de tipos correctas. Edge: dos rondas completas (12 problemas), guardar y sacar objetos, conservación de la colección, bloqueo de respuestas antes del movimiento, reinicio, respuesta incorrecta, acierto, finalización y repetición. Se incluyó la caja vacía con resultado cero. Controles visibles a 1366 × 680; capturas revisadas visualmente en escritorio y móvil. En móvil se comprobó también movimiento, respuesta y avance; los controles siguen el flujo para no tapar alternativas. Sin desbordamiento horizontal ni errores de ejecución.

## Diseño de recta y vecinos

49 pruebas y revisión de tipos correctas. Nueva comprobación de 80 variantes por actividad: un único espacio faltante y relaciones anterior/siguiente coherentes dentro de 0 a 20. Edge: dos rondas de cada actividad, audio de números del camino, pista, respuesta incorrecta, acierto, revelado del espacio y repetición. Controles visibles a 1366 × 680; interacción y avance también comprobados a 320 px sin desbordamiento horizontal. Capturas de escritorio y móvil revisadas visualmente. Sin errores de ejecución.

## Diseño de La fila del huerto

50 pruebas y revisión de tipos correctas. Se comprobaron 80 variantes: cinco posiciones por ronda y correspondencia de cada respuesta con su imagen y lugar en la fila. Edge: dos rondas completas (10 preguntas), audio de posiciones, pista, error, acierto, finalización y repetición. Botón de avance y explicación sin superposición dentro de 1366 × 680. Capturas revisadas en escritorio y móvil; interacción y avance comprobados a 320 px sin desbordamiento horizontal ni errores de ejecución.

## Nuevo diseño de patrones

50 pruebas y revisión de tipos correctas. Edge: dos rondas de los cuatro tipos de patrón, imágenes de alternativas correspondientes a sus nombres, audio del camino, pista visual de longitud correcta, error sin habilitar avance, acierto completando el camino y repetición. Avance y explicación de Lumi sin superposición a 1366 × 680, incluso con pista visible. Capturas revisadas visualmente. A 320 px se comprobó desplazar la fila, volver al inicio, responder y avanzar sin desbordamiento horizontal de la página. Sin errores de ejecución.

## Diseño de Orden por tamaño

50 pruebas y revisión de tipos correctas. Edge: dos rondas completas (seis ejercicios), ambos sentidos, intento en orden inverso sin habilitar avance, pista tras el error, retiro de figura intermedia, deshacer, reconstrucción correcta y repetición. Botón y explicación sin superposición a 1366 × 680. Capturas revisadas visualmente en escritorio y móvil. Interacción y avance comprobados a 320 px sin desbordamiento horizontal ni errores de ejecución.

## Diseño de Forma, color y tamaño

50 pruebas y revisión de tipos correctas. Edge: dos rondas completas con una, dos y tres pistas, audio, selección incorrecta, selección incompleta, alternar una figura, quitar selección, acierto y repetición. Se comprueba la cantidad de pistas y de figuras seleccionadas. Explicación y avance sin superposición a 1366 × 680. Capturas revisadas visualmente en escritorio y móvil; selección, comprobación y avance a 320 px sin desbordamiento horizontal ni errores de ejecución.

## Diseño de Cuerpos geométricos

50 pruebas y revisión de tipos correctas. Edge: dos rondas completas (10 preguntas), cinco dibujos, audio de pregunta, pista específica por forma, error, volver a pedir pista, acierto y repetición. Avance y explicación sin superposición a 1366 × 680. Capturas revisadas visualmente en escritorio y móvil; respuesta y avance comprobados a 320 px sin desbordamiento horizontal ni errores de ejecución.

## Diseño de Historias en cuatro imágenes

50 pruebas y revisión de tipos correctas. Edge: dos rondas completas (seis historias), rechazo de orden inverso, retiro de una imagen intermedia, deshacer, pista, reconstrucción correcta y repetición. Comprobado el audio de la historia armada desde Primero hasta Al final. Explicación y avance sin superposición a 1366 × 680. Capturas de escritorio y móvil revisadas visualmente; construcción, comprobación y avance también a 320 px sin desbordamiento horizontal ni errores de ejecución.

## Diseño de Guiamos a Lumi

50 pruebas y revisión de tipos correctas. Edge: dos rondas completas (12 recorridos), bordes bloqueados, audio de dirección y camino, llegada, deshacer reiniciando confirmación, reiniciar, registro acompañado y repetición. Se comprueba el bloqueo de registro y avance antes de llegar y confirmar. Controles y explicación sin superposición a 1366 × 680. Capturas revisadas visualmente; recorrido, registro y avance a 320 px sin desbordamiento horizontal ni errores de ejecución.

## Diseño de Dictado de números

50 pruebas y revisión de tipos correctas. Edge: dos rondas de cinco números, incluidos 0 y 20, audio de dictado, entrada física y teclado en pantalla, borrar todo, borrar una cifra, respuesta incorrecta, pista y acierto. Modo papel: modelo oculto al comenzar, apertura/cierre de pizarra, mostrar modelo y registro bloqueado hasta revisión adulta. Explicación y avance sin superposición en ambos modos a 1366 × 680. Capturas revisadas visualmente; escritura y avance también a 320 px sin desbordamiento horizontal ni errores de ejecución. La pizarra compartida conserva su implementación al pasar a un componente propio.

## Diseño de ¿Cuál comienza diferente?

50 pruebas y revisión de tipos correctas. Edge: dos rondas completas (12 ejercicios), error sin habilitar avance, pista, acierto, comparación revelada y repetición. Explicación y avance sin superposición a 1366 × 680. Capturas revisadas visualmente en escritorio y móvil; respuesta y avance a 320 px sin desbordamiento horizontal ni errores de ejecución.

## Diseño de Exploramos todas las letras

50 pruebas y revisión de tipos correctas. Edge: dos rondas completas (12 ejercicios), audio de nombres de letras, error sin habilitar avance, pista destacando la inicial, acierto y repetición. Explicación y avance sin superposición a 1366 × 680. Capturas revisadas visualmente; respuesta y avance también a 320 px sin desbordamiento horizontal ni errores de ejecución.

## Diseño de Palabras que riman

51 pruebas correctas, incluida validación de terminaciones e imágenes durante 40 variantes. Edge: tres rondas completas (nueve ejercicios), error sin avance, pista, acierto, terminaciones destacadas, audio de la rima y repetición. Explicación y avance sin superposición a 1366 × 680. Capturas de escritorio y móvil revisadas; respuesta y avance a 320 px sin desbordamiento horizontal ni errores de ejecución.

## Diseño de Contamos palabras

51 pruebas y revisión de tipos correctas. Edge: tres rondas completas (nueve ejercicios), audio de oración, marcar, desmarcar, quitar marcas, respuesta incorrecta, pista, acierto y numeración de todas las palabras. Repetición y avance comprobados; explicación y botón sin superposición a 1366 × 680. Capturas revisadas visualmente en escritorio y móvil; interacción a 320 px sin desbordamiento horizontal ni errores de ejecución.

## Diseño de Cuentos del colegio

51 pruebas y revisión de tipos correctas. Edge: cuatro rondas completas (12 preguntas), audio del cuento completo y por partes, respuesta incorrecta sin avance, pista, acierto y repetición. Explicación y avance sin superposición a 1366 × 680. Capturas revisadas en escritorio y móvil; respuesta y avance a 320 px sin desbordamiento horizontal ni errores de ejecución.

## Diseño de Palabras parecidas

51 pruebas y revisión de tipos correctas. Edge: tres rondas completas (nueve ejercicios), audio de alternativas en orden, error sin avance, pista sin revelar respuesta, acierto, audio de explicación y repetición. Explicación y avance sin superposición a 1366 × 680. Capturas revisadas en escritorio y móvil; respuesta y avance a 320 px sin desbordamiento horizontal ni errores de ejecución.

## Diseño de ¿Qué tipo de texto es?

51 pruebas y revisión de tipos correctas. Edge: dos rondas completas de escritorio (ocho ejercicios), cuatro tipos de texto, conservación de líneas, viñetas, audio completo y por viñeta, error sin avance, pista, acierto y repetición. Explicación y avance sin superposición a 1366 × 680. Capturas revisadas visualmente; una ronda completa adicional a 320 px sin desbordamiento horizontal ni errores de ejecución.

## Diseño de escritura acompañada

51 pruebas y revisión de tipos correctas. Edge: nombre y apellido y cinco dictados, dibujo, borrado, cambio entre pizarra y papel, revisión reiniciada tras editar o cambiar modo, modelo oculto al inicio, registro bloqueado hasta revisión y repetición. Explicación y avance sin superposición a 1366 × 680, incluso con ayuda adulta abierta. Capturas revisadas; registro y avance a 320 px sin desbordamiento horizontal ni errores de ejecución.

## Diseño de Contamos lo que vemos

51 pruebas y revisión de tipos correctas. Edge: dos rondas completas (12 conversaciones), audio de descripción, pregunta activa, pista, registro bloqueado antes de confirmar acompañamiento, marcar y desmarcar revisión, registro y repetición. Explicación y avance sin superposición a 1366 × 680. Capturas revisadas visualmente; registro y avance a 320 px sin desbordamiento horizontal ni errores de ejecución.

## Diseño de Copia el patrón visual

51 pruebas y revisión de tipos correctas. Edge: dos rondas completas (seis cuadrículas), copia vacía rechazada, marcar/desmarcar, borrar, deshacer, pista por filas, copia correcta y repetición. Explicación y avance sin superposición a 1366 × 680. Capturas revisadas; copia y avance a 320 px sin desbordamiento horizontal ni errores de ejecución.

## Diseño de El otro lado del espejo

51 pruebas y revisión de tipos correctas. Edge: dos rondas completas (cuatro reflejos), modelo fijo, respuesta incompleta rechazada, marcar/desmarcar, borrar solo lado derecho, deshacer, pista recorriendo filas, acierto y repetición. Explicación y avance sin superposición a 1366 × 680. Capturas revisadas; reflejo y avance a 320 px sin desbordamiento horizontal ni errores de ejecución.

## Diseño de Rompecabezas de seis piezas

51 pruebas y revisión de tipos correctas. Edge: dos rondas completas (cuatro rompecabezas), mostrar/ocultar modelo, colocar, retirar, deshacer, reiniciar, armado inverso rechazado, pista, acierto y repetición. Explicación y avance sin superposición a 1366 × 680, incluso con modelo visible. Capturas revisadas; armado y avance a 320 px sin desbordamiento horizontal ni errores de ejecución.

## Diseño de Figura y fondo

51 pruebas y revisión de tipos correctas. Edge: dos rondas completas (seis ejercicios), cuatro alternativas visuales, audio, error sin avance, pista con fondo atenuado, acierto y repetición. Explicación y avance sin superposición a 1366 × 680. Capturas revisadas; respuesta y avance a 320 px sin desbordamiento horizontal ni errores de ejecución.

## Diseño de Copiamos una figura

51 pruebas y revisión de tipos correctas. Edge: dos rondas completas (cuatro modelos), dibujo, borrado con teclado, revisión reiniciada al editar, práctica en papel, registro bloqueado hasta acompañamiento y repetición. Modelo correspondiente a cada ejercicio; explicación y avance sin superposición a 1366 × 680. Capturas revisadas; registro y avance a 320 px sin desbordamiento horizontal ni errores de ejecución.

## Diseño de Conocemos nuestro cuerpo

51 pruebas y revisión de tipos correctas. Edge: tres rondas completas (nueve ejercicios), error sin avance, destaque corporal solo después del acierto, pista, audio de pasos, movimientos con registro bloqueado hasta revisión adulta y repetición. Explicación y avance sin superposición a 1366 × 680. Capturas revisadas; respuesta y avance a 320 px sin desbordamiento horizontal ni errores de ejecución.

## Diseño de Derecha e izquierda

51 pruebas y revisión de tipos correctas. Edge: tres rondas completas (nueve ejercicios), flechas con audio de dirección, objetos en sus posiciones originales, error sin avance, pista, acierto, movimientos con revisión adulta y repetición. Explicación y avance sin superposición a 1366 × 680. Capturas revisadas; respuesta y avance a 320 px sin desbordamiento horizontal ni errores de ejecución.

## Diseño de Recortar y troquelar

51 pruebas y revisión de tipos correctas. Edge: dos rondas completas de escritorio (cuatro actividades), plantillas, audio de materiales y de los tres pasos, paso activo, pista, revisión marcada/desmarcada, registro bloqueado hasta acompañamiento y repetición. Explicación y avance sin superposición a 1366 × 680. Capturas revisadas; ronda completa adicional a 320 px sin desbordamiento horizontal ni errores de ejecución.

## Renovación completa de Emociones y convivencia

51 pruebas y revisión de tipos correctas. Edge: dos rondas completas en cada una de las cuatro actividades (48 situaciones); las tres acciones y consecuencias de cada situación, audio, elección de otra/varias/no sé, navegación entre momentos, registro bloqueado hasta revisión adulta, revisión reiniciada al cambiar emoción y repetición. En todos los momentos, explicación y avance sin superposición a 1366 × 680. Capturas revisadas visualmente. A 320 px se recorrieron los tres momentos y se verificó registro, avance y reinicio de revisión al cambiar de acción en las cuatro actividades, sin desbordamiento horizontal. Sin errores de ejecución en el recorrido de 48 situaciones.

## Mapa de niveles y desbloqueo secuencial

55 pruebas correctas: incluye cobertura única de las 40 actividades, primera parada disponible, desbloqueo de todos los prefijos, progreso antiguo fuera de orden y accesibilidad de ambos portales. Edge a 1366 × 680: Continuar mi aventura abre los dos destinos; con almacenamiento nuevo hay una actividad disponible y 39 bloqueadas; completar realmente los seis ejercicios de sonidos iniciales abre la segunda y mantiene la tercera bloqueada. Entrar y salir de la segunda no desbloquea la tercera. La recarga conserva el progreso. Se comprobó caminar al portal de Básica y al de Kínder. Registros antiguos y ciclos de dictado preservados; con las 40 completadas todas se pueden repetir. Capturas revisadas. A 320 px: mapa desplazable hasta la última parada bloqueada, retorno al siguiente descubrimiento, botones de nivel y acceso a Básica sin desbordamiento horizontal. Sin errores de ejecución en el recorrido principal.

## Mapas por asignatura

55 pruebas correctas; la validación de desbloqueo ahora recorre cada prefijo de cada asignatura y comprueba que no altere las otras. Edge: cuatro destinos con 15/13/8/4 actividades, primera disponible por asignatura, completar realmente sonidos iniciales abre solo la segunda de Lenguaje, Matemática conserva solo su primera disponible, persistencia tras recarga y navegación de regreso. Capturas de mapa de asignaturas y actividades revisadas a 1366 × 680. En móvil de 320 px se abrieron las cuatro asignaturas y sus primeras actividades, regresando a ambos mapas sin desbordamiento horizontal ni errores de ejecución.

## Mapas y desbloqueo de Básica

58 pruebas correctas: cobertura única de las 60 actividades, desbloqueo de todos los prefijos por curso/asignatura, independencia entre los doce recorridos y repetición de progreso antiguo fuera de orden. Edge: seis mapas de curso, dos asignaturas por curso, cinco actividades por recorrido, primera disponible y cuatro bloqueadas sin progreso. Completar ocho ejercicios de 1.º Lenguaje abre su segunda actividad; Matemática sigue con la primera disponible. Persistencia tras recarga. Capturas revisadas a 1366 × 680 y 320 px. En móvil se abrieron los doce recorridos y sus primeras actividades y se comprobó la navegación de regreso, sin desbordamiento horizontal ni errores de ejecución.

## Mapas isométricos con explorador

58 pruebas de contenido, progreso y desbloqueos correctas; revisión de tipos correcta. Edge: mapa de asignaturas de Kínder, recorrido por tramos y regreso a la próxima actividad, toque directo en portal bloqueado rechazado, caminata hasta una asignatura tocando su portal y navegación mediante botones que también hacen caminar. Finalización real de seis ejercicios de sonidos iniciales y desbloqueo posterior de la segunda actividad. Básica: seis portales de curso, asignaturas y recorrido de 6.º Matemática. Avatar personalizado con sombrero y Lumi visibles en capturas revisadas. Escritorio 1366 × 680 y móvil 320 px: acceso caminando a la primera actividad, candados preservados, sin desbordamiento horizontal ni errores de ejecución. Los mapas de actividades mantienen su numeración global al cambiar tramo.

## Ampliación de mapas

60 pruebas correctas: posiciones de los seis destinos alcanzables y tramos de tres sin pérdida de actividades ni numeración. Edge a 1366 × 680: lienzo ampliado con ancho superior a 620 px, tres portales por tramo y todos los botones de actividad visibles; caminar abre el ejercicio, cambiar tramo conserva candados y numeración 4–6, y volver al próximo descubrimiento funciona. En Básica, cinco actividades se dividen en tramos de tres y dos. A 320 px: visor con desplazamiento horizontal, centrado al cambiar tamaño, sin desbordamiento de la página y con acceso caminando mediante los botones. Capturas revisadas; sin errores de ejecución.

## Isla única por asignatura

60 pruebas correctas; posiciones únicas, separadas y alcanzables para entre 1 y 15 destinos. Revisión de tipos correcta. Edge: 15 actividades de Lenguaje y 13 de Matemática en el mismo escenario, sin controles de tramos; toque directo al último portal bloqueado rechazado. Completar seis ejercicios abre la segunda actividad y mantiene los demás bloqueados. Básica muestra sus cinco actividades juntas. Capturas de escritorio 1366 × 680 y móvil 320 px revisadas; panel de controles dentro de la pantalla en escritorio, desplazamiento lateral del mapa en móvil sin desbordamiento de la página, entrada caminando a la segunda actividad y ausencia de errores de ejecución.

## Personalización ampliada del personaje

63 pruebas correctas, incluidas migración de apariencias antiguas, persistencia de opciones nuevas y valores no reconocidos. Edge: cinco peinados, siete accesorios y tres diseños de camiseta generan SVG válido y vista previa; tonos de piel/cabello, camiseta, pantalones, zapatos y color de accesorio. Cambios guardados tras recarga; apariencia anterior compatible, Sorpréndeme y restablecer sin alterar el progreso de kínder. Capturas de Ropa y Accesorios revisadas a 1366 × 680, con botón de regreso visible. Revisión a 320 px sin desbordamiento horizontal y entrada posterior al mapa de kínder sin errores de ejecución.

## Preparación de GitHub Pages

63 pruebas correctas. Compilación estática bajo /lumiko/ completada. Edge sobre un servidor estático local montado en /lumiko/: bienvenida, editor, mapa Phaser, asignaturas, actividades, entrada a sonidos iniciales y regreso por el logo. No hubo respuestas 404 en los archivos de la aplicación ni errores de ejecución. La configuración de despliegue sigue el flujo oficial configure-pages, upload-pages-artifact y deploy-pages. Publicación remota pendiente de crear y conectar el repositorio; no se verificó todavía una URL pública.

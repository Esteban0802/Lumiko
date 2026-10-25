import type {SchoolLesson} from './school-content';
export type SocialTask={kind:'social';prompt:string;scene:string;icon:string;feelingPrompt:string;actionPrompt:string;actions:{label:string;consequence:string}[];conversation:string};
const scenes:Record<string,[string,string][] >={
 'k-feelings':[
 ['Lumi llega a un juego del patio y todavía nadie lo invita a participar.','🛝'],['Lumi termina un dibujo que quería regalar a su familia.','🎨'],['La torre de cubos de Lumi se cae cuando estaba por terminarla.','🧱'],['Hoy llega una compañera nueva al curso de Lumi.','🎒'],['Lumi escucha un ruido fuerte durante una actividad.','🥁'],['Un amigo de Lumi faltó y hoy no pueden jugar juntos.','🧸'],['Lumi intenta un rompecabezas y encuentra dónde va una pieza.','🧩'],['Cambian el lugar donde Lumi se sentaba para escuchar cuentos.','📚']
 ],
 'k-needs':[
 ['Lumi quiere participar en una mesa donde están dibujando.','✏️'],['Lumi no entiende la consigna que dio la educadora.','📝'],['Lumi necesita un lápiz y su compañero tiene varios.','🖍️'],['A Lumi le molesta el ruido y necesita un momento de tranquilidad.','🔔'],['Lumi no quiere que lo abracen en este momento.','🙌'],['Lumi tiene sed después de jugar en el patio.','💧'],['Lumi quiere contar una idea mientras otra persona habla.','💬'],['Lumi necesita ayuda para cerrar su mochila.','🎒']
 ],
 'k-solutions':[
 ['Lumi y una compañera quieren usar el mismo camión de juguete.','🚚'],['Dos compañeros proponen juegos distintos y Lumi quiere que puedan conversar.','⚽'],['Un compañero pasa sin querer y desarma parte de la construcción de Lumi.','🧱'],['Lumi y su grupo no se ponen de acuerdo sobre el color de un cartel.','🎨'],['Una compañera dice que Lumi cambió una regla del juego, pero él recuerda otra cosa.','🎲'],['Dos niños toman el mismo cuento al mismo tiempo.','📕'],['Lumi quiere seguir hablando y un compañero también quiere contar su idea.','💭'],['El equipo tiene una sola pala para trabajar en el huerto.','🪴']
 ],
 'k-care':[
 ['El grupo de Lumi debe guardar los materiales después de pintar.','🖌️'],['Una compañera se cae en el patio y necesita acompañamiento.','🩹'],['El equipo quiere llevar varios libros a la biblioteca.','📚'],['Lumi ve agua derramada cerca de donde están caminando sus compañeros.','💦'],['Un compañero no alcanza una caja que está en una repisa alta.','📦'],['En un juego de equipo, alguien todavía no ha tenido un turno.','🏀'],['Una compañera no encuentra su chaqueta al salir al patio.','🧥'],['El grupo prepara una mesa para una actividad compartida.','🪑']
 ]
};
// Each scene has concrete child-sized choices, including everyday impulses to discuss.
const sceneChoices:Record<string,[string,string][][]>={
 'k-feelings':[
  [['Pregunto: ¿puedo jugar?','Así los demás saben que Lumi quiere jugar.'],['Me quedo mirando','Los demás quizás no sepan que Lumi quiere participar.'],['Busco a la tía','La tía puede acompañar a Lumi a preguntar.']],
  [['Muestro mi dibujo','Lumi puede compartir algo que le gusta.'],['Lo guardo para regalarlo','Puede elegir cuándo mostrar su regalo.'],['Digo: ¡me quedó bonito!','Puede contar que está contento con su trabajo.']],
  [['Lo intento otra vez','Puede probar cómo hacer una torre más firme.'],['Digo: ¡estoy enojado!','Puede decir lo que siente sin hacer daño.'],['Pido ayuda','Alguien puede acompañarlo a reconstruirla.']],
  [['Le digo: hola, ¿jugamos?','La compañera puede sentirse bienvenida.'],['Le pregunto su nombre','Pueden empezar a conocerse.'],['Me da vergüenza y espero','Puede tomarse un momento y pedir compañía para acercarse.']],
  [['Me tapo los oídos','Puede bajar un poco la molestia mientras pide ayuda.'],['Digo: ese ruido me asusta','La tía puede escuchar y acompañarlo.'],['Me acerco a la tía','Puede buscar un lugar más tranquilo con ella.']],
  [['Digo: extraño a mi amigo','Puede contar que está triste.'],['Invito a otro niño a jugar','Puede jugar con otra persona y seguir extrañando a su amigo.'],['Quiero estar tranquilo un rato','Puede pedir un momento de calma.']],
  [['Digo: ¡lo encontré!','Puede compartir su alegría.'],['Sigo con otra pieza','Puede disfrutar de seguir intentando.'],['Muestro la pieza a un amigo','Puede compartir su descubrimiento.']],
  [['Pregunto dónde me siento','Puede saber cuál es su nuevo lugar.'],['Digo: me gustaba mi lugar','La tía puede escuchar cómo se siente.'],['Me siento junto a un amigo','Puede preguntar si ese lugar está disponible.']]
 ],
 'k-needs':[
  [['¿Puedo dibujar con ustedes?','Los demás pueden hacerle un espacio.'],['¿Me prestas una hoja?','Así saben qué material necesita.'],['Me quedo mirando sin hablar','Tal vez no sepan que quiere dibujar con ellos.']],
  [['Tía, ¿me muestras cómo?','La tía puede mostrarle el primer paso.'],['No entendí, ¿me repites?','Puede escuchar la explicación otra vez.'],['Empiezo sin preguntar','Tal vez siga sin saber qué hacer; puede pedir ayuda.']],
  [['¿Me prestas un lápiz?','Su compañero puede responder y elegir cuál prestar.'],['Tomo uno sin preguntar','Su compañero puede molestarse. Puede devolverlo y pedirlo.'],['Tía, me falta un lápiz','La tía puede ayudarlo a conseguir uno.']],
  [['Tía, necesito un lugar tranquilo','Puede buscar un lugar tranquilo con ella.'],['Digo: me molesta el ruido','Los demás pueden entender qué le pasa.'],['Grito para que me escuchen','El ruido puede aumentar. Puede probar decirlo cerca de la tía.']],
  [['Ahora no quiero un abrazo','Puede decir que no quiere contacto.'],['Prefiero saludar con la mano','Puede elegir otra forma de saludar.'],['Le pido ayuda a la tía','La tía puede ayudar a que respeten su espacio.']],
  [['Tía, tengo sed','La tía puede ayudarlo a buscar agua.'],['Busco mi botella de agua','Puede beber de su botella cuando corresponda.'],['Sigo jugando sin decir nada','Puede seguir con sed. Contarlo permite recibir ayuda.']],
  [['Levanto la mano','Puede mostrar que quiere hablar.'],['¿Después puedo contar algo?','Puede pedir un turno.'],['Hablo encima de mi compañero','Puede ser difícil escuchar a los dos. Puede esperar su turno.']],
  [['¿Me ayudas con el cierre?','Puede recibir ayuda con su mochila.'],['Lo intento despacio otra vez','Puede probar y pedir ayuda si la necesita.'],['Dejo la mochila abierta','Pueden caerse sus cosas. Puede pedir ayuda para cerrarla.']]
 ],
 'k-solutions':[
  [['¿Lo usamos por turnos?','Pueden acordar quién juega primero y quién después.'],['Le quito el camión','La compañera puede molestarse. Puede devolverlo y conversar.'],['Tía, queremos el mismo juguete','La tía puede ayudarlos a buscar un acuerdo.']],
  [['Primero tu juego y después el mío','Pueden conversar si les sirve ese orden.'],['Solo quiero jugar a lo mío','El otro niño también puede querer elegir. Pueden escucharse.'],['Busquemos un juego para los dos','Pueden pensar juntos en otro juego.']],
  [['Digo: se cayó mi construcción','Puede contar lo ocurrido y cómo se siente.'],['¿Me ayudas a armarla?','Pueden intentar repararla juntos.'],['Me enojo y no quiero hablar','Puede calmarse un momento y después pedir ayuda.']],
  [['Pintemos una parte de cada color','Pueden ver si esa idea les gusta a todos.'],['Solo quiero mi color','Los demás también tienen ideas. Pueden turnarse para contarlas.'],['Preguntemos qué color quiere cada uno','Pueden escuchar las ideas del grupo.']],
  [['Contemos cómo era la regla','Pueden comparar lo que recuerda cada uno.'],['Digo: ¡yo tengo la razón!','Repetirlo puede no aclarar la regla. Pueden escuchar al otro.'],['Pidamos ayuda a la tía','La tía puede acompañarlos a acordar una regla.']],
  [['Leámoslo juntos','Pueden compartir el cuento si ambos quieren.'],['¿Tú primero y yo después?','Pueden acordar un turno.'],['Lo tiro para quedármelo','El cuento puede romperse. Puede soltarlo y pedir ayuda.']],
  [['Termina tú y después hablo yo','Pueden escucharse de a uno.'],['Sigo hablando más fuerte','Puede ser difícil escucharse. Puede bajar la voz y esperar.'],['Tía, ¿nos ayudas con los turnos?','La tía puede ayudar a que ambos cuenten su idea.']],
  [['Yo cavo y después tú','Pueden acordar turnos con la pala.'],['Busco otra tarea mientras espero','Puede ayudar con otra cosa mientras llega su turno.'],['Me quedo con la pala todo el rato','Los demás se quedan sin turno. Pueden acordar cuándo cambiar.']]
 ],
 'k-care':[
  [['Guardo los pinceles','Así ayuda a dejar los materiales en su lugar.'],['Tú guardas las hojas y yo los lápices','Puede invitar a un compañero a ordenar juntos.'],['Sigo jugando y no guardo','Quedan cosas por ordenar. Puede volver y ayudar con una.']],
  [['Llamo a la tía','Un adulto puede revisar cómo está su compañera.'],['Me quedo cerca y llamo a la tía','Puede acompañarla mientras llega un adulto.'],['Sigo jugando','Quizás no reciba ayuda todavía. Puede avisar a la tía.']],
  [['Llevo un libro','Puede colaborar llevando algo que puede cargar.'],['¿Me ayudas con estos libros?','Puede pedir ayuda para repartirlos.'],['Quiero llevarlos todos','Pueden pesarse o caerse. Puede llevar pocos y pedir ayuda.']],
  [['Tía, hay agua en el suelo','La tía puede ayudar a secar y cuidar el paso.'],['Digo: cuidado, está mojado','Puede avisar a sus compañeros y llamar a la tía.'],['Paso corriendo','Podría resbalar. Puede caminar por una parte seca con ayuda.']],
  [['Tía, ¿nos bajas la caja?','Un adulto puede alcanzar la caja.'],['Espero y pido ayuda','No necesita subirse para alcanzarla.'],['Busco un juego que esté abajo','Puede elegir otro material mientras espera al adulto.']],
  [['Ahora te toca a ti','Puede invitar al compañero a tener su turno.'],['Pregunto quién falta por jugar','Pueden ver quién todavía no ha participado.'],['Pido otro turno para mí','El compañero seguiría esperando. Puede cederle el siguiente turno.']],
  [['Buscamos donde la dejó','Pueden mirar juntos en un lugar conocido.'],['Le pregunto cómo es su chaqueta','Saber su color puede ayudar a buscarla.'],['Le digo a la tía que no aparece','La tía puede acompañarlos a encontrarla.']],
  [['Pongo las hojas en la mesa','Puede ayudar con una tarea sencilla.'],['¿Dónde pongo los lápices?','Preguntar le ayuda a saber dónde colaborar.'],['Quiero hacerlo todo yo','Los demás también pueden ayudar. Pueden elegir una tarea cada uno.']]
 ]
};
export function socialTasks(id:string,v:number):SocialTask[]{const bank=scenes[id];return Array.from({length:6},(_,i)=>{const index=(v*6+i)%bank.length,[scene,icon]=bank[index];return {kind:'social',prompt:'¿Qué harías tú?',scene,icon,feelingPrompt:'¿Cómo crees que se siente?',actionPrompt:'Si fueras Lumi, ¿qué harías?',actions:sceneChoices[id][index].map(([label,consequence])=>({label,consequence})),conversation:'¿Qué pasaría si Lumi hace eso? ¿Qué otra cosa podría hacer? Cuéntalo o muéstralo con gestos.'};});}
export const socialLessons:SchoolLesson[]=[
 {id:'k-feelings',title:'Reconozco emociones',topic:'Identificar y conversar sobre emociones',intro:'Observa situaciones y explora cómo podría sentirse cada personaje.',example:'Una misma situación puede provocar emociones distintas. Elegimos una posibilidad y conversamos sobre las pistas; no adivinamos una respuesta única.'},
 {id:'k-needs',title:'Expreso lo que necesito',topic:'Comunicar necesidades y preferencias',intro:'Practica palabras y gestos para pedir ayuda, expresar una preferencia y poner límites.',example:'Puedes decir: necesito ayuda, ¿puedo participar? o ahora no quiero un abrazo. Un adulto acompaña la conversación.'},
 {id:'k-solutions',title:'Buscamos soluciones',topic:'Escucha, acuerdos y resolución de desacuerdos',intro:'Explora distintas maneras de resolver situaciones cotidianas con respeto.',example:'Podemos escuchar, proponer un acuerdo o pedir apoyo. Miramos qué puede pasar con cada idea y conversamos sobre otras posibilidades.'},
 {id:'k-care',title:'Colaboramos y nos cuidamos',topic:'Cooperación, turnos y cuidado compartido',intro:'Descubre cómo colaborar, respetar turnos y pedir ayuda cuando hace falta.',example:'Preguntamos antes de ayudar. Si hay un accidente, algo alto o un peligro, avisamos a un adulto de confianza.'}
].map(l=>({...l,area:'Emociones y convivencia',tasks:socialTasks(l.id,0)}));

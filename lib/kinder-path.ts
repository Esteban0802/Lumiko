import type {SchoolLesson} from './school-content';
type LearningGroup={title:string;description:string;ids:string[]};
// Suggested practice sequence; every activity remains freely available.
export const kinderPath:Record<SchoolLesson['area'],LearningGroup[]>={
 Lenguaje:[
  {title:'1. Sonidos y primeras sílabas',description:'Comenzamos escuchando y comparando partes de las palabras.',ids:['k-initial','k-initial-two','k-syllabic','k-syllabic-two','k-initial-odd','k-rhymes']},
  {title:'2. Letras, palabras y expresión',description:'Reconocemos letras, ampliamos vocabulario y contamos nuestras ideas.',ids:['k-initial-letters','k-words','k-synonyms','k-talk-scenes']},
  {title:'3. Construimos, comprendemos y escribimos',description:'Aplicamos lo aprendido para formar palabras, comprender textos y practicar la escritura.',ids:['k-build-words','k-reading','k-texts','k-name','k-dictation']}
 ],
 Matemática:[
  {title:'1. Observamos y organizamos',description:'Agrupamos, comparamos y reconocemos órdenes y patrones.',ids:['k-classification','k-seriation','k-patterns','k-sequence','k-solids']},
  {title:'2. Cantidades y números',description:'Relacionamos cantidades con números y exploramos sus posiciones.',ids:['k-quantity','k-numberdictation','k-line','k-neighbors','k-ordinal']},
  {title:'3. Resolvemos y exploramos',description:'Formamos cantidades de distintas maneras, resolvemos problemas y seguimos recorridos.',ids:['k-compose','k-problems','k-guide-lumi']}
 ],
 'Emociones y convivencia':[
 {title:'1. Reconocemos y expresamos',description:'Exploramos emociones y practicamos cómo comunicar lo que necesitamos.',ids:['k-feelings','k-needs']},
 {title:'2. Conversamos y buscamos acuerdos',description:'Escuchamos diferentes ideas para resolver desacuerdos con respeto.',ids:['k-solutions']},
 {title:'3. Colaboramos y nos cuidamos',description:'Compartimos tareas, respetamos turnos y pedimos apoyo adulto.',ids:['k-care']}
 ],
 Habilidades:[
  {title:'1. Cuerpo y primeras formas',description:'Reconocemos nuestro cuerpo, los lados y las formas que podemos dibujar.',ids:['k-body','k-laterality','k-copyfigure']},
  {title:'2. Observación y construcción',description:'Buscamos detalles, copiamos modelos y unimos piezas.',ids:['k-figureground','k-copygrid','k-puzzle']},
  {title:'3. Precisión y coordinación',description:'Completamos reflejos y practicamos movimientos cuidadosos con ayuda adulta.',ids:['k-symmetry','k-cutting']}
 ]
};

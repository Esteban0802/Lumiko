import {extendedMathActivities} from './extended-math-content';
import type {Activity,Question} from './content';

function counting(amount:number,choices:number[]):Question {
 return {
  prompt:'¿Cuántas semillas hay?',
  visual:{kind:'count',amount},
  options:choices.map(n=>[String(n),'']),answer:String(amount),
  hint:'Cuenta cada semilla una sola vez, de izquierda a derecha. El último número dice cuántas hay.',
  explanation:`Hay ${amount} semillas. El último número al contar es ${amount}.`,
  listen:'¿Cuántas semillas hay? Cuenta las semillas y elige un número.'
 };
}
function comparing(left:number,right:number,relation:'more'|'less',position:number):Question {
 const equal=left===right;
 const answer=equal?'Tienen igual cantidad':(relation==='more'?left>right:left<right)?'Canasto A':'Canasto B';
 const options:[string,string][]=[['Canasto A','🧺'],['Canasto B','🧺'],['Tienen igual cantidad','=']];
 // Rotate the choices without changing their meaning or the canasto labels.
 const ordered=options.slice(position).concat(options.slice(0,position));
 return {prompt:`¿Qué canasto tiene ${relation==='more'?'más':'menos'} semillas?`,visual:{kind:'compare',left,right,relation},options:ordered,answer,
  hint:'Empareja una semilla de A con una de B. Si sobran, ese canasto tiene más. Si no sobra ninguna, tienen igual cantidad.',
  explanation:equal?`A y B tienen ${left} semillas cada uno: tienen igual cantidad.`:`A tiene ${left} semillas y B tiene ${right}. ${answer} tiene ${relation==='more'?'más':'menos'}.`,
  listen:`¿Qué canasto tiene ${relation==='more'?'más':'menos'} semillas? También puedes elegir que tienen igual cantidad.`};
}
const symbols:Record<string,string>={hoja:'🍃',sol:'☀️',gota:'💧'};
function pattern(unit:string[],length:number,choices:string[]):Question {
 const sequence=Array.from({length},(_,i)=>unit[i%unit.length]);
 const answer=unit[length%unit.length];
 return {prompt:'¿Qué sigue en el sendero?',visual:{kind:'pattern',unit,sequence},options:choices.map(name=>[name,symbols[name]]),answer,
  hint:`Busca el grupo que se repite: ${unit.join(', ')}. Después vuelve a empezar ese grupo.`,
  explanation:`El grupo es ${unit.join(', ')}. En este lugar sigue ${answer}.`,
  listen:`Mira de izquierda a derecha: ${sequence.join(', ')}. ¿Qué sigue?`};
}
export const mathActivities:Activity[]=[
 {id:'counting',area:'math',title:'Canastos de semillas',goal:'Contar semillas y relacionar una colección con su número.',oa:'OA 06 y 07 PM NT · conteo y representación pictórica y simbólica parcial',
  example:'Prueba con Lumi: contamos una, dos, tres semillas. La última palabra es tres: hay tres semillas. Elegimos el número 3.',exampleVisual:{kind:'count',amount:3},
  questions:[counting(2,[1,2,3]),counting(4,[4,3,5]),counting(5,[4,6,5]),counting(3,[2,4,3]),counting(6,[6,5,7]),counting(8,[7,8,9])]},
 {id:'comparing',area:'math',title:'Una merienda para todos',goal:'Comparar colecciones: más, menos o igual cantidad.',oa:'OA 04 PM NT · comparación de cantidades',
  example:'Prueba con Lumi: A tiene tres semillas y B tiene dos. Emparejamos una de A con una de B. En A sobra una: A tiene más y B tiene menos.',exampleVisual:{kind:'compare',left:3,right:2,relation:'more'},
  questions:[comparing(4,2,'more',0),comparing(5,3,'less',0),comparing(3,3,'more',0),comparing(2,5,'more',1),comparing(2,4,'less',1),comparing(4,4,'less',2)]},
 {id:'patterns',area:'math',title:'El sendero que se repite',goal:'Reconocer un grupo que se repite y continuar un patrón.',oa:'OA 01 PM NT · continuación de patrones; creación pendiente',
  example:'Prueba con Lumi: hoja, sol; hoja, sol; hoja… El grupo hoja, sol se repite. Después de esa hoja viene un sol.',exampleVisual:{kind:'pattern',unit:['hoja','sol'],sequence:['hoja','sol','hoja','sol','hoja']},
  questions:[pattern(['hoja','sol'],5,['hoja','sol','gota']),pattern(['gota','hoja'],5,['hoja','gota','sol']),pattern(['sol','gota'],5,['sol','hoja','gota']),pattern(['hoja','hoja','sol'],8,['sol','hoja','gota']),pattern(['gota','hoja','sol'],7,['sol','gota','hoja']),pattern(['sol','sol','gota'],8,['sol','gota','hoja'])]}
 ,...extendedMathActivities
];

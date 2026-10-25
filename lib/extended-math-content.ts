import type {Activity,GardenObject,Question} from './content';

function operation(start:number,change:number,action:'add'|'remove',choices:number[]):Question {
 const result=action==='add'?start+change:start-change;
 const situation=`Había ${start} semillas. ${action==='add'?`Lumi agrega ${change}`:`Lumi quita ${change}`}.`;
 return {prompt:action==='add'?'¿Cuántas semillas hay ahora?':'¿Cuántas semillas quedan?',visual:{kind:'operation',start,change,action},options:choices.map(n=>[String(n),'']),answer:String(result),listen:situation+' Mueve las semillas y cuenta el resultado.',hint:action==='add'?'Agrega las semillas al canasto y cuenta todas las que hay ahora.':'Quita las semillas del canasto y cuenta solo las que quedan.',explanation:`${situation} ${action==='add'?'Ahora hay':'Quedan'} ${result} semillas.`};
}
const shapeNames={circle:'círculo',square:'cuadrado',triangle:'triángulo',rectangle:'rectángulo',oval:'óvalo'};
const colorNames={green:'verde',purple:'morado',blue:'azul',orange:'naranjo'};
const sizeNames={small:'pequeño',medium:'mediano',large:'grande'};
export function describeObject(item:GardenObject){return `${shapeNames[item.shape]} ${colorNames[item.color]} ${sizeNames[item.size]}`;}
function classify(prompt:string,items:GardenObject[],rule:Partial<GardenObject>,hint:string):Question {
 const match=items.find(item=>Object.entries(rule).every(([key,value])=>item[key as keyof GardenObject]===value))!;
 return {prompt,visual:{kind:'classify',items,rule},options:items.map(item=>[describeObject(item),'']),answer:describeObject(match),listen:prompt,hint,explanation:`El ${describeObject(match)} cumple todas las características que buscamos.`};
}
function ordering(direction:'ascending'|'descending',rows:GardenObject[][]):Question {
 const values={small:1,medium:2,large:3};
 const answerIndex=rows.findIndex(row=>row.every((item,i)=>i===0||(direction==='ascending'?values[row[i-1].size]<values[item.size]:values[row[i-1].size]>values[item.size])));
 const prompt=direction==='ascending'?'¿Qué fila va del más pequeño al más grande?':'¿Qué fila va del más grande al más pequeño?';
 return {prompt,visual:{kind:'order',rows,direction},options:rows.map((_,i)=>[`Fila ${String.fromCharCode(65+i)}`,'']),answer:`Fila ${String.fromCharCode(65+answerIndex)}`,listen:prompt+' Mira cada fila de izquierda a derecha.',hint:direction==='ascending'?'Empieza por el más pequeño, sigue con el mediano y termina con el más grande.':'Empieza por el más grande, sigue con el mediano y termina con el más pequeño.',explanation:direction==='ascending'?'Esta fila tiene pequeño, mediano y grande, en ese orden.':'Esta fila tiene grande, mediano y pequeño, en ese orden.'};
}
const object=(shape:GardenObject['shape'],color:GardenObject['color'],size:GardenObject['size']):GardenObject=>({shape,color,size});
const row=(shape:GardenObject['shape'],color:GardenObject['color'],sizes:GardenObject['size'][])=>sizes.map(size=>object(shape,color,size));
export const extendedMathActivities:Activity[]=[
 {id:'operations',area:'math',title:'Semillas que llegan y se van',goal:'Resolver pequeños problemas agregando o quitando semillas.',oa:'OA 08 PM NT · representación pictórica y acciones; explicación libre pendiente',example:'Prueba con Lumi: hay dos semillas y llega una más. Pulsa «Agregar una semilla». Después cuenta todas: una, dos, tres. Ahora hay tres.',exampleVisual:{kind:'operation',start:2,change:1,action:'add'},questions:[operation(2,1,'add',[2,3,4]),operation(4,2,'remove',[2,4,6]),operation(3,2,'add',[3,4,5]),operation(6,2,'remove',[3,4,6]),operation(5,3,'add',[8,5,7]),operation(3,3,'remove',[1,3,0])]},
 {id:'sorting',area:'math',title:'Ordenamos el huerto',goal:'Elegir objetos por sus características y ordenar por tamaño.',oa:'OA 02 PM NT · selección por atributos y reconocimiento de seriación; clasificación libre pendiente',example:'Prueba con Lumi: buscamos un círculo verde. Un círculo morado tiene la forma, pero le falta el color. Un cuadrado verde tiene el color, pero le falta la forma. El círculo verde cumple las dos pistas.',exampleVisual:{kind:'classify',rule:{shape:'circle',color:'green'},items:[object('circle','purple','medium'),object('circle','green','medium'),object('square','green','medium')]},questions:[
 classify('¿Cuál es un triángulo?',[object('square','green','medium'),object('triangle','purple','medium'),object('circle','green','medium')],{shape:'triangle'},'Busca la figura con tres lados. El color no importa en esta pregunta.'),
 classify('¿Cuál es un círculo verde?',[object('circle','green','medium'),object('circle','purple','medium'),object('square','green','medium')],{shape:'circle',color:'green'},'Busca las dos pistas a la vez: que sea un círculo y que sea verde.'),
 classify('¿Cuál es un cuadrado morado pequeño?',[object('square','purple','large'),object('circle','purple','small'),object('square','purple','small')],{shape:'square',color:'purple',size:'small'},'Revisa las tres pistas: forma de cuadrado, color morado y tamaño pequeño.'),
 ordering('ascending',[row('circle','green',['large','medium','small']),row('circle','green',['small','medium','large']),row('circle','green',['small','large','medium'])]),
 ordering('descending',[row('square','purple',['large','medium','small']),row('square','purple',['small','medium','large']),row('square','purple',['medium','large','small'])]),
 ordering('ascending',[row('triangle','green',['medium','small','large']),row('triangle','green',['large','medium','small']),row('triangle','green',['small','medium','large'])])
 ]}
];

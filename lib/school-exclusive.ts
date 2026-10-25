import {moreSchoolStories} from './extra-stories';
import type {GardenObject} from './content';
import type {ChoiceTask,StudyTask} from './school-content';
import {describeObject} from './extended-math-content';
const rotate=<T,>(items:T[],n:number)=>items.slice(n%items.length).concat(items.slice(0,n%items.length));
/** Dedicated school tasks: build groups and series, instead of selecting adventure answer cards. */
export function schoolClassification(v:number):StudyTask[]{return [1,2,3].map((attributes,i)=>{
 const shape=(['triangle','square','circle','rectangle','oval'] as const)[(v+i)%5],color=(['green','purple','blue','orange'] as const)[(v+i)%4],size=(['small','large','medium'] as const)[(v+i)%3];
 const rule:Partial<GardenObject>=attributes===1?{shape}:attributes===2?{shape,color}:{shape,color,size};
 const target:GardenObject={shape,color,size},otherShape=shape==='circle'?'square':'circle',otherColor=color==='green'?'purple':'green',otherSize=size==='small'?'large':'small';
 const items=rotate<GardenObject>([target,{shape,color,size:attributes===3?size:otherSize},{shape:otherShape,color,size},{shape,color:otherColor,size},{shape:otherShape,color:otherColor,size:otherSize},{shape,color:attributes===1?otherColor:color,size:otherSize}],v+i);
 const matches=items.map((item,index)=>Object.entries(rule).every(([key,value])=>item[key as keyof GardenObject]===value)?index:-1).filter(index=>index>=0);
 const words=describeObject(target).split(' ');
 return {kind:'group',prompt:`Forma el grupo: selecciona todos los objetos que sean ${words.slice(0,attributes).join(' ')}.`,items,rule,matches};
 });}
export function schoolSeriation(v:number):StudyTask[]{return Array.from({length:3},(_,i)=>{
 const shape=(['circle','triangle','square','oval','rectangle'] as const)[(v+i)%5],color=(['purple','green','orange','blue'] as const)[(v+i)%4],direction=(v+i)%2===0?'ascending':'descending';
 const items=rotate<GardenObject>([{shape,color,size:'large'},{shape,color,size:'small'},{shape,color,size:'medium'}],v+i);
 return {kind:'sort',prompt:`Construye una fila ${direction==='ascending'?'del más pequeño al más grande':'del más grande al más pequeño'}.`,items,direction};
 });}
export function schoolProblems(v:number):ChoiceTask[]{return Array.from({length:6},(_,i)=>{
 const tokens=['lápiz','cubo','caramelo','pelota','botón','flor'],plurals=['lápices','cubos','caramelos','pelotas','botones','flores'],index=(v+i)%tokens.length;
 const action=i%2===0?'add':'remove',start=action==='add'?1+(v+i)%5:3+(v*2+i)%6,change=action==='add'?1+(v+i)%3:1+(v+i)%start,result=action==='add'?start+change:start-change;
 const prompt=`En la caja hay ${start} ${start===1?tokens[index]:plurals[index]}. ${action==='add'?`Guardas ${change} más`:`Sacas ${change}`}. ¿Cuántos objetos quedan en la caja?`;
 const numbers=result===0?[0,1,2]:[result-1,result,result+1];
 return {kind:'choice',prompt,options:rotate(numbers,v+i).map(n=>[String(n),'']),answer:String(result),hint:`${action==='add'?'Agrega':'Quita'} los objetos y cuenta los que quedan dentro.`,explanation:`Ahora ${result===1?'queda':'quedan'} ${result} ${result===1?tokens[index]:plurals[index]} en la caja.`,visual:{kind:'operation',start,change,action,token:tokens[index]}};
 });}
export function schoolReading(v:number):ChoiceTask[]{
 const stories=[
 {text:'El volantín de Lucía se quedó atrapado en una rama baja. Lucía pidió ayuda a su papá. Él lo alcanzó sin subirse al árbol. Lucía guardó el volantín para repararlo en casa.',questions:[['¿Qué se quedó atrapado?','el volantín','una pelota','un sombrero'],['¿A quién pidió ayuda Lucía?','a su papá','a su profesora','a su vecina'],['¿Para qué guardó el volantín?','para repararlo','para regalarlo','para mojarlo']]},
 {text:'Bruno preparó un regalo para su hermana. Puso un dibujo dentro de un sobre amarillo. Después escribió una pequeña tarjeta. Su hermana sonrió cuando abrió el regalo.',questions:[['¿Para quién era el regalo?','para su hermana','para su abuelo','para su amigo'],['¿Qué había dentro del sobre?','un dibujo','una galleta','un juguete'],['¿De qué color era el sobre?','amarillo','azul','rojo']]},
 {text:'Valentina escuchó un maullido detrás de una caja. Encontró a su gato escondido. Puso su plato junto a la puerta y el gato salió a comer. Después Valentina guardó la caja.',questions:[['¿Qué escuchó Valentina?','un maullido','un ladrido','una canción'],['¿Dónde se escondía el gato?','detrás de una caja','sobre la cama','en una mochila'],['¿Por qué salió el gato?','para comer','para cantar','para dormir']]},
 {text:'El curso de Andrés visitó una panadería. La panadera les mostró cómo amasar. Andrés hizo un pan redondo. Antes de volver al colegio, todos agradecieron la visita.',questions:[['¿Qué lugar visitó el curso?','una panadería','una biblioteca','un hospital'],['¿Qué les mostró la panadera?','cómo amasar','cómo pintar','cómo coser'],['¿Qué forma tenía el pan de Andrés?','redonda','triangular','cuadrada']]}
 ,...moreSchoolStories];const story=stories[v%stories.length];return story.questions.map(([prompt,answer,a,b],i)=>({kind:'choice',prompt,answer,options:rotate([answer,a,b],v+i).map(label=>[label,'']),hint:'Vuelve a escuchar el texto y busca la pista.',explanation:`La respuesta está en el cuento: ${answer}.`,passage:story.text}));
}

export type Grade=1|2|3|4|5|6;
export type PrimarySubject='Lenguaje'|'Matemática';
export type PrimaryUnit='narrative'|'info'|'words'|'poetry'|'writing'|'operations'|'representation'|'patterns'|'measurement'|'data';
export type PrimaryLesson={id:string;grade:Grade;subject:PrimarySubject;unit:PrimaryUnit;title:string;goal:string;references:{code:string;pdfPage:number;printedPage:number}[]};
export type PrimaryTask={kind:'choice'|'numeric'|'writing';prompt:string;answer?:string;options?:string[];hint:string;explanation:string;passage?:string;rubric?:string[];chart?:{title:string;unit:string;rows:{label:string;a:number;b?:number}[];legendA?:string;legendB?:string;scale?:number;pictogram?:boolean};fraction?:{parts:number;shaded:number;second?:{parts:number;shaded:number}};rectangle?:{width:number;height:number};groups?:number[];math?:{operation:'add'|'subtract'|'multiply'|'divide'|'mean'|'fraction-add'|'sequence'|'area'|'perimeter'|'volume'|'percent';a:number;b:number;c?:number;d?:number};};
const langRefs:Record<Grade,{narrative:[number,number];info:[number,number];words:[number,number];poetry:[number,number];writing:[number,number][]}>={
1:{narrative:[8,310],info:[10,311],words:[4,310],poetry:[9,311],writing:[[14,311],[15,311]]},
2:{narrative:[5,314],info:[7,315],words:[11,315],poetry:[6,314],writing:[[13,315],[17,316]]},
3:{narrative:[4,320],info:[6,321],words:[10,321],poetry:[5,320],writing:[[13,321],[18,322]]},
4:{narrative:[4,326],info:[6,327],words:[10,327],poetry:[5,326],writing:[[12,328],[17,328]]},
5:{narrative:[4,332],info:[6,333],words:[12,334],poetry:[5,333],writing:[[14,334],[18,334]]},
6:{narrative:[4,338],info:[6,339],words:[12,340],poetry:[5,339],writing:[[14,340],[18,341]]}
};
const mathRefs:Record<Grade,Record<'operations'|'representation'|'patterns'|'measurement'|'data',[number,number][]>>={
1:{operations:[[9,229]],representation:[[6,229],[8,229]],patterns:[[11,230]],measurement:[[18,230]],data:[[20,230]]},
2:{operations:[[9,233],[11,234]],representation:[[7,233]],patterns:[[12,234]],measurement:[[19,234]],data:[[22,234]]},
3:{operations:[[6,237],[8,237],[9,238]],representation:[[11,238]],patterns:[[13,238]],measurement:[[21,239]],data:[[25,239]]},
4:{operations:[[3,243],[5,243],[6,244]],representation:[[9,244]],patterns:[[14,244]],measurement:[[23,245]],data:[[27,246]]},
5:{operations:[[3,249],[4,249],[5,249]],representation:[[9,250]],patterns:[[14,250]],measurement:[[22,251]],data:[[23,251],[26,251]]},
6:{operations:[[1,255],[2,255],[7,255]],representation:[[6,255]],patterns:[[11,256]],measurement:[[19,256]],data:[[24,256]]}
};
export const primaryLessons:PrimaryLesson[]=[];
for(const grade of [1,2,3,4,5,6] as Grade[]){
 const langTitles={narrative:grade<3?'Leemos un cuento':'Detectives del relato',info:grade<3?'Mensajes e instrucciones':'Información con evidencia',words:grade===1?'Palabras con letras y dígrafos':'Palabras en contexto',poetry:grade<3?'Leemos versos':'Imágenes de la poesía',writing:grade===1?'Escribo un mensaje':'Taller de narración'};
 for(const unit of ['narrative','info','words','poetry','writing'] as const){const refs=unit==='writing'?[...langRefs[grade].writing]:[langRefs[grade][unit]];if(unit==='info'&&grade>=5)refs.push([7,grade===5?333:339]);primaryLessons.push({id:`b${grade}-le-${unit}`,grade,subject:'Lenguaje',unit,title:langTitles[unit],goal:{narrative:'Comprender un relato y apoyar las respuestas en lo leído.',info:'Encontrar información y reconocer el propósito de un texto.',words:grade===1?'Leer palabras con combinaciones de letras y dígrafos.':'Deducir significados a partir de las pistas del texto.',poetry:'Leer un poema y comprender sus imágenes y expresiones.',writing:'Planificar, escribir y revisar un texto propio.'}[unit],references:refs.map(([oa,pdfPage])=>({code:`LE0${grade} OA ${String(oa).padStart(2,'0')}`,pdfPage,printedPage:pdfPage-2}))});}
 for(const unit of ['operations','representation','patterns','measurement','data'] as const)primaryLessons.push({id:`b${grade}-ma-${unit}`,grade,subject:'Matemática',unit,title:{operations:'Problemas y operaciones',representation:grade<3?'Decenas y composición':'Fracciones con sentido',patterns:grade<3?'Patrones numéricos':grade===5?'Reglas y predicciones':'Descubre el valor desconocido',measurement:grade<3?'Medimos longitudes':grade===3?'Perímetro':grade<6?'Áreas':'Volumen',data:grade<3?'Leemos pictogramas':grade===5?'Datos y promedios':grade===6?'Comparamos dos grupos':'Interpretamos gráficos'}[unit],goal:{operations:'Resolver situaciones usando operaciones del nivel.',representation:grade<3?'Relacionar números y su valor posicional.':'Interpretar y operar con fracciones según el curso.',patterns:'Descubrir relaciones y comprobar resultados.',measurement:'Interpretar medidas y resolver problemas de medición.',data:'Leer representaciones de datos y sacar conclusiones.'}[unit],references:mathRefs[grade][unit].map(([oa,pdfPage])=>({code:`MA0${grade} OA ${String(oa).padStart(2,'0')}`,pdfPage,printedPage:pdfPage-2}))});
}
export const primarySource={title:'Bases Curriculares Primero a Sexto Básico · documento entregado por la familia',file:'articles-22394_bases.pdf',edition:'Bases Curriculares 2012, según presentación del documento',scope:'Selección inicial de objetivos de Lenguaje y Comunicación y Matemática. Cada actividad ejercita parte del objetivo, no todo el currículum.'};

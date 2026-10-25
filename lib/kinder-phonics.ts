import type {ChoiceTask,SchoolLesson} from './school-content';
// Sound families reflect Chilean Spanish: B/V, hard C/K/Q, and S/Z share initials.
export const kinderSoundBank=[
 ['A','a','abeja','avión','anillo'],['E','e','elefante','enano','estrella'],['I','i','isla','imán','iguana'],['O','o','oso','olla','oveja'],['U','u','uva','uno','uña'],
 ['N','n','nido','nube','nariz'],['B','b','bote','burro','beso'],['D','d','dado','dedo','duna'],['T','t','taza','tela','toro'],['F','f','foca','faro','fila'],['M','m','mesa','mano','mono'],['L','l','luna','lápiz','lobo'],['P','p','pato','pera','puma'],
 ['C','k','casa','copa','cuna'],['G','g','gato','gota','gusano'],['J','j','jarra','jugo','jirafa'],['K','k','kiwi','kilo','koala'],['Ñ','ñ','ñandú','ñoqui','ñu'],['Q','k','queso','queque','quince'],['R','r','rana','rosa','rueda'],['S','s','sapo','sopa','silla'],['V','b','vaca','vaso','vela'],['Y','y','yema','yate','yogur'],['Z','s','zapato','zorro','zanahoria']
] as const;
export const writtenInitials=[...kinderSoundBank.map(row=>[row[0],...row.slice(2)]),['H','hilo','hoja','huevo'],['W','web','waterpolo','wafle'],['X','xilófono','xilófono','xilófono']];
const pick=<T,>(a:readonly T[],n:number)=>a[n%a.length];
function task(prompt:string,answer:string,wrong:string[],v:number,explanation:string,passage?:string):ChoiceTask{const labels=[answer,...wrong],at=v%labels.length;return {kind:'choice',prompt,answer,options:[...labels.slice(at),...labels.slice(0,at)].map(w=>[w,'']),hint:'Escucha cada palabra con calma. Puedes pedir que la repitan.',explanation,passage};}
export function kinderPhonics(id:string,v:number):ChoiceTask[]{return Array.from({length:6},(_,i)=>{
 const n=v*6+i;
 if(id==='k-initial-letters'){const row=pick(writtenInitials,n),word=row[1+Math.floor(n/writtenInitials.length)%3],letter=row[0];return {...task(`Mira «${word}». ¿Cuál es su primera letra escrita?`,letter,['A','M','P','S'].filter(x=>x!==letter).slice(0,2),n,`La primera letra escrita de ${word} es ${letter}.`,word),hint:'Mira la primera letra, a la izquierda. Aquí observamos la escritura, no adivinamos por el sonido.'};}
 const bank=id==='k-initial'?kinderSoundBank.slice(0,13):id==='k-initial-two'?kinderSoundBank.slice(13):kinderSoundBank;
 const row=pick(bank,n),offset=Math.floor(n/bank.length)%3,model=row[2+offset],answer=row[2+(offset+1)%3];
 const other=kinderSoundBank.filter(r=>r[1]!==row[1]);const a=pick(other,n),b=pick(other,n+5);
 if(id==='k-initial-odd'){const odd=a[2+offset];return task(`Escucha «${model}», «${answer}» y «${odd}». ¿Cuál comienza con un sonido diferente?`,odd,[model,answer],n,`${model} y ${answer} comienzan igual. ${odd} empieza con otro sonido.`);}
 return {...task(`Escucha «${model}». ¿Qué palabra comienza con el mismo sonido?`,answer,[a[2+offset],b[2+offset]],n,`${model} y ${answer} comparten el sonido inicial. No siempre se escribe con la misma letra.`),phonics:{mode:'sound',model}};
 });}
// The syllable label is written; H is silent and X/W use these specific words.
export const kinderSyllableBank=[
 ['A','a','a','ala','aro'],['E','e','e','enano','elefante'],['I','i','i','imán','iguana'],['O','o','o','oso','ola'],['U','u','u','uva','uno'],
 ['N','na','na','naranja','nabo'],['B','ba','ba','bata','ballena'],['D','da','da','dama','dado'],['T','ta','ta','tapa','taza'],['F','fa','fa','familia','faro'],['M','ma','ma','mano','mapa'],['L','la','la','lana','lata'],['P','pa','pa','pato','pala'],
 ['C','ca','ka','casa','cama'],['G','ga','ga','gato','gallo'],['H','hi','i','hilo','higo'],['J','ja','ja','jarra','jabón'],['K','ki','ki','kilo','kiwi'],['Ñ','ño','ño','ñoqui','ñoño'],['Q','que','ke','queso','queque'],['R','ra','ra','rama','rana'],['S','sa','sa','sapo','saco'],['V','va','ba','vaca','vaso'],['W','wa','wa','wafle','waterpolo'],['X','xi','si','xilófono','xilografía'],['Y','ye','ye','yema','yegua'],['Z','za','sa','zapato','zanahoria'],
 ['N','ni','ni','nido','niño'],['B','bo','bo','boca','bota'],['D','du','du','duna','ducha'],['T','to','to','toro','tomate'],['F','fi','fi','fila','fideo'],['M','mo','mo','mono','moto'],['L','lu','lu','luna','lupa'],['P','pe','pe','pera','pelo'],
 ['C','co','ko','copa','codo'],['G','go','go','gota','goma'],['H','ho','o','hoja','hora'],['J','ju','ju','jugo','juguete'],['Q','qui','ki','quince','química'],['R','ro','ro','rosa','ropa'],['S','so','so','sopa','soga'],['V','ve','be','vela','vena'],['Y','yo','yo','yogur','yoga'],['Z','zo','so','zorro','zoológico']
] as const;
export function kinderSyllables(v:number,part:1|2=2):ChoiceTask[]{const first=new Set(['A','E','I','O','U','N','B','D','T','F','M','L','P']);const bank=kinderSyllableBank.filter(r=>first.has(r[0])===(part===1));return Array.from({length:6},(_,i)=>{const n=v*6+i,row=pick(bank,n),swap=Math.floor(n/bank.length)%2,model=row[3+swap],answer=row[4-swap];const wrong=kinderSyllableBank.filter(r=>r[2]!==row[2]);const a=pick(wrong,n),b=pick(wrong,n+7);const note=row[0]==='H'?' La H es muda: hi suena como i y ho como o.':row[0]==='W'||row[0]==='X'?' Escucha estas palabras con un adulto: esta letra puede sonar diferente en otras palabras.':'';return {...task('Busca otra palabra que empiece con la sílaba «'+row[1]+'», como «'+model+'».',answer,[a[3],b[3]],n,model+' y '+answer+' empiezan con la misma sílaba: '+row[1]+'.'+note),phonics:{mode:'syllable',model,syllable:row[1]}};});}
const common='B y V suenan igual en estas palabras. C fuerte, K y Q comparten sonido; en Chile también coinciden S y Z. H no suena y W y X varían según la palabra: se practican en la actividad de letras escritas.';
export const kinderPhonicsLessons:SchoolLesson[]=[
 {id:'k-initial-two',title:'Sonidos iniciales · Parte 2',topic:'C, G, J, K, Ñ, Q, R, S, V, Y y Z',intro:'Seguimos comparando sonidos al comienzo de palabras, con ayuda de un adulto.',example:common,tasks:kinderPhonics('k-initial-two',0)},
 {id:'k-initial-odd',title:'¿Cuál comienza diferente?',topic:'Comparar sonidos iniciales',intro:'Escucha tres palabras. Dos empiezan con el mismo sonido; busca la diferente.',example:'Mesa y mono empiezan igual; pato comienza diferente. '+common,tasks:kinderPhonics('k-initial-odd',0)},
 {id:'k-initial-letters',title:'Exploramos todas las letras',topic:'Primera letra escrita · Abecedario completo',intro:'Mira una palabra y reconoce su primera letra. Aquí también aparecen H, W y X.',example:'Hilo comienza con H escrita, aunque la H no se oye. Vaca comienza con V: no podemos distinguirla de B solo escuchando.',tasks:kinderPhonics('k-initial-letters',0)},
 {id:'k-syllabic-two',title:'La primera sílaba · Parte 2',topic:'C, G, H, J, K, Ñ, Q, R, S, V, W, X, Y y Z',intro:'Escucha la primera sílaba completa y busca otra palabra que empiece igual.',example:'Casa y cama empiezan con ca. Hilo y higo empiezan con hi, que suena i porque la H es muda. En W y X escuchamos cada palabra con un adulto.',tasks:kinderSyllables(0)}
].map(l=>({...l,area:'Lenguaje'}));

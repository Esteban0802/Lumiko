'use client';
import {useState} from 'react';
import {lumiSvg,svgUrl} from '../lib/art';
import type {ChoiceTask} from '../lib/school-content';
import {phonicsPicture} from '../lib/phonics-pictures';
export default function PhonicsWorkshop({task,solved,onDone,speak}:{task:ChoiceTask;solved:boolean;onDone:()=>void;speak:(text:string)=>void}){
 const [picked,setPicked]=useState(''),[feedback,setFeedback]=useState(''),[hint,setHint]=useState(false);
 const reference=task.phonics!,syllabic=reference.mode==='syllable';
 function answer(word:string){if(solved)return;setPicked(word);if(word===task.answer){setFeedback(task.explanation);speak('¡Lo encontraste! '+task.explanation);onDone();}else{setFeedback('Escuchemos otra vez. Prueba con otra palabra.');speak('Escucha '+reference.model+' y compara cómo empieza cada palabra.');}}
 return <div className={'syllable-workshop phonics-workshop'+(solved?' is-solved':'')}>
  <div className="workshop-heading"><p className="eyebrow">{syllabic?'EL TALLER DE LAS SÍLABAS':'EL TALLER DE LOS SONIDOS'}</p><h1>¿Cuál empieza igual?</h1><p>{syllabic?'Escucha la primera sílaba y busca otra palabra que empiece igual.':'Escucha el primer sonido y encuentra otra palabra que empiece igual.'}</p></div>
  <div className="workshop-board">
   <div className="workshop-picture"><span className="workshop-step">1 · Escucha esta palabra</span><div className="word-picture" role="img" aria-label={reference.model}><span aria-hidden="true">{phonicsPicture(reference.model)}</span><i aria-hidden="true">✦</i><i aria-hidden="true">✧</i></div><b className="reference-word">{reference.model}</b><button className="listen" onClick={()=>speak(reference.model)}>♫ Escuchar palabra</button>{syllabic&&<span className="reference-syllable">Empieza con <b>{reference.syllable}</b></span>}<button className="quiet" onClick={()=>speak(task.prompt)}>Escuchar cómo jugar ♫</button></div>
   <div className="workshop-pieces"><div className="workshop-instruction"><span className="workshop-step">2 · Elige una palabra</span><span className="piece-counter">3 opciones</span></div><div className="phonics-cards" role="group" aria-label="Palabras para comparar">{task.options.map(([word])=><div className="phonics-option" key={word}><button className={'phonics-answer'+(picked===word?(solved?' is-correct':' try-again'):'')} disabled={solved} aria-label={'Elegir '+word} aria-pressed={picked===word} onClick={()=>answer(word)}><span className="phonics-icon" aria-hidden="true">{phonicsPicture(word)}</span><b>{word}</b><span className="phonics-card-mark" aria-hidden="true">{picked===word?(solved?'✓':'↶'):'·'}</span></button><button className="phonics-audio" aria-label={'Escuchar '+word} onClick={()=>speak(word)}>♫ Escuchar</button></div>)}</div><p className="phonics-caption">Puedes escuchar todas antes de elegir.</p></div>
  </div>
  <div className={'workshop-lumi'+(feedback&&!solved?' has-feedback':'')}><img src={svgUrl(lumiSvg)} alt="Lumi"/><div role="status" aria-live="polite"><b>{solved?'¡Lo encontraste!':feedback?'Probemos otra vez':'Escuchamos con calma'}</b><p>{feedback||(hint?(syllabic?'Busca una palabra que empiece con «'+reference.syllable+'», como '+reference.model+'.':task.hint):'Escucha la palabra de la izquierda y luego cada opción.')}</p></div>{!solved?<button className="quiet" onClick={()=>{setHint(true);speak(syllabic?'Escucha la primera sílaba: '+reference.syllable+'. Compara las palabras.':task.hint);}}>✦ Una pista</button>:<span className="workshop-stars" aria-hidden="true">✦ ✦ ✦</span>}</div>
 </div>;
}

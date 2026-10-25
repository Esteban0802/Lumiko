'use client';
import {useState} from 'react';
import {lumiSvg,svgUrl} from '../lib/art';
import type {DiscoveryTask} from '../lib/kinder-discovery';
type Task=Extract<DiscoveryTask,{kind:'syllable-build'}>;
export default function SyllableWorkshop({task,solved,onDone,speak}:{task:Task;solved:boolean;onDone:()=>void;speak:(text:string)=>void}){
 const [selected,setSelected]=useState<number[]>([]),[feedback,setFeedback]=useState(''),[hint,setHint]=useState(false);
 const full=selected.length===task.parts.length;
 function select(i:number){setSelected(old=>[...old,i]);setFeedback('');}
 function check(){if(selected.map(i=>task.tiles[i]).join('')===task.word){setFeedback('¡Formaste '+task.word+'!');speak('¡Formaste '+task.word+'!');onDone();}else{setFeedback('Casi… escucha otra vez y cambia las fichas que necesites.');}}
 return <div className={'syllable-workshop'+(solved?' is-solved':'')}>
  <div className="workshop-heading"><p className="eyebrow">EL TALLER DE LAS PALABRAS</p><h1>Escucha, elige y arma</h1><p>Une las sílabas. Algunas fichas sobran.</p></div>
  <div className="workshop-board">
   <div className="workshop-picture"><span className="workshop-step">1 · Escucha</span><div className="word-picture" role="img" aria-label={task.word}><span aria-hidden="true">{task.icon}</span><i aria-hidden="true">✦</i><i aria-hidden="true">✧</i></div><button className="listen" onClick={()=>speak(task.word)}>♫ Escuchar palabra</button><button className="quiet" onClick={()=>speak('Elige las sílabas que forman la palabra y ponlas en orden. Algunas fichas sobran.')}>Escuchar cómo jugar ♫</button></div>
   <div className="workshop-pieces"><div className="workshop-instruction"><span className="workshop-step">2 · Arma tu palabra</span><span className="piece-counter">{selected.length} / {task.parts.length}</span></div>
    <ol className="word-slots" aria-label="Tu palabra">{task.parts.map((_,at)=><li key={at} className={selected[at]!==undefined?'has-piece':''}>{selected[at]===undefined?<span aria-label={'Espacio '+(at+1)}>{at+1}</span>:<button disabled={solved} aria-label={'Retirar sílaba '+task.tiles[selected[at]]} onClick={()=>{setSelected(old=>old.filter((_,i)=>i!==at));setFeedback('');}}>{task.tiles[selected[at]]}</button>}</li>)}</ol>
    <div className="tile-bank" role="group" aria-label="Fichas de sílabas">{task.tiles.map((part,i)=><div key={i} className={'syllable-tile'+(selected.includes(i)?' is-used':'')}><button className="tile-pick" aria-label={'Elegir sílaba '+part} disabled={solved||selected.includes(i)||full} onClick={()=>select(i)}>{part}</button><button className="tile-audio" aria-label={'Escuchar sílaba '+part} onClick={()=>speak(part)}>♫</button></div>)}</div>
    <p className="extra-pieces">{task.tiles.length-task.parts.length===1?'Hay una ficha extra. Déjala sin usar.':'Hay dos fichas extra. Déjalas sin usar.'}</p>
    <div className="workshop-actions"><button className="quiet" disabled={solved||!selected.length} onClick={()=>{setSelected(old=>old.slice(0,-1));setFeedback('');}}>↶ Deshacer</button><button className="primary" disabled={solved||!full} onClick={check}>{solved?'✓ Palabra armada':'Comprobar palabra'}</button></div>
   </div>
  </div>
  <div className={'workshop-lumi'+(feedback&&!solved?' has-feedback':'')}><img src={svgUrl(lumiSvg)} alt="Lumi"/><div role="status" aria-live="polite"><b>{solved?'¡Lo lograste!':feedback?'Vamos paso a paso':'Estoy aquí para ayudarte'}</b><p>{feedback|| (hint?'La palabra empieza con «'+task.parts[0]+'». Escucha y busca esa ficha.':'Toca ♫ para escuchar cada ficha. Puedes probar y cambiar.')}</p></div>{!solved&&<button className="quiet" onClick={()=>{setHint(true);speak('La palabra empieza con '+task.parts[0]);}}>✦ Una pista</button>}{solved&&<span className="workshop-stars" aria-hidden="true">✦ ✦ ✦</span>}</div>
 </div>;
}

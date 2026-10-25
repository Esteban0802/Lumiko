'use client';
import {useState} from 'react';
import {activities,Activity,ActivityId} from '../lib/content';
import MathScene,{MathOption} from './MathScene';
import {freshAdventureRound} from '../lib/fresh-practice';

type Props={completed:ActivityId[];onComplete:(id:ActivityId)=>void;onBack:()=>void;speak:(text:string)=>void};
export default function Activities({completed,onComplete,onBack,speak}:Props){
 const [area,setArea]=useState<Activity['area']>('language');
 const [activity,setActivity]=useState<Activity|null>(null);
 const [phase,setPhase]=useState<'intro'|'questions'|'reward'>('intro');
 const [operationReady,setOperationReady]=useState(false);
 const [q,setQ]=useState(0),[correct,setCorrect]=useState(false),[hint,setHint]=useState(false),[feedback,setFeedback]=useState('');
 function reset(){setOperationReady(false);setCorrect(false);setHint(false);setFeedback('');}
 function choose(a:Activity){setActivity(freshAdventureRound(a,completed.includes(a.id)?1:0));setPhase('intro');setQ(0);reset();}
 if(!activity)return <section className="mission">
  <div className="mission-top"><button className="quiet" onClick={onBack}>← Temario de kínder</button><span>Kínder · Aventuras adicionales</span></div>
  <nav className="area-choice" aria-label="Área de aprendizaje">{(['language','math'] as const).map(value=><button className="secondary" key={value} aria-pressed={area===value} onClick={()=>setArea(value)}>{value==='language'?'Lenguaje':'Matemática'}</button>)}</nav>
  <h1>{area==='language'?'Aventuras de palabras':'Huerto de las Cantidades'}</h1>
  <p className="lead">Elige un descubrimiento. Puedes repetirlo cuando quieras.</p>
  <div className="activity-list">{activities.filter(a=>a.area===area).map(a=><button className="secondary activity-choice" key={a.id} onClick={()=>choose(a)}><b>{a.title}</b><span>{a.goal}</span><small>{completed.includes(a.id)?'✦ Completada · Volver a jugar':'Explorar →'}</small></button>)}</div>
 </section>;
 if(phase==='reward')return <section className="reward"><div className="medal">✦</div><p className="eyebrow">¡UN NUEVO DESCUBRIMIENTO!</p><h1>{activity.title}</h1><p className="lead">¡Terminaste la aventura! Practicaste con Lumi.</p><p>Tu estrella está guardada. Repetir la aventura conserva la misma estrella.</p><button className="primary" onClick={()=>setActivity(null)}>Elegir otra aventura →</button><button className="secondary" onClick={()=>choose(activities.find(a=>a.id===activity.id)!)}>Volver a practicar con nuevos ejemplos</button><button className="quiet" onClick={onBack}>Volver al temario de kínder</button></section>;
 if(phase==='intro')return <section className="mission"><button className="quiet" onClick={()=>setActivity(null)}>← Aventuras</button><h1>{activity.title}</h1><p className="lead">{activity.goal}</p><div className="lesson-text"><p>{activity.example}</p>{activity.story&&<p>{activity.story}</p>}</div>{activity.exampleVisual&&<MathScene visual={activity.exampleVisual} example/>}<button className="listen" onClick={()=>speak(activity.story||activity.example)}>♫ {activity.story?'Escuchar cuento':'Escuchar ejemplo'}</button><p className="small">Dos rondas de tres desafíos. Puedes pedir ayuda y volver a escuchar.</p><button className="primary" onClick={()=>setPhase('questions')}>Comenzar →</button></section>;
 const current=activity.questions[q];
 function answer(value:string){if(correct)return;if(value===current.answer){setCorrect(true);setFeedback('¡Lo descubriste! '+current.explanation);speak(current.explanation);}else{setFeedback('Probemos otra vez. '+current.hint);setHint(true);speak(current.hint);}}
 function next(){if(q===activity!.questions.length-1){onComplete(activity!.id);setPhase('reward');speak('¡Terminaste la aventura!');}else{setQ(q+1);reset();}}
 return <section className="mission">
  <div className="mission-top"><button className="quiet" onClick={()=>setActivity(null)}>← Aventuras</button><span>{activity.title}</span><span>{q+1} de {activity.questions.length}</span></div>
  <div className="progress">{activity.questions.map((_,i)=><span key={i} className={i<=q?'filled':''}/>)}</div>
  <p className="eyebrow">{q<3?'PRACTICAMOS CON LUMI':'PROBAMOS OTROS DESAFÍOS'}</p><h1>{current.prompt}</h1>
  {activity.story&&<details className="lesson-text"><summary>Volver al cuento</summary><p>{activity.story}</p><button className="listen" onClick={()=>speak(activity.story!)}>♫ Escuchar cuento otra vez</button></details>}
  <button className="listen" onClick={()=>speak(current.listen)}>♫ {activity.id==='sounds'?'Escuchar sonido':activity.id==='syllables'?'Escuchar palabra':'Escuchar pregunta'}</button>
  {current.word&&<p className="lead">Da una palmada por cada parte de la palabra.</p>}
  {current.visual&&<MathScene key={`${activity.id}-${q}`} visual={current.visual} onReady={setOperationReady}/>}
  <div className={'answers'+(current.visual?' math-answers':'')+(current.visual?.kind==='order'?' ordering-answers':'')}>{current.options.map(([value,icon],index)=><div key={value}><button className={'answer '+(correct&&value===current.answer?'right':'')} disabled={correct||(current.visual?.kind==='operation'&&!operationReady)} onClick={()=>answer(value)}>{current.visual&&<MathOption visual={current.visual} index={index}/>}{(icon||activity.id==='syllables')&&<span className={activity.id==='syllables'?'syllable-dots':undefined} aria-hidden="true">{activity.id==='syllables'?'●'.repeat(Number(value)):icon}</span>}<b>{value}{activity.id==='syllables'?' sílabas':''}</b></button><button className="word-audio" aria-label={`Escuchar ${value}`} onClick={()=>speak(value+(activity.id==='syllables'?' sílabas':''))}>♫ Escuchar</button></div>)}</div>
  <div className="feedback" aria-live="polite">{feedback||'Puedes escuchar y pedir ayuda todas las veces que quieras.'}</div>{hint&&<p className="hint">✦ {current.hint}</p>}
  <div className="mission-controls"><button className="quiet" onClick={()=>{setHint(true);speak(current.hint);}}>✧ Dame una pista</button>{correct&&<button className="primary" onClick={next}>{q===activity.questions.length-1?'Ver mi descubrimiento':'Siguiente desafío'} →</button>}</div>
 </section>;
}

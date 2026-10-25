'use client';
import {useEffect,useState} from 'react';
import {primaryLessons,primarySource,Grade,PrimarySubject,PrimaryLesson,PrimaryTask} from '../lib/primary-plan';
import {restorePrimary,nextPrimaryRound} from '../lib/primary-content';
import PrimaryExercise from './PrimaryExercise';
import PrimaryMap from './PrimaryMap';
import {primaryJourneyAccess} from '../lib/primary-journey';
const STORAGE='lumiko-basica-v1';
export default function Primary({onBack,speak}:{onBack:()=>void;speak:(s:string)=>void}){
 const [grade,setGrade]=useState<Grade|null>(null),[subject,setSubject]=useState<PrimarySubject|null>(null),[lesson,setLesson]=useState<PrimaryLesson|null>(null),[phase,setPhase]=useState<'intro'|'tasks'|'done'>('intro'),[tasks,setTasks]=useState<PrimaryTask[]>([]),[index,setIndex]=useState(0),[version,setVersion]=useState(0),[solved,setSolved]=useState(false);
 const [progress,setProgress]=useState<ReturnType<typeof restorePrimary>>({completed:[],rounds:{},recent:{}}),[ready,setReady]=useState(false);
 useEffect(()=>{try{setProgress(restorePrimary(JSON.parse(localStorage.getItem(STORAGE)||'{}')));}catch{}setReady(true);},[]);
 useEffect(()=>{if(ready)try{localStorage.setItem(STORAGE,JSON.stringify(progress));}catch{}},[progress,ready]);
 function choose(l:PrimaryLesson){if(!ready||!primaryJourneyAccess(progress.completed,l.grade,l.subject).find(s=>s.lesson.id===l.id)?.available)return;setLesson(l);setPhase('intro');setSolved(false);}
 function begin(){if(!lesson)return;const next=nextPrimaryRound(lesson,progress);setTasks(next.tasks);setVersion(next.version);setProgress(next.progress);setIndex(0);setSolved(false);setPhase('tasks');}
 function next(){if(!lesson)return;if(index===tasks.length-1){setProgress(old=>({...old,completed:old.completed.includes(lesson.id)?old.completed:[...old.completed,lesson.id]}));setPhase('done');}else{setIndex(index+1);setSolved(false);}}
 const list=primaryLessons.filter(l=>l.grade===grade&&l.subject===subject);
 return <section className="mission school primary-study" data-round-version={version}><div className="mission-top"><button className="quiet" onClick={lesson?()=>setLesson(null):subject?()=>setSubject(null):grade?()=>setGrade(null):onBack}>{lesson?'← Mapa de '+subject:subject?'← Asignaturas de '+grade+'.º básico':grade?'← Cursos de Básica':'← Mapa de niveles'}</button><span>Básica · Lenguaje y Matemática</span></div>
 {!lesson?<PrimaryMap grade={grade} subject={subject} completed={progress.completed} ready={ready} onGrade={setGrade} onSubject={setSubject} onChoose={choose}/>:phase==='intro'?<><p className="eyebrow">{lesson.grade}.º BÁSICO · {lesson.subject.toUpperCase()}</p><h1>{lesson.title}</h1><p className="lead">{lesson.goal}</p><div className="lesson-text"><p>{lesson.unit==='writing'?'Dos propuestas de escritura, cada una con su pauta de revisión.':'Ocho ejercicios para practicar paso a paso.'}</p><b>Objetivos de referencia</b><ul>{lesson.references.map(r=><li key={r.code}>{r.code} · página {r.printedPage} del documento (página {r.pdfPage} del PDF).</li>)}</ul><p>Practicamos una parte de estos objetivos. Puedes usar una pista y volver a leer antes de responder.</p>{lesson.unit==='writing'&&<p>Escribe con teclado o en papel. Revisa la pauta con un adulto o compañero.</p>}</div><button className="primary" onClick={begin}>Comenzar actividad →</button></>:phase==='done'?<><p className="eyebrow">PRÁCTICA TERMINADA</p><h1>¡Un nuevo paso!</h1><p className="lead">{lesson.title} · {lesson.grade}.º básico</p><p>Tu práctica quedó registrada. Puedes seguir explorando o repetir con otros ejemplos.</p><p className="small">El registro indica finalización con ayuda disponible; no es una nota ni acredita dominio del objetivo.</p><button className="primary" onClick={()=>setLesson(null)}>Volver al mapa →</button><button className="secondary" onClick={begin}>Volver a intentar con otros ejemplos</button></>:<><p className="small">{lesson.grade}.º básico · {lesson.subject} · {index+1} de {tasks.length}</p><PrimaryExercise key={`${lesson.id}-${version}-${index}`} task={tasks[index]} solved={solved} onDone={()=>setSolved(true)} speak={speak}/>{solved&&<div className="mission-controls"><button className="primary" onClick={next}>{index===tasks.length-1?'Terminar actividad':'Siguiente ejercicio'} →</button></div>}</>}
 </section>;
}


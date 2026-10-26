'use client';
import {saveLocation,ResumeLocation} from '../lib/resume-location';
import {useProgressStorage} from './ProgressStorage';
import {useEffect,useState} from 'react';
import {schoolLessons,SchoolLesson,restoreStudy,selectStudyRound} from '../lib/school-content';
import SchoolTask from './SchoolTask';
import KinderMap from './KinderMap';
import KinderSubjects from './KinderSubjects';
import {journeyAccess} from '../lib/kinder-journey';
import {freshSchoolRound} from '../lib/fresh-practice';
import type {StudyTask} from '../lib/school-content';
const STORAGE='lumiko-kinder-2026-v1';
export default function School({onBack,onAdventures,speak,initialLessonId,resume}:{resume?:ResumeLocation|null;initialLessonId?:string;onBack:()=>void;onAdventures:()=>void;speak:(text:string)=>void}){
 const storage=useProgressStorage();
 const [activeTasks,setActiveTasks]=useState<StudyTask[]>([]),[roundVersion,setRoundVersion]=useState(0);
 const [area,setArea]=useState<SchoolLesson['area']|null>(null);
 const [lesson,setLesson]=useState<SchoolLesson|null>(null),[round,setRound]=useState<number[]>([]),[q,setQ]=useState(0),[phase,setPhase]=useState<'intro'|'practice'|'done'>('intro'),[solved,setSolved]=useState(false);
 const [progress,setProgress]=useState<ReturnType<typeof restoreStudy>>({completed:[],cycles:{}}),[ready,setReady]=useState(false);
 useEffect(()=>{try{setProgress(restoreStudy(JSON.parse(storage.read(STORAGE)||'{}')));}catch{}setReady(true);},[]);
 useEffect(()=>{if(ready)try{storage.write(STORAGE,JSON.stringify(progress));}catch{}},[progress,ready]);
 const [located,setLocated]=useState(false);
 useEffect(()=>{
  if(!ready)return;
  const value=schoolLessons.find(l=>l.id===initialLessonId);
  if(value){setArea(value.area);if(journeyAccess(progress.completed,value.area).find(s=>s.lesson.id===value.id)?.available)setLesson(value);}
  else if(resume?.stage==='study'&&resume.area)setArea(resume.area as SchoolLesson['area']);
  setLocated(true);
 },[ready,initialLessonId]);
 useEffect(()=>{if(ready&&located)saveLocation(storage.scope,{stage:'study',area:area||undefined,lesson:phase==='done'?undefined:lesson?.id});},[ready,located,area,lesson,phase,storage.scope]);
 function choose(value:SchoolLesson){if(!ready||!journeyAccess(progress.completed,value.area).find(stop=>stop.lesson.id===value.id)?.available)return;setLesson(value);setPhase('intro');setQ(0);setSolved(false);}
 function begin(){if(!lesson)return;const {version,tasks}=freshSchoolRound(lesson,progress.completed.includes(lesson.id)?1:0);setActiveTasks(tasks);setRoundVersion(version);const result=selectStudyRound(tasks.length,lesson.randomBatch||tasks.length,progress.cycles[lesson.id]||[]);setRound(lesson.randomBatch?result.selected:tasks.map((_,i)=>i));if(lesson.randomBatch)setProgress(old=>({...old,cycles:{...old.cycles,[lesson.id]:result.seen}}));setQ(0);setSolved(false);setPhase('practice');}
 function next(){if(!lesson)return;if(q===round.length-1){setProgress(old=>({...old,completed:old.completed.includes(lesson.id)?old.completed:[...old.completed,lesson.id]}));setPhase('done');}else{setQ(q+1);setSolved(false);}}
 const visualWorkshop=!!lesson&&['k-build-words','k-initial','k-initial-two','k-syllabic','k-syllabic-two','k-quantity','k-compose','k-problems','k-line','k-neighbors','k-ordinal','k-patterns','k-seriation','k-classification','k-solids','k-sequence','k-guide-lumi','k-numberdictation','k-initial-odd','k-initial-letters','k-rhymes','k-words','k-reading','k-synonyms','k-texts','k-name','k-dictation','k-talk-scenes','k-copygrid','k-symmetry','k-puzzle','k-figureground','k-copyfigure','k-body','k-laterality','k-cutting','k-feelings','k-needs','k-solutions','k-care'].includes(lesson.id);
 return <section className={'mission school'+(visualWorkshop&&phase==='practice'?' syllable-session':'')+(lesson?.id==='k-quantity'&&phase==='practice'?' counting-session':'')+(lesson?.id==='k-patterns'&&phase==='practice'?' pattern-workshop-session':'')+(lesson?.id==='k-compose'&&phase==='practice'?' composition-session':'')+(lesson?.id==='k-problems'&&phase==='practice'?' problem-session':'')+(lesson&&['k-line','k-neighbors'].includes(lesson.id)&&phase==='practice'?' number-path-session':'')+(lesson?.id==='k-ordinal'&&phase==='practice'?' ordinal-session':'')+(lesson?.id==='k-seriation'&&phase==='practice'?' size-session':'')+(lesson?.id==='k-classification'&&phase==='practice'?' classification-session':'')+(lesson?.id==='k-solids'&&phase==='practice'?' solid-session':'')+(lesson?.id==='k-sequence'&&phase==='practice'?' story-order-session':'')+(lesson?.id==='k-guide-lumi'&&phase==='practice'?' route-session':'')+(lesson?.id==='k-numberdictation'&&phase==='practice'?' dictation-session':'')+(lesson&&['k-initial-odd','k-initial-letters','k-rhymes','k-words','k-reading','k-synonyms','k-texts','k-name','k-dictation','k-talk-scenes','k-copygrid','k-symmetry','k-puzzle','k-figureground','k-copyfigure','k-body','k-laterality','k-cutting','k-feelings','k-needs','k-solutions','k-care'].includes(lesson.id)&&phase==='practice'?' different-sound-session':'')} data-round-version={roundVersion}><div className="mission-top"><button className="quiet" onClick={lesson?()=>setLesson(null):area?()=>setArea(null):onBack}>{lesson?'← Mapa de '+area:area?'← Asignaturas de Kínder':'← Mapa de niveles'}</button><span>Kínder · Camino de descubrimientos</span></div>
 {!lesson?(area?<KinderMap key={area} area={area} completed={progress.completed} ready={ready} onChoose={choose}/>:<KinderSubjects completed={progress.completed} ready={ready} onChoose={setArea}/>):phase==='intro'?<><p className="eyebrow">{lesson.area.toUpperCase()}</p><h1>{lesson.title}</h1><p className="lead">{lesson.intro}</p><div className="lesson-text"><b>Antes de empezar</b><p>{lesson.example}</p><button className="quiet" onClick={()=>speak(lesson.intro+' '+lesson.example)}>♫ Escuchar ayuda</button></div><p className="small">{lesson.randomBatch||lesson.tasks.length} actividades por intento.{lesson.randomBatch?' Nuevas palabras o números al volver, hasta recorrer el banco completo.':''}</p><button className="primary" onClick={begin}>Comenzar repaso →</button></>:phase==='done'?<><p className="eyebrow">REPASO TERMINADO</p><h1>¡Practicaste con Lumi!</h1><p className="lead">{lesson.title}</p><p>Tu repaso quedó registrado. Puedes volver cuando quieras.</p><p className="small">Registrar una práctica no es una nota ni demuestra dominio del tema.</p><button className="primary" onClick={()=>setLesson(null)}>Volver al mapa →</button><button className="quiet" onClick={begin}>Volver a practicar con nuevos ejemplos</button></>:<>{visualWorkshop?<div className="workshop-progress"><span>{lesson.title}</span><ol aria-label={'Progreso: ejercicio '+(q+1)+' de '+round.length}>{round.map((_,i)=><li key={i} className={i<q?'done':i===q?'current':''} aria-current={i===q?'step':undefined}><span>{i<q?'✓':i+1}</span></li>)}</ol><span>{q+1} de {round.length}</span></div>:<p className="small">{lesson.title} · {q+1} de {round.length}</p>}<SchoolTask socialTheme={lesson.id} paperWorkshop={lesson.id==='k-cutting'} lateralityWorkshop={lesson.id==='k-laterality'} bodyWorkshop={lesson.id==='k-body'} copyFigureWorkshop={lesson.id==='k-copyfigure'} figureGroundWorkshop={lesson.id==='k-figureground'} puzzleWorkshop={lesson.id==='k-puzzle'} symmetryWorkshop={lesson.id==='k-symmetry'} copyGridWorkshop={lesson.id==='k-copygrid'} writingWorkshop={lesson.id==='k-name'||lesson.id==='k-dictation'} textTypeWorkshop={lesson.id==='k-texts'} synonymWorkshop={lesson.id==='k-synonyms'} readingWorkshop={lesson.id==='k-reading'} wordCountWorkshop={lesson.id==='k-words'} letterWorkshop={lesson.id==='k-initial-letters'} differentSoundWorkshop={lesson.id==='k-initial-odd'} patternWorkshop={lesson.id==='k-patterns'} ordinalWorkshop={lesson.id==='k-ordinal'} numberWorkshop={lesson.id==='k-line'?'line':lesson.id==='k-neighbors'?'neighbors':undefined} problemWorkshop={lesson.id==='k-problems'} countingWorkshop={lesson.id==='k-quantity'} key={`${lesson.id}-${roundVersion}-${q}-${round.join('-')}`} task={activeTasks[round[q]]} solved={solved} onDone={()=>setSolved(true)} speak={speak}/>{(solved||lesson.id==='k-patterns'||lesson.id==='k-compose'||lesson.id==='k-problems'||lesson.id==='k-line'||lesson.id==='k-neighbors'||lesson.id==='k-ordinal'||lesson.id==='k-seriation'||lesson.id==='k-classification'||lesson.id==='k-solids'||lesson.id==='k-sequence'||lesson.id==='k-guide-lumi'||lesson.id==='k-numberdictation'||lesson.id==='k-initial-odd'||lesson.id==='k-initial-letters'||lesson.id==='k-rhymes'||lesson.id==='k-words'||lesson.id==='k-reading'||lesson.id==='k-synonyms'||lesson.id==='k-texts'||lesson.id==='k-name'||lesson.id==='k-dictation'||lesson.id==='k-talk-scenes'||lesson.id==='k-copygrid'||lesson.id==='k-symmetry'||lesson.id==='k-puzzle'||lesson.id==='k-figureground'||lesson.id==='k-copyfigure'||lesson.id==='k-body'||lesson.id==='k-laterality'||lesson.id==='k-cutting'||lesson.id==='k-feelings'||lesson.id==='k-needs'||lesson.id==='k-solutions'||lesson.id==='k-care')&&<div className="mission-controls"><button className="primary" disabled={!solved} onClick={next}>{q===round.length-1?'Terminar repaso':'Siguiente actividad'} →</button></div>}</>}
 </section>;
}
























'use client';
import {tokens} from '../lib/tokens';
import PaperWorkshop from './PaperWorkshop';
import LateralityWorkshop from './LateralityWorkshop';
import BodyWorkshop from './BodyWorkshop';
import CopyFigureWorkshop from './CopyFigureWorkshop';
import FigureGroundWorkshop from './FigureGroundWorkshop';
import PuzzleWorkshop from './PuzzleWorkshop';
import SymmetryWorkshop from './SymmetryWorkshop';
import CopyGridWorkshop from './CopyGridWorkshop';
import WritingWorkshop from './WritingWorkshop';
import TextTypeWorkshop from './TextTypeWorkshop';
import SynonymWorkshop from './SynonymWorkshop';
import ReadingWorkshop from './ReadingWorkshop';
import WordCountWorkshop from './WordCountWorkshop';
import RhymeWorkshop from './RhymeWorkshop';
import LetterWorkshop from './LetterWorkshop';
import DifferentSoundWorkshop from './DifferentSoundWorkshop';
import NumberDictationWorkshop from './NumberDictationWorkshop';
import StoryOrderWorkshop from './StoryOrderWorkshop';
import SolidWorkshop from './SolidWorkshop';
import ClassificationWorkshop from './ClassificationWorkshop';
import SizeWorkshop from './SizeWorkshop';
import PatternWorkshop from './PatternWorkshop';
import OrdinalWorkshop from './OrdinalWorkshop';
import NumberPathWorkshop from './NumberPathWorkshop';
import ProblemWorkshop from './ProblemWorkshop';
import CountingWorkshop from './CountingWorkshop';
import PhonicsWorkshop from './PhonicsWorkshop';
import KinderSocial from './KinderSocial';
import KinderDiscovery from './KinderDiscovery';
import {useState} from 'react';
import {WritingBoard} from './WritingBoard';
export {WritingBoard} from './WritingBoard';
import type {StudyTask,ChoiceTask} from '../lib/school-content';
import MathScene,{MathOption} from './MathScene';
import {Solid,Figure,Body,Picture,PaperTemplate} from './SchoolVisuals';

type Props={socialTheme?:string;paperWorkshop?:boolean;lateralityWorkshop?:boolean;bodyWorkshop?:boolean;copyFigureWorkshop?:boolean;figureGroundWorkshop?:boolean;puzzleWorkshop?:boolean;symmetryWorkshop?:boolean;copyGridWorkshop?:boolean;writingWorkshop?:boolean;textTypeWorkshop?:boolean;synonymWorkshop?:boolean;readingWorkshop?:boolean;wordCountWorkshop?:boolean;letterWorkshop?:boolean;differentSoundWorkshop?:boolean;patternWorkshop?:boolean;ordinalWorkshop?:boolean;numberWorkshop?:'line'|'neighbors';problemWorkshop?:boolean;countingWorkshop?:boolean;task:StudyTask;solved:boolean;onDone:()=>void;speak:(text:string)=>void};
function Choice({task,solved,onDone,speak}:Props&{task:ChoiceTask}){
 const [feedback,setFeedback]=useState(''),[ready,setReady]=useState(false);
 function answer(value:string){if(value===task.answer){setFeedback(task.explanation);onDone();speak(task.explanation);}else{setFeedback('Probemos otra vez. '+task.hint);speak(task.hint);}}
 return <><h1>{task.prompt}</h1><button className="listen" onClick={()=>speak(task.prompt)}>♫ Escuchar pregunta</button>
 {task.passage&&<div className="lesson-text school-passage"><p>{task.passage}</p><button className="quiet" onClick={()=>speak(task.passage!)}>♫ Escuchar texto</button></div>}
 {task.comic&&<div className="school-comic">{task.comic.map(([name,line],i)=><div key={i}><span>Viñeta {i+1}</span><b>{name}</b><p>{line}</p><button className="quiet" onClick={()=>speak(`${name} dice: ${line}`)}>♫ Escuchar viñeta</button></div>)}</div>}
 {task.visual&&<MathScene visual={task.visual} onReady={setReady}/>}
 {task.line&&<ol className="number-line" aria-label="Recta numérica de izquierda a derecha">{task.line.map((n,i)=><li key={i}>{n}</li>)}</ol>}
 {task.ordinal&&<div className="ordinal-line"><p>Inicio → · Mira de izquierda a derecha</p><ol aria-label="Fila de animales">{task.ordinal.map((icon,i)=><li key={i}><span aria-hidden="true">{icon}</span><small>{i+1}°</small></li>)}</ol></div>}
 {task.target&&<div className="figure-ground" aria-label="Figura entre líneas de fondo"><Figure shape={task.target} background variant={task.artVariant}/></div>}{task.body&&<Body/>}
 <div className={'study-options'+(task.visual?.kind==='order'?' study-order':'')}>{task.options.map(([label,icon],i)=><div key={label}><button className="answer" disabled={solved||(task.visual?.kind==='operation'&&!ready)} onClick={()=>answer(label)}>{task.visual&&<MathOption visual={task.visual} index={i}/>}{task.solidChoices&&<Solid name={task.solidChoices[i]} variant={task.artVariant}/>}{task.figureChoices&&<Figure shape={task.figureChoices[i]}/>}{(task.visual?.kind==='pattern'?tokens[label]:icon)&&<span aria-hidden="true">{task.visual?.kind==='pattern'?tokens[label]:icon}</span>}<b>{label}</b></button><button className="word-audio" onClick={()=>speak(label)} aria-label={`Escuchar ${label}`}>♫ Escuchar</button></div>)}</div>
 <p className="feedback" aria-live="polite">{feedback||(task.visual?.kind==='pattern'?'Elige la imagen que sigue para activar el botón de continuar.':'')}</p><button className="quiet" onClick={()=>{setFeedback(task.hint);speak(task.hint);}}>✧ Dame una pista</button></>;
}
function Grid({task,solved,onDone}:Props&{task:Extract<StudyTask,{kind:'grid'}>}){
 const [marked,setMarked]=useState<number[]>(task.preset||[]),[feedback,setFeedback]=useState('');
 const mirror=!!task.preset;
 function board(model:boolean){return <div className="study-grid" style={{gridTemplateColumns:`repeat(${task.size},1fr)`}} role="group" aria-label={model?'Modelo':'Tu cuadrícula'}>{Array.from({length:task.size**2},(_,i)=>model?<span key={i} className={task.target.includes(i)?'marked':''}/>:<button key={i} disabled={solved||(mirror&&i%task.size<task.size/2)} aria-label={`Fila ${Math.floor(i/task.size)+1}, columna ${i%task.size+1}`} aria-pressed={marked.includes(i)} className={(marked.includes(i)?'marked ':'')+(mirror&&i%task.size===task.size/2-1?'mirror-axis':'')} onClick={()=>setMarked(old=>old.includes(i)?old.filter(n=>n!==i):[...old,i])}/> )}</div>;}
 return <><h1>{task.prompt}</h1><div className="grid-pair">{!mirror&&<div><h2>Modelo</h2>{board(true)}</div>}<div><h2>{mirror?'Completa el lado derecho':'Tu copia'}</h2>{board(false)}</div></div>{mirror&&<p className="small">El eje está en el centro. El lado izquierdo queda fijo.</p>}<button className="secondary" disabled={solved} onClick={()=>{if(marked.length===task.target.length&&task.target.every(n=>marked.includes(n))){setFeedback('¡Coincide! Revisaste cada casilla.');onDone();}else setFeedback('Revisa fila por fila. Aún hay casillas para cambiar.');}}>Comprobar cuadrícula</button><p className="feedback" aria-live="polite">{feedback}</p></>;
}
function Puzzle({task,solved,onDone}:Props&{task:Extract<StudyTask,{kind:'puzzle'}>}){
 const [cells,setCells]=useState<(number|null)[]>(Array(6).fill(null)),[selected,setSelected]=useState<number|null>(null),[show,setShow]=useState(false),[feedback,setFeedback]=useState('');
 function place(slot:number){if(selected===null)return;setCells(old=>old.map((piece,i)=>i===slot?selected:piece===selected?null:piece));setSelected(null);}
 return <><h1>{task.prompt}</h1><p>Elige una pieza y luego una casilla. Para cambiarla, vuelve a elegir la pieza.</p><button className="quiet" onClick={()=>setShow(!show)}>{show?'Ocultar':'Ver'} imagen completa</button>{show&&<div className="puzzle-model"><Picture variant={task.variant} scene={task.scene}/></div>}<div className="puzzle-board" role="group" aria-label="Rompecabezas de seis casillas">{cells.map((piece,i)=><button key={i} disabled={solved} aria-label={`Casilla ${i+1}${piece===null?', vacía':`, pieza ${piece+1}`}`} onClick={()=>place(i)}>{piece===null?'?':<Picture variant={task.variant} scene={task.scene} part={piece}/>}</button>)}</div><div className="puzzle-pieces" role="group" aria-label="Piezas para elegir">{[4,1,5,0,3,2].map(piece=><button key={piece} disabled={solved} aria-label={`Elegir pieza ${piece+1}`} aria-pressed={selected===piece} onClick={()=>setSelected(piece)}><Picture variant={task.variant} scene={task.scene} part={piece}/></button>)}</div><button className="secondary" disabled={solved||cells.some(p=>p===null)} onClick={()=>{if(cells.every((p,i)=>p===i)){setFeedback('¡Encajaron las seis piezas!');onDone();}else setFeedback('Mira las líneas que continúan entre piezas y cambia las que necesites.');}}>Comprobar rompecabezas</button><p className="feedback" aria-live="polite">{feedback}</p></>;
}
function Draw({task,solved,onDone,speak}:Props&{task:Extract<StudyTask,{kind:'draw'}>}){
 const [model,setModel]=useState(false),[reviewed,setReviewed]=useState(false);
 return <><h1>{task.prompt}</h1>{task.dictation&&<><button className="listen" onClick={()=>speak(task.dictation!)}>♫ Escuchar dictado</button><p className="small">Si no se oye, un adulto puede mostrar el modelo y dictarte la palabra.</p></>}{task.model&&!task.dictation&&<p className="writing-model">{task.model}</p>}<WritingBoard/>{task.dictation&&<><button className="secondary" onClick={()=>setModel(true)}>Ya escribí · Mostrar modelo</button>{model&&<p className="writing-model">{task.model}</p>}</>}<p className="small">La revisión de escritura la hace un adulto. Lumiko no reconoce ni califica tus trazos.</p><label className="review-check"><input type="checkbox" checked={reviewed} disabled={solved} onChange={e=>setReviewed(e.target.checked)}/> Revisamos juntos la escritura.</label><button className="secondary" disabled={solved||!reviewed||!!task.dictation&&!model} onClick={onDone}>Registrar práctica acompañada</button></>;
}
function Practice({task,solved,onDone}:Props&{task:Extract<StudyTask,{kind:'practice'}>}){
 const [checked,setChecked]=useState(false);
 return <><h1>{task.prompt}</h1><div className="lesson-text"><b>Materiales y acompañamiento</b><p>{task.materials}</p><ol>{task.steps.map(step=><li key={step}>{step}</li>)}</ol></div><PaperTemplate kind={task.template} variant={task.variant}/><p className="small">Hacer clic no comprueba esta habilidad. La práctica y la revisión se hacen con un adulto.</p><label className="review-check"><input type="checkbox" checked={checked} disabled={solved} onChange={e=>setChecked(e.target.checked)}/> Realizamos la práctica y la revisamos juntos.</label><button className="secondary" disabled={solved||!checked} onClick={onDone}>Registrar práctica acompañada</button></>;
}

export default function SchoolTask(props:Props){
 const {task}=props;
 if(props.paperWorkshop&&task.kind==='practice')return <PaperWorkshop {...props} task={task}/>;
 if(props.lateralityWorkshop&&(task.kind==='choice'||task.kind==='practice'))return <LateralityWorkshop {...props} task={task}/>;
 if(props.bodyWorkshop&&(task.kind==='choice'||task.kind==='practice'))return <BodyWorkshop {...props} task={task}/>;
 if(props.copyFigureWorkshop&&task.kind==='draw')return <CopyFigureWorkshop {...props} task={task}/>;
 if(props.figureGroundWorkshop&&task.kind==='choice')return <FigureGroundWorkshop {...props} task={task}/>;
 if(props.puzzleWorkshop&&task.kind==='puzzle')return <PuzzleWorkshop {...props} task={task}/>;
 if(props.symmetryWorkshop&&task.kind==='grid')return <SymmetryWorkshop {...props} task={task}/>;
 if(props.copyGridWorkshop&&task.kind==='grid')return <CopyGridWorkshop {...props} task={task}/>;
 if(props.writingWorkshop&&task.kind==='draw')return <WritingWorkshop {...props} task={task}/>;
 if(props.textTypeWorkshop&&task.kind==='choice')return <TextTypeWorkshop {...props} task={task}/>;
 if(props.synonymWorkshop&&task.kind==='choice')return <SynonymWorkshop {...props} task={task}/>;
 if(props.readingWorkshop&&task.kind==='choice')return <ReadingWorkshop {...props} task={task}/>;
 if(props.wordCountWorkshop&&task.kind==='choice')return <WordCountWorkshop {...props} task={task}/>;
 if(task.kind==='choice'&&task.rhyme)return <RhymeWorkshop {...props} task={task}/>;
 if(props.letterWorkshop&&task.kind==='choice')return <LetterWorkshop {...props} task={task}/>;
 if(props.differentSoundWorkshop&&task.kind==='choice')return <DifferentSoundWorkshop {...props} task={task}/>;
 if(task.kind==='choice'&&task.solidChoices)return <SolidWorkshop {...props} task={task}/>;
 if(props.patternWorkshop&&task.kind==='choice'&&task.visual?.kind==='pattern')return <PatternWorkshop {...props} task={task}/>;
 if(props.ordinalWorkshop&&task.kind==='choice'&&task.ordinal)return <OrdinalWorkshop {...props} task={task}/>;
 if(props.numberWorkshop&&task.kind==='choice')return <NumberPathWorkshop {...props} task={task} mode={props.numberWorkshop}/>;
 if(props.problemWorkshop&&task.kind==='choice'&&task.visual?.kind==='operation')return <ProblemWorkshop {...props} task={task}/>;
 if(props.countingWorkshop&&task.kind==='choice'&&task.visual?.kind==='count')return <CountingWorkshop {...props} task={task}/>;
 if(task.kind==='choice'&&task.phonics)return <PhonicsWorkshop {...props} task={task}/>;
 if(task.kind==='social')return <KinderSocial {...props} theme={props.socialTheme} task={task}/>;
 if(task.kind==='syllable-build'||task.kind==='oral-scene'||task.kind==='compose-number'||task.kind==='lumi-route')return <KinderDiscovery {...props} task={task}/>;
 if(task.kind==='group')return <ClassificationWorkshop {...props} task={task}/>;
 if(task.kind==='sort')return <SizeWorkshop {...props} task={task}/>;
 if(task.kind==='choice')return <Choice {...props} task={task}/>;
 if(task.kind==='grid')return <Grid {...props} task={task}/>;
 if(task.kind==='sequence')return <StoryOrderWorkshop {...props} task={task}/>;
 if(task.kind==='puzzle')return <Puzzle {...props} task={task}/>;
 if(task.kind==='draw')return <Draw {...props} task={task}/>;
 if(task.kind==='number')return <NumberDictationWorkshop {...props} task={task}/>;
 return <Practice {...props} task={task}/>;
}


















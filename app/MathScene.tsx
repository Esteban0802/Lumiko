import {tokens} from '../lib/tokens';
import {useState} from 'react';
import type {GardenObject,MathVisual} from '../lib/content';
import {describeObject} from '../lib/extended-math-content';

function Seeds({amount,label,token}:{amount:number;label:string;token?:string}) {
 return <div className="seed-group"><b>{label}</b><ul className="seed-grid" aria-label={label}>{Array.from({length:amount},(_,i)=><li key={i}>{token?<span className="count-token" role="img" aria-label={token}>{tokens[token]}</span>:<span className="seed" role="img" aria-label="Semilla"/>}</li>)}</ul></div>;
}
export function GardenItem({item}:{item:GardenObject}) {
 const size={small:22,medium:36,large:52}[item.size];
 return <span className="garden-item" role="img" aria-label={describeObject(item)}><svg width={size} height={size} viewBox="0 0 60 60" aria-hidden="true" fill={{green:'#386b59',purple:'#9a78b8',blue:'#77a9d0',orange:'#e5a16c'}[item.color]} stroke="#324f4b" strokeWidth="2">{item.shape==='circle'?<circle cx="30" cy="30" r="27"/>:item.shape==='square'?<rect x="3" y="3" width="54" height="54"/>:item.shape==='rectangle'?<rect x="2" y="14" width="56" height="32"/>:item.shape==='oval'?<ellipse cx="30" cy="30" rx="28" ry="17"/>:<polygon points="30,3 57,57 3,57"/>}</svg></span>;
}
export function MathOption({visual,index}:{visual:MathVisual;index:number}) {
 if(visual.kind==='classify')return <GardenItem item={visual.items[index]}/>;
 if(visual.kind==='order')return <span className="order-row">{visual.rows[index].map((item,i)=><GardenItem item={item} key={i}/>)}</span>;
 return null;
}
function Operation({visual,onReady}:{visual:Extract<MathVisual,{kind:'operation'}>;onReady?:(ready:boolean)=>void}) {
 const [moved,setMoved]=useState(0);
 const done=moved===visual.change;
 const noun=visual.token?'objetos':'semillas';
 const amount=visual.action==='add'?visual.start+moved:visual.start-moved;
 function move(){if(done)return;const next=moved+1;setMoved(next);onReady?.(next===visual.change);}
 return <div className="math-scene operation-scene"><p>Había {visual.start} {noun}. Lumi {visual.action==='add'?'agrega':'quita'} {visual.change}.</p><div className="canastos"><div><Seeds amount={amount} token={visual.token} label={visual.token?'Tu colección · ahora':'Canasto · ahora'}/>{amount===0&&<p className="small">{visual.token?'La colección quedó vacía.':'El canasto quedó vacío.'}</p>}</div><div><Seeds amount={visual.action==='add'?visual.change-moved:moved} token={visual.token} label={visual.action==='add'?'Por agregar':visual.token?'Fuera de la colección':'Fuera del canasto'}/></div></div><button className="secondary" onClick={move} disabled={done}>{visual.token?(visual.action==='add'?'Agregar un objeto':'Quitar un objeto'):(visual.action==='add'?'Agregar una semilla':'Quitar una semilla')}</button><p className="small" role="status">{done?'Ahora cuenta la colección y elige tu respuesta.':`Moviste ${moved} de ${visual.change}. Primero realiza los movimientos.`}</p><button className="quiet" onClick={()=>{setMoved(0);onReady?.(false);}}>Volver a empezar el movimiento</button></div>;
}
export default function MathScene({visual,onReady,example=false}:{visual:MathVisual;onReady?:(ready:boolean)=>void;example?:boolean}) {
 if(visual.kind==='operation')return <Operation visual={visual} onReady={onReady}/>;
 if(visual.kind==='classify')return <div className="math-scene"><p>Revisa las características de cada objeto.</p>{example&&<div className="example-objects">{visual.items.map((item,i)=><div key={i}><GardenItem item={item}/><small>{describeObject(item)}</small></div>)}</div>}</div>;
 if(visual.kind==='order')return <div className="math-scene"><p>Mira cada fila de izquierda a derecha →</p></div>;
 if(visual.kind==='count')return <div className="math-scene"><Seeds amount={visual.amount} token={visual.token} label={visual.token?'Objetos para contar':'Semillas para contar'}/></div>;
 if(visual.kind==='compare')return <div className="math-scene canastos"><Seeds amount={visual.left} label="Canasto A"/><Seeds amount={visual.right} label="Canasto B"/></div>;
 const symbols=tokens;
 return <div className="math-scene"><p className="small">Sigue el sendero de izquierda a derecha →</p><ol className="pattern-strip" aria-label="Patrón para continuar">{visual.sequence.map((name,i)=><li key={i}><span aria-hidden="true">{symbols[name]}</span><small>{name}</small></li>)}<li className="pattern-missing" aria-label="Casilla por completar">?</li></ol></div>;
}

'use client';
import {useCallback,useEffect,useState} from 'react';
import dynamic from 'next/dynamic';
import {Avatar,initial,restoreAvatar,avatarSvg,lumiSvg,svgUrl} from '../lib/art';
import Activities from './Activities';
import AvatarEditor from './AvatarEditor';
import {ExplorerAvatarContext} from './ExplorerAvatarContext';
import School from './School';
import Primary from './Primary';
import {ActivityId,restoreCompleted} from '../lib/content';
const World=dynamic(()=>import('./World'),{ssr:false,loading:()=> <div className="world loading">Preparando tu aventura…</div>});
type Stage='welcome'|'custom'|'plaza'|'forest'|'mission'|'study'|'primary'|'adventures';
export default function Home(){
 const [levelOrigin,setLevelOrigin]=useState<'welcome'|'forest'>('welcome');
 const [stage,setStage]=useState<Stage>('welcome'),[avatar,setAvatar]=useState<Avatar>(initial),[ready,setReady]=useState(false),[completed,setCompleted]=useState<ActivityId[]>([]),[muted,setMuted]=useState(false),[saved,setSaved]=useState(false),[audioError,setAudioError]=useState('');
 useEffect(()=>{try{const raw=localStorage.getItem('lumiko-v1');if(raw){const s=JSON.parse(raw);if(s.version===1&&s.avatar&&['skin','hair','shirt','accessory'].every(k=>typeof s.avatar[k]==='string')){setAvatar(restoreAvatar(s.avatar));setCompleted(restoreCompleted(s.completed,s.stars));setSaved(true);}}}catch{}setReady(true);},[]);
 useEffect(()=>{if(ready)try{localStorage.setItem('lumiko-v1',JSON.stringify({version:1,avatar,stars:completed.length,completed}));}catch{}},[ready,avatar,completed]);
 const speak=useCallback((text:string)=>{if(muted)return;if(!('speechSynthesis' in window)){setAudioError('La voz no está disponible aquí. Puedes usar las pistas y los dibujos.');return;}window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='es-CL';u.rate=.78;setAudioError('');u.onerror=(event)=>{if(event.error!=='canceled'&&event.error!=='interrupted')setAudioError('No pudimos reproducir la voz. Usa la pista o vuelve a escuchar.');};window.speechSynthesis.speak(u);},[muted]);
 useEffect(()=>()=>window.speechSynthesis?.cancel(),[]);
 const primaryPortal=useCallback(()=>setStage('primary'),[]);
 const plazaPortal=useCallback(()=>setStage('study'),[]),forestPortal=useCallback(()=>{setLevelOrigin('forest');setStage('plaza');},[]);
 const stars=completed.length;
 const lumi=<img className="lumi" src={svgUrl(lumiSvg)} alt="Lumi, criatura turquesa con antenas, ojos ámbar y estrella dorada"/>;
 return <ExplorerAvatarContext.Provider value={avatar}><main className={stage==='plaza'||stage==='forest'?'play-screen':undefined}><header><a className="brand" href={(process.env.NEXT_PUBLIC_BASE_PATH||'')+'/'} aria-label="Lumiko inicio">lumi<span>k</span>o<i>✦</i></a><div className="top-actions"><span className="badge">✦ {stars} estrella{stars===1?'':'s'}</span><button className="quiet" onClick={()=>{setMuted(!muted);window.speechSynthesis?.cancel();}} aria-label={muted?'Activar sonido':'Silenciar sonido'}>{muted?'♩ Sonido apagado':'♫ Sonido'}</button></div></header>
 <div className="stage-label"><span/> UN PEQUEÑO PASO, UN GRAN DESCUBRIMIENTO</div>
 {stage==='welcome'&&<section className="welcome"><div className="intro"><p className="eyebrow">TU AVENTURA COMIENZA AQUÍ</p><h1>Un mundo por<br/>descubrir.<br/><em>A tu manera.</em></h1><p className="lead">Juega, escucha y explora.<br/>Lumi te acompaña en cada paso.</p><button className="primary" disabled={!ready} onClick={()=>{setStage(saved?'plaza':'custom');speak('Hola, soy Lumi. ¡Vamos a explorar!');}}>{saved?'Continuar mi aventura':'¡Vamos a explorar!'} <span>↗</span></button><p className="small">Para explorar desde kínder hasta 6.º básico</p></div><div className="hero-art"><div className="orbit one"/><div className="orbit two"/><span className="spark s1">✦</span><span className="spark s2">✧</span><div className="hero-island"/><img className="hero-child" src={svgUrl(avatarSvg(avatar))} alt="Tu explorador"/><img className="hero-lumi" src={svgUrl(lumiSvg)} alt="Lumi"/><div className="hello">¡Hola! Soy Lumi <span>✦</span></div><div className="island-caption">Cada descubrimiento empieza contigo.</div></div><div className="journey"><span>01 <b>Crea tu explorador</b></span><span>02 <b>Descubre tu mundo</b></span><span>03 <b>Aprende jugando</b></span></div></section>}
 {stage==='custom'&&<AvatarEditor avatar={avatar} onChange={setAvatar} onBack={()=>setStage('plaza')}/>} 
 {(stage==='plaza'||stage==='forest')&&<section className="explore"><div className="world-heading"><div><p className="eyebrow">{stage==='plaza'?'TU LUGAR DE ENCUENTRO':'TU PRIMERA AVENTURA'}</p><h1>{stage==='plaza'?'Elige tu próxima aventura':'Bosque de las Palabras'}</h1></div><button className="quiet" onClick={()=>setStage(stage==='plaza'?'custom':'plaza')}>{stage==='plaza'?'✎ Mi explorador':'← Plaza'}</button></div><div className="world-wrap"><World avatar={avatar} forest={stage==='forest'} onPrimary={stage==='plaza'?primaryPortal:undefined} onPortal={stage==='plaza'?plazaPortal:forestPortal}/><div className="map-chip">✦ {stage==='plaza'?'Dos destinos para aprender':'Palabras y cantidades'}</div></div><div className="lumi-bar">{lumi}<div><b>{stage==='plaza'?'¿Qué destino exploramos?':'¡Elige tu próximo descubrimiento!'}</b><p>{stage==='plaza'?'Camina al portal de Kínder o de Básica. También puedes elegir con los botones.':'Camina hacia el arco para elegir una aventura.'}</p></div><button className="secondary" onClick={stage==='plaza'?plazaPortal:forestPortal}>{stage==='plaza'?'Ir a Kínder':'Elegir mi nivel'} →</button>{stage==='plaza'&&<button className="secondary" onClick={primaryPortal}>Ir a Básica →</button>}</div><p className="small centered">Toca o haz clic para moverte · Los árboles y las rocas se rodean solos</p></section>}
 {stage==='mission'&&<section className="mission"><div className="mission-top"><button className="quiet" onClick={()=>setStage(levelOrigin)}>← {levelOrigin==='forest'?'Bosque':'Inicio'}</button><span>Aprendemos con Lumi</span></div><h1>Elige tu nivel</h1><p className="lead">Encuentra tu temario y practica a tu ritmo.</p><div className="activity-list"><button className="secondary activity-choice" onClick={()=>setStage('study')}><b>Kínder</b><span>Aprendizajes de kínder: Lenguaje, Matemática, Habilidades y Emociones y convivencia.</span><small>Explorar aprendizajes →</small></button><button className="secondary activity-choice" onClick={()=>setStage('primary')}><b>Básica</b><span>Lenguaje y Matemática de 1.º a 6.º básico.</span><small>Elegir curso y ver mi temario →</small></button></div></section>}
 {stage==='adventures'&&<Activities completed={completed} onComplete={id=>setCompleted(previous=>previous.includes(id)?previous:[...previous,id])} onBack={()=>setStage('study')} speak={speak}/>}
 {stage==='study'&&<School onBack={()=>setStage('plaza')} onAdventures={()=>setStage('adventures')} speak={speak}/>}
 {stage==='primary'&&<Primary onBack={()=>setStage('plaza')} speak={speak}/>}
 {audioError&&<p role="status" className="audio-error">{audioError}</p>}<footer><span>Hecho para descubrir, a tu ritmo.</span><span>LUMIKO · PRIMERA AVENTURA</span></footer></main></ExplorerAvatarContext.Provider>;
}







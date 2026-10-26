'use client';
import {FormEvent,useEffect,useState} from 'react';
import Link from 'next/link';
import FamilyProgress from './FamilyProgress';
import {lockParent} from '../lib/parent-access';
import {onAuthStateChanged,signOut,User} from 'firebase/auth';
import {addDoc,collection,doc,onSnapshot,serverTimestamp,updateDoc} from 'firebase/firestore';
import {avatarSvg,restoreAvatar,svgUrl} from '../lib/art';
import {familyAuth,familyDb} from '../lib/firebase';
import {cleanProgress,hasStartedAdventure} from '../lib/family-progress';


type Child={id:string;name:string;level:string;[key:string]:unknown};
export default function FamilyDashboard(){
 const [editing,setEditing]=useState<{id:string;name:string;level:string}|null>(null),[editError,setEditError]=useState(''),[notice,setNotice]=useState('');
 const [user,setUser]=useState<User|null>(null),[ready,setReady]=useState(false),[loading,setLoading]=useState(true),[children,setChildren]=useState<Child[]>([]),[error,setError]=useState(''),[name,setName]=useState(''),[level,setLevel]=useState('Kínder'),[busy,setBusy]=useState(false),[selected,setSelected]=useState(''),[connected,setConnected]=useState(false),[retry,setRetry]=useState(0),[showCreate,setShowCreate]=useState(false);
 useEffect(()=>{
  let stop=()=>{},timer:ReturnType<typeof setTimeout>|undefined;
  const clear=()=>{if(timer)clearTimeout(timer);};
  const unsub=onAuthStateChanged(familyAuth(),u=>{
   stop();clear();setUser(u);setReady(true);setChildren([]);setSelected('');setError('');setConnected(false);
   if(!u){setLoading(false);return;}
   setLoading(true);
   timer=setTimeout(()=>{setLoading(false);setError('Firebase no respondió a tiempo. Comprueba tu conexión y que hayas creado Cloud Firestore (default) en el proyecto lumiko-4b996 y publicado las reglas privadas. Después presiona Reintentar conexión.');},12000);
   stop=onSnapshot(collection(familyDb(),'users',u.uid,'children'),{includeMetadataChanges:true},snapshot=>{
    // Una lista vacía de caché no confirma que la base de datos esté disponible.
    if(snapshot.metadata.fromCache)return;
    clear();setChildren(snapshot.docs.map(d=>({...d.data(),id:d.id} as Child)));setLoading(false);setConnected(true);setError('');
   },cause=>{clear();setLoading(false);setConnected(false);setError(cause.code==='permission-denied'?'Firestore rechazó el acceso. Publica las reglas privadas de Lumiko en Cloud Firestore > Reglas.':'No pudimos cargar los perfiles. Comprueba la conexión y que Cloud Firestore (default) esté creado en el proyecto lumiko-4b996.');});
  },()=>{clear();setReady(true);setLoading(false);setError('No pudimos recuperar tu sesión.');});
  return()=>{clear();unsub();stop();};
 },[retry]);
 async function create(event:FormEvent){event.preventDefault();if(!user||busy||!connected||!name.trim())return;setBusy(true);setError('');try{const ref=await addDoc(collection(familyDb(),'users',user.uid,'children'),{name:name.trim(),level,createdAt:serverTimestamp(),updatedAt:serverTimestamp(),main:cleanProgress('main',null),kinder:cleanProgress('kinder',null),basic:cleanProgress('basic',null)});setName('');setLevel('Kínder');setSelected(ref.id);setShowCreate(false);}catch{setError('No pudimos crear el perfil. Comprueba que Firestore esté creado y sus reglas publicadas.');}finally{setBusy(false);}}
 async function saveProfile(event:FormEvent){
  event.preventDefault();if(!user||!editing||busy||!connected)return;
  if(!editing.name.trim()){setEditError('Escribe un apodo antes de guardar.');return;}
  setBusy(true);setEditError('');setNotice('');
  try{
   await updateDoc(doc(familyDb(),'users',user.uid,'children',editing.id),{name:editing.name.trim(),level:editing.level,updatedAt:serverTimestamp()});
   setNotice('Perfil actualizado. Su personaje y avance se conservan.');setEditing(null);
  }catch{setEditError('No pudimos guardar los cambios. Revisa tu conexión e inténtalo nuevamente.');}
  finally{setBusy(false);}
 }
 async function logout(){setBusy(true);try{if(user)lockParent(user.uid);await signOut(familyAuth());}catch{setError('No pudimos cerrar la sesión. Inténtalo nuevamente.');}finally{setBusy(false);}}
 if(!ready)return <p role="status">Preparando tu panel familiar…</p>;
 if(!user)return <section className="account-page"><h1>Tu panel familiar</h1><p>Inicia sesión con el correo del apoderado para ver los perfiles y sus avances.</p><Link className="primary" href="/ingresar/">Iniciar sesión</Link>{error&&<div><p role="alert">{error}</p><button className="secondary" onClick={()=>setRetry(n=>n+1)}>Reintentar conexión</button></div>}</section>;
 const child=children.find(c=>c.id===selected);
 return <section className="family-dashboard"><div className="dashboard-heading"><div><p className="eyebrow">APRENDEMOS EN FAMILIA</p><h1>Mi panel de apoderado</h1><p>{user.email}</p></div><div className="dashboard-actions"><button className="secondary" disabled={busy} aria-expanded={showCreate} aria-controls="create-explorer" onClick={()=>{setShowCreate(open=>!open);setEditing(null);setEditError('');}}>Agregar explorador</button><button className="quiet" disabled={busy} onClick={logout}>Cerrar sesión</button></div></div>{error&&<div><p role="alert">{error}</p><button className="secondary" onClick={()=>setRetry(n=>n+1)}>Reintentar conexión</button></div>}
 {notice&&<p role="status">{notice}</p>}<h2>Los exploradores de mi familia</h2><p>Cada perfil tiene su propio personaje y avance. No necesita correo ni contraseña.</p>{loading?<p role="status">Cargando perfiles…</p>:<div className="profile-grid">{children.map(c=><article key={c.id}><div className="profile-identity"><div className="profile-portrait"><img src={svgUrl(avatarSvg(restoreAvatar((c.main as {avatar?:unknown}|undefined)?.avatar)))} alt={'Personaje de '+c.name} width="96" height="128"/></div><div><h3>{c.name}</h3><p>{c.level}</p><button className="quiet" disabled={busy} aria-expanded={editing?.id===c.id} aria-controls={'edit-'+c.id} onClick={()=>{setEditing({id:c.id,name:c.name,level:c.level});setEditError('');setNotice('');setShowCreate(false);}}>Editar perfil</button></div></div><div className="profile-actions"><button className="secondary" onClick={()=>setSelected(c.id)}>Ver avance</button><Link className="primary" href={'/aventura/?perfil='+encodeURIComponent(c.id)}>{hasStartedAdventure(c)?'Continuar aventura':'Comenzar aventura'} →</Link></div>{editing?.id===c.id&&<form id={'edit-'+c.id} className="profile-edit" onSubmit={saveProfile}><h4>Editar explorador</h4><label>Apodo<input autoFocus required maxLength={40} disabled={busy} value={editing.name} onChange={e=>setEditing({...editing,name:e.target.value})}/></label><label>Etapa<select disabled={busy} value={editing.level} onChange={e=>setEditing({...editing,level:e.target.value})}>{['Kínder',...Array.from({length:6},(_,i)=>(i+1)+'.º básico')].map(v=><option key={v}>{v}</option>)}</select></label><p className="small">Cambiar de etapa conserva las actividades practicadas en todos los niveles.</p>{editError&&<p role="alert">{editError}</p>}<button className="secondary" disabled={busy||!connected} type="submit">{busy?'Guardando…':'Guardar cambios'}</button><button className="quiet" disabled={busy} type="button" onClick={()=>{setEditing(null);setEditError('');}}>Cancelar</button></form>}</article>)}{connected&&!children.length&&<p>Aún no hay exploradores. Crea el primer perfil para empezar.</p>}</div>}
 {showCreate&&<form id="create-explorer" className="account-page profile-form" onSubmit={create}><h2>Agregar explorador</h2><label>Apodo del niño o niña<input autoFocus required maxLength={40} value={name} onChange={e=>setName(e.target.value)} disabled={busy}/></label><label>Etapa<select value={level} onChange={e=>setLevel(e.target.value)} disabled={busy}>{['Kínder',...Array.from({length:6},(_,i)=>(i+1)+'.º básico')].map(v=><option key={v}>{v}</option>)}</select></label><button className="primary" disabled={busy||loading||!connected}>{busy?'Guardando…':'Crear perfil'}</button>{!connected&&<p className="small">Para crear un perfil, primero necesitamos conectar con la base de datos.</p>}<button type="button" className="quiet" disabled={busy} onClick={()=>setShowCreate(false)}>Cancelar</button></form>}
 {child&&<FamilyProgress child={child}/>}
 </section>;
}








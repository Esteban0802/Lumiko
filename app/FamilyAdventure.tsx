'use client';
import {useEffect,useState} from 'react';
import Link from 'next/link';
import {onAuthStateChanged} from 'firebase/auth';
import {doc,getDocFromServer,runTransaction,serverTimestamp} from 'firebase/firestore';
import {familyAuth,familyDb} from '../lib/firebase';
import {cleanProgress,Field,hasStartedAdventure,mergeProgress,progressFields} from '../lib/family-progress';
import {ProgressStorage,ProgressStorageContext} from './ProgressStorage';
import Adventure from './Adventure';
import {lockParent} from '../lib/parent-access';
export default function FamilyAdventure(){
 const [state,setState]=useState<{storage:ProgressStorage;name:string;retry:()=>void}|null>(null),[guest,setGuest]=useState(false),[error,setError]=useState(''),[status,setStatus]=useState('Cargando perfil…'),[pending,setPending]=useState(false),[attempt,setAttempt]=useState(0);
 useEffect(()=>{
  const id=new URLSearchParams(window.location.search).get('perfil');
  if(!id){setGuest(true);return onAuthStateChanged(familyAuth(),user=>{if(user)lockParent(user.uid);});}
  if(!/^[a-zA-Z0-9_-]{1,128}$/.test(id)){setError('El perfil no es válido.');return;}
  let alive=true,generation=0;const stop=onAuthStateChanged(familyAuth(),async user=>{
   const token=++generation;setState(null);setError('');
   if(!user){setError('Inicia sesión como apoderado para abrir este perfil.');return;}
   const valid=()=>alive&&generation===token&&familyAuth().currentUser?.uid===user.uid;
   const ref=doc(familyDb(),'users',user.uid,'children',id);
   try{
    const snapshot=await getDocFromServer(ref);if(!valid())return;
    if(!snapshot.exists()){setError('No encontramos este perfil en tu familia.');return;}
    lockParent(user.uid);
    const child=snapshot.data(),values:Record<string,string>={},dirty=new Map<Field,string>();
    const cacheKey=(field:Field)=>'lumiko-family/'+user.uid+'/'+id+'/'+field;
    for(const [key,field] of Object.entries(progressFields)){
     let value=cleanProgress(field,child[field]);
     try{const saved=JSON.parse(localStorage.getItem(cacheKey(field))||'null');if(saved?.pending){value=mergeProgress(field,value,saved.value);dirty.set(field,JSON.stringify(value));}}catch{}
     values[key]=JSON.stringify(value);
    }
    // El primer acceso también se guarda para que el panel ofrezca continuar.
    if(!hasStartedAdventure(child))dirty.set('main',values['lumiko-v1']);
    let chain=Promise.resolve();
    function flush(){
     chain=chain.then(async()=>{
      if(!valid()||!dirty.size)return;
      setPending(true);setStatus('Guardando avance…');
      try{
       for(const [field,raw] of [...dirty]){
        if(!valid())return;
        await runTransaction(familyDb(),async transaction=>{
         const current=await transaction.get(ref);if(!current.exists())throw Error('missing');
         if(!valid())throw Error('session-changed');
         transaction.update(ref,{[field]:mergeProgress(field,current.data()[field],JSON.parse(raw)),updatedAt:serverTimestamp()});
        });
        if(dirty.get(field)===raw){dirty.delete(field);try{localStorage.setItem(cacheKey(field),JSON.stringify({pending:false,value:JSON.parse(raw)}));}catch{}}
       }
       if(valid()){setPending(!!dirty.size);setStatus(dirty.size?'Guardando avance…':'Avance guardado en tu cuenta');}
      }catch{if(valid()){setPending(true);setStatus('No se pudo sincronizar. Tu avance queda pendiente en este navegador; reintenta antes de salir.');}}
     });
    }
    const storage:ProgressStorage={scope:user.uid+'/'+id,read:key=>values[key]||null,write:(key,raw)=>{
     if(!valid())return;
     const field=progressFields[key as keyof typeof progressFields];if(!field)return;
     const normalized=JSON.stringify(cleanProgress(field,JSON.parse(raw)));if(values[key]===normalized)return;
     values[key]=normalized;dirty.set(field,normalized);
     try{localStorage.setItem(cacheKey(field),JSON.stringify({pending:true,value:JSON.parse(normalized)}));}catch{}
     flush();
    }};
    setState({storage,name:child.name,retry:flush});setPending(!!dirty.size);setStatus(dirty.size?'Recuperando avance pendiente…':'Avance guardado en tu cuenta');flush();
   }catch{if(valid())setError('No pudimos abrir el perfil. Revisa la conexión y la configuración de Firestore.');}
  },()=>setError('No pudimos recuperar la sesión.'));
  return()=>{alive=false;generation++;stop();};
 },[attempt]);
 useEffect(()=>{if(!pending)return;const warn=(event:BeforeUnloadEvent)=>{event.preventDefault();event.returnValue='';};window.addEventListener('beforeunload',warn);return()=>window.removeEventListener('beforeunload',warn);},[pending]);
 if(guest)return <Adventure/>;
 if(error)return <main className="account-shell"><h1>Tu aventura familiar</h1><p role="alert">{error}</p><button className="secondary" onClick={()=>setAttempt(n=>n+1)}>Reintentar</button><Link className="quiet" href="/cuenta/">Volver al panel familiar</Link></main>;
 if(!state)return <main><p role="status">Cargando perfil…</p></main>;
 return <ProgressStorageContext.Provider value={state.storage}><div className="profile-banner"><b>Explorando con {state.name}</b><span role="status">{status}</span>{pending&&<button className="quiet" onClick={state.retry}>Reintentar guardado</button>}<Link href="/cuenta/" onClick={e=>{if(pending&&!window.confirm('Hay avance pendiente de sincronizar. ¿Quieres volver al panel de todos modos?'))e.preventDefault();}}>Panel del apoderado</Link></div><Adventure/></ProgressStorageContext.Provider>;
}


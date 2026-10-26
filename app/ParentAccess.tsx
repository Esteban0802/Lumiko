'use client';
import {FormEvent,useEffect,useState} from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {EmailAuthProvider,onAuthStateChanged,reauthenticateWithCredential,signOut,User} from 'firebase/auth';
import {familyAuth} from '../lib/firebase';
import {allowParent,lockParent,parentAllowed} from '../lib/parent-access';
const Dashboard=dynamic(()=>import('./FamilyDashboard'),{loading:()=> <p role="status">Preparando tu panel familiar…</p>});
export default function ParentAccess(){
 const [user,setUser]=useState<User|null>(null),[ready,setReady]=useState(false),[allowed,setAllowed]=useState(false),[password,setPassword]=useState(''),[busy,setBusy]=useState(false),[error,setError]=useState('');
 useEffect(()=>{
  const check=()=>{const u=familyAuth().currentUser;setAllowed(!!u&&parentAllowed(u.uid));};
  const stop=onAuthStateChanged(familyAuth(),u=>{setUser(u);setPassword('');setAllowed(!!u&&parentAllowed(u.uid));setReady(true);},()=>{setReady(true);setAllowed(false);setError('No pudimos comprobar la sesión. Vuelve a iniciar sesión.');});
  window.addEventListener('pageshow',check);window.addEventListener('lumiko-parent-lock',check);
  return()=>{stop();window.removeEventListener('pageshow',check);window.removeEventListener('lumiko-parent-lock',check);};
 },[]);
 async function unlock(event:FormEvent){
  event.preventDefault();if(!user?.email||busy)return;const account=user;setBusy(true);setError('');
  try{
   await reauthenticateWithCredential(account,EmailAuthProvider.credential(account.email!,password));
   if(familyAuth().currentUser?.uid!==account.uid)return;
   allowParent(account.uid);setAllowed(true);
  }catch(cause){const code=(cause as {code?:string}).code;setError(code==='auth/too-many-requests'?'Hubo varios intentos. Espera un momento antes de probar otra vez.':code==='auth/network-request-failed'?'No pudimos conectarnos. Revisa tu conexión.':'No pudimos confirmar la contraseña. Revísala e inténtalo nuevamente.');}
  finally{setPassword('');setBusy(false);}
 }
 async function logout(){if(!user)return;setBusy(true);setError('');try{lockParent(user.uid);await signOut(familyAuth());}catch{setError('No pudimos cerrar la sesión. Inténtalo nuevamente.');}finally{setBusy(false);}}
 if(!ready)return <p role="status">Comprobando acceso del apoderado…</p>;
 if(!user||allowed)return <Dashboard/>;
 return <section className="account-page parent-access"><p className="eyebrow">ESPACIO DEL APODERADO</p><h1>Un momento para el adulto</h1><p>Para volver a los perfiles y estadísticas, confirma la contraseña de tu cuenta.</p><p className="small">{user.email}</p><form onSubmit={unlock}><label>Contraseña del apoderado<input autoFocus type="password" required autoComplete="current-password" value={password} disabled={busy} onChange={e=>setPassword(e.target.value)}/></label><button className="primary" disabled={busy}>{busy?'Comprobando…':'Entrar al panel'}</button></form>{error&&<p role="alert">{error}</p>}<nav className="account-links"><Link href="/">Volver al inicio</Link><Link href="/recuperar/">Olvidé mi contraseña</Link></nav><button className="quiet" onClick={logout} disabled={busy}>Cerrar sesión</button></section>;
}

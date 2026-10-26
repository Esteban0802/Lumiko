'use client';
import {FormEvent,useEffect,useState} from 'react';
import {createUserWithEmailAndPassword,onAuthStateChanged,sendPasswordResetEmail,signInWithEmailAndPassword,signOut,User} from 'firebase/auth';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {familyAuth} from '../lib/firebase';
import {allowParent} from '../lib/parent-access';

function messageFor(error:unknown){
 const code=(error as {code?:string})?.code;
 switch(code){
  case 'auth/invalid-email':return 'Revisa el formato del correo electrónico.';
  case 'auth/invalid-credential':case 'auth/user-not-found':case 'auth/wrong-password':return 'No pudimos iniciar sesión. Revisa el correo y la contraseña.';
  case 'auth/email-already-in-use':return 'No pudimos crear la cuenta. Prueba iniciar sesión o recuperar tu contraseña.';
  case 'auth/weak-password':case 'auth/password-does-not-meet-requirements':return 'La contraseña no cumple los requisitos de Firebase. Prueba una más larga con letras, números y símbolos.';
  case 'auth/too-many-requests':return 'Hubo varios intentos seguidos. Espera un momento antes de volver a probar.';
  case 'auth/network-request-failed':return 'No pudimos conectarnos. Revisa tu conexión e inténtalo de nuevo.';
  case 'auth/operation-not-allowed':case 'auth/configuration-not-found':return 'Falta activar Correo electrónico/contraseña en Authentication de Firebase.';
  default:return 'No pudimos completar la solicitud. Inténtalo nuevamente.';
 }
}
export default function FamilyAccount({initialMode="login"}:{initialMode?:"login"|"register"|"reset"}){
 const router=useRouter();
 const [user,setUser]=useState<User|null>(null),[ready,setReady]=useState(false);
 const [mode,setMode]=useState<'login'|'register'|'reset'>(initialMode),[email,setEmail]=useState(''),[password,setPassword]=useState(''),[confirmation,setConfirmation]=useState('');
 const [busy,setBusy]=useState(false),[error,setError]=useState(''),[notice,setNotice]=useState('');
 useEffect(()=>{try{return onAuthStateChanged(familyAuth(),value=>{setUser(value);setReady(true);setPassword('');setConfirmation('');},()=>{setReady(true);setError('No pudimos recuperar la sesión. Vuelve a intentarlo.');});}catch{setReady(true);setError('No pudimos preparar el inicio de sesión.');}},[]);
 async function submit(event:FormEvent){
  event.preventDefault();if(busy)return;setError('');setNotice('');
  if(mode==='register'&&password!==confirmation){setError('Las contraseñas no coinciden.');return;}
  setBusy(true);
  try{
   if(mode==='reset'){await sendPasswordResetEmail(familyAuth(),email.trim());setNotice('Si existe una cuenta con ese correo, recibirás instrucciones para recuperar el acceso. Revisa también la carpeta de spam.');}
   else if(mode==='register'){await createUserWithEmailAndPassword(familyAuth(),email.trim(),password);setNotice('Tu cuenta está creada.');}
   else{await signInWithEmailAndPassword(familyAuth(),email.trim(),password);setNotice('Iniciaste sesión correctamente.');}
   setPassword('');setConfirmation('');if(mode!=='reset'){const uid=familyAuth().currentUser?.uid;if(uid)allowParent(uid);router.replace('/cuenta/');}
  }catch(cause){setError(messageFor(cause));}finally{setBusy(false);}
 }
 async function logout(){setBusy(true);setError('');setNotice('');try{await signOut(familyAuth());setNotice('Cerraste la sesión.');}catch(cause){setError(messageFor(cause));}finally{setBusy(false);}}
 return <section className="account-page" aria-labelledby="family-title"><h1 id="family-title">{user?"Tu cuenta de Lumiko":mode==="register"?"Comienza una nueva aventura":mode==="reset"?"Recupera tu acceso":"Qué bueno verte de nuevo"}</h1> {user?<><p>Sesión iniciada con <strong>{user.email}</strong>.</p><p>Desde tu panel puedes crear los perfiles de tus hijos y consultar su avance.</p><Link className="primary" href="/cuenta/">Ir a mi panel familiar →</Link><button className="quiet" disabled={busy} onClick={logout}>{busy?'Cerrando…':'Cerrar sesión'}</button></>:<><p>Acceso para el adulto responsable. Puedes seguir explorando sin cuenta.</p>
 <form onSubmit={submit}><h3>{mode==='register'?'Crear tu cuenta':mode==='reset'?'Recuperar contraseña':'Bienvenido de nuevo'}</h3><label>Correo del apoderado<input type="email" autoComplete="email" required maxLength={254} value={email} disabled={busy} onChange={e=>setEmail(e.target.value)}/></label>
 {mode!=='reset'&&<label>Contraseña<input type="password" autoComplete={mode==='register'?'new-password':'current-password'} minLength={mode==='register'?6:undefined} required value={password} disabled={busy} onChange={e=>setPassword(e.target.value)}/></label>}
 {mode==='register'&&<label>Repite la contraseña<input type="password" autoComplete="new-password" required value={confirmation} disabled={busy} onChange={e=>setConfirmation(e.target.value)}/></label>}
 <button className="primary" disabled={busy||!ready} type="submit">{busy?'Un momento…':mode==='register'?'Crear cuenta':mode==='reset'?'Enviar instrucciones':'Entrar'}</button></form>
 <nav className="account-links"><Link href="/ingresar/">Iniciar sesión</Link><Link href="/registro/">Crear cuenta</Link><Link href="/recuperar/">Olvidé mi contraseña</Link></nav></>}
 {error&&<p role="alert">{error}</p>}{notice&&<p role="status">{notice}</p>}
 </section>;
}





// Confirmación de interfaz para evitar acceso accidental, no un rol de autorización del servidor.
const duration=10*60*1000;
function key(uid:string){return 'lumiko-parent-access/'+uid;}
export function allowParent(uid:string,now=Date.now()){try{sessionStorage.setItem(key(uid),String(now+duration));}catch{}}
export function parentAllowed(uid:string,now=Date.now()){try{const expiry=Number(sessionStorage.getItem(key(uid)));return Number.isFinite(expiry)&&expiry>now&&expiry<=now+duration;}catch{return false;}}
export function lockParent(uid:string){try{sessionStorage.removeItem(key(uid));}catch{}window.dispatchEvent(new Event('lumiko-parent-lock'));}

import {getApp,getApps,initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

// Configuración pública de la aplicación web. Nunca agregar credenciales de administrador.
const config={
 apiKey:'AIzaSyCOjtmYkiHdgPTil5tGPF4DcpaG8lTwjgw',
 authDomain:'lumiko-4b996.firebaseapp.com',
 projectId:'lumiko-4b996',
 storageBucket:'lumiko-4b996.firebasestorage.app',
 messagingSenderId:'851821776559',
 appId:'1:851821776559:web:d6bb55461f37fe3f494e5a'
};
export function familyAuth(){
 const auth=getAuth(getApps().length?getApp():initializeApp(config));
 auth.languageCode='es';
 return auth;
}
export function familyDb(){familyAuth();return getFirestore(getApp());}

import {initial,restoreAvatar} from './art';
import {restoreCompleted} from './content';
import {restoreStudy,schoolLessons} from './school-content';
import {restorePrimary} from './primary-content';
import {primaryLessons} from './primary-plan';
export const progressFields={'lumiko-v1':'main','lumiko-kinder-2026-v1':'kinder','lumiko-basica-v1':'basic'} as const;
export type Field=typeof progressFields[keyof typeof progressFields];
export function hasStartedAdventure(child:Record<string,unknown>):boolean{
 const created=child.createdAt as {toMillis?:()=>number}|undefined,updated=child.updatedAt as {toMillis?:()=>number}|undefined;
 // Al abrir por primera vez la aventura se registra una actualización, aun sin completar actividades.
 if(created?.toMillis&&updated?.toMillis&&updated.toMillis()>created.toMillis())return true;
 return (['main','kinder','basic'] as const).some(field=>cleanProgress(field,child[field]).completed.length>0);
}
export function cleanProgress(field:Field,value:unknown):any{
 if(field==='kinder')return restoreStudy(value);
 if(field==='basic')return restorePrimary(value);
 const v=value&&typeof value==='object'?value as Record<string,unknown>:{};
 const completed=restoreCompleted(v.completed,v.stars);
 return {version:1,avatar:restoreAvatar(v.avatar||initial),completed,stars:completed.length};
}
export function mergeProgress(field:Field,remote:unknown,local:unknown){
 const a=cleanProgress(field,remote),b=cleanProgress(field,local);
 return cleanProgress(field,{...a,...b,completed:[...new Set([...a.completed,...b.completed])]});
}
export function progressStats(child:Record<string,unknown>){
 const kinder=cleanProgress('kinder',child.kinder).completed as string[],basic=cleanProgress('basic',child.basic).completed as string[];
 return [
 ...[...new Set(schoolLessons.map(l=>l.area))].map(area=>({label:'Kínder · '+area,total:schoolLessons.filter(l=>l.area===area).length,done:schoolLessons.filter(l=>l.area===area&&kinder.includes(l.id)).length})),
 ...Array.from({length:6},(_,i)=>i+1).flatMap(grade=>['Lenguaje','Matemática'].map(subject=>({label:grade+'.º · '+subject,total:primaryLessons.filter(l=>l.grade===grade&&l.subject===subject).length,done:primaryLessons.filter(l=>l.grade===grade&&l.subject===subject&&basic.includes(l.id)).length})))
 ];
}

import {schoolLessons} from './school-content';
import {primaryLessons} from './primary-plan';
export type ResumeLocation={stage:'study'|'primary'|'plaza';area?:string;grade?:number;subject?:string;lesson?:string};
export function restoreLocation(value:unknown):ResumeLocation|null{
 if(!value||typeof value!=='object')return null;
 const v=value as ResumeLocation;
 if(v.stage==='plaza')return {stage:'plaza'};
 if(v.stage==='study'){
  const lesson=schoolLessons.find(l=>l.id===v.lesson);
  const area=lesson?.area||schoolLessons.find(l=>l.area===v.area)?.area;
  return {stage:'study',...(area?{area}:{}),...(lesson?{lesson:lesson.id}:{})};
 }
 if(v.stage==='primary'){
  const lesson=primaryLessons.find(l=>l.id===v.lesson),grade=lesson?.grade||([1,2,3,4,5,6].includes(v.grade!)?v.grade:undefined);
  const subject=lesson?.subject||(['Lenguaje','Matemática'].includes(v.subject!)?v.subject:undefined);
  return {stage:'primary',...(grade?{grade}:{}),...(grade&&subject?{subject}:{}),...(lesson?{lesson:lesson.id}:{})};
 }
 return null;
}
export function locationKey(scope='guest'){return 'lumiko-location-v1/'+scope;}
export function readLocation(scope?:string):ResumeLocation|null{try{return restoreLocation(JSON.parse(localStorage.getItem(locationKey(scope))||'null'));}catch{return null;}}
export function saveLocation(scope:string|undefined,value:ResumeLocation){try{localStorage.setItem(locationKey(scope),JSON.stringify(restoreLocation(value)));}catch{}}

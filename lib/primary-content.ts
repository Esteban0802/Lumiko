import {primaryLessons,PrimaryLesson,PrimaryTask} from './primary-plan';
import {primaryMath} from './primary-math';
import {primaryLanguage} from './primary-language';
// Keep reading questions together and exclude repeated exercises within a round.
export function primaryTasks(lesson:PrimaryLesson,version:number):PrimaryTask[]{
 const target=lesson.unit==='writing'?2:8,tasks:PrimaryTask[]=[],seen=new Set<string>();
 for(let offset=0;offset<64&&tasks.length<target;offset++){
  const batch=lesson.subject==='Lenguaje'?primaryLanguage(lesson,version*2+offset):primaryMath(lesson,version*2+offset);
  for(const task of batch){const id=primaryFingerprint(task);if(!seen.has(id)){seen.add(id);tasks.push(task);if(tasks.length===target)break;}}
 }
 return tasks;
}
export type PrimaryProgress={completed:string[];rounds:Record<string,number>;recent:Record<string,string[]>};
export function restorePrimary(value:unknown):PrimaryProgress{const data=value&&typeof value==='object'?value as Record<string,unknown>:{};const completed=primaryLessons.filter(l=>Array.isArray(data.completed)&&data.completed.includes(l.id)).map(l=>l.id);const rounds:Record<string,number>={},recent:Record<string,string[]>={};for(const l of primaryLessons){const n=(data.rounds as Record<string,unknown>|undefined)?.[l.id];if(typeof n==='number'&&Number.isSafeInteger(n)&&n>=0&&n<1000000)rounds[l.id]=n;const r=(data.recent as Record<string,unknown>|undefined)?.[l.id];if(Array.isArray(r))recent[l.id]=r.filter((s):s is string=>typeof s==='string'&&/^[a-f0-9]{1,8}$/.test(s)).slice(-64);}return {completed,rounds,recent};}
export function primaryFingerprint(task:PrimaryTask){const data={...task,options:task.options?[...task.options].sort():undefined};const text=JSON.stringify(data);let hash=2166136261;for(const c of text)hash=Math.imul(hash^c.charCodeAt(0),16777619);return (hash>>>0).toString(16);}
export function nextPrimaryRound(lesson:PrimaryLesson,progress:PrimaryProgress,random:()=>number=Math.random){const start=progress.rounds[lesson.id]||0,old=progress.recent[lesson.id]||[];const candidates=Array.from({length:16},(_,i)=>{const version=start+i,tasks=primaryTasks(lesson,version),ids=tasks.map(primaryFingerprint);return {version,tasks,ids,score:ids.reduce((sum,id)=>{const at=old.lastIndexOf(id);return sum+(at<0?0:100+at/Math.max(1,old.length));},0)};});const score=Math.min(...candidates.map(c=>c.score)),fresh=candidates.filter(c=>c.score===score),chosen=fresh[Math.min(fresh.length-1,Math.floor(random()*fresh.length))];return {version:chosen.version,tasks:chosen.tasks,progress:{...progress,rounds:{...progress.rounds,[lesson.id]:start+1},recent:{...progress.recent,[lesson.id]:[...old,...chosen.ids].slice(-64)}}};}
export function equivalentPrimaryAnswer(value:string,expected:string):boolean{const parse=(text:string):number|undefined=>{const normalized=text.trim().replace(',','.');if(/^-?\d+\/\d+$/.test(normalized)){const [a,b]=normalized.split('/').map(Number);return b===0?undefined:a/b;}if(/^-?(?:\d+(?:\.\d*)?|\.\d+)$/.test(normalized))return Number(normalized);return undefined;};const a=parse(value),b=parse(expected);return a!==undefined&&b!==undefined&&Math.abs(a-b)<1e-9;}

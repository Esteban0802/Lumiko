import type {Activity} from './content';
import type {SchoolLesson,StudyTask} from './school-content';
import {adventureVariant,schoolVariant,nextPracticeVersion} from './practice-variants';
const KEY='lumiko-practice-recent-v1';
const memory:Record<string,string[]>={};
type Task=StudyTask|Activity['questions'][number];
/** Ignore answer positions, but include the question, objects, model and text actually practiced. */
export function exerciseFingerprint(task:Task):string {
 const data=JSON.parse(JSON.stringify(task)) as Record<string,any>;
 delete data.kind;
 if(data.options)data.options.sort((a:string[],b:string[])=>a[0].localeCompare(b[0]));
 if(data.items)data.items.sort((a:unknown,b:unknown)=>JSON.stringify(a).localeCompare(JSON.stringify(b)));
 if(data.visual?.kind==='classify')data.visual.items.sort((a:unknown,b:unknown)=>JSON.stringify(a).localeCompare(JSON.stringify(b)));
 if(data.visual?.kind==='order')data.visual.rows.sort((a:unknown,b:unknown)=>JSON.stringify(a).localeCompare(JSON.stringify(b)));
 delete data.matches;
 if(data.artVariant!==undefined)data.artVariant%=360;
 if(data.variant!==undefined)data.variant%=360;
 const text=JSON.stringify(data);let hash=2166136261;for(let i=0;i<text.length;i++)hash=Math.imul(hash^text.charCodeAt(i),16777619);return (hash>>>0).toString(16);
}
export function leastRepeated<T>(candidates:{value:T;fingerprints:string[]}[],recent:string[],random:()=>number=Math.random):T{
 let best=Infinity;const eligible:typeof candidates=[];
 for(const candidate of candidates){const score=candidate.fingerprints.reduce((sum,id)=>{const index=recent.lastIndexOf(id);return sum+(index<0?0:100+(index+1)/Math.max(1,recent.length));},0);if(score<best){best=score;eligible.length=0;eligible.push(candidate);}else if(score===best)eligible.push(candidate);}
 return eligible[Math.min(eligible.length-1,Math.floor(random()*eligible.length))].value;
}
function read(id:string):string[]{try{const parsed=JSON.parse(localStorage.getItem(KEY)||'{}');return Array.isArray(parsed?.[id])?parsed[id].filter((s:unknown)=>typeof s==='string'&&/^[a-f0-9]{1,8}$/.test(s)).slice(-128):memory[id]||[];}catch{return memory[id]||[];}}
function remember(id:string,values:string[]){const recent=[...read(id),...values].slice(-128);memory[id]=recent;try{const parsed=JSON.parse(localStorage.getItem(KEY)||'{}');const data:Record<string,string[]>={};if(parsed&&typeof parsed==='object')for(const [key,val] of Object.entries(parsed))if(/^(school|adventure)\/[a-z-]+$/.test(key)&&Array.isArray(val))data[key]=val.filter((s:unknown)=>typeof s==='string'&&/^[a-f0-9]{1,8}$/.test(s)).slice(-128);data[id]=recent;localStorage.setItem(KEY,JSON.stringify(data));}catch{}}
export function freshSchoolRound(base:SchoolLesson,minimum=0){const id='school/'+base.id,start=nextPracticeVersion(id,minimum);if(base.randomBatch)return {version:start,tasks:schoolVariant(base,start)};
 const candidates=Array.from({length:start===0?1:64},(_,i)=>{const version=start+i,tasks=schoolVariant(base,version);return {value:{version,tasks},fingerprints:tasks.map(exerciseFingerprint)};});const chosen=leastRepeated(candidates,read(id));remember(id,chosen.tasks.map(exerciseFingerprint));return chosen;}
export function freshAdventureRound(base:Activity,minimum=0){const id='adventure/'+base.id,start=nextPracticeVersion(id,minimum);const candidates=Array.from({length:start===0?1:64},(_,i)=>{const version=start+i,activity=adventureVariant(base,version);const fingerprints=activity.questions.map(q=>exerciseFingerprint({...q,...(activity.story?{passage:activity.story}:{})} as Task));return {value:activity,fingerprints};});const chosen=leastRepeated(candidates,read(id));remember(id,chosen.questions.map(q=>exerciseFingerprint({...q,...(chosen.story?{passage:chosen.story}:{})} as Task)));return chosen;}

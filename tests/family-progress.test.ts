import {test} from 'node:test';
import assert from 'node:assert/strict';
import {cleanProgress,mergeProgress,progressStats} from '../lib/family-progress';
import {schoolLessons} from '../lib/school-content';
import {primaryLessons} from '../lib/primary-plan';
test('new profiles start empty without inheriting guest progress',()=>{
 for(const field of ['main','kinder','basic'] as const)assert.deepEqual(cleanProgress(field,null).completed,[]);
 assert.equal(progressStats({}).reduce((n,s)=>n+s.done,0),0);
});
test('concurrent completions merge without duplicates or unknown lesson IDs',()=>{
 const a=schoolLessons[0].id,b=schoolLessons[1].id;
 const merged=mergeProgress('kinder',{completed:[a],cycles:{}},{completed:[b,b,'unknown'],cycles:{}});
 assert.deepEqual(new Set(merged.completed),new Set([a,b]));
 const primary=primaryLessons[0].id;
 assert.deepEqual(mergeProgress('basic',{completed:[primary]},{completed:[]}).completed,[primary]);
});
test('family statistics use completed activities independently per subject and child',()=>{
 const lesson=schoolLessons[0];const one=progressStats({kinder:{completed:[lesson.id]}}),two=progressStats({});
 assert.equal(one.find(s=>s.label==='Kínder · '+lesson.area)?.done,1);
 assert.equal(one.filter(s=>s.done>0).length,1);
 assert.equal(two.reduce((n,s)=>n+s.done,0),0);
 assert.equal(one.reduce((n,s)=>n+s.total,0),100);
});

test('adventure label distinguishes a new profile from first access and legacy progress',async()=>{
 const {hasStartedAdventure}=await import('../lib/family-progress');
 const timestamp=(n:number)=>({toMillis:()=>n});
 assert.equal(hasStartedAdventure({createdAt:timestamp(100),updatedAt:timestamp(100)}),false);
 assert.equal(hasStartedAdventure({createdAt:timestamp(100),updatedAt:timestamp(101)}),true);
 assert.equal(hasStartedAdventure({kinder:{completed:[schoolLessons[0].id]}}),true);
 assert.equal(hasStartedAdventure({}),false);
});

import {familySummary} from '../lib/family-summary';
import {journeyAccess} from '../lib/kinder-journey';
import {primaryJourneyAccess} from '../lib/primary-journey';
test('suggestions respect unlock order, registered stage and out-of-order legacy progress',()=>{
 for(const level of ['Kínder','1.º básico','6.º básico']){
  const child={level,kinder:{completed:[schoolLessons[4].id]},basic:{completed:[primaryLessons[2].id]}};
  const summary=familySummary(child);assert.ok(summary.next);
  const id=summary.next.lesson.id;
  if(level==='Kínder')assert.ok(journeyAccess(child.kinder.completed,summary.next.area as any).find(s=>s.lesson.id===id)?.available);
  else{const l=primaryLessons.find(l=>l.id===id)!;assert.equal(l.grade,Number(level[0]));assert.ok(primaryJourneyAccess(child.basic.completed,l.grade,l.subject).find(s=>s.lesson.id===id)?.available);}
 }
});
test('complete stage offers replay without inventing additional pending activities',()=>{
 const summary=familySummary({level:'Kínder',kinder:{completed:schoolLessons.map(l=>l.id)}});
 assert.equal(summary.next,null);assert.equal(summary.done,40);assert.equal(summary.percent,100);
 assert.equal(summary.areas.reduce((n,a)=>n+a.pending.length,0),0);
});

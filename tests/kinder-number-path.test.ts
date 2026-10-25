import {test} from 'node:test';
import assert from 'node:assert/strict';
import {schoolLessons} from '../lib/school-content';
import {schoolVariant} from '../lib/practice-variants';
test('number paths keep one missing position and neighbors stay within zero to twenty',()=>{for(const id of ['k-line','k-neighbors']){const lesson=schoolLessons.find(l=>l.id===id)!;for(let v=0;v<80;v++)for(const task of schoolVariant(lesson,v)){assert.equal(task.kind,'choice');if(task.kind!=='choice')continue;if(id==='k-neighbors'){const ref=task.numberRelation!;assert.ok(ref);assert.equal(Number(task.answer),ref.anchor+(ref.direction==='before'?-1:1));assert.ok(Number(task.answer)>=0&&Number(task.answer)<=20);assert.ok(ref.anchor>=0&&ref.anchor<=20);}else{assert.equal(task.line?.filter(n=>n==='?').length,1);const completed=task.line!.map(n=>n==='?'?Number(task.answer):Number(n));assert.ok(completed.every((n,i)=>n>=0&&n<=20&&(i===0||n===completed[i-1]+1)));}}}});

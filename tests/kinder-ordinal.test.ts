import {test} from 'node:test';
import assert from 'node:assert/strict';
import {schoolLessons} from '../lib/school-content';
import {schoolVariant} from '../lib/practice-variants';
test('ordinal rows match shuffled answer images and cover all five positions',()=>{const lesson=schoolLessons.find(l=>l.id==='k-ordinal')!;for(let v=0;v<80;v++){const tasks=schoolVariant(lesson,v);const positions=new Set<number>();for(const t of tasks){assert.equal(t.kind,'choice');if(t.kind!=='choice')continue;assert.equal(t.ordinal?.length,5);assert.equal(new Set(t.ordinal).size,5);assert.ok(t.ordinalPosition!>=1&&t.ordinalPosition!<=5);positions.add(t.ordinalPosition!);assert.equal(t.options.find(([name])=>name===t.answer)?.[1],t.ordinal![t.ordinalPosition!-1]);assert.ok(t.ordinal!.every(icon=>t.options.filter(([,image])=>image===icon).length===1));}assert.equal(positions.size,5);}});

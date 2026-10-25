import test from 'node:test';
import assert from 'node:assert/strict';
import {schoolLessons} from '../lib/school-content';
import {schoolVariant} from '../lib/practice-variants';
import {rhymePictures} from '../lib/rhyme-support';
import {phonicsPicture} from '../lib/phonics-pictures';
test('rhyme comparisons highlight valid endings and supply images across every round',()=>{const lesson=schoolLessons.find(l=>l.id==='k-rhymes')!;for(let v=0;v<40;v++)for(const task of schoolVariant(lesson,v)){assert.equal(task.kind,'choice');if(task.kind!=='choice')continue;assert.ok(task.rhyme);const {word,ending}=task.rhyme!;assert.ok(ending);assert.ok(word.endsWith(ending));assert.ok(task.answer.endsWith(ending));assert.equal(task.options.filter(([value])=>value.endsWith(ending)).length,1);for(const value of [word,...task.options.map(([value])=>value)])assert.notEqual(rhymePictures[value]||phonicsPicture(value),'♫');}});

import {test} from 'node:test';
import assert from 'node:assert/strict';
import {route,blocked,iso,uniso} from '../lib/world';
test('all free destinations reachable without crossing obstacles',()=>{for(let x=0;x<10;x++)for(let y=0;y<9;y++){if(blocked(x,y))continue;const start={x:2,y:4};const path=route(start,{x,y});let prev=start;for(const p of path){assert.equal(blocked(p.x,p.y),false);assert.equal(Math.abs(p.x-prev.x)+Math.abs(p.y-prev.y),1);prev=p;}assert.deepEqual(prev,{x,y});}});
test('obstacles and outside points cannot be destinations',()=>{assert.deepEqual(route({x:2,y:4},{x:4,y:4}),[]);assert.deepEqual(route({x:2,y:4},{x:10,y:1}),[]);});
test('isometric input round trips across the map',()=>{for(let x=0;x<10;x++)for(let y=0;y<9;y++){const p=iso({x,y});assert.deepEqual(uniso(p.x,p.y),{x,y});}});

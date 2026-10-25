import test from 'node:test';
import assert from 'node:assert/strict';
import {explorerLocations} from '../lib/explorer-layout';
import {blocked,route,iso} from '../lib/world';
test('whole-subject maps provide distinct reachable stops for every activity',()=>{for(let count=1;count<=15;count++){const places=explorerLocations(count).slice(0,count);assert.equal(places.length,count);assert.equal(new Set(places.map(p=>p.x+','+p.y)).size,count);for(const point of places){assert.equal(blocked(point.x,point.y),false);assert.ok(route({x:2,y:4},point).length);}}});
test('dense map portals remain separated and within the full scene',()=>{const places=explorerLocations(15).map(iso);for(let i=0;i<places.length;i++){const p=places[i];assert.ok(p.x>=100&&p.x<=900&&p.y>=60&&p.y<=510);for(let j=i+1;j<places.length;j++)assert.ok(Math.hypot(p.x-places[j].x,p.y-places[j].y)>75);}});

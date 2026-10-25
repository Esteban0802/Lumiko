import test from 'node:test';
import assert from 'node:assert/strict';
import {journeyAccess,kinderJourney,kinderAreas} from '../lib/kinder-journey';
import {schoolLessons} from '../lib/school-content';
import {route} from '../lib/world';
test('kindergarten journey includes every lesson once, beginning with initial sounds',()=>{assert.equal(kinderJourney.length,40);assert.equal(new Set(kinderJourney.map(l=>l.id)).size,40);assert.deepEqual(new Set(kinderJourney.map(l=>l.id)),new Set(schoolLessons.map(l=>l.id)));assert.deepEqual(kinderJourney.slice(0,4).map(l=>l.id),['k-initial','k-initial-two','k-syllabic','k-syllabic-two']);});
test('each subject unlocks only its first unfinished activity independently',()=>{for(const area of kinderAreas){const journey=kinderJourney.filter(l=>l.area===area);for(let n=0;n<=journey.length;n++){const states=journeyAccess(journey.slice(0,n).map(l=>l.id),area);assert.equal(states.filter(s=>s.available).length,Math.min(n+1,journey.length));assert.equal(states.filter(s=>s.current).length,n===journey.length?0:1);for(const other of kinderAreas.filter(a=>a!==area))assert.equal(journeyAccess(journey.slice(0,n).map(l=>l.id),other).filter(s=>s.available).length,1);}}});test('old out-of-order practice can be replayed without skipping a missing prerequisite',()=>{const states=journeyAccess([kinderJourney[5].id,'unknown'],'Lenguaje');assert.equal(states[0].available,true);assert.equal(states[1].available,false);assert.equal(states[5].completed,true);assert.equal(states[5].available,true);assert.equal(states[6].available,false);});
test('both level portals can be reached from the plaza',()=>{for(const target of [{x:8,y:4},{x:2,y:7}])assert.ok(route({x:2,y:4},target).length>0);});


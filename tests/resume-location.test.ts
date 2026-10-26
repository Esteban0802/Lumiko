import {test} from 'node:test';
import assert from 'node:assert/strict';
import {restoreLocation,locationKey,readLocation,saveLocation} from '../lib/resume-location';
test('resume restores only known levels, subjects and activities',()=>{
 assert.equal(restoreLocation({stage:'admin'}),null);
 assert.deepEqual(restoreLocation({stage:'primary',grade:99,subject:'unknown',lesson:'missing'}),{stage:'primary'});
 assert.deepEqual(restoreLocation({stage:'study',lesson:'k-initial'}),{stage:'study',area:'Lenguaje',lesson:'k-initial'});
 assert.deepEqual(restoreLocation({stage:'primary',lesson:'b2-le-narrative'}),{stage:'primary',grade:2,subject:'Lenguaje',lesson:'b2-le-narrative'});
});
test('resume locations are isolated per parent, child and guest and tolerate unavailable storage',()=>{
 const data=new Map<string,string>();const previous=Object.getOwnPropertyDescriptor(globalThis,'localStorage');
 Object.defineProperty(globalThis,'localStorage',{configurable:true,value:{getItem:(key:string)=>data.get(key)||null,setItem:(key:string,value:string)=>data.set(key,value)}});
 try{
  saveLocation('adult/a',{stage:'study',lesson:'k-initial'});
  saveLocation('adult/b',{stage:'primary',grade:3});
  assert.equal(readLocation('adult/a')?.lesson,'k-initial');assert.equal(readLocation('adult/b')?.grade,3);
  assert.equal(readLocation('other/a'),null);assert.equal(readLocation(),null);
  data.set(locationKey('bad'),'not json');assert.equal(readLocation('bad'),null);
  Object.defineProperty(globalThis,'localStorage',{configurable:true,get:()=>{throw Error('blocked');}});
  assert.equal(readLocation('adult/a'),null);assert.doesNotThrow(()=>saveLocation('adult/a',{stage:'plaza'}));
 }finally{if(previous)Object.defineProperty(globalThis,'localStorage',previous);else delete (globalThis as any).localStorage;}
});

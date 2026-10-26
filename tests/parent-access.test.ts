import {test} from 'node:test';
import assert from 'node:assert/strict';
import {allowParent,lockParent,parentAllowed} from '../lib/parent-access';
test('parent confirmation is scoped to the adult, expires and is revoked on child access',()=>{
 const data=new Map<string,string>();const oldStorage=Object.getOwnPropertyDescriptor(globalThis,'sessionStorage'),oldWindow=Object.getOwnPropertyDescriptor(globalThis,'window');let events=0;
 Object.defineProperty(globalThis,'sessionStorage',{configurable:true,value:{getItem:(k:string)=>data.get(k)||null,setItem:(k:string,v:string)=>data.set(k,v),removeItem:(k:string)=>data.delete(k)}});
 Object.defineProperty(globalThis,'window',{configurable:true,value:{dispatchEvent:()=>{events++;}}});
 try{
  assert.equal(parentAllowed('a',1000),false);allowParent('a',1000);
  assert.equal(parentAllowed('a',1001),true);assert.equal(parentAllowed('b',1001),false);
  assert.equal(parentAllowed('a',601000),false);assert.equal(parentAllowed('a',0),false);
  lockParent('a');assert.equal(parentAllowed('a',1001),false);assert.equal(events,1);
  Object.defineProperty(globalThis,'sessionStorage',{configurable:true,get:()=>{throw Error('blocked');}});
  assert.equal(parentAllowed('a'),false);assert.doesNotThrow(()=>allowParent('a'));assert.doesNotThrow(()=>lockParent('a'));
 }finally{for(const [key,previous] of [['sessionStorage',oldStorage],['window',oldWindow]] as const){if(previous)Object.defineProperty(globalThis,key,previous);else delete (globalThis as any)[key];}}
});

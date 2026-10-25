import * as React from 'react';
Object.assign(globalThis,{React});
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import SchoolTask from '../app/SchoolTask';
test('all six puzzle pieces receive the same illustration variant as their model',()=>{const html=renderToStaticMarkup(createElement(SchoolTask,{task:{kind:'puzzle',prompt:'Modelo nuevo',scene:'house',variant:1},solved:false,onDone:()=>{},speak:()=>{}}));assert.equal((html.match(/#fae3d2/g)||[]).length,6);assert.equal((html.match(/#bc7e58/g)||[]).length,6);assert.equal((html.match(/#d8edf0/g)||[]).length,0);});

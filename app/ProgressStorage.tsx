'use client';
import {createContext,useContext} from 'react';
export type ProgressStorage={scope?:string;read:(key:string)=>string|null;write:(key:string,value:string)=>void};
const guest:ProgressStorage={read:key=>localStorage.getItem(key),write:(key,value)=>localStorage.setItem(key,value)};
export const ProgressStorageContext=createContext<ProgressStorage>(guest);
export function useProgressStorage(){return useContext(ProgressStorageContext);}

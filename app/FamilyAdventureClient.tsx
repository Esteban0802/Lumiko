'use client';
import dynamic from 'next/dynamic';
export default dynamic(()=>import('./FamilyAdventure'),{ssr:false,loading:()=> <main><p role="status">Preparando tu aventura…</p></main>});

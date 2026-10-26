'use client';
import dynamic from 'next/dynamic';
export default dynamic(()=>import('./ParentAccess'),{ssr:false,loading:()=> <p role="status">Preparando tu panel familiar…</p>});

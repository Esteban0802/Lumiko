'use client';
import dynamic from 'next/dynamic';
const Account=dynamic(()=>import('./FamilyAccount'),{ssr:false,loading:()=> <p role="status">Preparando el acceso…</p>});
export default Account;

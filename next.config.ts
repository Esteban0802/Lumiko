import {PHASE_DEVELOPMENT_SERVER} from 'next/constants';

// Keep production checks separate from the running prototype.
export default (phase:string)=>({
 output:'export',
 basePath:process.env.NEXT_PUBLIC_BASE_PATH||'',
 trailingSlash:true,
 distDir:phase===PHASE_DEVELOPMENT_SERVER?'.next-dev':'.next',
 images:{unoptimized:true}
});

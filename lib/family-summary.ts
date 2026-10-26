import {kinderPath} from './kinder-path';
import {schoolLessons} from './school-content';
import {primaryLessons} from './primary-plan';
import {cleanProgress} from './family-progress';
export function familySummary(child:Record<string,unknown>){
 const kinder=child.level==='Kínder',grade=Number(String(child.level).slice(0,1));
 const completed=new Set<string>(cleanProgress(kinder?'kinder':'basic',child[kinder?'kinder':'basic']).completed);
 const groups=kinder?Object.entries(kinderPath).map(([area,blocks])=>({area,lessons:blocks.flatMap(b=>b.ids).map(id=>schoolLessons.find(l=>l.id===id)!)})):['Lenguaje','Matemática'].map(area=>({area,lessons:primaryLessons.filter(l=>l.grade===grade&&l.subject===area)}));
 const areas=groups.map(g=>({...g,practiced:g.lessons.filter(l=>completed.has(l.id)),pending:g.lessons.filter(l=>!completed.has(l.id))}));
 const candidates=areas.filter(a=>a.pending.length).sort((a,b)=>a.practiced.length/a.lessons.length-b.practiced.length/b.lessons.length);
 const next=candidates[0]?{area:candidates[0].area,lesson:candidates[0].pending[0]}:null;
 const total=areas.reduce((n,a)=>n+a.lessons.length,0),done=areas.reduce((n,a)=>n+a.practiced.length,0);
 return {areas,next,total,done,percent:total?Math.round(done/total*100):0};
}

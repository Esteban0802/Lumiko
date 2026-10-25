import {kinderPath} from './kinder-path';
import {schoolLessons} from './school-content';
export const kinderAreas=['Lenguaje','Matemática','Habilidades','Emociones y convivencia'] as const;
export const kinderJourney=kinderAreas.flatMap(area=>kinderPath[area].flatMap(group=>group.ids)).map(id=>schoolLessons.find(lesson=>lesson.id===id)!);
export function journeyAccess(completed:readonly string[],area:typeof kinderAreas[number]){const journey=kinderJourney.filter(lesson=>lesson.area===area);const done=new Set(completed);const first=journey.findIndex(lesson=>!done.has(lesson.id));const frontier=first<0?journey.length:first;return journey.map((lesson,index)=>({lesson,index,completed:done.has(lesson.id),available:index<=frontier||done.has(lesson.id),current:index===first}));}


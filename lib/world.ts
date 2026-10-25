export type Point={x:number;y:number};
export const blocks=[{x:4,y:3},{x:4,y:4},{x:5,y:3},{x:2,y:6},{x:7,y:6},{x:7,y:5}];
export const blocked=(x:number,y:number)=>x<0||y<0||x>9||y>8||blocks.some(b=>b.x===x&&b.y===y);
export function route(start:Point,end:Point):Point[]{
 if(blocked(end.x,end.y))return [];
 const queue=[start], seen=new Set([`${start.x},${start.y}`]), parents=new Map<string,Point>();
 for(let i=0;i<queue.length;i++){const p=queue[i];if(p.x===end.x&&p.y===end.y){const path:Point[]=[];let q=p;while(q.x!==start.x||q.y!==start.y){path.unshift(q);q=parents.get(`${q.x},${q.y}`)!;}return path;}
 for(const d of [{x:1,y:0},{x:-1,y:0},{x:0,y:1},{x:0,y:-1}]){const q={x:p.x+d.x,y:p.y+d.y},k=`${q.x},${q.y}`;if(!blocked(q.x,q.y)&&!seen.has(k)){seen.add(k);parents.set(k,p);queue.push(q);}}}return [];
}
export const iso=(p:Point)=>({x:480+(p.x-p.y)*43,y:105+(p.x+p.y)*23});
export const uniso=(x:number,y:number)=>({x:Math.round(((x-480)/43+(y-105)/23)/2),y:Math.round(((y-105)/23-(x-480)/43)/2)});

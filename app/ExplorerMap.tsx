'use client';
import {useContext,useEffect,useRef,useState} from 'react';
import {ExplorerAvatarContext} from './ExplorerAvatarContext';
import {avatarSvg,lumiSvg} from '../lib/art';
import {blocks,blocked,iso,uniso,route} from '../lib/world';
import type {Point} from '../lib/world';
import {explorerLocations} from '../lib/explorer-layout';
export type ExplorerDestination={id:string;title:string;detail?:string;locked?:boolean;completed?:boolean;number?:number};

export default function ExplorerMap({mapId,destinations,onSelect,compact=false}:{mapId:string;destinations:ExplorerDestination[];onSelect:(id:string)=>void;compact?:boolean}){
 const avatar=useContext(ExplorerAvatarContext),host=useRef<HTMLDivElement>(null),walk=useRef<((id:string)=>void)|null>(null),select=useRef(onSelect),[ready,setReady]=useState(false),[failed,setFailed]=useState(false),[message,setMessage]=useState('Preparando el mapa…');select.current=onSelect;
 const signature=JSON.stringify(destinations),appearance=JSON.stringify(avatar);
 useEffect(()=>{const viewport=host.current?.parentElement;if(!viewport)return;const observer=new ResizeObserver(()=>{if(host.current)viewport.scrollLeft=Math.max(0,(host.current.clientWidth-viewport.clientWidth)/2);});observer.observe(viewport);return()=>observer.disconnect();},[]);
 useEffect(()=>{let game:import('phaser').Game|undefined,cancelled=false;setReady(false);setFailed(false);setMessage('Preparando el mapa…');walk.current=null;
 const nodes:ExplorerDestination[]=JSON.parse(signature),look=JSON.parse(appearance),places=explorerLocations(nodes.length);
 import('phaser').then(({default:P})=>{if(cancelled)return;
 class Scene extends P.Scene{
 player!:import('phaser').GameObjects.Image;lumi!:import('phaser').GameObjects.Image;pos:Point={x:2,y:4};path:Point[]=[];moving=false;entering=false;destination:string|null=null;
 preload(){const data=(svg:string)=>'data:image/svg+xml;base64,'+btoa(svg);this.load.svg('child',data(avatarSvg(look)));this.load.svg('lumi',data(lumiSvg));}
 go(target:Point,id:string|null){if(this.entering)return;const node=nodes.find(n=>n.id===id);if(node?.locked){setMessage('Esta parada está cerrada. Completa primero la actividad anterior.');return;}this.destination=id;this.path=route(this.pos,target);setMessage(node?'Vamos hacia '+node.title+'.':'Exploramos el camino con Lumi.');if(!this.moving&&!this.path.length&&id){this.entering=true;select.current(id);}}
 create(){const g=this.add.graphics(),diamond=(x:number,y:number,color:number)=>{g.fillStyle(color);g.fillPoints([{x,y:y-23},{x:x+43,y},{x,y:y+23},{x:x-43,y}],true);};g.fillStyle(0x84b4a0);g.fillPoints([{x:93,y:312},{x:480,y:519},{x:910,y:289},{x:910,y:319},{x:480,y:552},{x:93,y:342}],true);
 const paths=new Set<string>();nodes.forEach((_,i)=>route({x:2,y:4},places[i]).forEach(p=>paths.add(p.x+','+p.y)));
 for(let x=0;x<10;x++)for(let y=0;y<9;y++){const p=iso({x,y});diamond(p.x,p.y,paths.has(x+','+y)?0xefe0bd:(x+y)%2?0xc8dfb6:0xd2e5c2);}
 blocks.forEach((b,i)=>{const p=iso(b);g.fillStyle(0x658d70,.2);g.fillEllipse(p.x+8,p.y+7,75,28);if(i<3){g.fillStyle(0xad8262);g.fillRoundedRect(p.x-7,p.y-59,14,62,5);g.fillStyle(0x78ae83);g.fillCircle(p.x,p.y-68,34);g.fillStyle(0x9bc698);g.fillCircle(p.x-12,p.y-83,27);}else{g.fillStyle(0x99aaa5);g.fillRoundedRect(p.x-25,p.y-29,50,32,14);g.fillStyle(0xbac5b5);g.fillEllipse(p.x-5,p.y-25,37,16);}});
 const tooltip=compact?this.add.text(500,22,'Acércate a un número para descubrir la actividad.',{fontFamily:'Arial',fontSize:'19px',color:'#466648',backgroundColor:'#fffef4',padding:{x:12,y:7},wordWrap:{width:900},align:'center'}).setOrigin(.5,0).setDepth(2000):null;
 nodes.forEach((node,i)=>{const q=iso(places[i]),color=node.locked?0xaeb7a0:node.completed?0x78a88b:0xab99cf;
 if(compact){g.lineStyle(5,color);g.strokeRoundedRect(q.x-17,q.y-44,34,46,13);g.fillStyle(node.locked?0xe1e5d8:node.completed?0xe2efcb:0xe6ddf3,.97);g.fillRoundedRect(q.x-13,q.y-40,26,37,10);this.add.text(q.x,q.y-23,node.locked?'🔒':node.completed?'✓':String(node.number||i+1),{fontFamily:'Arial',fontSize:'18px',color:'#695382'}).setOrigin(.5);this.add.text(q.x,q.y+6,String(node.number||i+1),{fontFamily:'Arial',fontSize:'14px',fontStyle:'bold',color:'#35584d',backgroundColor:'#fff8e9',padding:{x:5,y:2}}).setOrigin(.5,0);if(!node.completed&&!node.locked){g.lineStyle(3,0xd7aa48);g.strokeEllipse(q.x,q.y+4,48,18);}}
 else{g.lineStyle(10,color);g.strokeRoundedRect(q.x-28,q.y-73,56,76,24);g.fillStyle(node.locked?0xe1e5d8:node.completed?0xe2efcb:0xe6ddf3,.96);g.fillRoundedRect(q.x-22,q.y-67,44,64,19);this.add.text(q.x,q.y-43,node.locked?'🔒':node.completed?'✓':'✦',{fontFamily:'Arial',fontSize:'26px',color:'#695382'}).setOrigin(.5);this.add.text(q.x,q.y+13,node.title,{fontFamily:'Arial',fontSize:'18px',fontStyle:'bold',color:node.locked?'#7e8873':'#35584d',backgroundColor:'#fff8e9',padding:{x:7,y:5},wordWrap:{width:175},align:'center'}).setOrigin(.5,0);}
 this.add.zone(q.x,q.y-(compact?12:20),compact?55:155,compact?78:130).setInteractive({useHandCursor:!node.locked}).on('pointerover',()=>tooltip?.setText((node.number?node.number+'. ':'')+node.title+(node.locked?' · Por descubrir':node.completed?' · Completada':''))).on('pointerdown',(_p:unknown,_x:number,_y:number,event:import('phaser').Types.Input.EventData)=>{event.stopPropagation();tooltip?.setText((node.number?node.number+'. ':'')+node.title);this.go(places[i],node.id);});});
 const start=iso(this.pos);this.player=this.add.image(start.x,start.y,'child').setOrigin(.5,1).setScale(compact?.46:.57);this.lumi=this.add.image(start.x-40,start.y-6,'lumi').setOrigin(.5,1).setScale(compact?.33:.4);
 this.input.on('pointerdown',(pointer:import('phaser').Input.Pointer)=>{const target=uniso(pointer.x,pointer.y);if(blocked(target.x,target.y))return;const at=places.findIndex(p=>p.x===target.x&&p.y===target.y);this.go(target,at>=0&&nodes[at]?nodes[at].id:null);});walk.current=id=>{const i=nodes.findIndex(n=>n.id===id);if(i>=0)this.go(places[i],id);};if(host.current){host.current.dataset.playerPosition='2,4';const viewport=host.current.parentElement;if(viewport)viewport.scrollLeft=Math.max(0,(host.current.clientWidth-viewport.clientWidth)/2);}setReady(true);setMessage('Toca el suelo para caminar o elige un destino. Lumi te acompaña.');
 }
 update(time:number){if(!this.player)return;this.player.setDepth(this.player.y);this.lumi.setDepth(this.lumi.y);if(!this.moving&&this.path.length){this.moving=true;const next=this.path.shift()!,q=iso(next);this.pos=next;this.tweens.add({targets:this.player,x:q.x,y:q.y,duration:150,onComplete:()=>{this.moving=false;if(host.current)host.current.dataset.playerPosition=next.x+','+next.y;if(!this.path.length&&!this.entering&&this.destination){const i=nodes.findIndex(n=>n.id===this.destination);if(i>=0&&!nodes[i].locked&&places[i].x===next.x&&places[i].y===next.y){this.entering=true;select.current(nodes[i].id);}}}});this.tweens.add({targets:this.lumi,x:q.x-39,y:q.y-8,duration:210});}this.lumi.setAngle(Math.sin(time/500)*4);}
 }
 game=new P.Game({type:P.AUTO,parent:host.current!,width:1000,height:560,transparent:true,scene:Scene,scale:{mode:P.Scale.FIT,autoCenter:P.Scale.CENTER_BOTH},render:{antialias:true}});
 }).catch(()=>{if(!cancelled){setFailed(true);setMessage('El mapa no pudo abrirse. Puedes entrar con los botones de destino.');}});
 return()=>{cancelled=true;walk.current=null;game?.destroy(true);};},[mapId,signature,appearance,compact]);
 return <div className={"explorer-map"+(compact?" explorer-map-all-activities":"")}><div className="explorer-map-viewport"><div className="explorer-map-scene" ref={host} role="application" aria-label="Mapa isométrico: toca el suelo para caminar y un portal para entrar" data-map-id={mapId} data-map-ready={ready}/></div><p className="explorer-pan-hint">↔ Desliza el mapa para ver todos los destinos.</p><p className="explorer-map-status" role="status" aria-live="polite">{message}</p><div className="explorer-map-destinations" role="group" aria-label="Destinos del mapa">{destinations.map(node=><button key={node.id} data-destination-id={node.id} disabled={node.locked||(!ready&&!failed)} aria-label={(node.number?node.number+'. ':'')+node.title+' · '+(node.locked?'Bloqueada':node.completed?'Completada, volver a practicar':'Ir al destino')} onClick={()=>failed?select.current(node.id):walk.current?.(node.id)}><span aria-hidden="true">{node.number?node.number+'. ':''}{node.locked?'🔒':node.completed?'✓':'✦'}</span><b>{node.title}</b>{node.detail&&<small>{node.detail}</small>}</button>)}</div></div>;
}







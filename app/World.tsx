'use client';
import {useEffect,useRef} from 'react';
import type {Avatar} from '../lib/art';
import {avatarSvg,lumiSvg,svgUrl} from '../lib/art';
import {blocks,blocked,iso,uniso,route,Point} from '../lib/world';
export default function World({avatar,forest,onPortal,onPrimary}:{avatar:Avatar;forest:boolean;onPortal:()=>void;onPrimary?:()=>void}){
 const host=useRef<HTMLDivElement>(null);
 useEffect(()=>{let game:import('phaser').Game|undefined,cancelled=false;
 import('phaser').then(({default:P})=>{if(cancelled)return;
 class Scene extends P.Scene{
 player!:import('phaser').GameObjects.Image; lumi!:import('phaser').GameObjects.Image; pos:Point={x:2,y:4}; path:Point[]=[]; moving=false; portal=false;
 preload(){const data=(svg:string)=>'data:image/svg+xml;base64,'+btoa(svg);this.load.svg('child',data(avatarSvg(avatar)));this.load.svg('lumi',data(lumiSvg));}
 create(){const g=this.add.graphics();
 const diamond=(x:number,y:number,c:number)=>{g.fillStyle(c);g.fillPoints([{x,y:y-23},{x:x+43,y},{x,y:y+23},{x:x-43,y}],true);};
 g.fillStyle(0x84b4a0);g.fillPoints([{x:93,y:312},{x:480,y:519},{x:910,y:289},{x:910,y:319},{x:480,y:552},{x:93,y:342}],true);
 for(let x=0;x<10;x++)for(let y=0;y<9;y++){const p=iso({x,y});diamond(p.x,p.y,forest?((x+y)%2?0x9ecda3:0xa9d4aa):((x+y)%2?0xc8dfb6:0xd2e5c2));}
 for(let x=0;x<10;x++)for(let y=0;y<9;y++)if((y===4||x===8)&&!blocked(x,y)){const p=iso({x,y});diamond(p.x,p.y,forest?0xd4d8ad:0xefe0bd);}
 blocks.forEach((b,i)=>{const p=iso(b);g.fillStyle(0x658d70,.2);g.fillEllipse(p.x+8,p.y+7,75,28);if(i<3){g.fillStyle(0xad8262);g.fillRoundedRect(p.x-7,p.y-59,14,62,5);g.fillStyle(forest?0x519b7f:0x78ae83);g.fillCircle(p.x,p.y-68,34);g.fillStyle(forest?0x71b190:0x9bc698);g.fillCircle(p.x-12,p.y-83,27);}else {g.fillStyle(0x99aaa5);g.fillRoundedRect(p.x-25,p.y-29,50,32,14);g.fillStyle(0xbac5b5);g.fillEllipse(p.x-5,p.y-25,37,16);}});
 for(const p of [{x:0,y:1},{x:1,y:7},{x:8,y:8},{x:9,y:1}]){const q=iso(p);this.add.text(q.x,q.y-20,forest?'✿':'✦',{fontSize:'30px',color:'#e4ae5e'}).setOrigin(.5);}
 const portal=iso({x:8,y:4});g.lineStyle(14,forest?0xe6c58f:0xa89acc);g.strokeRoundedRect(portal.x-37,portal.y-100,74,102,35);g.fillStyle(forest?0xf4e1ae:0xdcd4f0,.85);g.fillRoundedRect(portal.x-29,portal.y-94,58,90,28);
 this.add.text(portal.x,portal.y-68,forest?'⌕':'✧',{fontSize:'40px',color:'#6b6294'}).setOrigin(.5);
 this.add.text(portal.x,portal.y+27,forest?'La misión':'Kínder',{fontFamily:'Arial',fontSize:'17px',color:'#35584d',backgroundColor:'#fff8e9',padding:{x:12,y:7}}).setOrigin(.5);
 if(!forest&&onPrimary){const dest=iso({x:2,y:7});g.lineStyle(12,0x73a99b);g.strokeRoundedRect(dest.x-32,dest.y-88,64,90,28);g.fillStyle(0xddebcf,.95);g.fillRoundedRect(dest.x-25,dest.y-82,50,77,23);this.add.text(dest.x,dest.y-57,'✦',{fontSize:'33px',color:'#477b69'}).setOrigin(.5);this.add.text(dest.x,dest.y+25,'Básica',{fontFamily:'Arial',fontSize:'17px',color:'#35584d',backgroundColor:'#fff8e9',padding:{x:12,y:7}}).setOrigin(.5);}
 if(!forest&&onPrimary){for(const target of [{x:8,y:4},{x:2,y:7}]){const q=iso(target);this.add.zone(q.x,q.y-40,90,125).setInteractive({useHandCursor:true}).on('pointerdown',(_pointer:unknown,_x:number,_y:number,event:import('phaser').Types.Input.EventData)=>{event.stopPropagation();this.path=route(this.pos,target);});}}
 const p=iso(this.pos);this.player=this.add.image(p.x,p.y,'child').setOrigin(.5,1).setScale(.57);this.lumi=this.add.image(p.x-45,p.y-5,'lumi').setOrigin(.5,1).setScale(.40);
 this.input.on('pointerdown',(pointer:import('phaser').Input.Pointer)=>{const target=uniso(pointer.x,pointer.y);if(blocked(target.x,target.y))return;this.path=route(this.pos,target);const q=iso(target);const ring=this.add.circle(q.x,q.y,13).setStrokeStyle(3,0xffffff);this.tweens.add({targets:ring,alpha:0,scale:2,duration:600,onComplete:()=>ring.destroy()});});
 this.events.on('walkPortal',()=>{this.path=route(this.pos,{x:8,y:4});});
 }
 update(time:number){if(!this.player)return;this.player.setDepth(this.player.y);this.lumi.setDepth(this.lumi.y);if(!this.moving&&this.path.length){this.moving=true;const next=this.path.shift()!,p=iso(next);this.pos=next;this.tweens.add({targets:this.player,x:p.x,y:p.y,duration:190,onComplete:()=>{this.moving=false;if(!this.path.length&&!this.portal){if(next.x===8&&next.y===4){this.portal=true;onPortal();}else if(!forest&&onPrimary&&next.x===2&&next.y===7){this.portal=true;onPrimary();}}}});this.tweens.add({targets:this.lumi,x:p.x-39,y:p.y-8,duration:260});}this.lumi.setAngle(Math.sin(time/500)*4);}
 }
 game=new P.Game({type:P.AUTO,parent:host.current!,width:1000,height:620,transparent:true,scene:Scene,scale:{mode:P.Scale.FIT,autoCenter:P.Scale.CENTER_BOTH},render:{antialias:true}});
 });return()=>{cancelled=true;game?.destroy(true);};},[avatar,forest,onPortal,onPrimary]);
 return <div className="world" ref={host} aria-label={forest?'Bosque: toca el suelo para caminar hasta la misión':'Mapa de niveles: camina hacia los portales Kínder y Básica o usa los botones de destino'} role="application"/>;
}



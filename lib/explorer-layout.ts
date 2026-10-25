import type {Point} from './world';
export function explorerLocations(count:number):Point[]{return count>6?[{x:0,y:0},{x:3,y:0},{x:6,y:0},{x:9,y:0},{x:9,y:3},{x:9,y:6},{x:9,y:8},{x:6,y:8},{x:3,y:8},{x:0,y:8},{x:0,y:5},{x:0,y:2},{x:3,y:3},{x:6,y:3},{x:5,y:5}]:count<=3?[{x:1,y:1},{x:8,y:4},{x:1,y:7}]:[{x:1,y:1},{x:7,y:1},{x:8,y:5},{x:5,y:8},{x:1,y:7},{x:0,y:4}];}

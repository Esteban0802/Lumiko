'use client';
import OralWorkshop from './OralWorkshop';
import RouteWorkshop from './RouteWorkshop';
import CompositionWorkshop from './CompositionWorkshop';
import SyllableWorkshop from './SyllableWorkshop';

import type {DiscoveryTask} from '../lib/kinder-discovery';
type Props={task:DiscoveryTask;solved:boolean;onDone:()=>void;speak:(text:string)=>void};
export default function KinderDiscovery(props:Props){if(props.task.kind==='lumi-route')return <RouteWorkshop {...props} task={props.task}/>;if(props.task.kind==='compose-number')return <CompositionWorkshop {...props} task={props.task}/>;if(props.task.kind==='syllable-build')return <SyllableWorkshop {...props} task={props.task}/>;return <OralWorkshop {...props} task={props.task}/>;}


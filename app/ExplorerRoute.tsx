'use client';
import ExplorerMap from './ExplorerMap';
import type {ExplorerDestination} from './ExplorerMap';
export default function ExplorerRoute({mapId,destinations,onSelect}:{mapId:string;destinations:ExplorerDestination[];onSelect:(id:string)=>void}){return <><p className="explorer-all-stops">Las {destinations.length} actividades están en este mapa. Los números corresponden a los destinos de abajo.</p><ExplorerMap mapId={mapId} destinations={destinations} onSelect={onSelect} compact/></>;}

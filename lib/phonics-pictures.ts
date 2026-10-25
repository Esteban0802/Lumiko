// Familiar visual cues. Audio and the written word remain available for every card.
const pictures:Record<string,string>={
 abeja:'🐝',avión:'✈️',anillo:'💍',elefante:'🐘',enano:'🧙',estrella:'⭐',isla:'🏝️',imán:'🧲',iguana:'🦎',oso:'🐻',olla:'🍲',oveja:'🐑',uva:'🍇',uno:'1️⃣',uña:'💅',
 nido:'🪺',nube:'☁️',nariz:'👃',bote:'🚣',burro:'🫏',beso:'💋',dado:'🎲',dedo:'👆',duna:'🏜️',taza:'☕',tela:'🧵',toro:'🐂',foca:'🦭',faro:'🗼',fila:'🚶',mesa:'🪑',mano:'✋',mono:'🐒',luna:'🌙',lápiz:'✏️',lobo:'🐺',pato:'🦆',pera:'🍐',puma:'🐈',
 casa:'🏠',copa:'🍷',cuna:'🛏️',gato:'🐱',gota:'💧',gusano:'🐛',jarra:'🫗',jugo:'🧃',jirafa:'🦒',kiwi:'🥝',kilo:'⚖️',koala:'🐨',ñandú:'🪶',ñoqui:'🍝',ñu:'🦬',queso:'🧀',queque:'🍰',quince:'15',rana:'🐸',rosa:'🌹',rueda:'🛞',sapo:'🐸',sopa:'🍲',silla:'🪑',vaca:'🐄',vaso:'🥛',vela:'🕯️',yema:'🥚',yate:'🛥️',yogur:'🥛',zapato:'👟',zorro:'🦊',zanahoria:'🥕',
 ala:'🪽',aro:'⭕',naranja:'🍊',nabo:'🥬',bata:'🥼',ballena:'🐋',dama:'👩',tapa:'🫙',familia:'👪',mapa:'🗺️',lana:'🧶',lata:'🥫',pala:'🪏',cama:'🛏️',gallo:'🐓',hilo:'🧵',higo:'🟣',jabón:'🧼',ñoño:'🧒',rama:'🌿',saco:'🧥',wafle:'🧇',waterpolo:'🤽',xilófono:'🎵',xilografía:'🖼️',yegua:'🐴',niño:'🧒',boca:'👄',bota:'🥾',ducha:'🚿',tomate:'🍅',fideo:'🍝',moto:'🏍️',lupa:'🔍',pelo:'💇',codo:'💪',goma:'🧽',hoja:'🍃',hora:'🕒',juguete:'🧸',química:'🧪',ropa:'👕',soga:'🪢',vena:'🩸',yoga:'🧘',zoológico:'🦁'
};
export const phonicsPicture=(word:string)=>pictures[word]||'♫';

import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, Filter, BookOpen, GitBranch, X, ChevronRight, Presentation } from 'lucide-react';

const sp = (scientific, common = '', english = '', note = '') => ({ scientific, common, english, note });

const order = {
  name: 'Crocodylia',
  common: 'caimanes y cocodrilos',
  color: '#f59e0b',
  summary: 'Orden de reptiles arcosaurios semiacuáticos. El PDF presenta dos familias en Ecuador: Alligatoridae y Crocodylidae, con caimanes, yacarés y cocodrilos.',
  traits: [
    'Cuerpo alargado, más ancho que alto.',
    'Cabeza aplanada.',
    'Hocico, tronco y cola largos, con patas cortas.',
    'Depredadores acuáticos y semiacuáticos.',
    'Ojos y narinas en la parte superior de la cabeza, para ver y respirar casi sumergidos.',
    'Corazón con 4 cavidades.',
    'Dientes alojados en alveolos.',
    'Cola larga y comprimida lateralmente.',
    'Escudos dorsales córneos y cresta longitudinal saliente.',
    'Buenos nadadores con membranas interdigitales.',
    'Las hembras pueden cuidar la descendencia durante incubación y eclosión.'
  ],
  families: [
    {
      name: 'Alligatoridae',
      common: 'aligatores, caimanes y yacarés',
      count: '4 especies, 0 endémicas',
      traits: [
        'Familia de saurópsidos crocodilianos propios de América.',
        'Incluye aligatores, caimanes y yacarés.',
        'Incluye los géneros Caiman, Melanosuchus y Paleosuchus en la lista del PDF.',
        'Cuerpo semiacuático y depredador.',
        'Ojos y narinas ubicados en la parte superior de la cabeza.',
        'Cola larga y comprimida lateralmente, útil para la natación.',
        'Presentan escudos dorsales córneos.',
        'En el PDF se registran cuatro especies para esta familia y cero endémicas.'
      ],
      species: [
        sp('Caiman crocodilus','caimán de anteojos','Eyeglass alligator','Machos de 1,8 a 2,5 m; hembras de 1,4 m. Presenta arista en forma de media luna anterior a cada ojo y escamas dorsales cuadrangulares.'),
        sp('Melanosuchus niger','caimán negro','Black alligator','Hocico ancho y liso, coloración dorsal negra y ventral blanca o amarillenta.'),
        sp('Paleosuchus palpebrosus','caimán de Cuvier / caimán enano','Dwarf alligator','Cabeza corta, ligeramente cóncava y lisa; ojos color bronce con pupila vertical.'),
        sp('Paleosuchus trigonatus','caimán postruso / caimán de frente lisa','Smooth faced alligator','Cerca de 1,8 m; osteodermos muy desarrollados y hocico alargado con punta angosta.')
      ]
    },
    {
      name: 'Crocodylidae',
      common: 'cocodrilos',
      count: '1 especie en el país',
      traits: [
        'Familia de saurópsidos arcosaurios conocidos como cocodrilos.',
        'Reptiles grandes y semiacuáticos de zonas tropicales.',
        'En Ecuador se representa por el cocodrilo de la costa.',
        'Habita el trópico occidental.',
        'Puede alcanzar alrededor de 5 a 6 m de largo.',
        'Hocico más o menos alargado y triangular, redondeado en los extremos.',
        'El cuarto diente mandibular encaja en una escotadura del maxilar y es visible con la boca cerrada.',
        'Cabeza estrecha y larga; dientes visibles y escamas dorsales quilladas.',
        'Presenta membrana entre los dedos de la mano.'
      ],
      species: [
        sp('Crocodylus acutus','cocodrilo americano / cocodrilo de la costa','Crocodile of the coast','Adultos de unos 5 m y peso medio de 500 kg; también llamado lagarto nariguero o cocodrilo.')
      ]
    }
  ]
};

order.families = order.families.sort((a,b)=>a.name.localeCompare(b.name)).map(f => ({...f, species: f.species.sort((a,b)=>a.scientific.localeCompare(b.scientific))}));

function Species({ item }) {
  return <div className="species"><em>{item.scientific}</em>{item.common && <span> — {item.common}</span>}{item.english && <small>{item.english}</small>}{item.note && <p>{item.note}</p>}</div>;
}

function Modal({ family, onClose }) {
  return <AnimatePresence>{family && <motion.div className="modalBackdrop" onClick={onClose} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><motion.article className="modal" onClick={e=>e.stopPropagation()} initial={{opacity:0,y:25,scale:.96}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:25,scale:.96}}><button className="close" onClick={onClose}><X size={20}/></button><p className="eyebrow">Orden Crocodylia · Familia</p><h2>{family.name}</h2><p className="familyCommon">{family.common}</p><div className="modalGrid"><section><h3>Características de la familia</h3>{family.traits.map(t=><p key={t}>• {t}</p>)}</section><section><h3>Especies representativas</h3><div className="speciesList">{family.species.map(s=><Species key={s.scientific} item={s}/>)}</div></section></div></motion.article></motion.div>}</AnimatePresence>
}

function FamilyCard({ family, i, onOpen }) {
  return <motion.button className="familyCard" onClick={()=>onOpen(family)} initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{delay:i*.05}}><div className="cardTop"><span>{String(i+1).padStart(2,'0')}</span><strong>{family.name}</strong></div><p>{family.common}</p><small>{family.count}</small><div className="preview">{family.traits.slice(0,3).map(t=><span key={t}>{t}</span>)}</div><div className="openLine">Ver ficha <ChevronRight size={16}/></div></motion.button>
}

export default function App(){
  const [open,setOpen]=useState(false); const [query,setQuery]=useState(''); const [selected,setSelected]=useState(null); const [present,setPresent]=useState(false);
  const families=useMemo(()=>order.families.filter(f=>`${f.name} ${f.common} ${f.traits.join(' ')} ${f.species.map(s=>s.scientific+' '+s.common+' '+s.english).join(' ')}`.toLowerCase().includes(query.toLowerCase())),[query]);
  return <main className={present?'app presentation':'app'}><section className="hero"><div className="orb one"/><div className="orb two"/><p className="badge">Clase Reptiles · Orden</p><h1>Crocodylia</h1><p className="subtitle">Caimanes y cocodrilos · esquema taxonómico interactivo</p><div className="stats"><div><b>2</b><span>familias</span></div><div><b>5</b><span>especies</span></div><div><b>0</b><span>endémicas indicadas</span></div></div></section><section className="scheme"><div className="box top">Reptiles</div><div className="line v1"/><div className="box mid">Archosauria</div><div className="line v2"/><button className={open?'crocBtn active':'crocBtn'} onClick={()=>setOpen(!open)}><span>🐊</span><strong>CROCODYLIA</strong><em>caimanes y cocodrilos</em></button></section>{open && <><section className="controls"><label><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar familia o especie..."/></label><label><Filter size={18}/><select value="Crocodylia" disabled><option>Crocodylia</option></select></label></section><section className="intro"><BookOpen size={20}/><div><h2>Familias del orden Crocodylia</h2><p>{order.summary}</p></div><button onClick={()=>setPresent(!present)}><Presentation size={18}/>{present?'Salir':'Presentar'}</button></section><section className="orderBlock"><div className="orderHead"><div className="icon">🐊</div><div><p className="eyebrow">Orden</p><h2>Crocodylia</h2><p>caimanes y cocodrilos</p></div></div><div className="traits">{order.traits.map(t=><span key={t}>{t}</span>)}</div><div className="grid">{families.map((f,i)=><FamilyCard key={f.name} family={f} i={i} onOpen={setSelected}/>)}</div></section></>}<footer><GitBranch size={18}/> Orden Crocodylia · Clase Reptiles</footer><Modal family={selected} onClose={()=>setSelected(null)}/></main>
}

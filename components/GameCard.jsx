// components/GameCard.jsx
import Link from 'next/link';
import Image from 'next/image';

export default function GameCard({ game }){
  // game may be from Firestore or static data
  const title = game.title || game.name || 'Untitled';
  const short = game.short || game.description || '';
  const cover = game.cover || '/images/placeholder.png';
  const slug = game.slug || game.id || title.toLowerCase().replace(/\s+/g,'-');

  return (
    <div style={{
      background:'#101010', color:'#fff', borderRadius:10, overflow:'hidden', boxShadow:'0 6px 24px rgba(0,0,0,0.6)'
    }}>
      <div style={{width:'100%', height:160, position:'relative'}}>
        {/* If using external URLs from Storage, ensure next.config.js allows the domain OR use relative public/ images */}
        <img src={cover} alt={title} style={{width:'100%', height:'100%', objectFit:'cover', display:'block'}} />
      </div>
      <div style={{padding:12}}>
        <h3 style={{margin:'6px 0'}}>{title}</h3>
        <p style={{color:'#bbb', fontSize:13}}>{short}</p>
        <div style={{marginTop:10, display:'flex', gap:8}}>
          <a href={`/games/${slug}`} style={{padding:'8px 12px', background:'#e04b3c', color:'#fff', borderRadius:6, textDecoration:'none'}}>View</a>
          {game.download ? <a href={game.download} style={{padding:'8px 12px', background:'#3a3a3a', color:'#fff', borderRadius:6, textDecoration:'none'}}>Download</a> : null}
        </div>
      </div>
    </div>
  );
}

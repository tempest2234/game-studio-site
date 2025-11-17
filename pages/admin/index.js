// pages/admin/index.js
import { useEffect, useState } from 'react';
import { auth, db, storage } from '../../lib/firebaseClient';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import {
  collection, addDoc, serverTimestamp, query, where, getDocs, doc, deleteDoc
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useRouter } from 'next/router';

export default function Admin(){
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState([]);
  const [invites, setInvites] = useState([]);
  const router = useRouter();

  useEffect(()=> {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) { router.push('/login'); return; }
      setUser(u);

      // fetch user doc to check role
      const q = query(collection(db, 'users'), where('uid', '==', u.uid));
      const snap = await getDocs(q);
      if (snap.empty) {
        alert('No user profile found. Contact owner.');
        await signOut(auth);
        router.push('/login');
        return;
      }
      const userDoc = snap.docs[0].data();
      if (userDoc.role !== 'admin') {
        alert('You are not an admin.');
        await signOut(auth);
        router.push('/');
        return;
      }
      setLoading(false);
      fetchGames();
      fetchInvites();
    });
    return () => unsub();
  }, []);

  async function fetchGames(){
    const gSnap = await getDocs(collection(db, 'games'));
    setGames(gSnap.docs.map(d => ({ id: d.id, ...d.data() })));
  }
  async function fetchInvites(){
    const iSnap = await getDocs(collection(db, 'invites'));
    setInvites(iSnap.docs.map(d => ({ id: d.id, ...d.data() })));
  }

  async function handleCreateInvite(){
    const code = prompt('Invite code (any string):', `INV-${Math.random().toString(36).slice(2,9)}`);
    if (!code) return;
    const email = prompt('Optional: restrict invite to an email (leave blank for any):','');
    await addDoc(collection(db, 'invites'), { code, email: email||null, role: 'admin', used: false, createdAt: serverTimestamp() });
    fetchInvites();
  }

  async function handleAddGame(e){
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const short = form.short.value;
    const file = form.cover.files[0];
    if (!title) return alert('Title required');

    let coverUrl = '';
    if (file){
      const storageRef = ref(storage, `covers/${Date.now()}-${file.name}`);
      const snap = await uploadBytes(storageRef, file);
      coverUrl = await getDownloadURL(snap.ref);
    }

    await addDoc(collection(db, 'games'), { title, short, cover: coverUrl, createdAt: serverTimestamp() });
    form.reset();
    fetchGames();
  }

  async function handleDeleteGame(id){
    if (!confirm('Delete this game?')) return;
    await deleteDoc(doc(db, 'games', id));
    fetchGames();
  }

  if (loading) return <div style={{padding:30}}>Checking auth...</div>;

  return (
    <main style={{padding:28}}>
      <h2>Admin Dashboard — CrazyTempest</h2>
      <div>
        <button onClick={()=>{ signOut(auth); router.push('/login'); }}>Logout</button>
      </div>

      <section style={{marginTop:20}}>
        <h3>Create Invite</h3>
        <button onClick={handleCreateInvite}>Create invite (admin)</button>
        <ul>
          {invites.map(i => <li key={i.id}>{i.code} — role:{i.role} — used:{String(i.used)}</li>)}
        </ul>
      </section>

      <section style={{marginTop:20}}>
        <h3>Add Game</h3>
        <form onSubmit={handleAddGame}>
          <input name="title" placeholder="Game title" required /><br/>
          <input name="short" placeholder="Short description" /><br/>
          <input name="cover" type="file" accept="image/*" /><br/>
          <button type="submit">Add Game</button>
        </form>
      </section>

      <section style={{marginTop:20}}>
        <h3>Games</h3>
        <ul>
          {games.map(g => <li key={g.id}>
            <strong>{g.title}</strong> — {g.short}
            <button onClick={()=>handleDeleteGame(g.id)} style={{marginLeft:10}}>Delete</button>
          </li>)}
        </ul>
      </section>
    </main>
  );
}

// pages/signup.js
import { useState } from 'react';
import { auth, db } from '../lib/firebaseClient';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc
} from 'firebase/firestore';
import { useRouter } from 'next/router';

export default function Signup(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invite, setInvite] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSignup(e){
    e.preventDefault();
    setErr('');
    setLoading(true);
    try {
      // validate invite code exists and not used
      const invitesRef = collection(db, 'invites');
      const q = query(invitesRef, where('code', '==', invite));
      const snap = await getDocs(q);
      if (snap.empty) throw new Error('Invalid invite code.');

      const docSnap = snap.docs[0];
      const inviteData = docSnap.data();
      if (inviteData.used) throw new Error('This invite has already been used.');

      // optional: restrict by email if invite.email set
      if (inviteData.email && inviteData.email.toLowerCase() !== email.toLowerCase()) {
        throw new Error('This invite is restricted to a different email.');
      }

      // create user
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCred.user, { displayName: email.split('@')[0] });

      // create user doc in Firestore with role (from invite.role or default 'member')
      const role = inviteData.role || 'member';
      await addDoc(collection(db, 'users'), {
        uid: userCred.user.uid,
        email,
        displayName: userCred.user.displayName || null,
        role,
        createdAt: serverTimestamp(),
      });

      // mark invite used
      await updateDoc(doc(db, 'invites', docSnap.id), { used: true, usedBy: email, usedAt: serverTimestamp() });

      // redirect: admin -> /admin, otherwise home
      if (role === 'admin') router.push('/admin');
      else router.push('/');
    } catch (e) {
      console.error(e);
      setErr(e.message || 'Signup failed');
      setLoading(false);
    }
  }

  return (
    <main style={{padding:28, maxWidth:560, margin:'0 auto'}}>
      <h2>Sign up (Invite only)</h2>
      <form onSubmit={handleSignup} style={{display:'grid', gap:10}}>
        <label>Email</label>
        <input value={email} onChange={e=>setEmail(e.target.value)} type="email" required />
        <label>Password</label>
        <input value={password} onChange={e=>setPassword(e.target.value)} type="password" required />
        <label>Invite Code</label>
        <input value={invite} onChange={e=>setInvite(e.target.value)} required />
        <button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Sign up'}</button>
      </form>
      {err && <p style={{color:'salmon'}}>{err}</p>}
      <p style={{marginTop:12}}>Have an account? <a href="/login">Login</a></p>
    </main>
  );
}

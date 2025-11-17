// pages/login.js
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebaseClient';
import { useRouter } from 'next/router';

export default function Login(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e){
    e.preventDefault();
    setErr('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/admin');
    } catch (e) {
      console.error(e);
      setErr('Login failed: ' + (e.message || ''));
      setLoading(false);
    }
  }

  return (
    <main style={{padding:28, maxWidth:560, margin:'0 auto'}}>
      <h2>Login</h2>
      <form onSubmit={handleLogin} style={{display:'grid', gap:10}}>
        <label>Email</label>
        <input value={email} onChange={e=>setEmail(e.target.value)} type="email" required />
        <label>Password</label>
        <input value={password} onChange={e=>setPassword(e.target.value)} type="password" required />
        <button type="submit" disabled={loading}>{loading ? 'Signing in...' : 'Login'}</button>
      </form>
      {err && <p style={{color:'salmon'}}>{err}</p>}
      <p style={{marginTop:12}}>Don't have an account? <a href="/signup">Sign up (invite only)</a></p>
    </main>
  );
}

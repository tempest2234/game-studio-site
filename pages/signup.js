import { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invite, setInvite] = useState("");
  const [error, setError] = useState("");

  async function signUp() {
    setError("");

    // CHECK IF INVITE IS VALID
    const ref = doc(db, "invites", invite);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      setError("Invalid invite code.");
      return;
    }

    // CREATE ACCOUNT
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created!");
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <div>
      <h1>Signup</h1>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
      <input placeholder="Invite Code" onChange={(e) => setInvite(e.target.value)} />

      <button onClick={signUp}>Create Account</button>

      <p style={{ color: "red" }}>{error}</p>
    </div>
  );
}

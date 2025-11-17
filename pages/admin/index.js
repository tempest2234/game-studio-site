import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, addDoc, getDocs } from "firebase/firestore";

export default function Admin() {
  const [user, setUser] = useState(null);
  const [games, setGames] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (u) => {
      if (!u) window.location.href = "/login";
      else setUser(u);
    });

    loadGames();
  }, []);

  async function loadGames() {
    const querySnapshot = await getDocs(collection(db, "games"));
    const list = [];
    querySnapshot.forEach((doc) => list.push({ id: doc.id, ...doc.data() }));
    setGames(list);
  }

  async function addGame() {
    await addDoc(collection(db, "games"), {
      title: title,
    });
    loadGames();
  }

  return (
    <div>
      <h1>Admin Panel</h1>
      <p>Logged in as: {user?.email}</p>

      <h2>Add Game</h2>
      <input placeholder="Game Title" onChange={(e) => setTitle(e.target.value)} />
      <button onClick={addGame}>Add</button>

      <h2>Games</h2>
      <ul>
        {games.map((g) => (
          <li key={g.id}>{g.title}</li>
        ))}
      </ul>

      <button onClick={() => signOut(auth)}>Logout</button>
    </div>
  );
}

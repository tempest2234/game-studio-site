import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Games() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    async function load() {
      const querySnapshot = await getDocs(collection(db, "games"));
      const list = [];
      querySnapshot.forEach((doc) => list.push({ id: doc.id, ...doc.data() }));
      setGames(list);
    }
    load();
  }, []);

  return (
    <div>
      <h1>Games</h1>
      <ul>
        {games.map((g) => (
          <li key={g.id}>{g.title}</li>
        ))}
      </ul>
    </div>
  );
}

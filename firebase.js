import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCugBIWal63vTuVIWnJHrTn5AkUl6AT99w",
  authDomain: "crazytempest-5c45a.firebaseapp.com",
  projectId: "crazytempest-5c45a",
  storageBucket: "crazytempest-5c45a.firebasestorage.app",
  messagingSenderId: "569571577012",
  appId: "1:569571577012:web:8f7d942cc09af9681f9be1"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

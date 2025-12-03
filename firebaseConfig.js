import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // INI AJA
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDeTLEjtz5qUEIAWEOtm9Zngie6fid60Dc",
  authDomain: "final-mmkcv.firebaseapp.com",
  projectId: "final-mmkcv",
  storageBucket: "final-mmkcv.firebasestorage.app",
  messagingSenderId: "74201464646",
  appId: "1:74201464646:web:4a02cf8cbf9c870d9f6f47",
  measurementId: "G-0VNM5WQKMJ"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);  // tanpa persistence rn
const db = getFirestore(app);

export { app, auth, db };

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || "AIzaSyAs-placeholder", // Replace with actual or use env
  authDomain: "sovereign-wealth-architecture.firebaseapp.com",
  projectId: "sovereign-wealth-architecture",
  storageBucket: "sovereign-wealth-architecture.appspot.com",
  messagingSenderId: "placeholder",
  appId: "placeholder"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

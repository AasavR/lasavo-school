// Firebase Service for Astrolas App (aasavravi@gmail.com)
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Default Firebase Configuration for Astrolas (com.astrolas.app)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAstrolasDefaultApiKey001",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "astrolas-app.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "astrolas-app",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "astrolas-app.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "987654321012",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:987654321012:android:astrolasapp001"
};

// Initialize Firebase App instance safely
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export default app;

import React, { useState, useEffect, useRef } from 'react';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInAnonymously, 
  signInWithCustomToken, 
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  onSnapshot, 
  addDoc, 
  updateDoc 
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCsxmNTIe_VYBWrl_EIl6gbX7I6XljaNMM",
  authDomain: "school-lasavo-org.firebaseapp.com",
  projectId: "school-lasavo-org",
  storageBucket: "school-lasavo-org.firebasestorage.app",
  messagingSenderId: "1062124671658",
  appId: "1:1062124671658:web:3cb71e8063918f2460f6d3",
  measurementId: "G-TSMX8D24K3"
};

// DO NOT CHANGE CODE BELOW THIS LINE
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
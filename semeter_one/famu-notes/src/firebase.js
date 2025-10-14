import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase konfigurace
const firebaseConfig = {
  apiKey: "AIzaSyCES_Zfi78paxI--dycL2LmBK0-g4fvvEM",
  authDomain: "famu-nodes.firebaseapp.com",
  projectId: "famu-nodes",
  storageBucket: "famu-nodes.firebasestorage.app",
  messagingSenderId: "67316044555",
  appId: "1:67316044555:web:72a88c28871236912f480e",
  measurementId: "G-LB6V1P1JVW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

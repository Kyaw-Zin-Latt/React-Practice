import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDJ3xOrncf4PHKEi1dFhKcuBBGAY89EO3s",
  authDomain: "house-marketplace-app-fe78a.firebaseapp.com",
  projectId: "house-marketplace-app-fe78a",
  storageBucket: "house-marketplace-app-fe78a.appspot.com",
  messagingSenderId: "997684295520",
  appId: "1:997684295520:web:6843dc323fc7089172d005"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore()
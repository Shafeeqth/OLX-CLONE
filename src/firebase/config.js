import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyD9c796MLFwX_vW1Vcp2hWOgpRAmjdSYy4",
  authDomain: "fir-project-2f0d0.firebaseapp.com",
  projectId: "fir-project-2f0d0",
  storageBucket: "fir-project-2f0d0.appspot.com",
  messagingSenderId: "153093784403",
  appId: "1:153093784403:web:524e23fec7666a4e9a17a6",
  measurementId: "G-4KJ7XSV4YB"
};


const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);
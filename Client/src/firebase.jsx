// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-34f1f.firebaseapp.com",
  projectId: "mern-blog-34f1f",
  storageBucket: "mern-blog-34f1f.appspot.com",
  messagingSenderId: "900981152554",
  appId: "1:900981152554:web:67e556c23403ff9c905c53"
};

// Initialize Firebase
export  const app = initializeApp(firebaseConfig);
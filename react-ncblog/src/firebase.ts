// import dotenv from "dotenv";
// dotenv.config();

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const apiKey = import.meta.env.DEV ? import.meta.env.VITE_FIREBASE_API_KEY : process.env.FIREBASE_API_KEY;
const authDomain = import.meta.env.DEV ? import.meta.env.VITE_FIREBASE_AUTH_DOMAIN : process.env.FIREBASE_AUTH_DOMAIN;
const projectId = import.meta.env.DEV ? import.meta.env.VITE_FIREBASE_PROJECT_ID : process.env.FIREBASE_PROJECT_ID;
const storageBucket = import.meta.env.DEV ? import.meta.env.VITE_FIREBASE_STORAGE_BUCKET : process.env.FIREBASE_STORAGE_BUCKET;
const messagingSenderId = import.meta.env.DEV ? import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID : process.env.FIREBASE_MESSAGING_SENDER_ID;
const appId = import.meta.env.DEV ? import.meta.env.VITE_FIREBASE_APP_ID : process.env.FIREBASE_APP_ID;



// console.log(import.meta.env.VITE_FIREBASE_APP_ID)
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  // apiKey: "AIzaSyDQWWDM2uCTBF6h7VvCw9f_uRfA8YdW4G0",
  // authDomain: "ncblog-b9e81.firebaseapp.com",
  // projectId: "ncblog-b9e81",
  // storageBucket: "ncblog-b9e81.appspot.com",
  // messagingSenderId: "117161873166",
  // appId: "1:117161873166:web:fd0177a65f57cc17d1d15f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);

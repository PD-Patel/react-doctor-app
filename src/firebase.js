// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTtR4stl5UVPPKM4YeaqwXZyO8V7P5j4k",
  authDomain: "react-doctor-app.firebaseapp.com",
  projectId: "react-doctor-app",
  storageBucket: "react-doctor-app.appspot.com",
  messagingSenderId: "301866521985",
  appId: "1:301866521985:web:6a389ab1a2d37a607d4480",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

const auth = getAuth();

export { auth };
export default db;

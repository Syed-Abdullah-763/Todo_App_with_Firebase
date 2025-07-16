// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  setDoc,
  query,
  where
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBhoeKOM7jhJ7V4SA0bg104xhejJgUDeU",
  authDomain: "todo-app-e0f2f.firebaseapp.com",
  projectId: "todo-app-e0f2f",
  storageBucket: "todo-app-e0f2f.firebasestorage.app",
  messagingSenderId: "399904203325",
  appId: "1:399904203325:web:9c9116e2b75c525f240054",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

export {
  app,
  db,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  auth,
  createUserWithEmailAndPassword,
  setDoc,
  signInWithEmailAndPassword,
  query,
  where
};

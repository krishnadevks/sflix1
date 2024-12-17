import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAESeAYTqaGfAjHadqKU_7vEG7UNPoR_Ls",
  authDomain: "sflixs-72295.firebaseapp.com",
  projectId: "sflixs-72295",
  storageBucket: "sflixs-72295.firebasestorage.app",
  messagingSenderId: "391952937049",
  appId: "1:391952937049:web:52511ec1740ba78cfb8148",
  measurementId: "G-XTJRTCZMXG",
};
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth, Firestore, and Storage
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app); // Initialize Firebase Storage

// Export the instances you need
export { auth, db, storage }; //

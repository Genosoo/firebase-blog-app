import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA3ellD0ulgDSz1Q5ZDuA4AcTO8OYv1oX8",
  authDomain: "blog-app-afb9c.firebaseapp.com",
  projectId: "blog-app-afb9c",
  storageBucket: "blog-app-afb9c.appspot.com",
  messagingSenderId: "742354536594",
  appId: "1:742354536594:web:0cc6c5a3ec47d522f73e4b",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOQzY3XEFTKHTS6lODjDCdXdcNXH083lw",
  authDomain: "shopp-3e4a7.firebaseapp.com",
  projectId: "shopp-3e4a7",
  storageBucket: "shopp-3e4a7.firebasestorage.app",
  messagingSenderId: "567488643498",
  appId: "1:567488643498:web:9d69749f6131140db5ebd3",
  measurementId: "G-4LZE6Q0CD9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider()
export const analytics = getAnalytics(app);
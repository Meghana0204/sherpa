// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBT8rgxrZPyDNd85BMtP-Dvta_hzOoCkTs",
  authDomain: "sherpa-gdg2025.firebaseapp.com",
  projectId: "sherpa-gdg2025",
  storageBucket: "sherpa-gdg2025.firebasestorage.app",
  messagingSenderId: "220103059490",
  appId: "1:220103059490:web:a2389d4f8265ff977bc27b",
  measurementId: "G-4PZYB05S69"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export default firebase;
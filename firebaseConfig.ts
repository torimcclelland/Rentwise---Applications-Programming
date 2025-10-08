
// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore, initializeFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbpkaBE8i2l6I8MQRNfbbzwIN9DzDzu2k",
  authDomain: "rentwise-be408.firebaseapp.com",
  projectId: "rentwise-be408",
  storageBucket: "rentwise-be408.firebasestorage.app",
  messagingSenderId: "120381536293",
  appId: "1:120381536293:web:87163de988c1ccc16027cc",
  measurementId: "G-5R0YRSWDY8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
//export const db = getFirestore(app);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});


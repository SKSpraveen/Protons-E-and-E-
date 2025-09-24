// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWZ7rpxU8mAR0PGChG6RTgXXAR42Qr35k",
  authDomain: "protons-e-and-e.firebaseapp.com",
  projectId: "protons-e-and-e",
  storageBucket: "protons-e-and-e.appspot.com",
  messagingSenderId: "273212016080",
  appId: "1:273212016080:web:1a8c97ec16407c3a3825d5",
  measurementId: "G-D455JYWYEW"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase
//export const app = initializeApp(firebaseConfig);
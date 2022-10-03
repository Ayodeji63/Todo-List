// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpxGftJWq-gYRH9zWa_Ak4yRXIiNcRz74",
  authDomain: "todo-list-7cc9b.firebaseapp.com",
  projectId: "todo-list-7cc9b",
  storageBucket: "todo-list-7cc9b.appspot.com",
  messagingSenderId: "265150213469",
  appId: "1:265150213469:web:f29967e064a63292a0ccb4",
  measurementId: "G-9W0MWG89VZ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);
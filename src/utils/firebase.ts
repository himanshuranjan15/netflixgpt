// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAnun9BQwD-K5C2EB0RNNp6uNzDvP07xCY",
  authDomain: "netflixgpt-7a60b.firebaseapp.com",
  projectId: "netflixgpt-7a60b",
  storageBucket: "netflixgpt-7a60b.firebasestorage.app",
  messagingSenderId: "986109828138",
  appId: "1:986109828138:web:0524f58d2722da5a74f753",
  measurementId: "G-MFF5BZ9QXX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log(analytics);

export const auth = getAuth();

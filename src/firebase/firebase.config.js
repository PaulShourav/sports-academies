// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9qEf03ErLtlbOG2hvkHXNskywfU1mYFg",
  authDomain: "sports-academies-auth.firebaseapp.com",
  projectId: "sports-academies-auth",
  storageBucket: "sports-academies-auth.appspot.com",
  messagingSenderId: "694141052843",
  appId: "1:694141052843:web:02f96ba085c811b20d54ee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
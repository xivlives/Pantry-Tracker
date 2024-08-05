// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJoTvTtv7U9kJYQNrRySezMIvsy3UpVb0",
  authDomain: "pantry-tracker-b6631.firebaseapp.com",
  projectId: "pantry-tracker-b6631",
  storageBucket: "pantry-tracker-b6631.appspot.com",
  messagingSenderId: "163365022801",
  appId: "1:163365022801:web:073558b038faad84e39c70"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
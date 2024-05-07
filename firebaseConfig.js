// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
    apiKey: "AIzaSyAA-mCpPa1C8yCe3QPcDkAUERXFt5prRi0",
    authDomain: "fir-cd40a.firebaseapp.com",
    databaseURL: "https://fir-cd40a-default-rtdb.firebaseio.com/",
    projectId: "fir-cd40a",
    storageBucket: "fir-cd40a.appspot.com",
    messagingSenderId: "754020825701",
    appId: "1:754020825701:web:7391f23c36fc2c5b66e48c",
    measurementId: "G-KZRF350XY9",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
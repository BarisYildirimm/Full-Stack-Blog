// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLa_1uOWGds1jeA8MtqYgdGx9D6HhVohQ",
  authDomain: "eunike-blog.firebaseapp.com",
  projectId: "eunike-blog",
  storageBucket: "eunike-blog.appspot.com",
  messagingSenderId: "577460915552",
  appId: "1:577460915552:web:2a6bf74ad47b0087232205",
  measurementId: "G-8Z59CB6K3N",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

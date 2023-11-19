import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// import process from 'process';

const firebaseConfig = {

    apiKey: "AIzaSyBrQAARfpmuB-VJwIb1eEdu2nP7GDDDag4",
  
    authDomain: "simply-f5ee2.firebaseapp.com",
  
    projectId: "simply-f5ee2",
  
    storageBucket: "simply-f5ee2.appspot.com",
  
    messagingSenderId: "1073839408526",
  
    appId: "1:1073839408526:web:c4483e97e001e523d690df",
  
    measurementId: "G-GPL20W9QZY"
  
  };
  
  

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
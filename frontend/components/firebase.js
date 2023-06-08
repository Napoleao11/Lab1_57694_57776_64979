import firebase from 'firebase/app';
import 'firebase/database';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



// Initialize Firebase
//
//const analytics = getAnalytics(app);
  //databaseURL: "https://iscf-lab1-2cd64-default-rtdb.europe-west1.firebasedatabase.app",
//https://iscf-tp1-91e63-default-rtdb.europe-west1.firebasedatabase.apphttps://iscf-lab-1-final-default-rtdb.europe-west1.firebasedatabase.app/
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-TUA6_LwqixIK61OObZhhkU1NVpXbzL0",
  authDomain: "iscf-lab-1-final.firebaseapp.com",
  databaseURL: "https://iscf-lab-1-final-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "iscf-lab-1-final",
  storageBucket: "iscf-lab-1-final.appspot.com",
  messagingSenderId: "376591656912",
  appId: "1:376591656912:web:edd1d0b47a91a39be1bbd5",
  measurementId: "G-TRBKJE0WDZ"
};

//firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);

export default app;//firebase.database();
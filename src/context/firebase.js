import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyCbXf7G3FjpSuUD6stKKLtH1diL3Xk-Mho",
    authDomain: "twitter-clone-68e92.firebaseapp.com",
    projectId: "twitter-clone-68e92",
    storageBucket: "twitter-clone-68e92.appspot.com",
    messagingSenderId: "685874326853",
    appId: "1:685874326853:web:ced44e3eb364384872a22c",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };
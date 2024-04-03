// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { postToken } from "./LoginService";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const signInWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const response = await postToken(res.user.email, res.user.uid, res.user.photoURL, res.user.displayName);
        return res.user;
    } catch (err) {
        console.error(err);
    }
};


export { auth, signInWithGoogle, signOut}
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"

const firebaseConfig = {
    apikey :process.env.FirebaseConfig_apiKey,
    authDomain: process.env.FirebaseConfig_authDomain,
    projectId: process.env.FirebaseConfig_projectId,
    storageBucket: process.env.FirebaseConfig_storageBucket,
    messagingSenderId: process.env.FirebaseConfig_messagingSenderId,
    appId: process.env.FirebaseConfig_appId,
    measurementId: process.env.FirebaseConfig_measurementId,
}

// const firebaseConfig = process.env.FirebaseConfig;
const firebaseApp = initializeApp(firebaseConfig)
const auth = getAuth(firebaseApp);

export const signUp = async (email, pass) => {
    try {
        const result = await createUserWithEmailAndPassword(auth, email, pass)
        return result;
    } catch (err) {
        return err
    }
}

export const signIn = async (email, pass) => {
    try {
        const result = await signInWithEmailAndPassword(auth, email, pass)
        return result;
    } catch (err) {
        return err;
    }
}

export const authentication = () => {
    onAuthStateChanged(auth, (user) => {
        if (user) return user
        return false;
    })
}

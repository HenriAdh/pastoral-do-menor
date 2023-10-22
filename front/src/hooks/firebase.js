import { initializeApp } from "firebase/app";
import { 
    getFirestore, 
    collection, 
    doc,
    addDoc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyAHnjY9qj70_qy4ZekKgP4rpMRjLLGYelE",
    authDomain: "pastoral-do-menor.firebaseapp.com",
    projectId: "pastoral-do-menor",
    storageBucket: "pastoral-do-menor.appspot.com",
    messagingSenderId: "236943488993",
    appId: "1:236943488993:web:9de0249ae6c3e7ef2084a0",
    measurementId: "G-JKKG2K809J"
};

const firebaseApp = initializeApp(firebaseConfig)
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

const stock = collection(db, "stock");
//const users = collection(db, 'users');

export const signUp = async (email, pass) => {
    try {
        const result = await createUserWithEmailAndPassword(auth, email, pass);
        return result;
    } catch (err) {
        return err
    }
}

export const signIn = async (email, pass) => {
    try {
        const result = await signInWithEmailAndPassword(auth, email, pass);
        return result;
    } catch (err) {
        return err;
    }
}

export const getUid = async () => {
    const user = auth.currentUser;
    return user ? user.uid : false;
}

export const insertStock = async (obj) => {
    const inserted = await addDoc(stock, obj);
    return inserted;
}

export const selectItemStock = async (id) => {
    const docItem = doc(db, 'stock', id);
    const item = await getDoc(docItem);
    return item;
}

export const selectAllStock = async () => {
    const itens = await getDocs(stock);
    return itens;
}

export const updateStock = async (id, obj) => {
    const docItem = doc(db, 'stock', id);
    const updated = await updateDoc(docItem, obj)
    return updated;
}

export const deleteStock = async (id) => {
    const docItem = doc(db, 'stock', id);
    const deleted = await deleteDoc(docItem)
    return deleted;
}
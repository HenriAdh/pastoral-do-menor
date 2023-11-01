import { initializeApp } from "firebase/app";
import { 
    getFirestore, 
    collection, 
    doc,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"

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

const users = collection(db, "users");
const stock = collection(db, "stock");
const logStock = collection(db, "logStock");
const requisicoes = collection(db, "requisicoes");
const itensRequisitados = collection(db, "itensRequisitados");
const logRequisicoes = collection(db, "logRequisicoes");

export const signUp = async (email, pass, name='', origin='') => {
    if (!getUid) return 'Usuário não permitido.';
    try {
        const result = await createUserWithEmailAndPassword(auth, email, pass);
        const user = {
            ativo: true,
            email,
            name,
            origin,
            uid: result.user.uid,
        };
        await addDoc(users, user);
        return result;
    } catch (err) {
        return err;
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

export const logOutUser = () => {
    try {
        signOut(auth);
    } catch {
        alert('Erro ao desconectar.');
    }
}

export const getUid = async () => {
    const user = auth.currentUser;
    return user ? user : false;
}

export const verifyAdmin = async (userId) => {
    const data = await getDocs(users);
    const formatData = data.docs.map((doc)=>({ ...doc.data(), id: doc.id }))
    const user = formatData.filter((users)=>users.uid === userId);
    return user[0].admin === true;
}

export const insertStock = async (obj) => {
    const date = new Date();
    const user = await getUid();
    if (!(user)) return 'Usuário não permitido.';
    try {
        const item = await addDoc(stock, obj);
        const log = {
            alteracao: 'New',
            dtAlteracao: date.toLocaleString(),
            idItem: item.id,
            idUser: user.uid,
            qtd: obj.amount,
        };
        await addDoc(logStock, log);
        return 'Item adicionado.';
    } catch (e) {
        console.log(e);
        return 'Erro ao adicionar item';
    }
}

export const selectLogStock = async () => {
    const itens = await getDocs(logStock);
    const logItens = itens.docs.map((doc) =>({ ...doc.data(), id: doc.id }))

    const usersLog = await getDocs(users);
    const logUsers = usersLog.docs.map((doc) =>({ ...doc.data(), id: doc.id }))

    const stockItens = await getDocs(stock);
    const logItensStock = stockItens.docs.map((doc) =>({ ...doc.data(), id: doc.id }))

    return [logItens, logUsers, logItensStock];
}

export const selectAllStock = async () => {
    const itens = await getDocs(stock);
    return itens;
}

export const updateStock = async (id, obj) => {
    const user = await getUid();
    const date = new Date();
    if (!(user)) return 'Usuário não permitido.';
    try {
        const docItem = doc(db, 'stock', id);
        await updateDoc(docItem, obj)
        const log = {
            alteracao: 'Update',
            dtAlteracao: date.toLocaleString(),
            idItem: id,
            idUser: user.uid,
            qtd: obj.amount,
        }
        await addDoc(logStock, log);
        return 'Quantidade atualizada.';
    } catch (e) {
        console.log(e);
        return 'Erro ao atualizar quantidade.';
    }
}

export const deleteStock = async (id) => {
    const user = await getUid();
    const date = new Date();
    if (!(user)) return 'Usuário não permitido.';
    try {
        const docItem = doc(db, 'stock', id);
        await deleteDoc(docItem)
        const log = {
            alteracao: 'Delete',
            dtAlteracao: date.toLocaleString(),
            idItem: id,
            idUser: user.uid,
            qtd: '0',
        }
        await addDoc(logStock, log);
        return 'Item removido.';
    } catch(e) {
        console.log(e);
        return 'Erro ao remover item.';
    }
}

export const insertRequisicao = async (obj) => {
    const date = new Date();
    const user = await getUid();
    if (!(user)) return 'Usuário não permitido.';
    try {
        const dbData = await getDocs(users)
        const usersDoc = dbData.docs.map((doc)=>({...doc.data(), id: doc.id}))
        const userRequest = usersDoc.filter((u) => u.uid === user.uid)
        const newObj = {
            dtRequisicao: date.toLocaleString(),
            localDeOrigem: userRequest[0].origin,
            motivo: obj.motivo,
            status: 'Aberta',
            user: user.uid,
        }
        const req = await addDoc(requisicoes, newObj);
        obj.itens.forEach(async item => {
            await addDoc(itensRequisitados, {
                ...item,
                idRequisicao: req.id,
            })
        });
        return 'Requisicao adicionada.';
    } catch (e) {
        console.log(e);
        return 'Erro ao adicionar requisicao';
    }
}

export const updateRequisicao = async (id, obj) => {
    const date = new Date();
    const user = await getUid();
    if (!(user)) return 'Usuário não permitido.';
    try {
        const docItem = doc(db, 'requisicoes', id);
        await updateDoc(docItem, obj)
        const log = {
            dtAnalisado: date.toLocaleString(),
            idRequisicao: id,
            idUser: user.uid,
        }
        await addDoc(logRequisicoes, log);
        return 'Requisicao atendida.';
    } catch (e) {
        console.log(e);
        return 'Erro ao atender requisicao.';
    }
}

export const selectRequisicoes = async () => {
    const itens = await getDocs(requisicoes);
    return itens;
}

export const selectItensReq = async () => {
    const itens = await getDocs(itensRequisitados);
    return itens
}
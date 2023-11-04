import { useState } from "react";
import Loader from "../../../components/loader";
import { updateStock } from "../../../hooks/firebase";
import styles from './view-item.module.css';

const ModalViewItem = ({id, oldAmount, onFinish}) => {
    const [amount, setAmount] = useState(oldAmount);
    const [loading, setLoading] = useState(false);

    const saveNewAmount = async () => {
        setLoading(true);
        try {
            const diff = oldAmount < amount ? amount - oldAmount : oldAmount - amount;
            const result = await updateStock(id, {amount: amount, type: oldAmount > amount ? 'Saída' : 'Entrada', diff})
            alert(result);
            setLoading(false);
            onFinish();
        } catch (e) {
            console.log(e);
            alert('Erro ao atualizar quantidade.');
            setLoading(false);
            onFinish();
        }        
    }

    const deleteItem = async () => {
        setLoading(true);
        try {
            const result = await updateStock(id, {amount: 0, type: 'Removida', diff: oldAmount});
            alert(result);
            setLoading(false);
            onFinish();
        } catch (e) {
            console.log(e);
            alert('Erro ao remover item.');
            setLoading(false);
            onFinish();
        }
    }

    return (<>
        <input 
            type="button" 
            id="btnExit" 
            value={'x'} 
            onClick={()=>onFinish()} 
            className={styles.btnExit}
        />
        <div className={styles.formModal}>
            <h1>Alterar quantidade</h1>
            <label htmlFor='edtNewAmount'>Selecione a nova quantidade: </label>
            <input 
                type='number' 
                id="edtNewAmount" 
                onChange={(e) => setAmount(e.target.value)} 
                value={amount}
                min={0}
                style={{padding: '10px',}}
            />
            <input
                type="button"
                id="btnSave"
                onClick={() => saveNewAmount()}
                value={'Salvar'}
                style={{
                    backgroundColor: '#0F0',
                    borderRadius: '5px',
                    color: '#000',
                    padding: '5px',
                    fontWeight: 'bolder'
                }}
            />
            <input 
                type="button"
                id="btnDelete"
                onClick={() => deleteItem()}
                value={'Remover item'} 
                style={{
                    backgroundColor: '#F00',
                    borderRadius: '5px',
                    color: '#FFF',
                    padding: '5px',
                    fontWeight: 'bolder'
                }}
            />
            {loading && <Loader />}
        </div>
    </>)
}

export default ModalViewItem;
import React, { useState, useEffect } from "react";
import { selectAllStock, updateStock, deleteStock } from "../../../hooks/firebase";
import Table from "../../../components/table";
import Loader from "../../../components/loader";
import Modal from "../../../components/modal";
import styles from './stock.module.css';

const ModalStock = ({id, oldAmount=0, onFinish}) => {
    const [amount, setAmount] = useState(oldAmount);
    const [loading, setLoading] = useState(false);

    const saveNewAmount = async () => {
        setLoading(true);
        try {
            const result = await updateStock(id, {amount: amount})
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
            const result = await deleteStock(id);
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
            <h1>Saída de material</h1>
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
                value={'Remover'} 
                style={{
                    backgroundColor: '#F00',
                    borderRadius: '5px',
                    color: '#000',
                    padding: '5px',
                    fontWeight: 'bolder'
                }}
            />
            {loading && <Loader />}
        </div>
    </>)
}

const Stock = () => {
    const [data, setData] = useState([]);
    const [item, setItem] = useState({id: '',});

    useEffect(() => {
        const fetchDataTable = async () => {
            const dbData = await selectAllStock();
            const itens = dbData.docs.map((doc) =>({ ...doc.data(), id: doc.id }))
            const prevData = itens.map((item) => {
                return {
                    'Nome': item.material,
                    'Descrição': item.description,
                    'Unid': item.uni,
                    'Qtde': item.amount,
                    'Categoria': item.category,
                    'Localização': item.location,
                    'Ação': <input
                        id={'btnExtract'}
                        type="button"
                        value={'Retirar'} 
                        onClick={() => setItem({id: item.id, oldValue: item.amount})} 
                        style={{
                            backgroundColor: '#FFF',
                            borderRadius: '5px',
                        }} 
                    />,
                }
            });

            setData(prevData);
        }
        fetchDataTable();
    }, []);

    return(
        <div className="horizontalscroll">
            {data.length > 0 ? 
            <Table 
                dataTable={data}
                focus={"Descrição"}
            /> : <Loader/> }
            {item.id.length > 0 ? 
            <Modal 
                children={
                    <ModalStock 
                        id={item.id} 
                        oldAmount={item.oldAmount} 
                        onFinish={()=>setItem({id: '',})} 
                    />
                } 
            /> : <></>}
        </div>
    )
}

export default Stock;
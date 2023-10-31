import { useState } from "react";
import Loader from "../../../components/loader";
import { updateRequisicao } from "../../../hooks/firebase";
import styles from './view-req.module.css';

const ModalViewReq = ({id, onFinish, data}) => {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');

    const atendReq = async () => {
        setLoading(true);
        try {
            const result = await updateRequisicao(id, {
                status: status
            });
            alert(result);
            setLoading(false);
            onFinish();
        } catch (e) {
            console.log(e);
            alert('Erro ao atender requisição.');
            setLoading(false);
            onFinish();
        }
    }

    const handleChange = (e) => {
        setStatus(e.target.value)
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
            <h1>Atender Requisição</h1>

            <div style={{marginBottom: '15px'}}>
                <p><b>ORIGEM: </b>{data.origin}</p>
                <p><b>MOTIVO: </b>{data.motivo}</p>
                {data.itens.foreach((item, index) => {
                    return <p key={index}><b>ITEM {index+1}: </b>{item}</p>
                })}
            </div>

            <label htmlFor='edtNewStatus'>Selecione o status: </label>
            <select id="edtNewStatus" onChange={(e) => handleChange(e)}>
                <option value="" selected >Aberta</option>
                <option value="Aprovada"></option>
                <option value="Reprovada"></option>
            </select>
            <input
                type="button"
                id="btnSave"
                onClick={() => atendReq()}
                value={'Salvar'}
                style={{
                    backgroundColor: '#00F',
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

export default ModalViewReq;
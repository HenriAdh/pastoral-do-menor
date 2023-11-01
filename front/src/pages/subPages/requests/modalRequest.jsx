import { useCallback, useEffect, useState } from "react";
import Loader from "../../../components/loader";
import { selectAllStock, selectItensReq, updateRequisicao } from "../../../hooks/firebase";
import styles from './view-req.module.css';

const ModalViewReq = ({id, onFinish, data}) => {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('Aberta');
    const [itens, setItens] = useState([]);
    const [reqItens, setReqItens] = useState([]);

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
        setStatus(e.target.value);
    }


    const fetchItens = useCallback(async () => {
        const dataItensReq = await selectItensReq();
        const allItensReq = dataItensReq.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

        const reqItens = allItensReq.filter((item) => item.idRequisicao === data.id)

        setReqItens(reqItens);

        const dataItens = await selectAllStock();
        const allItens = dataItens.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        
        const itensfetched = reqItens.map((item) => (allItens.filter((item2) => item2.id === item.idItem)))
        setItens(itensfetched);
    }, [data.id])

    useEffect(()=>{
        fetchItens();
    }, [fetchItens])

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
                <p><b>ORIGEM: </b>{data.localDeOrigem}</p>
                <p><b>MOTIVO: </b>{data.motivo}</p>
                {itens.map((item, index) => {
                    return <p 
                        key={index}>
                            <b>ITEM {index+1}: </b>{reqItens[index].qtd}{item[0].uni} de {item[0].material}
                        </p>
                })}
            </div>

            <label htmlFor='edtNewStatus'>Selecione o status: </label>
            <select 
                style={{padding: '5px 10px'}}
                id="edtNewStatus" 
                onChange={(e) => handleChange(e)}
                defaultValue={'Aberta'}
            >
                <option value="Aberta">Aberta</option>
                <option value="Aprovada">Aprovada</option>
                <option value="Reprovada">Reprovada</option>
            </select>
            <input
                type="button"
                id="btnSave"
                onClick={() => atendReq()}
                value={'Salvar'}
                style={{
                    backgroundColor: '#00F',
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

export default ModalViewReq;
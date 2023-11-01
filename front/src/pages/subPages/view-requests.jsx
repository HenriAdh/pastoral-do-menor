import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/modal";
import Loader from "../../components/loader";
import Table from "../../components/table";
import { getUid, selectRequisicoes, verifyAdmin } from "../../hooks/firebase";
import ModalViewReq from "./requests/modalRequest";

const ViewRequest = () => {
    const [data, setData] = useState([])
    const [item, setItem] = useState({id: '', index: -1})
    const [requests, setRequests] = useState([])
    const [userAdmin, setUserAdmin] = useState(false)

    const navigate = useNavigate();

    const checkAuth = useCallback(async () => {
        const user = await getUid();
        if(!(user)) return navigate('/');
        const isAdmin = await verifyAdmin(user.uid);
        setUserAdmin(isAdmin);
    }, [navigate])

    const fetchDataTable = useCallback( async () => {
        const dbData = await selectRequisicoes();
        const itens = dbData.docs.map((doc) =>({ ...doc.data(), id: doc.id }))
        setRequests(itens);
        const openItens = itens.filter((item)=>item.status === 'Aberta')
        const prevData = openItens.map((item, i) => {
            const date = item.dtRequisicao.split(', ')
            const retorno = {
                'Data': date[0],
                'Origem': item.localDeOrigem,
                'Motivo': item.motivo,
                'Status': item.status,
            }
            if(userAdmin) retorno['Ação'] = <input
                id={'btnAtend'}
                type="button"
                value={'Atender'} 
                onClick={() => setItem({
                    id: item.id, 
                    oldValue: item.status,
                    index: i,
                })} 
                style={{
                    backgroundColor: '#FFF',
                    borderRadius: '5px',
                    padding: '3px 5px',
                }} 
            />
            
            return retorno;
        });
        if (prevData.length > 0) setData(prevData)
        else setData([{
            'Data': '',
            'Origem': '',
            'Motivo': 'Não há requisições abertas',
            'Status': '',
        }])
    }, [userAdmin])

    useEffect(()=>{
        checkAuth();
        fetchDataTable();
    }, [checkAuth, fetchDataTable])

    return(
        <div className="horizontalscroll">
            { data.length > 0 ? 
            <Table 
                dataTable={data}
                focus={"Motivo"}
            /> : <Loader /> }
            {item.id.length > 0 ? 
                <Modal
                    children={
                        <ModalViewReq
                            id={item.id}
                            data={requests[item.index]}
                            onFinish={()=>{
                                setItem({id: '', index: -1});
                                fetchDataTable();
                            }}
                        />
                    } 
                /> : <></>
            }
        </div>
    )
}

export default ViewRequest;
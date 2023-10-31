import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/modal";
import Loader from "../../components/loader";
import Table from "../../components/table";
import { getUid, selectRequisicoes } from "../../hooks/firebase";
import ModalViewReq from "./requests/modalRequest";

const ViewRequest = () => {
    const [data, setData] = useState([])
    const [item, setItem] = useState({id: '',})
    const [requests, setRequests] = useState([])

    const navigate = useNavigate();

    const checkAuth = useCallback(async () => {
        const user = await getUid();
        if(!(user)) return navigate('/');
    }, [navigate])

    const fetchDataTable = useCallback( async () => {
        const dbData = await selectRequisicoes();
        const itens = dbData.docs.map((doc) =>({ ...doc.data(), id: doc.id }))
        setRequests(itens);
        console.log(itens)
        const prevData = itens.map((item) => {
            const date = item.dtRequisicao.split(', ')
            return {
                'Data': date[0],
                'Origem': item.localDeOrigem,
                'Motivo': item.motivo,
                'Status': item.status,
                'Ação': <input
                    id={'btnAtend'}
                    type="button"
                    value={'Atender'} 
                    onClick={() => setItem({
                        id: item.id, 
                        oldValue: item.status
                    })} 
                    style={{
                        backgroundColor: '#FFF',
                        borderRadius: '5px',
                        padding: '3px 5px'
                    }} 
                />,
            }
        });

        setData(prevData);
    }, [])

    useEffect(()=>{
        checkAuth();
        fetchDataTable();
    }, [checkAuth, fetchDataTable])

    return(
        <div className="horizontalscroll">
            {data.length > 0 ? 
            <Table 
                dataTable={data}
                focus={"Motivo"}
            /> : <Loader /> }
            {item.id.length > 0 ? 
                <Modal
                    children={
                        <ModalViewReq
                            id={item.id}
                            data={requests}
                            onFinish={()=>setItem({id: '',})} 
                        />
                    } 
                /> : <></>
            }
        </div>
    )
}

export default ViewRequest;
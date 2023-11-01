import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getUid, selectAllStock, verifyAdmin } from "../../hooks/firebase";
import Table from "../../components/table";
import Modal from "../../components/modal";
import Loader from "../../components/loader";
import ModalViewItem from "./viewItens/modalStock";

const ViewItens = () => {
    const [data, setData] = useState([]);
    const [item, setItem] = useState({id: '',});
    const [userAdmin, setUserAdmin] = useState(false)

    const navigate = useNavigate();

    const checkAuth = useCallback(async () => {
        const user = await getUid();
        if(!(user)) return navigate('/');
        const isAdmin = await verifyAdmin(user.uid);
        setUserAdmin(isAdmin);
    }, [navigate])

    const fetchDataTable = useCallback( async () => {
        const dbData = await selectAllStock();
        const itens = dbData.docs.map((doc) =>({ ...doc.data(), id: doc.id }))
        const prevData = itens.map((item) => {
            const retorno = {
                'Nome': item.material,
                'Descrição': item.description,
                'Unid': item.uni,
                'Qtde': item.amount,
                'Categoria': item.category,
                'Localização': item.location,
            }
            if(userAdmin) retorno['Ação'] = <input
                id={'btnExtract'}
                type="button"
                value={'Alterar'} 
                onClick={() => setItem({id: item.id, oldValue: item.amount})} 
                style={{
                    backgroundColor: '#FFF',
                    borderRadius: '5px',
                }} 
            />

            return retorno
        });
        if (prevData.length > 0) setData(prevData);
        else setData([{
            'Nome': '',
            'Descrição': 'Não há itens no estoque',
            'Unid': '',
            'Categoria': '',
            'Localização': '',
        }])
    }, [userAdmin])

    useEffect(() => {
        checkAuth();
        fetchDataTable();
        // eslint-disable-next-line
    }, [checkAuth, fetchDataTable]);

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
                        <ModalViewItem
                            id={item.id} 
                            oldAmount={item.oldValue} 
                            onFinish={()=>{
                                setItem({id: '',});
                                fetchDataTable();
                            }} 
                        />
                    } 
                /> : <></>
            }
        </div>
    )
}

export default ViewItens;
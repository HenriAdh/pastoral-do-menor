import React, { useCallback, useEffect, useState } from "react";
import Loader from "../../../components/loader";
import Table from "../../../components/table";
import { getUid, selectLogStock } from "../../../hooks/firebase";
import { useNavigate } from "react-router-dom";

const Stock = () => {
    const [data, setData] = useState([])

    const navigate = useNavigate();

    const checkAuth = useCallback(async () => {
        const user = await getUid();
        if(!(user)) return navigate('/');
    }, [navigate])

    const fetchDataTable = useCallback( async () => {
        const dbData = await selectLogStock();
        const log = dbData[0];
        const logUsers = dbData[1];
        const logItensSotck = dbData[2];

        const newLog = log.map((item)=>{
            
        })

        const add = log.filter((item)=>item.alteracao === 'Add')
        const update = log.filter((item)=>item.alteracao === 'Update')
        
        const prevData = openItens.map((item, i) => {
            const retorno = {

            }
            
            return retorno;
        });
        if (prevData.length > 0) setData(prevData)
        else setData([{
            'Item': 'Não há registro de alterações',
            'Descrição': '',
            'Data Cadastro': '',
            'Data Modificação': '',
            'Tipo de Modificação': '',
            'Qtd Antiga': '',
            'Qtd Nova': '',
            'Usuário Responsável': '',
        }])
    }, [])

    useEffect(()=>{
        checkAuth();
        fetchDataTable();
    }, [checkAuth, fetchDataTable])

    return(
        <div>
            { data.length > 0 ? 
            <Table 
                dataTable={data}
                focus={"Item"}
            /> : <Loader /> }
        </div>
    )
}

export default Stock;
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
        const logItensStock = dbData[2];

        const newLog = log.map((item)=>{
            const newUser = logUsers.filter((user) => user.uid === item.idUser);
            const newItem = logItensStock.filter((material) => material.id === item.idItem);
            
            return {
                'item': newItem[0].material,
                itemDescription: newItem[0].description,
                alteracao: item.alteracao,
                qtd: item.alteracao === 'Saída' ? '-'+item.qtd : item.alteracao === 'Remoção'? '-'+item.qtd : '+'+item.qtd,
                unidade: newItem[0].uni,
                dtAlteracao: item.dtAlteracao,
                user: newUser[0].name,
                origin: newUser[0].origin,
            }
        })
        
        const prevData = newLog.map((item) => {
            const retorno = {
                'Item': item['item'],
                'Descrição': item.itemDescription,
                'Tipo de Modificação': item.alteracao === 'New' ? 'Novo item' : item.alteracao,
                'Qtd Modificadda': item.qtd,
                'Unidade': item.unidade,
                'Data Modificação': item.dtAlteracao,
                'Usuário Responsável': item.user,
                'Origem usuário': item.origin,
            }
            
            return retorno;
        });

        const orderData = prevData.sort((a, b) => a.Item > b.Item ? true : -1)

        if (prevData.length > 0) setData(orderData)
        else setData([{
            'Item': 'Não há registro de alterações',
            'Descrição': '',
            'Tipo de Modificação': '',
            'Qtd Modificadda': '',
            'Data Modificação': '',
            'Usuário Responsável': '',
            'Origem usuário': ''
        }])
    }, []);

    useEffect(()=>{
        checkAuth();
        fetchDataTable();
    }, [checkAuth, fetchDataTable])

    return(
        <div className="horizontalscroll">
            { data.length > 0 ? 
            <Table 
                dataTable={data}
                focus={"Descrição"}
            /> : <Loader /> }
        </div>
    )
}

export default Stock;
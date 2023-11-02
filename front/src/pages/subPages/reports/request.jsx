import React, { useCallback, useEffect, useState } from "react";
import Loader from "../../../components/loader";
import Table from "../../../components/table";
import { getUid, selectLogRequest } from "../../../hooks/firebase";
import { useNavigate } from "react-router-dom";

const RequestReport = () => {
    const [data, setData] = useState([])

    const navigate = useNavigate();

    const checkAuth = useCallback(async () => {
        const user = await getUid();
        if(!(user)) return navigate('/');
    }, [navigate])

    const fetchDataTable = useCallback( async () => {
        const dbData = await selectLogRequest();
        const log = dbData[0];
        const reqs = dbData[1]
        const itensReq = dbData[2]
        const users = dbData[3];
        const itensStock = dbData[4];

        const newLog = log.map((item)=>{
            const userAtend = users.filter((user) => user.uid === item.idUser);
            const reqAtend = reqs.filter((req) => req.id === item.idRequisicao);
            
            const newReqAtend = reqAtend.map((req)=>{
                const userReq = users.filter((user) => user.uid === req.user)
                const itemReq = itensReq.filter((item) => item.idRequisicao === req.id)

                const newItemReq = itemReq.map((item) => {
                    const newItem = itensStock.filter((itemStk) => itemStk.id === item.idItem)

                    return {
                        name: newItem[0].material,
                        description: newItem[0].description,
                    }
                })

                return {
                    userReq: userReq[0].name,
                    itemReq: newItemReq,
                    motivo: req.motivo,
                    origin: req.localDeOrigem,
                    status: req.status,
                    dtCreate: req.dtRequisicao,
                }
            })
            
            return {
                userAtend: userAtend[0].name,
                reqAtend: newReqAtend[0],
                dtAtend: item.dtAnalisado,
            }
        })
        
        const prevData = newLog.map((item) => {

            const concat = (list) => {
                let text = '';
                list.forEach(obj => {
                    text += obj.name + ' - ' + obj.description + ' / '
                });
                return text;
            }

            const retorno = {
                'Data Requisição': item.reqAtend.dtCreate,
                'Origem Requisição': item.reqAtend.origin,
                'Usuário Requisição': item.reqAtend.userReq,
                'Motivo Requisição': item.reqAtend.motivo,

                'Itens Requisição': concat(item.reqAtend.itemReq),

                'Data Atendimento': item.dtAtend,
                'Usuário Atendimento': item.userAtend,

                'Status': item.reqAtend.status,
            }
            
            return retorno;
        });

        const orderData = prevData.sort((a, b) => {
            const dateA = a['Data Requisição'].split(', ');
            const dateB = b['Data Requisição'].split(', ');

            const dmyyA = dateA[0].split('/');
            const dmyyB = dateB[0].split('/');

            const convertedA = dmyyA[2] + '/' + dmyyA[1] + '/' + dmyyA[0];
            const convertedB = dmyyB[2] + '/' + dmyyB[1] + '/' + dmyyB[0];

            return convertedA < convertedB ? true : -1
        })

        if (prevData.length > 0) setData(orderData)
        else 
        setData([{
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
                focus={"Item"}
            /> : <Loader /> }
        </div>
    )
}

export default RequestReport;
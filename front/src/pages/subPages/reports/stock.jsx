import React, { useState, useEffect } from "react";
import { callbackend } from "../../../hooks/fetch";

import Table from "../../../components/table";

const Stock = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchDataTable = async () => {
            const url = '/getItens?active=1';
            const method = 'GET'
            const result = await callbackend(url, method);
            const dbData = await result.json();

            const prevData = dbData.map((item)=>{
                return {
                    'ID': item.id,
                    'Material': item.material,
                    'Descrição': item.description,
                    'Unid': item.uni,
                    'Qtde': item.amount,
                    'Categoria': item.category,
                    'Localização': item.location,
                }
            });
            
            setData(prevData);
        }

        fetchDataTable();
    }, []);

    const dataTeste = [
        {
            'ID': '1',
            'Material': 'Arroz',
            'Descrição': 'Pacote de arroz camil',
            'Unid': 'PCT',
            'Qtde': '15',
            'Categoria': 'Alimento',
            'Localização': 'D-32',
        }
    ];

    return(
        <div className="horizontalscroll">
            <Table 
                dataTable={data.length > 0 ? data : dataTeste}
                focus={"Descrição"}
            />
        </div>
    )
}

export default Stock;
import React from "react";

import Table from "../../../components/table";

const OpenRequests = () => {
    const data = [
        {
            ID: '3',
            DESCRICAO: <span className="hcenter center"><img className="img" src="../../logo192.png" alt="img52" height={'40px'} /> JavaScript 1</span>,
            UNID: 'UN',
            QTDE: '2',
            CATEGORIA: 'Programacao',
        },
        {
            ID: '16',
            DESCRICAO: <span className="hcenter center"><img className="img" src="../../logo192.png" alt="img52" height={'40px'} /> JavaScript 1</span>,
            UNID: 'PCT',
            QTDE: '5',
            CATEGORIA: 'Programacao',
        }, 
        {
            ID: '35',
            DESCRICAO: <span className="hcenter center"><img className="img" src="../../logo192.png" alt="img52" height={'40px'} /> JavaScript 1</span>,
            UNID: 'KG',
            QTDE: '1',
            CATEGORIA: 'Programacao',
        },
    ]

    return(
        <div className="horizontalscroll">
            <Table 
                dataTable={data}
            />
        </div>
    )
}

export default OpenRequests;
import React from "react";

import Table from "../../../components/table";

const ClosedRequests = () => {
    const data = [
        {
            ID: '1',
            DESCRICAO: <span className="hcenter center"><img className="img" src="../../logo192.png" alt="img52" height={'40px'} /> Python 1</span>,
            UNID: 'UN',
            QTDE: '2',
            CATEGORIA: 'Programacao',
        },
        {
            ID: '63',
            DESCRICAO: <span className="hcenter center"><img className="img" src="../../logo192.png" alt="img52" height={'40px'} /> Python 1</span>,
            UNID: 'PCT',
            QTDE: '5',
            CATEGORIA: 'Programacao',
        }, 
        {
            ID: '78',
            DESCRICAO: <span className="hcenter center"><img className="img" src="../../logo192.png" alt="img52" height={'40px'} /> Python 1</span>,
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

export default ClosedRequests;
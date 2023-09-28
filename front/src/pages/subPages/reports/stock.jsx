import React from "react";

import Table from "../../../components/table";

const Stock = () => {
    const data = [
        {
            ID: '52',
            DESCRICAO: <span className="hcenter center"><img className="img" src="../../logo192.png" alt="img52" height={'40px'} /> React App 1</span>,
            UNID: 'UN',
            QTDE: '2',
            CATEGORIA: 'Programacao',
        },
        {
            ID: '71',
            DESCRICAO: <span className="hcenter center"><img className="img" src="../../logo192.png" alt="img52" height={'40px'} /> React App 2</span>,
            UNID: 'PCT',
            QTDE: '5',
            CATEGORIA: 'Programacao',
        }, 
        {
            ID: '97',
            DESCRICAO: <span className="hcenter center"><img className="img" src="../../logo192.png" alt="img52" height={'40px'} /> React App 3</span>,
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

export default Stock;
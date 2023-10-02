import React from "react";

import Table from "../../../components/table";

const OpenRequests = () => {
    const data = [
        {
            ID: '3',
            ORIGEM: <span className="hcenter center"><img className="img" src="../../logo192.png" alt="img52" height={'40px'} /> JavaScript 1</span>,
            DATA_DA_SOLICITACAO: 'UN',
            OPCOES: <div><a href={':1234'}>Abrir</a> | <a href="/">Verificar Estoque</a></div>,
        },
        {
            ID: '3',
            ORIGEM: <span className="hcenter center"><img className="img" src="../../logo192.png" alt="img52" height={'40px'} /> JavaScript 1</span>,
            DATA_DA_SOLICITACAO: 'UN',
            OPCOES: <div><a href="/">Abrir</a> | <a href="/">Verificar Estoque</a></div>,
        },
        {
            ID: '3',
            ORIGEM: <span className="hcenter center"><img className="img" src="../../logo192.png" alt="img52" height={'40px'} /> JavaScript 1</span>,
            DATA_DA_SOLICITACAO: 'UN',
            OPCOES: <div><a href="/">Abrir</a> | <a href="/">Verificar Estoque</a></div>,
        },
        {
            ID: '3',
            ORIGEM: <span className="hcenter center"><img className="img" src="../../logo192.png" alt="img52" height={'40px'} /> JavaScript 1</span>,
            DATA_DA_SOLICITACAO: 'UN',
            OPCOES: <div><a href="/">Abrir</a> | <a href="/">Verificar Estoque</a></div>,
        },
        {
            ID: '3',
            ORIGEM: <span className="hcenter center"><img className="img" src="../../logo192.png" alt="img52" height={'40px'} /> JavaScript 1</span>,
            DATA_DA_SOLICITACAO: 'UN',
            OPCOES: <div><a href="/">Abrir</a> | <a href="/">Verificar Estoque</a></div>,
        },
        {
            ID: '3',
            ORIGEM: <span className="hcenter center"><img className="img" src="../../logo192.png" alt="img52" height={'40px'} /> JavaScript 1</span>,
            DATA_DA_SOLICITACAO: 'UN',
            OPCOES: <div><a href="/">Abrir</a> | <a href="/">Verificar Estoque</a></div>,
        },
        {
            ID: '3',
            ORIGEM: <span className="hcenter center"><img className="img" src="../../logo192.png" alt="img52" height={'40px'} /> JavaScript 1</span>,
            DATA_DA_SOLICITACAO: 'UN',
            OPCOES: <div><a href="/">Abrir</a> | <a href="/">Verificar Estoque</a></div>,
        },
        {
            ID: '3',
            ORIGEM: <span className="hcenter center"><img className="img" src="../../logo192.png" alt="img52" height={'40px'} /> JavaScript 1</span>,
            DATA_DA_SOLICITACAO: 'UN',
            OPCOES: <div><a href="/">Abrir</a> | <a href="/">Verificar Estoque</a></div>,
        },
        {
            ID: '3',
            ORIGEM: <span className="hcenter center"><img className="img" src="../../logo192.png" alt="img52" height={'40px'} /> JavaScript 1</span>,
            DATA_DA_SOLICITACAO: 'UN',
            OPCOES: <div><a href="/">Abrir</a> | <a href="/">Verificar Estoque</a></div>,
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
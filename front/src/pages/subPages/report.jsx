import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const Report = () => {
    const [page, setPage] = useState('Relatório');

    return(
        <div>
            <h3>{page}</h3>
            <div className="DivBox center hcenter">
                <div 
                    onClick={()=>setPage('Relatório')} 
                    className={page==='Relatório'?'selected':''}
                >
                    <Link to='estoque' className="margin button link">Estoque</Link>
                </div>
                <span> | </span>
                <div 
                    onClick={()=>setPage('Solicitações abertas')} 
                    className={page==='Solicitações abertas'?'selected':''}
                >
                    <Link to='solicitacoes-abertas' className="margin button link">Solicitações abertas</Link>
                </div>
                <span> | </span>
                <div 
                    onClick={()=>setPage('Solicitações fechadas')} 
                    className={page==='Solicitações fechadas'?'selected':''}
                >
                    <Link to='solicitacoes-fechadas' className="margin button link">Solicitações fechadas</Link>
                </div>
            </div>
            <Outlet />
        </div>
    )
}

export default Report;
import React, { Suspense, useState } from "react";
import { Link, Outlet } from "react-router-dom";

const Report = () => {
    const [page, setPage] = useState('Estoque');

    return(
        <div>
            <p>Relatórios</p>
            <div className="DivBox center hcenter">
                <div 
                    onClick={()=>setPage('Estoque')} 
                    className={page==='Estoque' ? 'selected':''}
                >
                    <Link to='estoque' className="margin button link">Estoque</Link>
                </div>
                <span> | </span>
                <div 
                    onClick={()=>setPage('Pedidos')} 
                    className={page==='Pedidos' ? 'selected':''}
                >
                    <Link to='pedidos' className="margin button link">Pedidos</Link>
                </div>
            </div>
            <Suspense fallback={<h1>Carregando...</h1>} >
                <Outlet />
            </Suspense>
        </div>
    )
}

export default Report;
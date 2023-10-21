import React, { Suspense, useState } from "react";
import { Link, Outlet } from "react-router-dom";

const Report = () => {
    const [page, setPage] = useState('Relatório');

    return(
        <div>
            <h2>{page}</h2>
            <div className="DivBox center hcenter">
                <div 
                    onClick={()=>setPage('Relatório')} 
                    className={page==='Relatório'?'selected':''}
                >
                    <Link to='estoque' className="margin button link">Estoque</Link>
                </div>
            </div>
            <Suspense fallback={<h1>Carregando...</h1>} >
                <Outlet />
            </Suspense>
        </div>
    )
}

export default Report;
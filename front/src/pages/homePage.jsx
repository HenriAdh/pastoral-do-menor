import React, { Suspense, useCallback, useEffect, useState } from "react";
import css from './css/homePage.module.css';
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import { getUid, logOutUser, verifyAdmin } from "../hooks/firebase";

const HomePage = () => {
    const [page, setPage] = useState('report');
    const [admin, setAdmin] = useState(false);

    const checkAdm = useCallback(async () => {
        const uid = await getUid();
        if(!uid) return setAdmin(false);
        const result = await verifyAdmin(uid.uid);
        setAdmin(result);
    }, [verifyAdmin, getUid])

    useEffect(() => {
        checkAdm();
    }, [checkAdm])

    const logOut = () => {
        logOutUser();
    }

    return(
        <div className="center">
            <div className={css.homePage}>
                <div className="DivBox hcenter gap5" style={{ justifyContent: "space-between"}}>
                    <img src="../../Logo-Pastoral.png" alt="logo pastoral da menor" width="100px" height="100px"/>
                    <h1>Controle de estoque - Pastoral do Menor Sorocaba</h1>
                    <h2>{admin && <Link to={'/registrar'} className="link button" >⚙️</Link>}  </h2>
                </div>
                <div className="DivBox">
                    <Link to='novo-item' onClick={() => setPage('newItem')} className={page === 'newItem' ? 'margin button link selected' : 'margin button link'}>Novo item</Link>
                    <span> | </span>
                    <Link to='itens' onClick={() => setPage('itens')} className={page==='itens'?'margin button link selected':'margin button link'}>Itens</Link>
                    <span> | </span>
                    <Link to='novo-pedido' onClick={() => setPage('newRequest')} className={page === 'newRequest' ? 'margin button link selected' : 'margin button link'}>Novo pedido</Link>
                    <span> | </span>
                    <Link to='pedidos' onClick={() => setPage('request')} className={page === 'request' ? 'margin button link selected' : 'margin button link'}>Pedidos</Link>
                    <span> | </span>
                    <Link to='relatorios/estoque' onClick={() => setPage('report')} className={page === 'report' ? 'margin button link selected' : 'margin button link'}>Relatórios</Link>
                </div>
                <div className="DivBox">
                    <Suspense fallback={<h1>Carregando...</h1>} >
                        <Outlet />
                    </Suspense>
                </div>
                <div className="nomarginleft fullwidth center">
                    <footer onClick={()=>logOut()}><Link to={'/'} className="link">Desconectar</Link></footer>
                </div>
            </div>
        </div>
    )
}

export default HomePage;
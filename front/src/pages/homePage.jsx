import React, { Suspense } from "react";
import css from './css/homePage.module.css';
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import { logOutUser } from "../hooks/firebase";

const HomePage = () => {

    const logOut = () => {
        logOutUser();
    }

    return(
        <div className="center">
            <div className={css.homePage}>
                <div className="DivBox hcenter gap5">
                    {<img src="../../defaultUser.png" alt="admin" height={'20px'} />}
                    <span>Controle de estoque - Pastoral do Menor</span>
                </div>
                <div className="DivBox">
                    <Link to='novo-item' className="margin button link">Novo item</Link>
                    <span> | </span>
                    <Link to='itens' className="margin button link">Itens</Link>
                    <span> | </span>
                    <Link to='novo-pedido' className="margin button link">Novo pedido</Link>
                    <span> | </span>
                    <Link to='pedidos' className="margin button link">Pedidos</Link>
                    <span> | </span>
                    <Link to='relatorios/estoque' className="margin button link">Relatórios</Link>
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
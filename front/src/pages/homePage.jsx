import React, { Suspense } from "react";
import css from './css/homePage.module.css';
import { Outlet } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import { logOutUser } from "../hooks/firebase";

const HomePage = () => {
    const navigate = useNavigate();
    const checkAdmin = () => {
        return true;
    }
    
    const isAdmin = checkAdmin();
    const logOut = () => {
        logOutUser();
    }

    return(
        <div className="center">
            <div className={css.homePage}>
                <div className="DivBox hcenter gap5">
                    {isAdmin?<img src="../../defaultUser.png" alt="admin" height={'20px'} onClick={() => navigate('/hangarekamaori') } />:<></>}
                    <span>Controle de estoque - Pastoral do Menor</span>
                </div>
                <div className="DivBox">
                    <Link to='nova-entrada' className="margin button link">Nova Entrada</Link>
                    <span> | </span>
                    <Link to='relatorio/estoque' className="margin button link">Relatório</Link>
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
import React, { Suspense } from "react";
import css from './css/homePage.module.css';
import { Outlet } from "react-router";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();
    const checkAdmin = () => {
        return true;
    }
    
    const isAdmin = checkAdmin();
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
                    <Link to='nova-saida' className="margin button link">Nova saida</Link>
                    <span> | </span>
                    <Link to='relatorio/estoque' className="margin button link">relatorio</Link>
                </div>
                <div className="DivBox">
                    <Suspense fallback={<h1>Carregando...</h1>} >
                        <Outlet />
                    </Suspense>
                </div>
                <div className="nomarginleft fullwidth center">
                    <footer><Link to={'/'} className="link">voltar</Link></footer>
                </div>
            </div>
        </div>
    )
}

export default HomePage;
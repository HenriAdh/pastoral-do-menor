import React, { Suspense } from "react";
import './css/homePage.css';
import { Outlet } from "react-router";
import { Link } from "react-router-dom";

const HomePage = () => {
    return(
        <div className="center">
            <div className="DivHomePage">
                <div className="DivBox">
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
                <div className="nomarginleft extrabottom fullwidth center">
                    <footer><Link to={'/'} className="link">voltar</Link></footer>
                </div>
            </div>
        </div>
    )
}

export default HomePage;
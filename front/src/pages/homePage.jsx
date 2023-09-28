import React from "react";
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
                    <Link to='relatorio' className="margin button link">relatorio</Link>
                </div>
                <div className="DivBox">
                    <Outlet />
                </div>
                <div className="nomarginleft extrabottom fullwidth center">
                    <footer>nu ca vi boi na internet.<br/> <Link to={'/'}>voltar</Link></footer>
                </div>
            </div>
        </div>
    )
}

export default HomePage;
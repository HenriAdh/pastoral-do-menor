import React from "react";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";

const HomePage = () => {
    return(
        <div>
            <h1>Home</h1>
            <nav>
                <ul>
                    <li><Link to='nova-entrada'>Nova Entrada</Link></li>
                    <li><Link to='nova-saida'>Nova saida</Link></li>
                    <li><Link to='relatorio'>relatorio</Link></li>
                </ul>
            </nav>
            <Outlet />
            <footer>nu ca vi boi na internet. <Link to={'/'}>voltar</Link></footer>
        </div>
    )
}

export default HomePage;
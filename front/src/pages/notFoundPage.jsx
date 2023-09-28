import React from "react";
import { Link } from "react-router-dom";

const Error404 = () => {
    return(
        <div>
            <h1>Erro 404</h1>
            <p>Página não encontrada</p>
            <Link to={'/'} className="link">Voltar para página inicial.</Link>
        </div>
    )
}

export default Error404;
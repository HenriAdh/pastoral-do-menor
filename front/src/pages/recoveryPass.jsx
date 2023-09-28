import React from "react";
import { Link } from "react-router-dom";

const RecoveryPage = () => {
    return(
        <div>
            <h1>Recuperar senha</h1>
            <Link to={'/'} className="link" >Voltar</Link>
        </div>
    )
}

export default RecoveryPage;
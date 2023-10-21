import React, { useEffect, useState } from "react";
import css from './css/admin.module.css'
import { useNavigate, Link } from "react-router-dom";
import { callbackend } from "../hooks/fetch";
import { getUid } from "../hooks/firebase";

const Admin = () => {
    const [adm, setAdm] = useState(false);
    const navigate = useNavigate();
    
    const verifyAdmin = async () => { 
        let isAdmin;
        const result = await getUid();
        isAdmin = result ? await callbackend('login?search='+result, 'GET') : false;
        return isAdmin.adm
    };
    useEffect(() => {


        setAdm(verifyAdmin)
        adm ? console.log('') : navigate('/home/relatorio/estoque');
    }, [navigate, adm]);

    return (
        <div className="center">
            <div>
                <h1>Admin page</h1>
                <p>Qual opção deseja usar?</p>
                <div className={css.list}>
                    <ul>
                        <li className={css.li}><Link className="link">Ver log de alterações</Link></li>
                        {adm?<li className={css.li}><Link className="link" to={'/registrar'}>Novo usuário</Link></li>:<></>}
                        <li className={css.li}><Link className="link">Excluir usuário</Link></li>
                        <li className={css.li}><Link className="link">Excluir imagens</Link></li>
                    </ul>
                </div>
                <Link to={'/home/relatorio/estoque'} className="link">Voltar</Link>
            </div>
        </div>
    )
}

export default Admin;
import React, { useEffect } from "react";
import css from './css/admin.module.css'
import { useNavigate, Link } from "react-router-dom";

const Admin = () => {
    const navigate = useNavigate();
    
    const checkAdmin = () => {
        const isAdmin = true;
        if (isAdmin){
            return console.log('admin')
        } else {
            return navigate('/home/relatorio/estoque');
        }
    }
    
    useEffect(() => {
        checkAdmin();
    });

    return (
        <div className="center">
            <div>
                <h1>Admin page</h1>
                <p>Qual opção deseja usar?</p>
                <div className={css.list}>
                    <ul>
                        <li className={css.li}><Link className="link">Ver log de alterações</Link></li>
                        <li className={css.li}><Link className="link" to={'/registrar'}>Novo usuário</Link></li>
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
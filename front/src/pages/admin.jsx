import React, { useCallback, useEffect, useState } from "react";
import css from './css/admin.module.css'
import { useNavigate, Link } from "react-router-dom";
import { getUid, verifyAdmin } from "../hooks/firebase";

const Admin = () => {
    const [adm, setAdm] = useState(false);

    const navigate = useNavigate();

    const checkAuth = useCallback(async () => {
        const user = await getUid();
        if(!(user)) return navigate('/');
        setAdm(verifyAdmin(user.uid));
    }, [navigate])
    useEffect(() => {checkAuth()}, [checkAuth]);

    return (
        <div className="center">
            <div>
                <h1>Admin page</h1>
                <div className={css.list}>
                    <ul>
                        { adm ?
                            <li className={css.li}>
                                <Link className="link" to={'/registrar'}>Novo usuário</Link>
                            </li> : <></>
                        }
                    </ul>
                </div>
                <Link to={'/home/relatorio/estoque'} className="link">Voltar</Link>
            </div>
        </div>
    )
}

export default Admin;
import React, { useCallback, useEffect, useState } from "react";
//import css from './css/register.module.css'
import { Link, useNavigate } from "react-router-dom";
import Card from "../components/card";
import InputField from "../components/input-field";
import Button from "../components/button";
import CheckBox from "../components/checkbox";
import { getUid, signUp, verifyAdmin } from "../hooks/firebase"; 
import Loader from "../components/loader";

const Register =() =>{
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const checkAuth = useCallback(async () => {
        const user = await getUid();
        if(!(user)) return navigate('/');
        const adm = await verifyAdmin(user.uid);
        if(!adm) return navigate('/');
    }, [navigate]);
    useEffect(() => {checkAuth()}, [checkAuth]);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try{
            const result = await createUser(formData);
            alert(result);
            navigate('/');
        } catch(err){
            alert(err)
        } finally {
            setLoading(false);
        }
    }

    const createUser = async (arrayUser) => {
        try {
            const newSignUp = await signUp(
                arrayUser.edtEmail,
                arrayUser.edtPass,
                arrayUser.edtName,
                arrayUser.edtOrigin,
                arrayUser.chkAdm === 'on'
            );
            return newSignUp;
        } catch (err) {
            return err;
        }
    }

    return (
        <div className="DivRegis center">
            <Card 
                width="70vw"
                title={'Registrar novo usuário'}
                content={
                    <form action="" className="fullwidth" onSubmit={handleSubmit}>
                        <InputField id={'edtOrigin'} label={'Origem:'} onInput={(e) => handleChange(e)} />
                        <InputField id={'edtEmail'} label={'E-mail:'} onInput={(e) => handleChange(e)} />
                        <InputField id={'edtPass'} label={'Senha:'} type={'password'} onInput={(e) => handleChange(e)} />
                        <CheckBox id={'chkAdm'} label={' Administrador'} onChange={(e) => handleChange(e)} />
                        <div className="DivButtons marginbottom">
                            <Button id={'btnSignUp'} type="submit" text={'Confirmar'} />
                        </div>
                        <Link to={'/home/relatorios/estoque'} className="link margintop">Voltar</Link>
                    </form>
                }
            />
            {loading && <Loader />}
        </div>
    );

}
export default Register;
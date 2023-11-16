import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/input-field";
import Button from "../components/button";
import Card from "../components/card";
import { signIn } from "../hooks/firebase"; 
import Loader from "../components/loader";
import css from './css/login.module.css';

const LoginPage = () => {
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try{
            await loginUser(formData) ? navigate('/home/relatorios/estoque') : alert('E-mail ou senha inválidos');
            setLoading(false);
        } catch (err) {
            alert(err);
            setLoading(false);
        }
    }

    const loginUser = async (arrayUser) => {
        // Verifica se é o e-mail de teste
        const userteste = arrayUser['edtEmail'] === 'emailteste@email.com' && arrayUser['edtPass'] === 'senhaTeste123';
        if (userteste) return true
        // verifica se é um e-mail de verdade
        const user = await signIn(arrayUser.edtEmail, arrayUser.edtPass);
        if (user.length!==0) return true
        // se não for nenhum retorna false
        return false
    }

    return (
        <div className="DivPrinc center">
            <Card 
                width="70vw"
                title={'Login'}
                content={
                    <form action={""} onSubmit={handleSubmit} className="fullwidth" >
                        <InputField
                            id={'edtEmail'} 
                            label={'E-mail:'} 
                            onInput={(e) => handleChange(e)}
                        />
                        <InputField 
                            id={'edtPass'} 
                            label={'Senha:'} 
                            type={'password'} 
                            onInput={(e) => handleChange(e)}
                        />
                        <div className="DivButtons marginbottom">
                            <Button id={'btnSignIn'} type="submit" text={'Entrar'} />
                        </div>
                            <Link to={'./restaurar-senha'} className="link margintop">Esqueci minha senha?</Link>
                    </form>
                }
            />
            {loading && <Loader />}
        </div>
    )
}

export default LoginPage;
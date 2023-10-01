import React, { useState } from "react";
//import css from './css/login.module.css';
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/input-field";
import Button from "../components/button";
import Card from "../components/card";

const LoginPage = () => {
    const [formData, setFormData] = useState({});

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const result = await loginUser(formData)
            result ? alert('Usuário logado com sucesso!') : alert('E-mail ou senha inválidos.');
            if (result) navigate('/home/relatorio/estoque');
        } catch (err){
            alert(err);
        }
    }

    const loginUser = async (arrayUser) => {
        // chamar o back;
        const isCorrect = arrayUser['edtEmail'] === 'emailteste@email.com' && arrayUser['edtPass'] === 'senhaTeste123';
        return isCorrect;
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
                            <br/><br/><br/>
                            <p><u>E-mail e senhas temporarias: </u></p>
                            <>E-mail: emailteste@email.com</><br />
                            <>Senha: senhaTeste123</>
                    </form>
                }
            />
        </div>
    )
}

export default LoginPage;
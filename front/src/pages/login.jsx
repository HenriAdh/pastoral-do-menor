import React, { useState } from "react";
import './css/login.css';
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
    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Usuário logado com sucesso!');
        navigate('/home/relatorio');
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
                            <Button onClick={()=>navigate('/registrar')} id={'btnSignUp'} type="button" text={'Registrar'} />
                        </div>
                            <Link to={'./restaurar-senha'} className="link margintop">Esqueci minha senha?</Link>
                    </form>
                }
            />
        </div>
    )
}

export default LoginPage;
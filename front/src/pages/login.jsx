import React from "react";
import './css/login.css';
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/input-field";
import Button from "../components/button";
import Card from "../components/card";

const LoginPage = () => {
    const navigate = useNavigate();

    return (
        <div className="DivPrinc">
            <Card 
                width="70vw"
                title={'Login'}
                content={
                    <form action="">
                        <InputField id={'edtEmail'} label={'E-mail:'} />
                        <InputField id={'edtPass'} label={'Senha:'} type={'password'} />
                        <Button id={'btnSignIn'} type="submit" text={'Entrar'} onClick={()=>navigate('/home/relatorio')}/>
                        <Button onClick={()=>navigate('/registrar')} id={'btnSignUp'} type="button" text={'Registrar'} />
                        <Link to={'./restaurar-senha'}>Esqueci minha senha?</Link>
                    </form>
                }
            />
        </div>
    )
}

export default LoginPage;
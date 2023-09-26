import React from "react";
import './css/login.css';
import InputField from "../components/input-field";
import Button from "../components/button";
import Link from "../components/link";
import Card from "../components/card";

const LoginPage = () => {
    return (
        <div className="DivPrinc">
            <Card 
                width="70vw"
                title={'Login'}
                content={
                    <form action="">
                        <InputField id={'edtEmail'} label={'E-mail:'} />
                        <InputField id={'edtPass'} label={'Senha:'} type={'password'} />
                        <Button id={'btnSignIn'} type="submit" text={'Entrar'} />
                        <Button id={'btnSignUp'} type="button" text={'Registrar'} />
                        <Link text={'Esqueci minha senha?'} link={"www.youtube.com"} />
                    </form>
                }
            />
        </div>
    )
}

export default LoginPage;
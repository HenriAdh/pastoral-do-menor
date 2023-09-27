import React from "react";
import Card from "../components/card";
import InputField from "../components/input-field";
import Button from "../components/button";
import Link from "../components/link";

const Register =() =>{
    return (
        <div className="DivRegis">
            <Card 
                width="70vw"
                title={'Register'}
                content={
                    <form action="">
                        <InputField id={'edName'} label={'Nome:'} />
                        <InputField id={'edUserName'} label={'Nome de Usuario:'} />
                        <InputField id={'edtEmail'} label={'E-mail:'} />
                        <InputField id={'edtPass'} label={'Senha:'} type={'password'} />
                        <InputField id={'edtConfirmPass'} label={'Confirmar senha:'} type={'password'} />
                        <Button id={'btnSignUp'} type="button" text={'Confirmar'} />
                        <Link text={'Voltar'} link={""} />
                    </form>
                }
            />
        </div>
    );

}
export default Register;
import React, { useState } from "react";
//import css from './css/register.module.css'
import { Link, useNavigate } from "react-router-dom";
import Card from "../components/card";
import InputField from "../components/input-field";
import Button from "../components/button";
import CheckBox from "../components/checkbox";
import { callbackend } from "../hooks/fetch";
import { signUp } from "../hooks/firebase"; 

const Register =() =>{
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const result = await createUser(formData);
            alert(result);
            navigate('/');
        }
        catch(err){
            alert(err)
        }
    }

    const createUser = async (arrayUser) => {
        const url = '/register';
        const method = 'POST';
        let obj = {
            name: arrayUser.edtName,
            username: arrayUser.edtUserName,
            email: arrayUser.edtEmail,
            adm: arrayUser.chkAdm === 'on',
        }
        try {
            const newSignUp = await signUp(arrayUser.edtEmail, arrayUser.edtPass);
            if (newSignUp) {
                obj = {...obj, uid : newSignUp.user.uid}
                const result = await callbackend(url, method, obj);
                return result.text();
            }
        } catch (err) {
            return err;
        }
    }

    return (
        <div className="DivRegis center">
            <Card 
                width="70vw"
                title={'Registrar'}
                content={
                    <form action="" className="fullwidth" onSubmit={handleSubmit}>
                        <InputField id={'edtName'} label={'Nome:'} onInput={(e) => handleChange(e)} />
                        <InputField id={'edtUserName'} label={'Nome de Usuario:'} onInput={(e) => handleChange(e)} />
                        <InputField id={'edtEmail'} label={'E-mail:'} onInput={(e) => handleChange(e)} />
                        <InputField id={'edtPass'} label={'Senha:'} type={'password'} onInput={(e) => handleChange(e)} />
                        <CheckBox id={'chkAdm'} label={' Administrador'} onChange={(e) => handleChange(e)} />
                        <div className="DivButtons marginbottom">
                            <Button id={'btnSignUp'} type="submit" text={'Confirmar'} />
                        </div>
                        <Link to={'/hangarekamaori'} className="link margintop">Voltar</Link>
                    </form>
                }
            />
        </div>
    );

}
export default Register;
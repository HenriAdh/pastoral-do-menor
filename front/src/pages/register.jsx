import React, { useState } from "react";
//import css from './css/register.module.css'
import { Link, useNavigate } from "react-router-dom";
import Card from "../components/card";
import InputField from "../components/input-field";
import Button from "../components/button";

const Register =() =>{
    const [formData, setFormData] = useState(
        {
            edtName: '', 
            edtUserName: '', 
            edtEmail: '', 
            edtPass: '', 
        }
    );

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
        // const result = await fetch('http://localhost:3333/register/', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json', 'Allow': 'POST, HEAD, OPTIONS'},
        //     body: JSON.stringify({ 
        //         name: arrayUser.edName,
        //         username: arrayUser.edtUserName,
        //         email: arrayUser.edtEmail,
        //         pass: arrayUser.edtPass,
        //         adm: true, })
        //     }
        // )
        // return result.text();
         return 'Usuario criado com sucesso'
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
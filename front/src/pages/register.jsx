import React, { useState } from "react";
//import css from './css/register.module.css'
import { Link, useNavigate } from "react-router-dom";
import Card from "../components/card";
import InputField from "../components/input-field";
import Button from "../components/button";

const Register =() =>{
    const [formData, setFormData] = useState(
        {
            edName: '', 
            edUserName: '', 
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

    const createUser = (arrayUser) => {
        // Colocar a chamada ao back
        return 'Usuário criado com sucesso!';
    }

    return (
        <div className="DivRegis center">
            <Card 
                width="70vw"
                title={'Registrar'}
                content={
                    <form action="" className="fullwidth" onSubmit={handleSubmit}>
                        <InputField id={'edName'} label={'Nome:'} onInput={(e) => handleChange(e)} />
                        <InputField id={'edUserName'} label={'Nome de Usuario:'} onInput={(e) => handleChange(e)} />
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
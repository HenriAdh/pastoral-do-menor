import React, { useState } from "react";
import Card from "../components/card";
import InputField from "../components/input-field";
import Button from "../components/button";
import { Link, useNavigate } from "react-router-dom";

const Register =() =>{
    const [formData, setFormData] = useState(
        {
            edName: '', 
            edUserName: '', 
            edtEmail: '', 
            edtPass: '', 
            edtConfirmPass: '', 
        }
    );

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.edtPass === formData.edtConfirmPass && formData.edtPass.length >= 8) {
            try{
                const result = await createUser(formData);
                alert(result);
                navigate('/');

            }
            catch(err){
                alert(err)
            }
        } else {
            alert('Erro no campo senha.');
        }
    }

    const createUser = (arrayUser) => {
        // Colocar a chamada ao back
        console.log(arrayUser);
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
                        <InputField id={'edtConfirmPass'} label={'Confirmar senha:'} type={'password'} onInput={(e) => handleChange(e)} />
                        <div className="DivButtons marginbottom">
                            <Button id={'btnSignUp'} type="submit" text={'Confirmar'} />
                        </div>
                        <Link to={'/'} className="link margintop">Voltar</Link>
                    </form>
                }
            />
        </div>
    );

}
export default Register;
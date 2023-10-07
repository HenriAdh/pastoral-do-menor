import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/input-field";
import Button from "../components/button";
import Card from "../components/card";
import { callbackend } from "../hooks/fetch";
import { signIn } from "../hooks/firebase"; 

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
            result.length!==0 ? alert('Usuário logado com sucesso!') : alert('E-mail ou senha inválidos.');
            if (result.length!==0) navigate('/home/relatorio/estoque');
        } catch (err){
            alert(err);
        }
    }

    const loginUser = async (arrayUser) => {
        const user = await signIn(arrayUser.edtEmail, arrayUser.edtPass);

        console.log(user.user.uid);

        const userteste = arrayUser['edtEmail'] === 'emailteste@email.com' && arrayUser['edtPass'] === 'senhaTeste123';
        const isCorrect = user.length!==0 ? true : userteste;
        
        let userBack;
        
        if (isCorrect) {
    
            if (user.length!==0) {
                const url = '/login?search=' + user.user.uid;
                const method = 'GET';
                const result = await callbackend(url, method);
                userBack = await result.json()
            } else {
                userBack = {
                    uid: "1",
                    name: "Usuario de teste",
                    username: "user.test",
                    email: "user.test@email.com",
                    adm: false
                }
            }
        }

        return userBack;
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
import React, { useState } from "react";
import { Link } from "react-router-dom";
import InputField from "../components/input-field";
import Card from "../components/card";
import Button from "../components/button";

const RecoveryPage = () => {
    const [formData, setFormData] = useState({edtEmail:''});

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
       e.preventDefault();
       try{
        const result = await sendEmail(formData);
        alert (result);
       } catch (err) {
        alert(err);
       }
    }

    const sendEmail = async (arrayEmail) => {
        // chama o back
        return 'E-mail enviado.';
    }

    return(
        <div className="center">
            <Card
                width="70vw"
                title={'Recuperar senha'}
                content={
                    <form action="" className="fullwidth" onSubmit={handleSubmit}>
                        <InputField
                            id={'edtEmail'} 
                            label={'E-mail:'} 
                            onInput={(e) => handleChange(e)}
                        />
                        <div className="DivButtons marginbottom">
                            <Button id={'btnEnv'} type="submit" text={'Enviar'} />
                        </div>
                        <Link to={'/'} className="link margintop" >Voltar</Link>
                    </form>
                }
            />
        </div>
    )
}

export default RecoveryPage;
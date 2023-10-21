import React, { useState } from "react";
import css from './css/newEntry.module.css';
import InputField from "../../components/input-field";
import Button from '../../components/button';
import { callbackend } from "../../hooks/fetch";

const NewEntry = () => {
    const [entry, setEntry] = useState({})

    const handleChange = (e) => {
        setEntry({
            ...entry,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const obj = {
            category    : entry['edtCategory'],
            material    : entry['edtMaterial'],
            uni         : entry['edtUnits'],
            amount      : entry['edtAmount'],
            description : entry['edtDescription'],
            location    : entry['edtLocation'],
        };
        const url = '/newItem';
        const method = 'POST';
        const result = await callbackend(url, method, obj);
        const text = await result.text();
        
        alert(text);
    }

    return(
        <div>
            <h1>Nova entrada</h1>
            <form action={""} className={css.form} onSubmit={handleSubmit}>
                <div className={css.inputs}>               
                    <InputField
                        id={'edtCategory'}
                        label={'Categoria'}
                        onInput={(e) => handleChange(e)}
                        required={true}
                    />
                    <InputField
                        id={'edtMaterial'}
                        label={'Material'}
                        onInput={(e) => handleChange(e)}
                        required={true}
                    />
                    <InputField
                        id={'edtDescription'}
                        label={'Descrição'}
                        onInput={(e) => handleChange(e)}
                        required={true}
                    />
                    <InputField
                        id={'edtUnits'}
                        label={'Unidade'}
                        onInput={(e) => handleChange(e)}
                        required={true}
                    />              
                    <InputField
                        id={'edtAmount'}
                        label={'Quantidade'}
                        onInput={(e) => handleChange(e)}
                        required={true}
                    />
                    <InputField
                        id={'edtLocation'}
                        label={'Origem'}
                        onInput={(e) => handleChange(e)}
                        required={true}
                    />
                </div>
                <Button
                    id={'btnSend'}
                    type={"submit"}
                    text={'Enviar'}
                />
            </form>
        </div>
    )
}

export default NewEntry;
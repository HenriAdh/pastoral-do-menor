import React, { useCallback, useEffect, useState } from "react";
import css from './css/newEntry.module.css';
import InputField from "../../components/input-field";
import Button from '../../components/button';
import { getUid, insertStock } from "../../hooks/firebase"; 
import Loader from "../../components/loader";
import { useNavigate } from "react-router-dom";

const NewEntry = () => {
    const [entry, setEntry] = useState({});
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const checkAuth = useCallback(async () => {
        const user = await getUid();
        if(!(user)) return navigate('/');
    }, [navigate])
    useEffect(() => {checkAuth()}, [checkAuth]);

    const handleChange = (e) => {
        setEntry({
            ...entry,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const obj = {
            category    : entry['edtCategory'],
            material    : entry['edtMaterial'],
            uni         : entry['edtUnits'],
            amount      : entry['edtAmount'],
            description : entry['edtDescription'],
            location    : entry['edtLocation'],
        };
        reset();
        try {
            const result = await insertStock(obj);
            alert(result);
            setLoading(false);
        } catch (e) {
            console.log(e)
            setLoading(false);
        };
    }

    const reset = () => {
        document.getElementById('edtCategory').value = '';
        document.getElementById('edtMaterial').value = '';
        document.getElementById('edtUnits').value = '';
        document.getElementById('edtAmount').value = '';
        document.getElementById('edtDescription').value = '';
        document.getElementById('edtLocation').value = '';
    }

    return(
        <div>
            <h2>Nova entrada</h2>
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
                        label={'Nome'}
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
                        label={'Localização'}
                        onInput={(e) => handleChange(e)}
                        required={true}
                    />
                </div>
                <Button
                    id={'btnSend'}
                    type={"submit"}
                    text={'Enviar'}
                />
                {loading && <Loader />}
            </form>
        </div>
    )
}

export default NewEntry;
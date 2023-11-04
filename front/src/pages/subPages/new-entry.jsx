import React, { useCallback, useEffect, useState } from "react";
import css from './css/newEntry.module.css';
import InputField from "../../components/input-field";
import Button from '../../components/button';
import { getUid, insertStock, verifyAdmin } from "../../hooks/firebase"; 
import Loader from "../../components/loader";
import { useNavigate } from "react-router-dom";
import Select from "../../components/select";

const NewEntry = () => {
    const [entry, setEntry] = useState({});
    const [loading, setLoading] = useState(false);
    const [userAdmin, setUserAdmin] = useState(false);

    const navigate = useNavigate();

    const checkAuth = useCallback(async () => {
        const user = await getUid();
        if(!(user)) return navigate('/');
        const isAdmin = await verifyAdmin(user.uid);
        setUserAdmin(isAdmin);
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
            {userAdmin === true ? <form action={""} className={css.form} onSubmit={handleSubmit}>
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
                        id={'edtLocation'}
                        label={'Localização'}
                        onInput={(e) => handleChange(e)}
                        required={true}
                    />
                    <InputField
                        id={'edtAmount'}
                        label={'Quantidade'}
                        type="number"
                        onInput={(e) => handleChange(e)}
                        required={true}
                    />
                    <Select  
                        id={'edtUnits'}
                        preselect={'Unidade'}
                        options={[
                            {value: 'un', desc: 'un'},
                            {value: 'pc', desc: 'pc'},
                            {value: 'cx', desc: 'cx'},
                            {value: 'kg', desc: 'kg'},
                            {value: 'g ', desc: 'g '},
                            {value: 'fd', desc: 'fd'},
                            {value: 'pct', desc: 'pct'},
                        ]}
                        onChange={(e) => handleChange(e)}
                        required={true}
                    /> 
                </div>
                <Button
                    id={'btnSend'}
                    type={"submit"}
                    text={'Enviar'}
                />
                <div className="marginbottom" />
                {loading && <Loader />}
            </form> : <p>Usuánio não tem permissão para adicionar itens no estoque.</p>}
        </div>
    )
}

export default NewEntry;
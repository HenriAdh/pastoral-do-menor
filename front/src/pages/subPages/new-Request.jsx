import React, { useCallback, useEffect, useState } from "react";
import InputField from "../../components/input-field";
import Button from "../../components/button";
import Loader from "../../components/loader";
import Select from "../../components/select";
import { selectAllStock } from "../../hooks/firebase";
import css from './css/newEntry.module.css';

const NewRequest = () => {
    const [dataSelect, setDataSelect] = useState([]);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);

    const fetchData = useCallback(async () => {
        const data = await selectAllStock();

        const newObj = data.foreach(item => ({value: item.id, opt: item.material}))
        console.log(newObj);

        setDataSelect([
            {
                value: '0',
                opt: 'Caderno',
            },
            {
                value: '1',
                opt: 'Arroz',
            },
            {
                value: '2',
                opt: 'Livro',
            },
        ])
    }, [])
    useEffect(()=>{fetchData()}, [fetchData]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = () => {
        setLoading(true);

    }

    return(
        <div>
            <h2>Nova requisição</h2>
            <form action={""} className={css.form} onSubmit={handleSubmit}>
                <div className={css.inputs}>
                    <Select
                        id={'cbxItem'}
                        preselect={'Item'}
                        onChange={(e) => handleChange(e)}
                        required={true}
                        options={dataSelect}
                    />
                    <InputField
                        id={'edtMotivo'}
                        label={'Categoria'}
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

export default NewRequest;
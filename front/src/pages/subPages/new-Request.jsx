import React, { useCallback, useEffect, useState } from "react";
import InputField from "../../components/input-field";
import Button from "../../components/button";
import Loader from "../../components/loader";
import Select from "../../components/select";
import { insertRequisicao, selectAllStock } from "../../hooks/firebase";
import css from './css/newEntry.module.css';

const NewRequest = () => {
    const [dataSelect, setDataSelect] = useState([]);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);

    const fetchData = useCallback(async () => {
        const dbData = await selectAllStock();
        const itens = dbData.docs.map((doc) =>({ ...doc.data(), id: doc.id }))
        const prevData = itens.map((item) => {
            return {
                desc: item.material,
                value: item.id,
            }
        });

        setDataSelect(prevData);
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
        insertRequisicao()
    }

    return(
        <div>
            <h2>Nova requisição</h2>
            {}
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
                        id={'edtQtd'}
                        label={'Quantidade'}
                        onInput={(e) => handleChange(e)}
                        required={true}
                    />
                    {}
                    <InputField
                        id={'edtMotivo'}
                        label={'Motivo'}
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
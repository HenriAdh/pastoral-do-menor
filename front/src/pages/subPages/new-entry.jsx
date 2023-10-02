import React, { useState } from "react";
import InputField from "../../components/input-field";
import Select from "../../components/select";

const NewEntry = () => {
    const [entry, setEntry] = useState({})

    const handleChange = (e) => {
        setEntry({
            ...entry,
            [e.target.name]: e.target.value
        })
    }

    const materials = [
        {
            value: 0,
            desc: 'Arroz'
        },
        {
            value: 1,
            desc: 'Feijão'
        },
        {
            value: 2,
            desc: 'Salsicha'
        },
        {
            value: 3,
            desc: 'Papel toalha'
        },
        {
            value: 4,
            desc: 'Copo descartável'
        },
    ]

    const categories = [
        {
            value: 0,
            desc: 'Alimento'
        },
        {
            value: 1,
            desc: 'Produto de limpeza'
        },
        {
            value: 2,
            desc: 'Produto de higiene'
        },
        {
            value: 3,
            desc: 'Material de cozinha'
        },
    ]

    const units = [
        {
            value: 0,
            desc: 'Unidade'
        },
        {
            value: 1,
            desc: 'Pacote'
        },
        {
            value: 2,
            desc: 'Quilo'
        },
        {
            value: 3,
            desc: 'Metro'
        },
        {
            value: 4,
            desc: 'Litros'
        },
    ]

    return(
        <div>
            <h1>Nova entrada</h1>
            <form>
                <InputField
                    id={'edtOrigin'}
                    label={'Origem'}
                    onInput={(e) => handleChange(e)}
                    required={true}
                />
                <Select
                    id={'cbxMaterial'}
                    preselect={'Material'}
                    options={materials}
                />
                <Select
                    id={'cbxCategory'}
                    preselect={'Categoria'}
                    options={categories}
                />
                <InputField
                    id={'edtAmount'}
                    label={'Quantidade'}
                    onInput={(e) => handleChange(e)}
                    required={true}
                />
                <Select
                    id={'cbxUnits'}
                    preselect={'Unidade'}
                    options={units}
                />
            </form>
        </div>
    )
}

export default NewEntry;
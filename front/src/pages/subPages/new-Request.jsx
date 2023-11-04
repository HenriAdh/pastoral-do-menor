import React, { useCallback, useEffect, useState } from "react";
import InputField from "../../components/input-field";
import Button from "../../components/button";
import Loader from "../../components/loader";
import Select from "../../components/select";
import { insertRequisicao, selectAllStock } from "../../hooks/firebase";
import css from './css/newEntry.module.css';

const Inputs = ({qtd, onchange, options}) => {
    const elements = [];
    for (let index = 0; index < qtd; index++) {
        elements.push(<div key={index}>
            <Select
                id={'cbxItem'+index}
                preselect={'Item'}
                onChange={(e) => onchange(e)}
                required={true}
                options={options}
            />
            <InputField
                id={'edtQtd'+index}
                type={"number"}
                label={'Quantidade'}
                onInput={(e)=>onchange(e)}
                required={true}
                min={1}
            />
            <hr />
        </div>)
    }
    return (
        elements.map((item) => item)
    )
}

const NewRequest = () => {
    const [dataSelect, setDataSelect] = useState([]);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [amountItens, setAmountItens] = useState(1);

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

    const handleSubmit = async () => {
        setLoading(true);
        const itens = [];
        for (let index = 0; index < amountItens; index++) {
            itens.push({
                idItem: formData[`cbxItem${index}`],
                qtd: formData[`edtQtd${index}`]
            })            
        }
        const newObj = {
            motivo: formData.edtMotivo,
            itens: itens,
        }
        const result = await insertRequisicao(newObj);
        alert(result);
        setLoading(false);
    }

    return(
        <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h2>Nova requisição</h2>
            {page === 0 ? 
                <div style={{
                    width: '90%', 
                    display:'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                }}>
                    <InputField
                        id={'edtQtdOfItens'}
                        label={'Quantos itens serão solicitados?'}
                        type={"number"}
                        onInput={(e)=>setAmountItens(+e.target.value)}
                        required={false}
                        value={amountItens}
                        min={1}
                        max={10}
                    />
                    <Button 
                        id={'btnChangePage'} 
                        type={'button'} 
                        text={'Confirmar'} 
                        onClick={()=>setPage(1)} 
                    />
                </div> 
                :
                <form className={css.form}>
                    <div className={css.inputs}>
                        {
                            <Inputs 
                                qtd={amountItens} 
                                options={dataSelect} 
                                onchange={(e) => handleChange(e)} 
                            />
                        }
                        <InputField
                            id={'edtMotivo'}
                            label={'Motivo'}
                            onInput={(e) => handleChange(e)}
                            required={true}
                        />
                    </div>
                    <Button
                        id={'btnSend'}
                        type={"button"}
                        text={'Enviar'}
                        onClick={()=>handleSubmit()}
                    />
                    <Button 
                        id={'btnBack'}
                        type={'button'}
                        text={'Voltar'}
                        onClick={() => setPage(0)}
                    />
                    {loading && <Loader />}
                </form>
            }
        </div>
    )
}

export default NewRequest;
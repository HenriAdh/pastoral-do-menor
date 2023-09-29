import React from "react";


export const TableHeader = ({ dataHeader }) => {
    return (
        <thead>
            <tr>
                {
                    dataHeader.map(colunm => {
                        const item = colunm === 'DESCRICAO'? 
                            <th key={colunm} className="DivBox fullwidth">{colunm}</th> 
                        :   
                            <th key={colunm} className="DivBox autowidth">{colunm}</th>
                        return item
                    })
                }
            </tr>
        </thead>
    )
}

export const TableBody = ({ dataBody }) => {
    return (
        <tbody>
            {
                dataBody.map(row => {
                    const keys = Object.keys(row);
                    return (
                        <tr key={row['ID']}>
                            {
                                keys.map(key => {
                                    return <td key={key}>{row[key]}</td>
                                })
                            }
                        </tr>
                    )
                })
            }
        </tbody>
    )
}

const Table = ({ dataTable }) => {
    const dataHeader = Object.keys(dataTable[0])
    return (
        <div>
            <table>
                <TableHeader dataHeader={dataHeader}/>
                <TableBody dataBody={dataTable}/>
            </table>
        </div>
    )
}

export default Table;
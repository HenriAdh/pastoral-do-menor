import React from "react";


export const TableHeader = ({ dataHeader, focus }) => {
    return (
        <thead>
            <tr>
                {
                    dataHeader.map(colunm => {
                        const item = colunm === focus? 
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
                dataBody.map((row, i) => {
                    const keys = Object.keys(row);
                    return (
                        <tr key={i}>
                            {
                                keys.map(key => {
                                    return <td key={key} style={{
                                        borderBottom: '1px solid black',
                                        padding: '8px 1px'
                                    }} >{row[key]}</td>
                                })
                            }
                        </tr>
                    )
                })
            }
        </tbody>
    )
}

const Table = ({ dataTable, focus='' }) => {
    const dataHeader = Object.keys(dataTable[0])
    return (
        <div>
            <table>
                <TableHeader dataHeader={dataHeader} focus={focus} />
                <TableBody dataBody={dataTable} />
            </table>
        </div>
    )
}

export default Table;
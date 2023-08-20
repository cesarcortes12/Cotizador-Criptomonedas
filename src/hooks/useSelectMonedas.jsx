//NOTA un hook se crea con minuscula

import styled from '@emotion/styled'
import React from 'react'
import { useState } from 'react'

const Label = styled.label`
    color: #fff;
    display:block;
    font-family:'Lato', sans-serif;
    font-size: 24px;
    font-weight: 700;
    margin: 15px 0;
    
`
const Select =styled.select`
    width:100%;
    font-size:18px;
    padding: 14px;
    border-radius: 10px;
    
`

const useSelectMonedas = (label,opciones) => {

    const [state,setState]= useState('') //state del select  #1 en components

    const SelectMonedas=()=>( //RECORDAR cuando no ponemos llaves sino parentesis el return es implicito
        <>
            <Label>{label}</Label> 
            <Select
                value={state}
                onChange={(e)=> setState(e.target.value)}
            >
                <option value="">Seleccione</option>

                {opciones.map((opcion)=>(
                    <option
                        key={opcion.id}
                        value={opcion.id}
                    >
                        {opcion.nombre}
                    </option>
                ))}
            </Select>
        </>
    )
    return [state, SelectMonedas] //se extrae la funcion en un objeto o una funcion
                                  //hacemos que el state sea parte del return para utilizarlo en el formulario
}

export default useSelectMonedas
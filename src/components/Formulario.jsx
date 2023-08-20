
import { useEffect, useState } from 'react';
import styled from '@emotion/styled'
import Error from './Error';
import useSelectMonedas from '../hooks/useSelectMonedas'
import { monedas } from "../data/monedas";

const InputSubmit = styled.input`
   background-color: #9497ff;
   border:none;
   width: 100%;
   padding: 10px;
   color: #fff;
   font-weight: 700;
   text-transform: uppercase;
   font-size:20px;
   border-radius: 5px;
   margin-top:30px;
   transition:background-color .3s ease;

   &:hover{
    background-color: #7a7dfe;
    cursor: pointer; //manito
   }
   

`

const Formulario = ({setMonedas}) => {


  const [criptos, setCriptos] = useState([]) //state para el arreglo que viene de la API #1
  const [error, setError] = useState(false) //state error #2

  //el parametro monedas viene desde el archivo data no se pone aqui para tener un codigo mas limpio
  const [moneda, SelectMonedas] = useSelectMonedas('Elije tu Moneda', monedas) //llamamos el hook que creamos
  //moneda es el state de useSelectMonedas recordar que se puede llamar diferente por que es un arreglo y retorna 
  //es por el indice no por el nombre si fuera un objeto si tendria que llamarse igual

  const [criptomoneda, SelectCriptomonedas] = useSelectMonedas('Elije tu Criptomoneda', criptos)

  useEffect(() => { //efecct para consultar una API
    const consultarAPI = async () => {
      const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD"
      const respuesta = await fetch(url) //bloqueamos hasta que url este lista
      const resultado = await respuesta.json() //bloqueamos hasta que nos retorne un json

      const arrayCriptos = resultado.Data.map(cripto => {
        //adentro de arrgle construimos un objeto que va a contener las propiedades que necesitamos

        const objeto = {
          id: cripto.CoinInfo.Name,
          nombre: cripto.CoinInfo.FullName
        }
        return objeto //retornamos y llenamos el array con cada iteracion

      })
      setCriptos(arrayCriptos) //llenamo el state que creamos 
    }

    consultarAPI();
  }, []) //al no pasar dependencias solo se ejecuta una vez cuando el documento este listo


  const handleSubmit = (e) => {
    e.preventDefault()
    if ([moneda, criptomoneda].includes('')) {
      setError(true)
      return
    }
    setError(false)
    setMonedas({ //creamos el objeto con los dos valores para pasarlo al app
      moneda,  
      criptomoneda
    })
  }

  return (
    <>
      {error && <Error>Todos los campos son obligatorios</Error>}
      <form
        on onSubmit={handleSubmit}
      >

        <SelectMonedas />
        <SelectCriptomonedas />

        <InputSubmit
          type="submit"
          value="cotizar"
        />
      </form>
    </>
  )
}

export default Formulario
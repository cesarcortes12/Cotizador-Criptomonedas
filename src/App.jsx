import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import Formulario from './components/Formulario'
import Resultado from './components/Resultado'
import Spinner from './components/Spinner'
import ImagenCripto from './img/imagen-criptos.png'

//declaramos los styled fuera del componente
//nota: la sintaxis crea la etiqueta por eso se invoca como si fuera un componente

const Contenedor = styled.div`
  max-width:900px;
  margin: 0 auto;
  width: 90%;
  //creamos media query
  @media (min-width: 992px){
    display: grid;
    grid-template-columns: repeat(2,1fr);
    column-gap: 2rem;
  }
`

const Imagen = styled.img`
  max-width: 400 px;
  width:80%;
  margin: 100px auto 0 auto;
  display: block;
`

const Heading = styled.h1`
  font-family: 'lato' sans-serif;
  color: #FFF;
  text-align: center;
  font-weight: 700;
  margin-top:80px;
  margin-bottom: 50 px;
  font-size: 34px;

  //linea abajo del rirulo con un pseudo-elemento
  &::after{
    content:'';
    width: 300px;
    height: 6px;
    background-color: #66a2fe;
    display:block;
    margin: 10px auto 0 auto;
  }
`



function App() {
  const [monedas, setMonedas] = useState({})
  const [resultado, setResultado] = useState({})
  const [cargando, setCargando] = useState(false) //NOTA ESPINER IDEAL PARA CUALQUIER PROYECTO pagina spinkit

  useEffect(() => {
    if (Object.keys(monedas).length > 0) {

      
      const cotizarCripto = async () => {
        setCargando(true)
        const { moneda, criptomoneda } = monedas
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()
        //NOTA esta siguiente sintaxis no es muy comun pero muy util
        setResultado(resultado.DISPLAY[criptomoneda][moneda])
        setCargando(false)
      }

      cotizarCripto()
    }
  }, [monedas])

  return (
    <Contenedor>
      <Imagen     //al ser un componente de img se le pueden pasar las propiedades
        src={ImagenCripto}
        alt="Imagenes criptomonedas"
      >
      </Imagen>
      <div>
        <Heading>Cotiza Criptomonedas al Instante </Heading>
        <Formulario
          setMonedas={setMonedas}
        />

        {cargando && <Spinner/>}
        {resultado.PRICE && <Resultado
          resultado={resultado}
        />}
      </div>



    </Contenedor>
  )
}

export default App

import React, { Component } from 'react'
import './nivelation.scss'

class Nivelation extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            age: '',
            hasInvested: false,
            willInvest: false,
            importantAspects: [],
            identifiedWith: '',
            realInvestK: '',
            investK: '',
            objetcive: '',
            savings: '',
        }

    }

  sendAnswers(){
    
  }

  render() {
    return (
      <section className='nivelation-section'>
        <div className='nivelation-section-questions'>
            <div className='nivelation-section-questions-left'>
                <div className='nivelation-section-questions-left-q question-box' >
                    <h3 className='question-box-title'>Selecciona tu rango de edad</h3>
                    <div className='question-box-div'>
                        <div className='question-box-div-div'><input className='question-box-input' name='age' value='1' type="radio"/><p className='question-box-p'>20-30 años</p></div>
                        <div className='question-box-div-div'><input className='question-box-input' name='age' value='2' type="radio"/><p className='question-box-p'>30-50 años</p></div>
                        <div className='question-box-div-div'><input className='question-box-input' name='age' value='3' type="radio"/><p className='question-box-p'>Más de 50 años</p></div>
                    </div>
                </div>
                <div className='nivelation-section-questions-left-q question-box' >
                    <h3 className='question-box-title'>¿Has invertido en el mercado de bienes raíces anteriormente?</h3>
                    <div className='question-box-div'>
                        <div className='question-box-div-div'><input className='question-box-input' name='invested' value='1' type="radio"/><p className='question-box-p'>Sí</p></div>
                        <div className='question-box-div-div'><input className='question-box-input' name='invested' value='2' type="radio"/><p className='question-box-p'>No</p></div>
                    </div>
                </div>
                <div className='nivelation-section-questions-left-q question-box' >
                    <h3 className='question-box-title'>¿Tienes intenciones de invertir en el mercado de bienes raíces próximamente?</h3>
                    <div className='question-box-div'>
                        <div className='question-box-div-div'><input className='question-box-input' name='will' value='1' type="radio"/><p className='question-box-p'>Sí</p></div>
                        <div className='question-box-div-div'><input className='question-box-input' name='will' value='2' type="radio"/><p className='question-box-p'>No</p></div>
                    </div>
                </div>
                <div className='nivelation-section-questions-left-q question-box' >
                    <h3 className='question-box-title'>¿Cuáles consideras son los aspectos más importantes a la hora de buscar un inmueble con el objetivo de invertir en el mercado de bienes raíces?</h3>
                    <div className='question-box-div'>
                        <div className='question-box-div-div'><input className='question-box-input' type="checkbox" value='1'/><p className='question-box-p'>Ubicación</p></div>
                        <div className='question-box-div-div'><input className='question-box-input' type="checkbox" value='2'/><p className='question-box-p'>Valor del inmueble</p></div>
                        <div className='question-box-div-div'><input className='question-box-input' type="checkbox" value='3'/><p className='question-box-p'>Antigüedad del inmueble</p></div>
                    </div>
                    <div className='question-box-div'>
                        <div className='question-box-div-div'><input className='question-box-input' type="checkbox" value='4'/><p className='question-box-p'>Metraje del inmueble</p></div>
                        <div className='question-box-div-div'><input className='question-box-input' type="checkbox" value='5'/><p className='question-box-p'>Servicios</p></div>
                        <div className='question-box-div-div'><input className='question-box-input' type="checkbox" value='6'/><p className='question-box-p'>Zona adyacente al inmueble</p></div>
                    </div>
                </div>
                <div className='nivelation-section-questions-left-q question-box' >
                <h3 className='question-box-title'>¿Con que frase te sientes mejor identificad@ con respecto a las inversiones?</h3>
                    <div className='question-box-div'>
                        <div className='question-box-div-div'><input className='question-box-input' type="radio" name='identified' value='1'/><p className='question-box-p'>Invertiría todo mi dinero en instrumentos con poco riesgo, aunque su rentabilidad sea baja.</p></div>
                        <div className='question-box-div-div'><input className='question-box-input' type="radio" name='identified' value='2'/><p className='question-box-p'>Invertiría una parte de mi dinero en instrumentos de bajo riesgo y otra, en aquellos que aunque son más riesgosos, tienen mayor rentabilidad.</p></div>
                        <div className='question-box-div-div'><input className='question-box-input' type="radio" name='identified' value='3'/><p className='question-box-p'>Invertiría todo mi dinero en instrumentos de alto rendimiento para maximizar mi ganancia, aún cuando esto signifique asumir mayores riesgos.</p></div>
                    </div>
                </div> 
            </div>
            <div className='nivelation-section-questions-right'>
                <div className='nivelation-section-questions-left-q question-box' >
                    <h3 className='question-box-title'>¿Cuál es tu nivel de conocimiento sobre el mercado de bienes raíces?</h3>
                    <div className='question-box-div'>
                        <div className='question-box-div-div'><input className='question-box-input' type="radio" name='knowledge' value='1'/><p className='question-box-p'>Bajo</p></div>
                        <div className='question-box-div-div'><input className='question-box-input' type="radio" name='knowledge' value='2'/><p className='question-box-p'>Medio</p></div>
                        <div className='question-box-div-div'><input className='question-box-input' type="radio" name='knowledge' value='3'/><p className='question-box-p'>Alto</p></div>
                    </div>
                </div>
                <div className='nivelation-section-questions-left-q question-box' >
                    <h3 className='question-box-title'>¿Cuál es tu nivel de conocimiento en inversiones?</h3>
                    <div className='question-box-div'>
                        <div className='question-box-div-div'><input className='question-box-input' type="radio" name='knowledge1' value='1'/><p className='question-box-p'>Bajo</p></div>
                        <div className='question-box-div-div'><input className='question-box-input' type="radio" name='knowledge1' value='2'/><p className='question-box-p'>Medio</p></div>
                        <div className='question-box-div-div'><input className='question-box-input' type="radio" name='knowledge1' value='3'/><p className='question-box-p'>Alto</p></div>
                    </div>
                </div>
                <div className='nivelation-section-questions-left-q question-box' >
                    <h3 className='question-box-title'>¿Cuál es tu objetivo principal al invertir en el mercado de bienes raíces?</h3>
                    <div className='question-box-div'>
                        <div className='question-box-div-div'><input className='question-box-input' type="radio" name='objective' value='1'/><p className='question-box-p'>Asegurar y mantener capital</p></div>
                        <div className='question-box-div-div'><input className='question-box-input' type="radio" name='objective' value='2'/><p className='question-box-p'>Aumentar el patrimonio, ojalá con retornos estables</p></div>
                        <div className='question-box-div-div'><input className='question-box-input' type="radio" name='objective' value='3'/><p className='question-box-p'>Crecimiento monetario sin importar los riesgos</p></div>
                    </div>
                </div>
                <div className='nivelation-section-questions-left-q question-box' >
                    <h3 className='question-box-title'>¿Cuánto de tus ahorros estarías dispuesto a invertir?</h3>
                    <div className='question-box-div'>
                        <div className='question-box-div-div'><input className='question-box-input' type="radio" name='savings' value='1'/><p className='question-box-p'>Menos del 30%</p></div>
                        <div className='question-box-div-div'><input className='question-box-input' type="radio" name='savings' value='2'/><p className='question-box-p'>Entre el 30% y el 60%</p></div>
                        <div className='question-box-div-div'><input className='question-box-input' type="radio" name='savings' value='3'/><p className='question-box-p'>Más del 60%</p></div>
                    </div>
                </div>
            </div>
        </div>
        <div className='nivelation-section-button'>
            <button className='signup-section-lower-button'>Completar Registro</button>
        </div>
      </section>
    )
  }
}

export default Nivelation;
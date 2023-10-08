import React, { Component } from 'react'
import './calculator.scss'

export class Calculator extends Component {
    
    constructor(props){
        super(props);
        this.state = {

        }
    }

  render() {
    return (
      <section className='calculator-section'>
        <h1 className='calculator-section-title'>Calculadora de Inversiones</h1>
        <div className='calculator-section-first-div'>
            <h3 className='calculator-section-first-div-secondary-title'>Gastos Iniciales</h3>
            <div className='calculator-section-first-div-inner'>
                <p className='calculator-section-first-div-inner-tag'>Valor del inmueble</p><input type="number" className='calculator-section-first-div-inner-value'/>
            </div>
            <div className='calculator-section-first-div-inner'>
                <p className='calculator-section-first-div-inner-tag'>Gastos derivados (impuestos, mantenimiento, etc)</p><input type="number" className='calculator-section-first-div-inner-value'/>
            </div>
            
        </div>

      </section>
    )
  }
}

export default Calculator;
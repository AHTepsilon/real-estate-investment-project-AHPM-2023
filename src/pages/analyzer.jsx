import React, { Component } from 'react'

export class Analyzer extends Component {
    
    constructor(props){
        super(props);
        this.state = {

        }
    }

  render() {
    return (
      <section className='analyzer-section'>
        <h1 className='analyzer-section-title'>Analizador de inversiones</h1>
        <div className='analyzer-section-inner-div'>
          <h3 className='analyzer-section-inner-div-title'>Características de la propiedad</h3>
          <h4 className='analyzer-section-inner-div-title'>Ubicación</h4>
          <div className='analyzer-section-inner-div-secondary'>
            <p className='analyzer-section-inner-div-secondary-tag'>Dirección</p>
            <input type='text' className='analyzer-section-inner-div-secondary-input'></input>
          </div>
          <div className='analyzer-section-inner-div-secondary'>
            <p className='analyzer-section-inner-div-secondary-tag'>Barrio</p>
            <input type='text' className='analyzer-section-inner-div-secondary-input'></input>
          </div>
          <div className='analyzer-section-inner-div-secondary'>
            <p className='analyzer-section-inner-div-secondary-tag'>Comuna</p>
            <select name="commune" className='analyzer-section-inner-div-secondary-select' id="">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
              <option value="21">21</option>
              <option value="22">22</option>
            </select>
          </div>
          <div className='analyzer-section-inner-div-secondary'>
            <p className='analyzer-section-inner-div-secondary-tag'>Estrato</p>
            <select name="stract" className='analyzer-section-inner-div-secondary-select' id="">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
          </div>

          <h4 className='analyzer-section-inner-div-title'>Características y Servicios</h4>
          <div className='analyzer-section-inner-div-secondary'>
            <p className='analyzer-section-inner-div-secondary-tag'>Tipo de propiedad</p>
            <select name="property-type" className='analyzer-section-inner-div-secondary-select' id="">
              <option value="apartment">Apartamento</option>
              <option value="house">Casa</option>
            </select>
          </div>
          <div className='analyzer-section-inner-div-secondary'>
            <p className='analyzer-section-inner-div-secondary-tag'>Metraje (m²)</p>
            <input type='number' className='analyzer-section-inner-div-secondary-input'></input>
          </div>
          <div className='analyzer-section-inner-div-secondary'>
            <p className='analyzer-section-inner-div-secondary-tag'>Número de habitaciones</p>
            <input type='number' className='analyzer-section-inner-div-secondary-input'></input>
          </div>
          <div className='analyzer-section-inner-div-secondary'>
            <p className='analyzer-section-inner-div-secondary-tag'>Número de baños</p>
            <input type='number' className='analyzer-section-inner-div-secondary-input'></input>
          </div>
          <div className='analyzer-section-inner-div-secondary'>
            <p className='analyzer-section-inner-div-secondary-tag'>Parqueaderos</p>
            <select name="parking" className='analyzer-section-inner-div-secondary-select' id="">
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">+2</option>
            </select>
          </div>
          <div className='analyzer-section-inner-div-secondary'>
            <p className='analyzer-section-inner-div-secondary-tag'>Antigüedad</p>
            <select name="age" className='analyzer-section-inner-div-secondary-select' id="">
              <option value="1">Menos de 1 año</option>
              <option value="2-5">Entre 2 y 5 años</option>
              <option value="5-10">Entre 5 y 10 años</option>
              <option value="10-15">Entre 10 y 15 años</option>
              <option value="16">Más de 15 años</option>
            </select>
          </div>
        </div>
        <div className='analyzer-section-inner-div'>
          <h1 className='analyzer-section-title'>Aspectos financieros</h1>
          <div className='analyzer-section-inner-div-secondary'>
            <p className='analyzer-section-inner-div-secondary-tag'>Valor de la propiedad</p>
            <input type='number' className='analyzer-section-inner-div-secondary-input'></input>
          </div>
          <div className='analyzer-section-inner-div-secondary'>
            <p className='analyzer-section-inner-div-secondary-tag'>Costos adicionales (Impuestos, arreglos, etc.)</p>
            <input type='number' className='analyzer-section-inner-div-secondary-input'></input>
          </div>
          <div className='analyzer-section-inner-div-secondary'>
            <p className='analyzer-section-inner-div-secondary-tag'>¿Compra con financiemiento?</p>
            <input type='checkbox' className='analyzer-section-inner-div-secondary-input'></input>
          </div>
          <div className='analyzer-section-inner-div-secondary'>
            <p className='analyzer-section-inner-div-secondary-tag'>Cuota Inicial</p>
            <input type='number' className='analyzer-section-inner-div-secondary-input'></input>
          </div>
          <div className='analyzer-section-inner-div-secondary'>
            <p className='analyzer-section-inner-div-secondary-tag'>Intereses</p>
            <input type='number' className='analyzer-section-inner-div-secondary-input'></input>
          </div>
          <div className='analyzer-section-inner-div-secondary'>
            <p className='analyzer-section-inner-div-secondary-tag'>Término (meses)</p>
            <input type='number' className='analyzer-section-inner-div-secondary-input'></input>
          </div>
        </div>
      </section>
    )
  }
}

export default Analyzer;
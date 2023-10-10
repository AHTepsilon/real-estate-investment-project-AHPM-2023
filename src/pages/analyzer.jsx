import React, { Component } from 'react'
import './analyzer.scss'

export class Analyzer extends Component {
    
    constructor(props){
        super(props);
        this.state = {
          analysisClicked: false,
          data: {},
          maxRentValue: '',
          minRentValue: '',
        }
    }

  performAnalysis = () => {
    this.setState({analysisClicked: true});

    let maxCalculatedRentValue = this.state.data.propertyValue*0.01;
    let minCalculatedRentValue = this.state.data.propertyValue*0.005;

    let formattedMaxCalculatedRentValue = maxCalculatedRentValue.toLocaleString('en-US', {style: 'currency', currency: 'COP'});
    let formattedMinCalculatedRentValue = minCalculatedRentValue.toLocaleString('en-US', {style: 'currency', currency: 'COP'});

    this.setState({maxRentValue: formattedMaxCalculatedRentValue});
    this.setState({minRentValue: formattedMinCalculatedRentValue});
  }

  addToData = (value, key) => {
    this.setState({data: {...this.state.data, [key]: value}});
  }
  render() {
    return (
      <section className='large-analyzer-section'>
        <section className='analyzer-section'>
          <h1 className='analyzer-section-title'>Analizador de inversiones</h1>
          <div className='analyzer-section-inner-div'>
            <h3 className='analyzer-section-inner-div-title'>Características de la propiedad</h3>
            <h4 className='analyzer-section-inner-div-title'>Ubicación</h4>
            <div className='analyzer-section-inner-div-secondary'>
              <p className='analyzer-section-inner-div-secondary-tag'>Dirección</p>
              <input type='text' onChange={(e) => {this.addToData(e.target.value, 'address')}} className='analyzer-section-inner-div-secondary-input'></input>
            </div>
            <div className='analyzer-section-inner-div-secondary'>
              <p className='analyzer-section-inner-div-secondary-tag'>Barrio</p>
              <input type='text' onChange={(e) => {this.addToData(e.target.value, 'neighborhood')}} className='analyzer-section-inner-div-secondary-input'></input>
            </div>
            <div className='analyzer-section-inner-div-secondary'>
              <p className='analyzer-section-inner-div-secondary-tag'>Comuna</p>
              <select name="commune" onChange={(e) => {this.addToData(e.target.value, 'commune')}} className='analyzer-section-inner-div-secondary-select' id="">
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
              <select name="stract" onChange={(e) => {this.addToData(e.target.value, 'stract')}} className='analyzer-section-inner-div-secondary-select' id="">
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
              <select name="property-type" onChange={(e) => {this.addToData(e.target.value, 'propertyType')}} className='analyzer-section-inner-div-secondary-select' id="">
                <option value="apartment">Apartamento</option>
                <option value="house">Casa</option>
              </select>
            </div>
            <div className='analyzer-section-inner-div-secondary'>
              <p className='analyzer-section-inner-div-secondary-tag'>Metraje (m²)</p>
              <input type='number' onChange={(e) => {this.addToData(e.target.value, 'meters')}} className='analyzer-section-inner-div-secondary-input'></input>
            </div>
            <div className='analyzer-section-inner-div-secondary'>
              <p className='analyzer-section-inner-div-secondary-tag'>Número de habitaciones</p>
              <input type='number' onChange={(e) => {this.addToData(e.target.value, 'roomsNum')}} className='analyzer-section-inner-div-secondary-input'></input>
            </div>
            <div className='analyzer-section-inner-div-secondary'>
              <p className='analyzer-section-inner-div-secondary-tag'>Número de baños</p>
              <input type='number' onChange={(e) => {this.addToData(e.target.value, 'bathroomsNum')}} className='analyzer-section-inner-div-secondary-input'></input>
            </div>
            <div className='analyzer-section-inner-div-secondary'>
              <p className='analyzer-section-inner-div-secondary-tag'>Parqueaderos</p>
              <select name="parking" onChange={(e) => {this.addToData(e.target.value, 'parkingNum')}} className='analyzer-section-inner-div-secondary-select' id="">
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">+2</option>
              </select>
            </div>
            <div className='analyzer-section-inner-div-secondary'>
              <p className='analyzer-section-inner-div-secondary-tag'>Antigüedad</p>
              <select name="age" onChange={(e) => {this.addToData(e.target.value, 'propertyAge')}} className='analyzer-section-inner-div-secondary-select' id="">
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
              <p className='analyzer-section-inner-div-secondary-tag'>Valor de la propiedad (En pesos colombianos)</p>
              <input type='number' onChange={(e) => {this.addToData(parseInt(e.target.value), 'propertyValue')}} className='analyzer-section-inner-div-secondary-input'></input>
            </div>
            <div className='analyzer-section-inner-div-secondary'>
              <p className='analyzer-section-inner-div-secondary-tag'>Costos adicionales (Impuestos, arreglos, etc.)</p>
              <input type='number' onChange={(e) => {this.addToData(parseInt(e.target.value), 'propertyExtraCosts')}} className='analyzer-section-inner-div-secondary-input'></input>
            </div>
            <div className='analyzer-section-inner-div-secondary'>
              <p className='analyzer-section-inner-div-secondary-tag'>¿Compra con financiemiento?</p>
              <input type='checkbox' onChange={(e) => {this.addToData(e.target.value, 'useFinancing')}} className='analyzer-section-inner-div-secondary-input'></input>
            </div>
            <div className='analyzer-section-inner-div-secondary'>
              <p className='analyzer-section-inner-div-secondary-tag'>Cuota Inicial</p>
              <input type='number' onChange={(e) => {this.addToData(parseInt(e.target.value), 'downPayment')}} className='analyzer-section-inner-div-secondary-input'></input>
            </div>
            <div className='analyzer-section-inner-div-secondary'>
              <p className='analyzer-section-inner-div-secondary-tag'>Intereses</p>
              <input type='number' onChange={(e) => {this.addToData(parseInt(e.target.value), 'interestRate')}} className='analyzer-section-inner-div-secondary-input'></input>
            </div>
            <div className='analyzer-section-inner-div-secondary'>
              <p className='analyzer-section-inner-div-secondary-tag'>Término (meses)</p>
              <input type='number' onChange={(e) => {this.addToData(parseInt(e.target.value), 'loanTerm')}} className='analyzer-section-inner-div-secondary-input'></input>
            </div>
            <button onClick={this.performAnalysis}>
              Analizar
            </button>
          </div>
        </section>
        <section className='right-analyzer-section'>
          {this.state.analysisClicked === true && 
          <div className='right-analyzer-section-container'>
              <h3 className='right-analyzer-section-container-tag'>
                Rango de valor de alquiler: 
              </h3>
              <h3 className='right-analyzer-section-container-data'>
                {this.state.maxRentValue} - {this.state.minRentValue}
              </h3>
            </div>}
        </section>
      </section>
    )
  }
}

export default Analyzer;
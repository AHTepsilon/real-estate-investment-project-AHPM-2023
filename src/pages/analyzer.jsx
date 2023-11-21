import React, { Component } from 'react'
import './analyzer.scss'

export class Analyzer extends Component {
    
    constructor(props){
        super(props);
        this.state = {
          analysisClicked: false,
          data: {propertyValue: 0, propertyExtraCosts: 0, downPayment: 0},
          maxRentValue: '',
          minRentValue: '',
          maxEarningsAfterYear: '',
          minEarningsAfterYear: '',
          minRoi: '',
          maxRoi: '',
          maxTimeForInvestmentReturn: '',
          minTimeForInvestmentReturn: '',
          communeAvgPrice: {
            '1': 2300000,
            '2': 3160000,
            '3': 2905000,
            '4': 2890000,
            '5': 2690000,
            '6': 2450000,
            '7': 2300000,
            '8': 2560000,
            '9': 2650000,
            '10': 3170000,
            '11': 2430000,
            '12': 2160000,
            '13': 1650000,
            '14': 1320000,
            '15': 1420000,
            '16': 1856000,
            '17': 3363000,
            '18': 2360000,
            '19': 3166000,
            '20': 1280000,
            '21': 1469000,
            '22': 4327000,
          },
          stratumAvgPrice: {
            'one': 1850000,
            'two': 1916000,
            'three': 2167000,
            'four': 2850000,
            'five': 3374000,
            'six': 4355000,
          },
          selectedStratumPrice: 0,
          selectedCommunePrice: 0,
          pricePerM2: 0,
          totalLoanPayment: 0,
          monthlyPayment: 0,
        }
    }

  performAnalysis = () => {
    console.log(this.state.data);
    this.setState({analysisClicked: true});

    this.setState({pricePerM2: (this.state.data.propertyValue / this.state.data.meters).toLocaleString('en-US', {style: 'currency', currency: 'COP'})})

    let maxCalculatedRentValue = this.state.data.propertyValue*0.006;
    let minCalculatedRentValue = this.state.data.propertyValue*0.003;

    let formattedMaxCalculatedRentValue = maxCalculatedRentValue.toLocaleString('en-US', {style: 'currency', currency: 'COP'});
    let formattedMinCalculatedRentValue = minCalculatedRentValue.toLocaleString('en-US', {style: 'currency', currency: 'COP'});

    this.setState({maxEarningsAfterYear: (maxCalculatedRentValue*12).toLocaleString('en-US', {style: 'currency', currency: 'COP'})});
    this.setState({minEarningsAfterYear: (minCalculatedRentValue*12).toLocaleString('en-US', {style: 'currency', currency: 'COP'})});

    this.setState({maxRentValue: formattedMaxCalculatedRentValue});
    this.setState({minRentValue: formattedMinCalculatedRentValue});

    let minTimeReturn = 0;
    let maxTimeReturn = 0;

    for(let i = 0; i < this.state.data.propertyValue; i += (minCalculatedRentValue*12)){
      minTimeReturn+=1;
    }
    for(let i = 0; i < this.state.data.propertyValue; i += (maxCalculatedRentValue*12)){
      maxTimeReturn+=1;
    }

    this.setState({minTimeForInvestmentReturn: minTimeReturn});
    this.setState({maxTimeForInvestmentReturn: maxTimeReturn});

    const stratumPriceMap = {
      '1': this.state.stratumAvgPrice.one,
      '2': this.state.stratumAvgPrice.two,
      '3': this.state.stratumAvgPrice.three,
      '4': this.state.stratumAvgPrice.four,
      '5': this.state.stratumAvgPrice.five,
      '6': this.state.stratumAvgPrice.six,
    };

    const selectedStratumPrice = stratumPriceMap[this.state.data.stratum];

    if (selectedStratumPrice !== undefined) {
      this.setState({
        selectedStratumPrice: selectedStratumPrice.toLocaleString('en-US', {
          style: 'currency',
          currency: 'COP',
        }),
      });
    }

    const selectedCommunePrice = this.state.communeAvgPrice[this.state.data.commune]

    if (selectedCommunePrice !== undefined) {
      this.setState({
        selectedCommunePrice: selectedCommunePrice.toLocaleString('en-US', {
          style: 'currency',
          currency: 'COP',
        }),
      });
    }

    let loanPayment = ((((this.state.data.propertyValue + this.state.data.propertyExtraCosts - this.state.data.downPayment)*this.state.data.interestPercentage)/100))
    let interests = loanPayment * (this.state.data.interestRate / 100)

    this.setState({totalLoanPayment: (loanPayment + interests).toLocaleString('en-US', {style: 'currency', currency: 'COP'})})
  
    let monthlyPayment = (loanPayment + interests) / (this.state.data.loanTerm * 12)

    this.setState({monthlyPayment: monthlyPayment.toLocaleString('en-US', {style: 'currency', currency: 'COP'})});
    
  }

  addToData = (value, key) => {
    this.setState({data: {...this.state.data, [key]: value}});
  }

  componentDidUpdate = () => {

  }

  render() {
    return (
      <section className='large-analyzer-section'>
        <section className='analyzer-section' id='analyzer-section-reduce'>
          <h1 className='analyzer-section-title'>Analizador de inversiones</h1>
          <div className='analyzer-section-inner-div'>
            <h3 className='analyzer-section-inner-div-title'>Características de la propiedad</h3>
            <h4 className='analyzer-section-inner-div-title'>Ubicación</h4>
            <div className='analyzer-section-inner-div-secondary'>
              <p className='analyzer-section-inner-div-secondary-tag'>Dirección</p>
              <input id='analyzer-section-reduce' type='text' onChange={(e) => {this.addToData(e.target.value, 'address')}} className='analyzer-section-inner-div-secondary-input'></input>
            </div>
            <div className='analyzer-section-inner-div-secondary'>
              <p className='analyzer-section-inner-div-secondary-tag'>Barrio</p>
              <input id='analyzer-section-reduce' type='text' onChange={(e) => {this.addToData(e.target.value, 'neighborhood')}} className='analyzer-section-inner-div-secondary-input'></input>
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
              <select name="stratum" onChange={(e) => {this.addToData(e.target.value, 'stratum')}} className='analyzer-section-inner-div-secondary-select' id="">
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
              <input id='analyzer-section-reduce' type='number' onChange={(e) => {this.addToData(e.target.value, 'meters')}} className='analyzer-section-inner-div-secondary-input'></input>
            </div>
            <div className='analyzer-section-inner-div-secondary'>
              <p className='analyzer-section-inner-div-secondary-tag'>Número de habitaciones</p>
              <input id='analyzer-section-reduce' type='number' onChange={(e) => {this.addToData(e.target.value, 'roomsNum')}} className='analyzer-section-inner-div-secondary-input'></input>
            </div>
            <div className='analyzer-section-inner-div-secondary'>
              <p className='analyzer-section-inner-div-secondary-tag'>Número de baños</p>
              <input id='analyzer-section-reduce' type='number' onChange={(e) => {this.addToData(e.target.value, 'bathroomsNum')}} className='analyzer-section-inner-div-secondary-input'></input>
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
              <input id='analyzer-section-reduce' type='number' onChange={(e) => {this.addToData(parseInt(e.target.value), 'propertyValue')}} className='analyzer-section-inner-div-secondary-input'></input>
            </div>
            <div className='analyzer-section-inner-div-secondary'>
              <p className='analyzer-section-inner-div-secondary-tag'>Costos adicionales (Impuestos, arreglos, etc.)</p>
              <input id='analyzer-section-reduce' type='number' onChange={(e) => {this.addToData(parseInt(e.target.value), 'propertyExtraCosts')}} className='analyzer-section-inner-div-secondary-input'></input>
            </div>
            <div className='analyzer-section-inner-div-secondary'>
              <p className='analyzer-section-inner-div-secondary-tag'>¿Compra con financiamiento?</p>
              <input id='analyzer-section-reduce' type='checkbox' onChange={(e) => {this.addToData(e.target.checked, 'useFinancing')}} className='analyzer-section-inner-div-secondary-checkbox'></input>
            </div>
            {(this.state.data).useFinancing === false && <div></div>}
            {(this.state.data).useFinancing === true && 
            <div>
              <div className='analyzer-section-inner-div-secondary'>
              <p className='analyzer-section-inner-div-secondary-tag'>Cuota inicial</p>
              <input id='analyzer-section-reduce' type='number' onChange={(e) => {this.addToData(parseInt(e.target.value), 'downPayment')}} className='analyzer-section-inner-div-secondary-input'></input>
            </div>
            <div className='analyzer-section-inner-div-secondary'>
              <p className='analyzer-section-inner-div-secondary-tag'>Porcentaje del préstamo</p>
              <input id='analyzer-section-reduce' type='range' min={20} max={70} list="interestPercentages" onChange={(e) => {this.addToData(parseInt(e.target.value), 'interestPercentage')}} className='analyzer-section-inner-div-secondary-input'></input>
                <datalist id="interestPercentages">
                  <option value={20}></option>
                  <option value={30}></option>
                  <option value={40}></option>
                  <option value={50}></option>
                  <option value={60}></option>
                  <option value={70}></option>
                </datalist>
              <p>{this.state.data.interestPercentage}%</p>
              <p>{(((this.state.data.propertyValue + this.state.data.propertyExtraCosts - this.state.data.downPayment)*this.state.data.interestPercentage)/100).toLocaleString('en-US', {style: 'currency', currency: 'COP'})}</p>
            </div>
            <div className='analyzer-section-inner-div-secondary'>
              <p className='analyzer-section-inner-div-secondary-tag'>Término (años)</p>
              <input id='analyzer-section-reduce' type='range' min={1} max={30} onChange={(e) => {this.addToData(parseInt(e.target.value), 'loanTerm')}} className='analyzer-section-inner-div-secondary-input'></input>
              <p>{this.state.data.loanTerm} años</p>
            </div>
            <div className='analyzer-section-inner-div-secondary'>
              <p className='analyzer-section-inner-div-secondary-tag'>Tasa de interés</p>
              <input id='analyzer-section-reduce' type='range' min={12} max={20} onChange={(e) => {this.addToData(parseInt(e.target.value), 'interestRate')}} className='analyzer-section-inner-div-secondary-input'></input>
              <p>{this.state.data.interestRate}%</p>
            </div>
            </div>
              }
            <button onClick={this.performAnalysis} className='analyzer-section-inner-div-btn'>
              Analizar
            </button>
          </div>
        </section>
        <section className='right-analyzer-section'>
          {this.state.analysisClicked === true && 
          <div className='right-analyzer-section-container'>
            <div className='right-analyzer-section-container-inner'>
              <h3 className='right-analyzer-section-container-tag'>
                Rango de valor de alquiler: 
              </h3>
              <h4 className='right-analyzer-section-container-data'>
                {this.state.minRentValue} - {this.state.maxRentValue}
              </h4>
            </div>
            <div className='right-analyzer-section-container-inner'>
              <h3 className='right-analyzer-section-container-tag'>
                A 12 meses puedes obtener un retorno de entre
              </h3>
              <h4 className='right-analyzer-section-container-data'>
                {this.state.minEarningsAfterYear} y {this.state.maxEarningsAfterYear}
              </h4>
            </div>
            <div className='right-analyzer-section-container-inner'>
              <h3 className='right-analyzer-section-container-tag'>
                Valor por metro cuadrado de esta propiedad
              </h3>
              <h4 className='right-analyzer-section-container-data'>
                {this.state.pricePerM2}
              </h4>
            </div>      
            <div className='right-analyzer-section-container-inner'>
              <h3 className='right-analyzer-section-container-tag'>
                Promedio de valor por m² del sector
              </h3>
              <h4 className='right-analyzer-section-container-data'>
                {this.state.selectedStratumPrice}
              </h4>
            </div>
            <div className='right-analyzer-section-container-inner'>
              <h3 className='right-analyzer-section-container-tag'>
                Pago total del préstamo
              </h3>
              <h4 className='right-analyzer-section-container-data'>
                {this.state.totalLoanPayment}
              </h4>
            </div>
            <div className='right-analyzer-section-container-inner'>
              <h3 className='right-analyzer-section-container-tag'>
                Pago mensual del préstamo
              </h3>
              <h4 className='right-analyzer-section-container-data'>
                {this.state.monthlyPayment}
              </h4>
            </div>
          </div>}
        </section>
      </section>
    )
  }
}

export default Analyzer;
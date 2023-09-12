import React, { Component } from 'react'
import {doc, setDoc, updateDoc} from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import {db, auth} from '../firebase/firebase.js'
import './nivelation.scss'

class Nivelation extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            age: 0,
            hasInvested: 0,
            riskTaker: 0,
            importantAspects: [],
            identifiedWith: 0,
            realInvestK: 0,
            investK: 0,
            objective: 0,
            objective2: 0,
            savings: 0,
            uid: ''
        }

    }

  componentDidMount = () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          this.setState({uid: uid})
          console.log(uid);
        } else {

        }
      });
  }

  sendAnswers = async() => {
    let investorLevel = (this.state.age + this.state.hasInvested + this.state.riskTaker + this.state.identifiedWith 
        + this.state.realInvestK + this.state.investK + this.state.objective + this.state.objective2 
        + this.state.savings);

    console.log(this.state);
    console.log("investor level ", investorLevel);

    await updateDoc(doc(db, "users", this.state.uid), {
        investmentLevel: investorLevel,
        preferences: this.state.importantAspects,
        hasCompletedProfile: true,

      }).then(() => {window.location.href = '/'});    
  }

  toggleCheck = (e) => {
    let isChecked = e.target.checked;
    let value = e.target.value

    if(isChecked){
        this.setState({importantAspects: [...this.state.importantAspects, value]})
    } 
    else{
        this.setState({importantAspects: this.state.importantAspects.filter(function(aspect) { 
            return aspect !== value
        })});
    }

  }

  render() {
    return (
      <section className='nivelation-section'>
        <div className='nivelation-section-questions'>
            <div className='nivelation-section-questions-left'>
                <div className='nivelation-section-questions-left-q question-box' >
                    <h3 className='question-box-title'>Selecciona tu rango de edad</h3>
                    <div className='question-box-div'>
                        <div className='question-box-div-div'><input className='question-box-input' name='age' value='1' type="radio" onChange={(e) => {this.setState({age: parseInt(e.target.value)})}}/><p className='question-box-p'>20-30 años</p></div>
                        <div className='question-box-div-div'><input className='question-box-input' name='age' value='3' type="radio" onChange={(e) => {this.setState({age: parseInt(e.target.value)})}}/><p className='question-box-p'>30-50 años</p></div>
                        <div className='question-box-div-div'><input className='question-box-input' name='age' value='2' type="radio" onChange={(e) => {this.setState({age: parseInt(e.target.value)})}}/><p className='question-box-p'>Más de 50 años</p></div>
                    </div>
                </div>
                <div className='nivelation-section-questions-left-q question-box' >
                    <h3 className='question-box-title'>¿Has invertido en el mercado de bienes raíces anteriormente?</h3>
                    <div className='question-box-div'>
                        <div className='question-box-div-div'><input className='question-box-input' name='invested' value='2' type="radio" onChange={(e) => {this.setState({hasInvested: parseInt(e.target.value)})}}/><p className='question-box-p'>Sí</p></div>
                        <div className='question-box-div-div'><input className='question-box-input' name='invested' value='1' type="radio" onChange={(e) => {this.setState({hasInvested: parseInt(e.target.value)})}}/><p className='question-box-p'>No</p></div>
                    </div>
                </div>
                <div className='nivelation-section-questions-left-q question-box' >
                    <h3 className='question-box-title'>¿Qué tan arriesgado consideras que eres en temas financieros?</h3>
                    <div className='question-box-div'>
                        <div className='question-box-div-div'><input className='question-box-input' name='riskTaker' value='3' type="radio" onChange={(e) => {this.setState({riskTaker: parseInt(e.target.value)})}}/><p className='question-box-p'>Arriesgado</p></div>
                        <div className='question-box-div-div'><input className='question-box-input' name='riskTaker' value='2' type="radio" onChange={(e) => {this.setState({riskTaker: parseInt(e.target.value)})}}/><p className='question-box-p'>Poco arriesgado</p></div>
                        <div className='question-box-div-div'><input className='question-box-input' name='riskTaker' value='1' type="radio" onChange={(e) => {this.setState({riskTaker: parseInt(e.target.value)})}}/><p className='question-box-p'>Nada arriesgado</p></div>
                    </div>
                </div>
                <div className='nivelation-section-questions-left-q question-box' >
                    <h3 className='question-box-title'>¿Cuáles consideras son los aspectos más importantes a la hora de buscar un inmueble con el objetivo de invertir en el mercado de bienes raíces?</h3>
                    <div className='question-box-div'>
                        <div className='question-box-div-div'><input className='question-box-input' type="checkbox" value='1' onClick={(e) => {this.toggleCheck(e)}}/><p className='question-box-p'>Ubicación</p></div>
                        <div className='question-box-div-div'><input className='question-box-input' type="checkbox" value='2' onClick={(e) => {this.toggleCheck(e)}}/><p className='question-box-p'>Valor del inmueble</p></div>
                        <div className='question-box-div-div'><input className='question-box-input' type="checkbox" value='3' onClick={(e) => {this.toggleCheck(e)}}/><p className='question-box-p'>Antigüedad del inmueble</p></div>
                    </div>
                    <div className='question-box-div'>
                        <div className='question-box-div-div'><input className='question-box-input' type="checkbox" value='4' onClick={(e) => {this.toggleCheck(e)}}/><p className='question-box-p'>Metraje del inmueble</p></div>
                        <div className='question-box-div-div'><input className='question-box-input' type="checkbox" value='5' onClick={(e) => {this.toggleCheck(e)}}/><p className='question-box-p'>Servicios</p></div>
                        <div className='question-box-div-div'><input className='question-box-input' type="checkbox" value='6' onClick={(e) => {this.toggleCheck(e)}}/><p className='question-box-p'>Zona adyacente al inmueble</p></div>
                    </div>
                </div>
                <div className='nivelation-section-questions-left-q question-box' >
                <h3 className='question-box-title'>¿Con que frase te sientes mejor identificad@ con respecto a las inversiones?</h3>
                    <div className='question-box-div'>
                        <div className='question-box-div-div'><input className='question-box-input' type="radio" name='identified' value='2' onChange={(e) => {this.setState({identifiedWith: parseInt(e.target.value)})}}/><p className='question-box-p'>Invertiría todo mi dinero en instrumentos con poco riesgo, aunque su rentabilidad sea baja.</p></div>
                        <div className='question-box-div-div'><input className='question-box-input' type="radio" name='identified' value='1' onChange={(e) => {this.setState({identifiedWith: parseInt(e.target.value)})}}/><p className='question-box-p'>Invertiría una parte de mi dinero en instrumentos de bajo riesgo y otra, en aquellos que aunque son más riesgosos, tienen mayor rentabilidad.</p></div>
                        <div className='question-box-div-div'><input className='question-box-input' type="radio" name='identified' value='3' onChange={(e) => {this.setState({identifiedWith: parseInt(e.target.value)})}}/><p className='question-box-p'>Invertiría todo mi dinero en instrumentos de alto rendimiento para maximizar mi ganancia, aún cuando esto signifique asumir mayores riesgos.</p></div>
                    </div>
                </div> 
            </div>
            <div className='nivelation-section-questions-right'>
                <div className='nivelation-section-questions-left-q question-box' >
                    <h3 className='question-box-title'>¿Cuál es tu nivel de conocimiento sobre el mercado de bienes raíces?</h3>
                    <div className='question-box-div'>
                        <div className='question-box-div-div'><input className='question-box-input' type="radio" name='knowledge' value='1' onChange={(e) => {this.setState({realInvestK: parseInt(e.target.value)})}}/><p className='question-box-p'>Bajo</p></div>
                        <div className='question-box-div-div'><input className='question-box-input' type="radio" name='knowledge' value='2' onChange={(e) => {this.setState({realInvestK: parseInt(e.target.value)})}}/><p className='question-box-p'>Medio</p></div>
                        <div className='question-box-div-div'><input className='question-box-input' type="radio" name='knowledge' value='3' onChange={(e) => {this.setState({realInvestK: parseInt(e.target.value)})}}/><p className='question-box-p'>Alto</p></div>
                    </div>
                </div>
                <div className='nivelation-section-questions-left-q question-box' >
                    <h3 className='question-box-title'>¿Cuál es tu nivel de conocimiento en inversiones?</h3>
                    <div className='question-box-div'>
                        <div className='question-box-div-div'><input className='question-box-input' type="radio" name='knowledge1' value='1' onChange={(e) => {this.setState({investK: parseInt(e.target.value)})}}/><p className='question-box-p'>Bajo</p></div>
                        <div className='question-box-div-div'><input className='question-box-input' type="radio" name='knowledge1' value='2' onChange={(e) => {this.setState({investK: parseInt(e.target.value)})}}/><p className='question-box-p'>Medio</p></div>
                        <div className='question-box-div-div'><input className='question-box-input' type="radio" name='knowledge1' value='3' onChange={(e) => {this.setState({investK: parseInt(e.target.value)})}}/><p className='question-box-p'>Alto</p></div>
                    </div>
                </div>
                <div className='nivelation-section-questions-left-q question-box' >
                    <h3 className='question-box-title'>¿Cuál es tu objetivo principal al invertir en el mercado de bienes raíces?</h3>
                    <div className='question-box-div'>
                        <div className='question-box-div-div'><input className='question-box-input' type="radio" name='objective' value='1' onChange={(e) => {this.setState({objective: parseInt(e.target.value)})}}/><p className='question-box-p'>Asegurar y mantener capital</p></div>
                        <div className='question-box-div-div'><input className='question-box-input' type="radio" name='objective' value='2' onChange={(e) => {this.setState({objective: parseInt(e.target.value)})}}/><p className='question-box-p'>Aumentar el patrimonio, ojalá con retornos estables</p></div>
                        <div className='question-box-div-div'><input className='question-box-input' type="radio" name='objective' value='3' onChange={(e) => {this.setState({objective: parseInt(e.target.value)})}}/><p className='question-box-p'>Crecimiento monetario sin importar los riesgos</p></div>
                    </div>
                </div>
                <div className='nivelation-section-questions-left-q question-box' >
                    <h3 className='question-box-title'>¿Cuál de las siguientes afirmaciones se alinea más con tus objetivos de inversión?</h3>
                    <div className='question-box-div'>
                        <div className='question-box-div-div'><input className='question-box-input' type="radio" name='objective2' value='1' onChange={(e) => {this.setState({objective2: parseInt(e.target.value)})}}/><p className='question-box-p'>Crear un flujo de efectivo pasivo</p></div>
                        <div className='question-box-div-div'><input className='question-box-input' type="radio" name='objective2' value='2' onChange={(e) => {this.setState({objective2: parseInt(e.target.value)})}}/><p className='question-box-p'>Apreciación del valor de la propiedad a largo plazo</p></div>
                        <div className='question-box-div-div'><input className='question-box-input' type="radio" name='objective2' value='3' onChange={(e) => {this.setState({objective2: parseInt(e.target.value)})}}/><p className='question-box-p'>Diversificar mi cartera de inversiones</p></div>
                    </div>
                </div>
                <div className='nivelation-section-questions-left-q question-box' >
                    <h3 className='question-box-title'>¿Cuánto de tus ahorros estarías dispuesto a invertir?</h3>
                    <div className='question-box-div'>
                        <div className='question-box-div-div'><input className='question-box-input' type="radio" name='savings' value='1' onChange={(e) => {this.setState({savings: parseInt(e.target.value)})}}/><p className='question-box-p'>Menos del 30%</p></div>
                        <div className='question-box-div-div'><input className='question-box-input' type="radio" name='savings' value='2' onChange={(e) => {this.setState({savings: parseInt(e.target.value)})}}/><p className='question-box-p'>Entre el 30% y el 60%</p></div>
                        <div className='question-box-div-div'><input className='question-box-input' type="radio" name='savings' value='3' onChange={(e) => {this.setState({savings: parseInt(e.target.value)})}}/><p className='question-box-p'>Más del 60%</p></div>
                    </div>
                </div>
            </div>
        </div>
        <div className='nivelation-section-button'>
            <button className='signup-section-lower-button' onClick={this.sendAnswers}>Completar Registro</button>
        </div>
      </section>
    )
  }
}

export default Nivelation;
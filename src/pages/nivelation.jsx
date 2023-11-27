import React, { Component } from 'react'
import {doc, setDoc, updateDoc} from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import {db, auth} from '../firebase/firebase.js'
import './nivelation.scss'

import goToLink from "../functions/goToLink.js";

class Nivelation extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            age: 0,
            hasInvested: 0,
            riskTaker: 0,
            identifiedWith: 0,
            realInvestK: 0,
            investK: 0,
            objective: 0,
            objective2: 0,
            savings: 0,
            uid: '',
            preference_location_level: 7,
            preference_age_level: 7,
            preference_meters_level: 7,
            preference_services_level: 7,
            preference_characteristics_level: 7,
            preference_rooms_level: 0,
            preference_bathrooms_level: 0,
            preference_parking_level: 0,
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

    let riskProfile;

    if(investorLevel <= 10){
        riskProfile = 'Conservador'
    }
    else if(investorLevel > 10 && investorLevel <= 20){
        riskProfile = 'Moderado'
    }
    else if(investorLevel > 20){
        riskProfile = 'Arriesgado';
    }
    
    let investmentExperience = (this.state.age + this.state.hasInvested + this.state.realInvestK + this.state.investK);
    let riskTolerance = (this.state.riskTaker + this.state.identifiedWith + this.state.objective + this.state.savings);
    let financialCapacity = (this.state.identifiedWith + this.state.objective + this.state.objective2 + this.state.savings);   

    console.log(this.state);
    console.log("risk level ", investorLevel);
    console.log("risk profile ", riskProfile);

    await updateDoc(doc(db, "users", this.state.uid), {
        investmentLevel: investorLevel,
        investmentExperience: investmentExperience,
        riskTolerance: riskTolerance,
        financialCapacity: financialCapacity,
        riskProfile: riskProfile,
        preference_location_level: this.state.preference_location_level,
        preference_age_level: this.state.preference_age_level,
        preference_meters_level: this.state.preference_meters_level,
        preference_services_level: this.state.preference_services_level,
        preference_characteristics_level: this.state.preference_characteristics_level,
        hasCompletedProfile: true,

      }).then(() => {alert('Tu perfil de riesgo es: ' + riskProfile); goToLink("/")});
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
                        <div className='question-box-div-div'><input className='question-box-input' name='age' value='0' type="radio" onChange={(e) => {this.setState({age: parseInt(e.target.value)})}}/><p className='question-box-p'>20-30 años</p></div>
                        <div className='question-box-div-div'><input className='question-box-input' name='age' value='1' type="radio" onChange={(e) => {this.setState({age: parseInt(e.target.value)})}}/><p className='question-box-p'>30-50 años</p></div>
                        <div className='question-box-div-div'><input className='question-box-input' name='age' value='2' type="radio" onChange={(e) => {this.setState({age: parseInt(e.target.value)})}}/><p className='question-box-p'>30-50 años</p></div>
                        <div className='question-box-div-div'><input className='question-box-input' name='age' value='1' type="radio" onChange={(e) => {this.setState({age: parseInt(e.target.value)})}}/><p className='question-box-p'>Más de 50 años</p></div>
                    </div>
                </div>
                <div className='nivelation-section-questions-left-q question-box' >
                    <h3 className='question-box-title'>¿Has invertido en el mercado de bienes raíces anteriormente?</h3>
                    <div className='question-box-div'>
                        <div className='question-box-div-div'><input className='question-box-input' name='invested' value='-1' type="radio" onChange={(e) => {this.setState({hasInvested: parseInt(e.target.value)})}}/><p className='question-box-p'>No</p></div>
                        <div className='question-box-div-div'><input className='question-box-input' name='invested' value='4' type="radio" onChange={(e) => {this.setState({hasInvested: parseInt(e.target.value)})}}/><p className='question-box-p'>Sí</p></div>
                    </div>
                </div>
                <div className='nivelation-section-questions-left-q question-box' >
                    <h3 className='question-box-title'>¿Qué tan arriesgado consideras que eres en temas financieros?</h3>
                    <div className='question-box-div'>
                        <div className='question-box-div-div'><input className='question-box-input' name='riskTaker' value='0' type="radio" onChange={(e) => {this.setState({riskTaker: parseInt(e.target.value)})}}/><p className='question-box-p'>Nada arriesgado</p></div>
                        <div className='question-box-div-div'><input className='question-box-input' name='riskTaker' value='2' type="radio" onChange={(e) => {this.setState({riskTaker: parseInt(e.target.value)})}}/><p className='question-box-p'>Poco arriesgado</p></div>
                        <div className='question-box-div-div'><input className='question-box-input' name='riskTaker' value='5' type="radio" onChange={(e) => {this.setState({riskTaker: parseInt(e.target.value)})}}/><p className='question-box-p'>Arriesgado</p></div>
                    </div>
                </div>
                <div className='nivelation-section-questions-left-q question-box' >
                <h3 className='question-box-title'>¿Con que frase te sientes mejor identificad@ con respecto a las inversiones?</h3>
                    <div className='question-box-div'>
                        <div className='question-box-div-div'><input className='question-box-input' type="radio" name='identified' value='1' onChange={(e) => {this.setState({identifiedWith: parseInt(e.target.value)})}}/><p className='question-box-p'>Busco invertir en propiedades con rentabilidad estable, aunque la misma sea baja. Pienso detenidamente para asegurar capital.</p></div>
                        <div className='question-box-div-div'><input className='question-box-input' type="radio" name='identified' value='2' onChange={(e) => {this.setState({identifiedWith: parseInt(e.target.value)})}}/><p className='question-box-p'>Estoy dispuesto a tolerar un riego moderado para aumentar mis ganancias, mientras exista un balance entre la rentabilidad y la seguridad.</p></div>
                        <div className='question-box-div-div'><input className='question-box-input' type="radio" name='identified' value='3' onChange={(e) => {this.setState({identifiedWith: parseInt(e.target.value)})}}/><p className='question-box-p'>Busco los mayores rendimientos posibles, asumiendo el riesgo que sea necesario
                para obtener un mayor crecimiento de capital.</p></div>
                    </div>
                </div> 
            </div>
            <div className='nivelation-section-questions-right'>
                <div className='nivelation-section-questions-left-q question-box' >
                    <h3 className='question-box-title'>¿Conoces qué tipo de inversión en bienes raices quieres hacer?</h3>
                    <div className='question-box-div'>
                        <div className='question-box-div-div'><input className='question-box-input' type="radio" name='knowledge' value='-1' onChange={(e) => {this.setState({realInvestK: parseInt(e.target.value)})}}/><p className='question-box-p'>No lo sé</p></div>
                        <div className='question-box-div-div'><input className='question-box-input' type="radio" name='knowledge' value='3' onChange={(e) => {this.setState({realInvestK: parseInt(e.target.value)})}}/><p className='question-box-p'>Alquiler o reventa tradicional</p></div>
                        <div className='question-box-div-div'><input className='question-box-input' type="radio" name='knowledge' value='5' onChange={(e) => {this.setState({realInvestK: parseInt(e.target.value)})}}/><p className='question-box-p'>Coliving, renta corta, flipping u otra</p></div>
                    </div>
                </div>
                <div className='nivelation-section-questions-left-q question-box' >
                    <h3 className='question-box-title'>¿Cuál de las siguientes afirmaciones se alinea más con tus objetivos de inversión?</h3>
                    <div className='question-box-div'>
                        <div className='question-box-div-div'><input className='question-box-input' type="radio" name='knowledge1' value='-1' onChange={(e) => {this.setState({investK: parseInt(e.target.value)})}}/><p className='question-box-p'>Asegurar y acumular capital por medio de ingresos mensuales (flujo pasivo de efectivo) más bien estables  </p></div>
                        <div className='question-box-div-div'><input className='question-box-input' type="radio" name='knowledge1' value='3' onChange={(e) => {this.setState({investK: parseInt(e.target.value)})}}/><p className='question-box-p'>Una combinacion entre ingresos mensuales (flujo pasivo) y valorización</p></div>
                        <div className='question-box-div-div'><input className='question-box-input' type="radio" name='knowledge1' value='5' onChange={(e) => {this.setState({investK: parseInt(e.target.value)})}}/><p className='question-box-p'>Diversificar mi portafolio de inversiones, buscando crecimiento monetario aceptando las posibles pérdidas que tenga</p></div>
                    </div>
                </div>
                <div className='nivelation-section-questions-left-q question-box' >
                    <h3 className='question-box-title'>¿Cuál es el horizonte de tiempo en el que planeas mantener tu inversión?</h3>
                    <div className='question-box-div'>
                        <div className='question-box-div-div'><input className='question-box-input' type="radio" name='objective' value='1' onChange={(e) => {this.setState({objective: parseInt(e.target.value)})}}/><p className='question-box-p'>Máximo 3 años</p></div>
                        <div className='question-box-div-div'><input className='question-box-input' type="radio" name='objective' value='2' onChange={(e) => {this.setState({objective: parseInt(e.target.value)})}}/><p className='question-box-p'>Entre 3 y 5 años</p></div>
                        <div className='question-box-div-div'><input className='question-box-input' type="radio" name='objective' value='3' onChange={(e) => {this.setState({objective: parseInt(e.target.value)})}}/><p className='question-box-p'>Más de 5 años</p></div>
                    </div>
                </div>
                <div className='nivelation-section-questions-left-q question-box' >
                    <h3 className='question-box-title'>¿Cuánto de tus ahorros estarías dispuesto a invertir?</h3>
                    <div className='question-box-div'>
                        <div className='question-box-div-div'><input className='question-box-input' type="radio" name='objective2' value='1' onChange={(e) => {this.setState({objective2: parseInt(e.target.value)})}}/><p className='question-box-p'>Hasta el 10%</p></div>
                        <div className='question-box-div-div'><input className='question-box-input' type="radio" name='objective2' value='2' onChange={(e) => {this.setState({objective2: parseInt(e.target.value)})}}/><p className='question-box-p'>Entre el 10% y el 30%</p></div>
                        <div className='question-box-div-div'><input className='question-box-input' type="radio" name='objective2' value='2' onChange={(e) => {this.setState({objective2: parseInt(e.target.value)})}}/><p className='question-box-p'>Entre el 30% y el 50 %</p></div>
                        <div className='question-box-div-div'><input className='question-box-input' type="radio" name='objective2' value='3' onChange={(e) => {this.setState({objective2: parseInt(e.target.value)})}}/><p className='question-box-p'>Más del 50 %</p></div>
                    </div>
                </div>
                <div className='nivelation-section-questions-left-q question-box' >
                    <h3 className='question-box-title'>¿Qué tipo de propiedades prefieres?</h3>
                    <div className='question-box-div'>
                        <div className='question-box-div-div'><input className='question-box-input' type="radio" name='savings' value='1' onChange={(e) => {this.setState({savings: parseInt(e.target.value)})}}/><p className='question-box-p'>Inmuebles nuevos</p></div>
                        <div className='question-box-div-div'><input className='question-box-input' type="radio" name='savings' value='2' onChange={(e) => {this.setState({savings: parseInt(e.target.value)})}}/><p className='question-box-p'>Inmuebles usados</p></div>
                        <div className='question-box-div-div'><input className='question-box-input' type="radio" name='savings' value='3' onChange={(e) => {this.setState({savings: parseInt(e.target.value)})}}/><p className='question-box-p'>Proyectos sobre planos</p></div>
                    </div>
                </div>
                <div className='nivelation-section-questions-left-q question-box' >
                    <h3 className='question-box-title'>¿Qué tan importante consideras que es la ubicación del inmueble a la hora de invertir en el mercado de bienes raíces?</h3>
                    <div className='question-box-divSlider'>
                        <p className='question-box-divSlider-tag'>Menos importante</p>
                        <input type="range" min={1} max={7} className='question-box-divSlider-slider' onChange={(e) => {this.setState({preference_location_level: parseInt(e.target.value)})}}/>
                        <p className='question-box-divSlider-tag'>Más importante</p>
                    </div>
                </div>
                <div className='nivelation-section-questions-left-q question-box' >
                    <h3 className='question-box-title'>¿Qué tan antiguo prefieres que sea el inmueble en que inviertes?</h3>
                    <div className='question-box-divSlider'>
                        <p className='question-box-divSlider-tag'>Más antiguos</p>
                        <input type="range" min={1} max={7} className='question-box-divSlider-slider' onChange={(e) => {this.setState({preference_age_level: parseInt(e.target.value)})}}/>
                        <p className='question-box-divSlider-tag'>Más nuevos</p>
                    </div>
                </div>
                <div className='nivelation-section-questions-left-q question-box' >
                    <h3 className='question-box-title'>¿Qué metraje prefieres que tenga el inmueble en que quieres inviertir?</h3>
                    <div className='question-box-divSlider'>
                        <p className='question-box-divSlider-tag'>Más pequeños</p>
                        <input type="range" min={1} max={7} className='question-box-divSlider-slider' onChange={(e) => {this.setState({preference_meters_level: parseInt(e.target.value)})}}/>
                        <p className='question-box-divSlider-tag'>Más grandes</p>
                    </div>
                </div>
                <div className='nivelation-section-questions-left-q question-box' >
                    <h3 className='question-box-title'>¿Qué tan importante consideras que son los servicios del inmueble la hora de invertir en el mercado de bienes raíces?</h3>
                    <div className='question-box-divSlider'>
                        <p className='question-box-divSlider-tag'>Menos importante</p>
                        <input type="range" min={1} max={7} className='question-box-divSlider-slider' onChange={(e) => {this.setState({preference_services_level: parseInt(e.target.value)})}}/>
                        <p className='question-box-divSlider-tag'>Más importante</p>
                    </div>
                </div>
                <div className='nivelation-section-questions-left-q question-box' >
                    <h3 className='question-box-title'>¿Qué tan importante consideras que son las características (habitaciones, parqueaderos, baños, etc) del inmueble la hora de invertir en el mercado de bienes raíces?</h3>
                    <div className='question-box-divSlider'>
                        <p className='question-box-divSlider-tag'>Menos importante</p>
                        <input type="range" min={1} max={7} className='question-box-divSlider-slider' onChange={(e) => {this.setState({preference_characteristics_level: parseInt(e.target.value)})}}/>
                        <p className='question-box-divSlider-tag'>Más importante</p>
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
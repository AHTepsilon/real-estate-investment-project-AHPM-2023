import React, { Component } from 'react'
import ResourceComponent from '../components/resourceComponent';
import './resources.scss'

export class Resources extends Component {
    
    constructor(props){
        super(props);
        this.state = {

        }
    }

  render() {
    return (
      <section className='resources-section'>
        <h1 className='resources-section-title'>Recursos y Documentación</h1>
        <h4 className='resources-section-subtitle'>Encuentra información y guías relevantes para adentrarte al mundo de las inversiones en bienes raíces</h4>
        <ResourceComponent imgsrc='https://www.publicdomainpictures.net/pictures/20000/velka/money-graph.jpg' title="¿Qué es la Amortización?" info='A qué se le conoce como "amortización" en terminos financieros y económicos y cómo puede afectar a una inversión'></ResourceComponent>
        <ResourceComponent imgsrc='https://as2.ftcdn.net/v2/jpg/01/89/38/79/1000_F_189387907_etLxIn1xXsje4KgqoO9qyLPUpaIRIL8m.jpg' title="Crear un plan de ahorros" info='¿Cómo crear un plan de ahorros que se conviera en un colchón para mi seguridad financiera? ¿Qué debo hacer para lograrlo?'></ResourceComponent>
        <ResourceComponent imgsrc='https://www.publicdomainpictures.net/pictures/270000/velka/house-money-budget-business-de.jpg' title="Estrategias de financiamiento" info='Sobre opciones de financiamiento y calcular tu cuota inicial'></ResourceComponent>
      </section>
    )
  }
}

export default Resources;
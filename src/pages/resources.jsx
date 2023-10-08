import React, { Component } from 'react'
import ResourceComponent from '../components/resourceComponent';

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
        <ResourceComponent imgsrc='' title='' info=''></ResourceComponent>
      </section>
    )
  }
}

export default Resources;
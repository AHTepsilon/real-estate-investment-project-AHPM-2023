import React, { Component } from 'react';
import axios from 'axios';
import { recSys } from '../functions/recommendationSystem';

export default class PropertyShowcase extends Component {

    constructor(props){
        super(props);
        this.state = {
            dataToGet: { mensaje: 'Ejemplo', info: 'Ejemplo'}
        }

    }

  getData = async(data) => {
    try{
        const response = await axios.get('http://localhost:8000/api/scraper');
        console.log(response.data);
    }
    catch(err){
        console.log('error', err)
    }
  }

  componentDidMount(){
    this.getData(this.state.dataToSend);
    recSys();
  }

  render() {
    return (
      <section>
        
      </section>
    )
  }
}

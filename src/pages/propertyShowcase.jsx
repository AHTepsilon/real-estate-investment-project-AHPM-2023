import React, { Component } from 'react';
import axios from 'axios';

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

  sendData = async() => {
    await axios.post('http://localhost:8000/api/rec_system', {
    firstName: 'Fred',
    lastName: 'Flintstone'
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error('Error al enviar datos:', error);
    });
  };

  componentDidMount(){
    this.getData(this.state.dataToSend);
    this.sendData();
  }

  render() {
    return (
      <section>
        
      </section>
    )
  }
}

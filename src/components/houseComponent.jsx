import React, { Component } from 'react';
import './styles/houseComponent.scss'

 class HouseComponent extends Component {
  render() {
    return (
      <div className='house-div'>
        <img className='house-div-img' src='/placeholder.jpg'></img>
        <div className='house-div-info'>
            <h2 className='house-div-info-price'>$0,000,000</h2>
            <h3 className='house-div-info-neighborhood'>Barrio</h3>
            <div className='house-div-info-lower'>
                <p className='house-div-info-lower-commune'>Comuna</p>
                <p className='house-div-info-lower-address'>Dirección</p>
            </div>
        </div>
      </div>
    )
  }
}

export default HouseComponent;

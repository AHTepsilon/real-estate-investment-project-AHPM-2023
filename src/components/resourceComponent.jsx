import React, { Component } from 'react';
import './styles/resourceComponent.scss'

  function ResourceComponent({imgsrc, title, info}){
    return (
      <div className='resource-div'>
        <img className='resource-div-img' src={imgsrc}></img>
        <div className='resource-div-inner'>
            <h3 className='resource-div-inner-h3'>{title}</h3>
            <p className='resource-div-inner-p'>{info}</p>
        </div>
      </div>
    )
  }

export default ResourceComponent;
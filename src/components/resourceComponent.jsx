import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles/resourceComponent.scss'

  function ResourceComponent({imgsrc, title, info, id, link, obtained}){
    return (
      <Link target="_blank" to={link}>
      <div className='resource-div'>
        <img className='resource-div-img' src={imgsrc}></img>
        <div className='resource-div-inner'>
            <h3 className='resource-div-inner-h3'>{title}</h3>
            <p className='resource-div-inner-p'>{info}</p>
            <p className='resource-div-inner-plower'>Vía {obtained}</p>
        </div>
      </div>
      </Link>
    )
  }

export default ResourceComponent;
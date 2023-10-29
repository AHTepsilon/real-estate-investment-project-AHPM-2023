import React, { Component, useState, useEffect } from 'react';
import './styles/houseComponent.scss'
import { db } from '../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Link, useParams } from 'react-router-dom';
import HeatmapComponent from './heatmapComponent';

  function HouseComponent({elementId}){
    const [data, setData] = useState({});

    useEffect(() => {
      const fetchData = async () => {
        try {
          const docRef = doc(db, 'properties', elementId);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            setData(docSnap.data());
          } else {
            console.log('No se encontró el documento');
          }
        } catch (error) {
          console.error('Error al obtener el documento:', error);
        }
      };
  
      fetchData();
    }, [elementId]);

    try{
      return (
        <Link to={'/property/' + elementId}>
        <div className='house-div'>
          <img className='house-div-img' src={data.imgurl}></img>
          <div className='house-div-info'>
              <div className='house-div-info-upper'>
                <h2 className='house-div-info-price'>{(data.precio).toLocaleString('en-US', {style: 'currency', currency: 'COP'})}</h2>
              </div>
              <div className='house-div-info-lower'>
                <div className='house-div-info-lower-aspects'>
                <p className='house-div-info-lower-aspects-tag'>{data.metrajeM2}m²</p>
                <p className='house-div-info-lower-aspects-tag'>{data.habitaciones} ha.</p>
                <p className='house-div-info-lower-aspects-tag'>{data.banos} ba.</p>
                <p className='house-div-info-lower-aspects-tag'>{data.parqueadero} pa.</p>
                </div>
                <div className='house-div-info-lower-affinity'>
                  <p className='house-div-info-lower-affinity-percentage'>{Math.floor(localStorage.getItem(elementId) * 100)}% de afinidad con tu perfil</p>
                </div>
                  <p className='house-div-info-lower-address'>{data.ubicacionBarrio}</p>
              </div>
          </div>
        </div>
        </Link>
      )
    }
    catch(error){

    }

  }

export default HouseComponent;

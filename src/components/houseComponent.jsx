import React, { Component, useState, useEffect } from 'react';
import './styles/houseComponent.scss'
import { db } from '../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';

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

    return (
      <div className='house-div'>
        <img className='house-div-img' src='/placeholder.jpg'></img>
        <div className='house-div-info'>
            <h2 className='house-div-info-price'>{data.precio}</h2>
            <h3 className='house-div-info-neighborhood'>{data.ubicacionBarrio}</h3>
            <div className='house-div-info-lower'>
                <p className='house-div-info-lower-commune'>Comuna</p>
                <p className='house-div-info-lower-address'>Dirección</p>
            </div>
        </div>
      </div>
    )
  }

export default HouseComponent;

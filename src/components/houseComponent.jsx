import React, { Component, useState, useEffect } from 'react';
import './styles/houseComponent.scss'
import { db } from '../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Link, useParams } from 'react-router-dom';

function findValueById(data, targetId) {
  console.log('testesttest', data, targetId);
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const array = data[key];
      for (let i = 0; i < array.length; i++) {
        const [id, value] = array[i];
        if (id === targetId) {
          return value;
        }
      }
    }
  }
  return 'No se encontró el ID';
}

  function HouseComponent({elementId}){
    const [data, setData] = useState({});
    const [similarities, setSimilarities] = useState(JSON.parse(localStorage.getItem('cosineList')));
    const [specSimil, setSpecSimil] = useState('');

    useEffect(() => {

      setSpecSimil(findValueById(similarities, elementId));

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
              <h2 className='house-div-info-price'>{(data.precio).toLocaleString('en-US', {style: 'currency', currency: 'COP'})}</h2>
              <h3 className='house-div-info-neighborhood'>{data.ubicacionBarrio}</h3>
              <div className='house-div-info-lower'>
                  <p className='house-div-info-lower-commune'>{specSimil}</p>
                  <p className='house-div-info-lower-address'>Dirección</p>
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

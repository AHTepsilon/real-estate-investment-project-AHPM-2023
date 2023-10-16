import React, { Component, useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import './styles/houseDetailComponent.scss'

function HouseDetailComponent() {
    const [data, setData] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const docRef = doc(db, "properties", id);
        const fetchData = async () => {
            try {
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setData(docSnap.data());
                }
            } catch (error) {
                console.error('Error al obtener el documento:', error);
            }
        };
        
        fetchData();

    }, [id]);

    try{
        return (
            <div className='houseDetailComponent'>
                <h1 className='houseDetailComponent-title'>Propiedad en venta</h1>
                <img className='houseDetailComponent-img' src={data.imgurl}></img>
                <div className='houseDetailComponent-pricediv'>
                    <h3 className='houseDetailComponent-pricediv-pesos'>{(data.precio).toLocaleString('en-US', {style: 'currency', currency: 'COP'})}</h3>
                    <h3 className='houseDetailComponent-pricediv-altCurrency'>{(data.precio / 4296).toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</h3>
                    <h3 className='houseDetailComponent-pricediv-altCurrency'>{(data.precio / 4489).toLocaleString('en-US', {style: 'currency', currency: 'EUR'})}</h3>
                </div>
                <p className='houseDetailComponent-tag'>Barrio: {data.ubicacionBarrio}</p>
                <p className='houseDetailComponent-tag'>{data.metrajeM2}m²</p>
                <p className='houseDetailComponent-tag'>Estado: {data.label}</p>
                <p className='houseDetailComponent-tag'>Antiguedad: Entre {data.antiguedad} y {data.antiguedadFinal} años</p>
                <ul className='houseDetailComponent-list'>
                    <li className='houseDetailComponent-list-item'>{data.habitaciones} habitaciones</li>
                    <li className='houseDetailComponent-list-item'>{data.banos} baños</li>
                    <li className='houseDetailComponent-list-item'>{data.parqueadero} parqueadero(s)</li>
                </ul>
    
            </div>
        );
    }
    catch(error){
        
    }

}

export default HouseDetailComponent;
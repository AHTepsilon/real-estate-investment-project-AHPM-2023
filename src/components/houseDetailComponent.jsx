import React, { Component, useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

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
            <div>
                <h1>Propiedad en venta</h1>
                <h3>{(data.precio).toLocaleString('en-US', {style: 'currency', currency: 'COP'})}</h3>
                <h3>{(data.precio / 4296).toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</h3>
                <h3>{(data.precio / 4489).toLocaleString('en-US', {style: 'currency', currency: 'EUR'})}</h3>
                <p>Barrio: {data.ubicacionBarrio}</p>
                <p>{data.metrajeM2}m²</p>
                <p>Estado: {data.label}</p>
                <p>Antiguedad: Entre {data.antiguedad} y {data.antiguedadFinal} años</p>
                <ul>
                    <li>{data.habitaciones} habitaciones</li>
                    <li>{data.banos} baños</li>
                    <li>{data.parqueadero} parqueadero(s)</li>
                </ul>
    
            </div>
        );
    }
    catch(error){
        
    }

}

export default HouseDetailComponent;
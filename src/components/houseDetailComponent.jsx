import React, { Component, useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import './styles/houseDetailComponent.scss'

function showAnalysis(){
    document.getElementById("houseDetailComponent-analysis").style.display="flex";
    window.location.href = '#houseDetailComponent-analysis';
}

function HouseDetailComponent() {
    const [data, setData] = useState({});
    const [interestRate, setInterestRate] = useState(1);
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
            <section className='houseDetailComponent-section'>
            <div className='houseDetailComponent'>
                <h1 className='houseDetailComponent-title'>Propiedad en venta</h1>
                <h2 className='houseDetailComponent-tag'>{data.ubicacionBarrio}</h2>
                <div className='houseDetailComponent-pricediv'>
                    <h2 className='houseDetailComponent-pricediv-pesos'>{(data.precio).toLocaleString('en-US', {style: 'currency', currency: 'COP'})}</h2>
                    <h2 className='houseDetailComponent-pricediv-altCurrency'>{(data.precio / 4296).toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</h2>
                    <h2 className='houseDetailComponent-pricediv-altCurrency'>{(data.precio / 4489).toLocaleString('en-US', {style: 'currency', currency: 'EUR'})}</h2>
                </div>
                <div className='houseDetailComponent-lower'>
                    <img className='houseDetailComponent-img' src={data.imgurl}></img>
                    <div className='houseDetailComponent-details'>
                        <div className='houseDetailComponent-details-left'>
                            <h2 className='houseDetailComponent-details-title'>Características</h2>
                            <p className='houseDetailComponent-tag'>{data.metrajeM2}m²</p>
                            <p className='houseDetailComponent-tag'>Estado: {data.label}</p>
                            <p className='houseDetailComponent-tag'>Antiguedad: Entre {data.antiguedad} y {data.antiguedadFinal} años</p>
                        </div>
                        <div className='houseDetailComponent-details-right'>
                            <h2 className='houseDetailComponent-details-title'>Servicios</h2>
                            <ul className='houseDetailComponent-list'>
                                <li className='houseDetailComponent-list-item'>{data.habitaciones} habitaciones</li>
                                <li className='houseDetailComponent-list-item'>{data.banos} baños</li>
                                <li className='houseDetailComponent-list-item'>{data.parqueadero} parqueadero(s)</li>
                            </ul>
                            <button className='houseDetailComponent-button' onClick={showAnalysis}>Analizar</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='houseDetailComponent-analysis' id='houseDetailComponent-analysis'>
                <div className='houseDetailComponent-analysis-upper'>
                    <h2 className='houseDetailComponent-tag'>Análisis</h2>
                </div>
                <div className='houseDetailComponent-analysis-lower'>
                    <div className='houseDetailComponent-analysis-lower-inner'>
                        <h3 className='houseDetailComponent-analysis-lower-inner-title'>Rango de valor de alquiler</h3>
                        <p className='houseDetailComponent-analysis-lower-inner-value'>Entre {((data.precio)*0.005).toLocaleString('en-US', {style: 'currency', currency: 'COP'})} y {((data.precio)*0.01).toLocaleString('en-US', {style: 'currency', currency: 'COP'})}</p>
                    </div>
                    <div className='houseDetailComponent-analysis-lower-inner'>
                        <h3 className='houseDetailComponent-analysis-lower-inner-title'>Potencial retorno luego de 10 años</h3>
                        <p className='houseDetailComponent-analysis-lower-inner-value'>Entre {(((data.precio)*0.005)*12).toLocaleString('en-US', {style: 'currency', currency: 'COP'})} y {(((data.precio)*0.01)*12).toLocaleString('en-US', {style: 'currency', currency: 'COP'})}</p>
                    </div>
                    <div className='houseDetailComponent-analysis-lower-inner'>
                        <h3 className='houseDetailComponent-analysis-lower-inner-title'>Valor de propiedad por m²</h3>
                        <p className='houseDetailComponent-analysis-lower-inner-value'>{(data.precio / data.metrajeM2).toLocaleString('en-US', {style: 'currency', currency: 'COP'})}</p>
                    </div>
                    <div className='houseDetailComponent-analysis-lower-inner'>
                        <h3 className='houseDetailComponent-analysis-lower-inner-title'>Valor de préstamo</h3>
                        <p className='houseDetailComponent-analysis-lower-inner-value'>{((data.precio * interestRate)/100).toLocaleString('en-US', {style: 'currency', currency: 'COP'})}</p>
                        <input type='range' min={12} max={20} onChange={(e) => {setInterestRate(e.target.value)}} className='analyzer-section-inner-div-secondary-input'></input>
                        <p className='houseDetailComponent-analysis-lower-inner-value'>{interestRate}%</p>
                    </div>
                </div>
            </div>
            </section>
        );
    }
    catch(error){
        
    }

}

export default HouseDetailComponent;
import React, { Component } from 'react';
import { useParams } from 'react-router-dom';

function HouseDetailComponent(){
    const {id} = useParams();

    return(
        <div>
            <h1>Propiedad en venta</h1>
        </div>
    )

}

export default HouseDetailComponent;
import React, { Component } from 'react';
import { useParams } from 'react-router-dom';

function HouseDetailComponent(){
    const {id} = useParams();
    console.log(id);

    return(
        <div>
            
        </div>
    )

}

export default HouseDetailComponent;
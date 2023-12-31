import { json } from "react-router-dom";
import HouseComponent from "../components/houseComponent";
import React from "react";
import PropertyList from "../components/propertyList";
import { useState } from "react";
import { db, auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

let listOfProperties;
let listOfCosines;

function GetSimilarity({data, propertyData}){

    const [userId, setUserId] = useState('');

    setTimeout(() => {
        
    listOfProperties = [];
    listOfCosines = [];
    
    Object.values(propertyData).forEach((property) => {

        listOfProperties.push(window['prop_' + property.id] = 
            [property.califAntiguedad,
            property.califCaracteristicas,
            property.califUbicacion,
            property.califMetraje,
            property.califServicios,
            property.id]);
    });

    let dataset1 = data;
    console.log("Data: ", dataset1)
    for(let i = 0; i < listOfProperties.length; i++){
        let dataset2 = listOfProperties[i];

        let AB = 0;
        let Ap = 0;
        let Bp = 0;
    
        for (let j = 0; j < 5; j++) {
            AB += dataset1[j] * dataset2[j];
            Ap += dataset1[j] ** 2;
            Bp += dataset2[j] ** 2; 
          }
    
        Ap = Math.sqrt(Ap);
        Bp = Math.sqrt(Bp);
    
        let cosineValue = AB/(Ap * Bp);
    
        console.log(listOfProperties[i][5] + ": " + cosineValue);

        listOfCosines.push([listOfProperties[i][5], cosineValue]);        
    }

    let sortedCosines = listOfCosines.sort((a, b) => a[1] - b[1]);
    console.log(sortedCosines);

    return(<div>
        {listOfCosines.map((element, index) => {
            <div key={index}>
                <h1>AHHHHHH</h1>
                {element}
            </div>
        })}
    </div>)
      }, 2000);
}

export default GetSimilarity;
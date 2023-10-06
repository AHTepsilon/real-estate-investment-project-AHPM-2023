import { json } from "react-router-dom";
import HouseComponent from "../components/houseComponent";

let globalListOfProperties = [];
let globalListOfCosines = [];

function getSimilarity(data, propertyData){

    let listOfProperties = [];
    let listOfCosines = [];
    
    Object.values(propertyData).forEach((property) => {

        listOfProperties.push(window['prop_' + property.id] = 
            [property.califAntiguedad,
            property.califCaracteristicas,
            property.califUbicacion,
            property.califMetraje,
            property.califServicios,
            property.id]);
    });

    console.log(listOfProperties)

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

    globalListOfProperties = listOfProperties;
    globalListOfCosines = listOfCosines;
}

function displayProperties(){

}

function recSys(array, array2){
    console.log("Data: ", array)
    const data = array;
    const dataProp = array2;
    let cosineSim = 1;

    getSimilarity(data, dataProp);
    displayProperties();
}

export {recSys, globalListOfCosines}
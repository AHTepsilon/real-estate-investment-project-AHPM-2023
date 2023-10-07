import React, { Component } from 'react';

export default class PropertyList extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: props.data,
            propertyData: props.propertyData,
            listOfCosines: []
        }

    }

    getSimilarity(props){

        console.log(props.data)

        let listOfProperties = [];
        let listOfCosines = [];
        
        Object.values(props.propertyData).forEach((property) => {
    
            listOfProperties.push(window['prop_' + property.id] = 
                [property.califAntiguedad,
                property.califCaracteristicas,
                property.califUbicacion,
                property.califMetraje,
                property.califServicios,
                property.id]);
        });
    
        let dataset1 = props.data;
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
        console.log('sorted cosines: ', sortedCosines);

        this.setState(prevState => ({
            listOfCosines: [...prevState.listOfCosines, ...sortedCosines]
          }));
    }

    componentDidMount(){
        setTimeout(() => {
            this.getSimilarity(this.props);
            this.forceUpdate();
          }, 4000);
    }

    render(){
        let listOfElements = this.state.listOfCosines;

        return(<div>
            <h1>AHHHHHH</h1>
        </div>)
    }
}
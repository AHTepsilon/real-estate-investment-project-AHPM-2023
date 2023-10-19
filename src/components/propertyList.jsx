import React, { Component } from 'react';
import HouseComponent from './houseComponent';
import './styles/propertyList.scss';
import { db, auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

export default class PropertyList extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: props.data,
            propertyData: props.propertyData,
            listOfCosines: [],
            userId: '',
        }

    }

    async uploadSimilaritiesToDatabase(sortedCosines){
        onAuthStateChanged(auth, (user) => {
            if (user) {
                    this.setState({userId: user.uid});
                } else {
                }
            });
    
            await sortedCosines.forEach((element) => {
                console.log('userId', this.state.userId);
                const similarityRef = doc(db, "similarities", this.state.userId);
                setDoc(similarityRef, {
                    id: element[0],
                    similarity: element[1]*100,
                });
    
        })
    }

    getSimilarity(props){

        console.log(props.data)

        let listOfProperties = [];
        let listOfCosines = [];
        
        Object.values(props.propertyData).forEach((property) => {

            let inherentRiskLevel = 30 - (property.califAntiguedad + property.califUbicacion + property.califCapacidadFinanciera);
            console.log('risk', inherentRiskLevel);

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
    
            listOfCosines.push([listOfProperties[i][5], cosineValue]);
        }
    
        let sortedCosines = listOfCosines.sort((a, b) => a[1] - b[1]);

        this.setState(prevState => ({
            listOfCosines: [...prevState.listOfCosines, ...sortedCosines]
          }));

        localStorage.setItem('cosineList', JSON.stringify(sortedCosines));

        sortedCosines.forEach((element) => {
            localStorage.setItem(element[0], element[1]);
        })
    }

    componentDidMount(){
        setTimeout(() => {
            this.getSimilarity(this.props);
            this.forceUpdate();
          }, 5000);
    }

    render(){
        let listOfElements = this.state.listOfCosines;

        listOfElements.sort((a, b) => {return b[1]-a[1]})

        return(<div className='propertylist'>
            {listOfElements.map(element => 
            <div className='propertylist-element' key={element}>
                <HouseComponent elementId = {element[0]}></HouseComponent>
            </div>)}
        </div>)
    }
}
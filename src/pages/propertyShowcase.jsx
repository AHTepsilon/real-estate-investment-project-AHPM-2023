import React, { Component } from 'react';
import axios from 'axios';
import { recSys, globalListOfCosines } from '../functions/recommendationSystem';
import { setDoc, doc, getDoc, onSnapshot, collection, query, where, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '../firebase/firebase';

export default class PropertyShowcase extends Component {

    constructor(props){
        super(props);
        this.state = {
            dataToGet: { mensaje: 'Ejemplo', info: 'Ejemplo'},
            id: '',
            userPreferences: [],
            propertyList: [],
        }

    }

    
  getProperties = async() => {
    const q = query(collection(db, "properties"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      this.setState({propertyList: this.state.propertyList.push(doc.data())})
      console.log(doc.id);
    });
  }

  getData = () => {
    this.getProperties();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;

        const docRef = doc(db, "users", uid);
        getDoc(docRef).then(docSnap => {
          if (docSnap.exists()) {
            let receivedPreferencesArr = 
            [
              docSnap.data().preference_age_level,
              docSnap.data().preference_characteristics_level,
              docSnap.data().preference_location_level,
              docSnap.data().preference_meters_level,
              docSnap.data().preference_services_level
            ]
            this.setState({userPreferences: receivedPreferencesArr});
            recSys(receivedPreferencesArr, this.state.propertyList);
          } else {
            console.log("No such document!");
          }
        })
    }});
  }

  displayProperties(item){
    let displaySection = document.getElementById('PropertyShowcase-section');
    const propertyLink = document.createElement('Link');
    propertyLink.className = 'propertyShowcase-section-propertyLink';
    propertyLink.setAttribute('to', `/property.html?id=${item.id}`);

    propertyLink.innerHTML = `
    <div className='house-div'>
    <img className='house-div-img' src='/placeholder.jpg'></img>
    <div className='house-div-info'>
        <h2 className='house-div-info-price'>${item.price}</h2>
        <h3 className='house-div-info-neighborhood'>${item.hood}</h3>
        <div className='house-div-info-lower'>
            <p className='house-div-info-lower-commune'>Comuna</p>
            <p className='house-div-info-lower-address'>Dirección</p>
        </div>
    </div>
  </div>
    `;

    displaySection.appendChild(propertyLink);

  }

  fillDisplaySection = async() => {
    const collectionRef = collection(db, "propertiers");
    const {docs} = await getDocs(collectionRef);
    
  }
  
  componentDidMount = () => {
    this.getData();
    console.log(globalListOfCosines);
  }

  render() {
    return (
      <section className='propertyShowcase-section' id='propertyShowcase-section'>
        
      </section>
    )
  }
}

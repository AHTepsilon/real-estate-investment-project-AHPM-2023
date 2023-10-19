import React, { Component } from 'react';
import axios from 'axios';
import getSimilarity from '../functions/recommendationSystem';
import { setDoc, doc, getDoc, onSnapshot, collection, query, where, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '../firebase/firebase';
import PropertyList from '../components/propertyList';
import GetSimilarity from '../functions/recommendationSystem';
import { property } from 'underscore';
import { redirectIfProfileUncomplete } from '../functions/redirectIfProfileUncomplete'
import './propertyShowcase.scss'

export default class PropertyShowcase extends Component {

    constructor(props){
        super(props);
        this.state = {
            dataToGet: { mensaje: 'Ejemplo', info: 'Ejemplo'},
            id: '',
            userPreferences: [],
            listOfProperties: [],
            loading: true,
        }

    }

    
  getProperties = async() => {
    const q = query(collection(db, "properties"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      this.setState((prevState) => ({
        listOfProperties: [...prevState.listOfProperties, doc.data()]
      }));
    });
  }

  getData = async() => {
    this.getProperties();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        this.setState({id: uid});

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
            console.log(receivedPreferencesArr);

            this.setState(prevState => ({
              userPreferences: [...prevState.userPreferences, ...receivedPreferencesArr]
            }));

          } else {
            console.log("No such document!");
          }
        })
    } else{
      alert('Necesitas iniciar sesión para usar nuestros servicios de búsqueda de inmuebles');
      window.location.href = '/signup';
    }});
  }

  displayProperties(item){
    
  }

  fillDisplaySection = () => {

  }

  componentDidUpdate(){
    if(this.state.listOfProperties.length > 0){
      setTimeout(() => {
        this.setState({loading: false})
      }, 3000);
    }
  }
  
  componentDidMount = async() => {
    this.getData();
  }

  render() {
    return (
      <section className='propertyShowcase-section' id='propertyShowcase-section'>
        {this.state.loading && 
        <div className='propertyShowcase-section-loadDiv'>
          <img className='propertyShowcase-section-loadDiv-loadIcon' src='loading-icon.svg'></img>
          <h3  className='propertyShowcase-section-loadDiv-tag'>Cargando propiedades...</h3>
        </div>}
        <PropertyList data={this.state.userPreferences} propertyData={this.state.listOfProperties}/>
      </section>
    )
  }
}

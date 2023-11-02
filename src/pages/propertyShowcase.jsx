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
import './propertyShowcase-media-queries.scss'

export default class PropertyShowcase extends Component {

    constructor(props){
        super(props);
        this.state = {
            dataToGet: { mensaje: 'Ejemplo', info: 'Ejemplo'},
            id: '',
            userPreferences: [],
            listOfProperties: [],
            loading: true,
            minPriceFilter:'',
            maxPriceFilter: '',
            stractFilter: '',
            ageFilter: '',
            roomFilter: '',
            parkingFilter: '',
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
              docSnap.data().preference_services_level,
              docSnap.data().investmentLevel,
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
    return this.state.listOfProperties;
  }

  componentDidUpdate(){
    if(this.state.listOfProperties.length > 0){
      setTimeout(() => {
        this.setState({loading: false});
        console.log(this.state.listOfProperties);
      }, 3000);
    } 
  }

  clearArray = () => {
    this.setState({ listOfProperties: [] });
    this.forceUpdate();
  }

  performFilters = () => {
    let initialArray = this.state.listOfProperties;
  }
  
  componentDidMount = async() => {
    this.getData();
  }

  render() {
    return (<div className='ps-general'>
      <div className='ps-filters'>
        <div className='ps-filters-area'>
        </div>
      </div>
      <div className='propertyShowcase'>
        <section className='propertyShowcase-filtersSection'>
          <div className='propertyShowcase-filtersSection-area'>
            <div className='propertyShowcase-filtersSection-area-div-1'>
              <h3 className='propertyShowcase-filtersSection-area-div-1-title'>Precio</h3>
              <div className='propertyShowcase-filtersSection-area-div-1-1'>
                <div className='propertyShowcase-filtersSection-area-div-1-1-textInputs'>
                  <div className='propertyShowcase-filtersSection-area-div-1-1-textInputs-inner'>
                    <p className='propertyShowcase-filtersSection-area-div-1-1-textInputs-inner-text'>Desde</p>
                    <input onChange={(e)=> {this.setState({minPriceFilter: e.target.value})}} type="text" className='propertyShowcase-filtersSection-area-div-1-1-textInputs-inner-input'/>
                  </div>
                  <div className='propertyShowcase-filtersSection-area-div-1-1-textInputs-inner'>
                    <p className='propertyShowcase-filtersSection-area-div-1-1-textInputs-inner-text'>Hasta</p>
                    <input onChange={(e)=> {this.setState({maxPriceFilter: e.target.value})}} type="text" className='propertyShowcase-filtersSection-area-div-1-1-textInputs-inner-input'/>
                  </div>
                </div>
              </div>
            </div>
            <div className='propertyShowcase-filtersSection-area-div-1'>
              <h3 className='propertyShowcase-filtersSection-area-div-1-title'>Estrato</h3>
              <div className='propertyShowcase-filtersSection-area-div-1-1'>
                <div className='propertyShowcase-filtersSection-area-div-1-1-buttonInputs'>
                  <button onClick={(e)=> {this.setState({stractFilter: ''})}} className='propertyShowcase-filtersSection-area-div-1-1-buttonInputs-button'>Todos</button>
                  <button onClick={(e)=> {this.setState({stractFilter: 1})}} className='propertyShowcase-filtersSection-area-div-1-1-buttonInputs-button'>1</button>
                  <button onClick={(e)=> {this.setState({stractFilter: 2})}} className='propertyShowcase-filtersSection-area-div-1-1-buttonInputs-button'>2</button>
                  <button onClick={(e)=> {this.setState({stractFilter: 3})}} className='propertyShowcase-filtersSection-area-div-1-1-buttonInputs-button'>3</button>
                  <button onClick={(e)=> {this.setState({stractFilter: 4})}} className='propertyShowcase-filtersSection-area-div-1-1-buttonInputs-button'>4</button>
                  <button onClick={(e)=> {this.setState({stractFilter: 5})}} className='propertyShowcase-filtersSection-area-div-1-1-buttonInputs-button'>5</button>
                  <button onClick={(e)=> {this.setState({stractFilter: 6})}} className='propertyShowcase-filtersSection-area-div-1-1-buttonInputs-button'>6</button>
                </div>
              </div>
            </div>
            <div className='propertyShowcase-filtersSection-area-div-1'>
              <h3 className='propertyShowcase-filtersSection-area-div-1-title'>Antigüedad del inmueble (en años)</h3>
              <div className='propertyShowcase-filtersSection-area-div-1-1'>
                <div className='propertyShowcase-filtersSection-area-div-1-1-buttonInputs'>
                <button onClick={(e)=> {this.setState({stractFilter: ''})}} className='propertyShowcase-filtersSection-area-div-1-1-buttonInputs-button'>Cualquiera</button>
                  <button onClick={(e)=> {this.setState({stractFilter: 1})}} className='propertyShowcase-filtersSection-area-div-1-1-buttonInputs-button'>Entre 0 y 5</button>
                  <button onClick={(e)=> {this.setState({stractFilter: 2})}} className='propertyShowcase-filtersSection-area-div-1-1-buttonInputs-button'>Entre 6 y 10</button>
                  <button onClick={(e)=> {this.setState({stractFilter: 3})}} className='propertyShowcase-filtersSection-area-div-1-1-buttonInputs-button'>Entre 11 y 15</button>
                  <button onClick={(e)=> {this.setState({stractFilter: 4})}} className='propertyShowcase-filtersSection-area-div-1-1-buttonInputs-button'>Más de 16 años</button>
                </div>
              </div>
            </div>
            <div className='propertyShowcase-filtersSection-area-div-1'>
              <h3 className='propertyShowcase-filtersSection-area-div-1-title'>Cantidad de habitaciones</h3>
              <div className='propertyShowcase-filtersSection-area-div-1-1'>
                <div className='propertyShowcase-filtersSection-area-div-1-1-buttonInputs'>
                <button onClick={(e)=> {this.setState({roomFilter: ''})}} className='propertyShowcase-filtersSection-area-div-1-1-buttonInputs-button'>Cualquiera</button>
                  <button onClick={(e)=> {this.setState({roomFilter: 1})}} className='propertyShowcase-filtersSection-area-div-1-1-buttonInputs-button'>1</button>
                  <button onClick={(e)=> {this.setState({roomFilter: 2})}} className='propertyShowcase-filtersSection-area-div-1-1-buttonInputs-button'>2</button>
                  <button onClick={(e)=> {this.setState({roomFilter: 3})}} className='propertyShowcase-filtersSection-area-div-1-1-buttonInputs-button'>3</button>
                  <button onClick={(e)=> {this.setState({roomFilter: 4})}} className='propertyShowcase-filtersSection-area-div-1-1-buttonInputs-button'>4</button>
                  <button onClick={(e)=> {this.setState({roomFilter: 5})}} className='propertyShowcase-filtersSection-area-div-1-1-buttonInputs-button'>5</button>
                  <button onClick={(e)=> {this.setState({roomFilter: 6})}} className='propertyShowcase-filtersSection-area-div-1-1-buttonInputs-button'>6+</button>
                </div>
              </div>
            </div>
            <div className='propertyShowcase-filtersSection-area-div-1'>
              <h3 className='propertyShowcase-filtersSection-area-div-1-title'>Parqueaderos</h3>
              <div className='propertyShowcase-filtersSection-area-div-1-1'>
                <div className='propertyShowcase-filtersSection-area-div-1-1-buttonInputs'>
                <button onClick={(e)=> {this.setState({parkingFilter: ''})}} className='propertyShowcase-filtersSection-area-div-1-1-buttonInputs-button'>Cualquiera</button>
                  <button onClick={(e)=> {this.setState({parkingFilter: 1})}} className='propertyShowcase-filtersSection-area-div-1-1-buttonInputs-button'>No tiene</button>
                  <button onClick={(e)=> {this.setState({parkingFilter: 2})}}  className='propertyShowcase-filtersSection-area-div-1-1-buttonInputs-button'>1</button>
                  <button onClick={(e)=> {this.setState({parkingFilter: 3})}}  className='propertyShowcase-filtersSection-area-div-1-1-buttonInputs-button'>2</button>
                  <button onClick={(e)=> {this.setState({parkingFilter: 4})}}  className='propertyShowcase-filtersSection-area-div-1-1-buttonInputs-button'>3+</button>
                </div>
              </div>
            </div>
            <button onClick={this.clearArray} className='propertyShowcase-filtersSection-area-button'>Aplicar filtros</button>
          </div>
        </section>
        <section className='propertyShowcase-section' id='propertyShowcase-section'>
          {this.state.loading && 
          <div className='propertyShowcase-section-loadDiv'>
            <img className='propertyShowcase-section-loadDiv-loadIcon' src='loading-icon.svg'></img>
            <h3  className='propertyShowcase-section-loadDiv-tag'>Cargando propiedades...</h3>
          </div>}
          <PropertyList data={this.state.userPreferences} propertyData={this.state.listOfProperties}/>
        </section>
      </div>
      </div>
    )
  }
}

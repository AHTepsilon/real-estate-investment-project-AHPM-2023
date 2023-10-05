import React, { Component } from 'react';
import axios from 'axios';
import { recSys } from '../functions/recommendationSystem';
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

  getDataForRecSys = async() => {

  }
  
  componentDidMount = () => {
    
    this.getData();
  }

  render() {
    return (
      <section>
        <h2></h2>
      </section>
    )
  }
}

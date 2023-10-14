import React, { Component } from 'react'
import ResourceComponent from '../components/resourceComponent';
import { setDoc, doc, getDoc, onSnapshot, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import './resources.scss'

export class Resources extends Component {
    
    constructor(props){
        super(props);
        this.state = {
          listOfResources: []
        }
    }

  getData = async() => {
    const q = query(collection(db, "resources"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      this.setState((prevState) => ({
        listOfResources: [...prevState.listOfResources, doc.data()]
      }));
    });

    console.log(this.state.listOfResources);
  }

  componentDidMount = () => {
    this.getData();
    setTimeout(() => {
      this.forceUpdate(); 
    }, 4000);
  }

  render() {
    return (
      <section className='resources-section'>
        <h1 className='resources-section-title'>Recursos y Documentación</h1>
        <h4 className='resources-section-subtitle'>Encuentra información y guías relevantes para adentrarte al mundo de las inversiones en bienes raíces</h4>
        {this.state.listOfResources.map(element => 
            <div className='resources-section-component' key={element.id}>
                <ResourceComponent imgsrc = {element.imgurl} title = {element.title} info = {element.subtitle} id = {element.id}></ResourceComponent>
            </div>)}
      </section>
    )
  }
}

export default Resources;
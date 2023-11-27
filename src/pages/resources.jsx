import React, { Component } from 'react'
import ResourceComponent from '../components/resourceComponent';
import { setDoc, doc, getDoc, onSnapshot, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import './resources.scss'

export class Resources extends Component {
    
    constructor(props){
        super(props);
        this.state = {
          listOfResources: [],
          listOfNews: [],
          toggleResources: true,
          toggleNews: false,
        }
    }

  getData = async() => {
    const q = query(collection(db, "resources"));
    const n = query(collection(db, "news"));

    const querySnapshot = await getDocs(q);
    const querySnapshotNews = await getDocs(n);
    
    querySnapshot.forEach((doc) => {
      this.setState((prevState) => ({
        listOfResources: [...prevState.listOfResources, doc.data()]
      }));
    });

    querySnapshotNews.forEach((doc) => {
      this.setState((prevState) => ({
        listOfNews: [...prevState.listOfNews, doc.data()]
      }));
    });
  }

  switchToResources = () => {
    this.setState({toggleResources: true});
    this.setState({toggleNews: false});
    document.getElementById('resource-btn').style.borderBottom = '2px solid #F5921D';
    document.getElementById('news-btn').style.borderBottom = 'none';
  }

  switchToNews = () => {
    this.setState({toggleResources: false});
    this.setState({toggleNews: true});
    document.getElementById('resource-btn').style.borderBottom = 'none';
    document.getElementById('news-btn').style.borderBottom = '2px solid #F5921D';
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
        <div className='resources-section-tabs'>
          <h3 className='resources-section-tabs-clickable resources-section-tabs-clickable-re' id='resource-btn' onClick={this.switchToResources}>Recursos</h3>
          <h3 className='resources-section-tabs-clickable resources-section-tabs-clickable-ne' id='news-btn' onClick={this.switchToNews}>Noticias</h3>
        </div>
        <h1 className='resources-section-title'>Recursos y Documentación</h1>
        <h4 className='resources-section-subtitle'>Encuentra información y guías relevantes para adentrarte al mundo de las inversiones en bienes raíces</h4>
        
        {this.state.toggleResources && 
        <div className='tab-1' id='tab-1'>
        {this.state.listOfResources.map(element => 
            <div className='resources-section-component' key={element.id}>
                <ResourceComponent imgsrc = {element.imgurl} title = {element.title} info = {element.subtitle} id = {element.id} link = {element.link} obtained={element.obtained}></ResourceComponent>
            </div>)}
        </div>}

        {this.state.toggleNews && 
        <div className='tab-2' id='tab-2'>
        {this.state.listOfNews.map(element => 
            <div className='resources-section-component' key={element.id}>
                <ResourceComponent imgsrc = {element.imgurl} title = {element.title} info = {element.subtitle} id = {element.id} link = {element.link} obtained={element.obtained}></ResourceComponent>
            </div>)}
        </div>}
      </section>
    )
  }
}

export default Resources;
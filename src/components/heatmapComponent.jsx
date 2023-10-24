import React, {useState, useEffect} from "react";
import { db } from "../firebase/firebase";
import { doc, getDoc } from 'firebase/firestore';
import './styles/heatmapComponent.scss'

function reviseAgeData(ageMin, ageMax) {
    console.log(ageMin);
    if(ageMin >= 16 && ageMax <= 30){
        document.getElementById('heatmapComponent-age').style.backgroundColor='#FF8300';
    }
    else if(ageMin >= 9 && ageMax <= 15){
        document.getElementById('heatmapComponent-age').style.backgroundColor='#FFCD00';
    }
}

function HeatmapComponent({elementId}){
    const [data, setData] = useState({});

    useEffect(() => {
      const fetchData = async () => {
        try {
          const docRef = doc(db, 'properties', elementId);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            setData(docSnap.data());
            
            reviseAgeData(docSnap.data().antiguedad, docSnap.data().antiguedadFinal);
          } else {
            console.log('No se encontró el documento');
          }
        } catch (error) {
          console.error('Error al obtener el documento:', error);
        }
      };
  
      fetchData();
    }, [elementId]);
    
    return(
    <div className='heatmapComponent'>
        <div id='heatmapComponent-age' className='heatmapComponent-item'>
            
        </div>
        <div id='heatmapComponent-characteristics' className='heatmapComponent-item'>
            
        </div>
        <div id='heatmapComponent-location' className='heatmapComponent-item'>
            
        </div>
        <div id='heatmapComponent-meters' className='heatmapComponent-item'>
            
        </div>
        <div id='heatmapComponent-services' className='heatmapComponent-item'>
            
        </div>
    </div>
    )
    
}

export default HeatmapComponent;
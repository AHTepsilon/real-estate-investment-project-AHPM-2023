import React, { Component, useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import "./styles/resourceDetailComponent.scss"

function ResourceDetailComponent() {
    const [data, setData] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const docRef = doc(db, "resources", id);
        const fetchData = async () => {
            try {
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setData(docSnap.data());
                }
            } catch (error) {
                console.error('Error al obtener el documento:', error);
            }
        };
        
        fetchData();

    }, [id]);

    try{
        return (
            <div className="resourceDetailComponent-div">
                <img className="resourceDetailComponent-div-img" src={data.imgurl}></img>
                <h1 className="resourceDetailComponent-div-title">{data.title}</h1>
                <h3 className="resourceDetailComponent-div-subtitle">{data.subtitle}</h3>
            </div>
        );
    }
    catch(error){
        
    }

}

export default ResourceDetailComponent;
import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { id } from '../functions/redirectLoggedUser';
import './user.scss'

const getUserData = () => {
    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            const uid = user.uid;
            resolve(uid);
          } else {
            reject('Usuario no autenticado');
          }
        });
      });
}

const getData = async() => {

    try {
        const uid = await getUserData();
        const docRef = doc(db, 'users', uid);
        const docSnap = await getDoc(docRef);
        return(docSnap.data());
      } catch (error) {
        console.error('Error:', error);
      }

}

const logOut = () => {
    signOut(auth).then(() => {
    window.location.href = '/';
    }).catch((error) => {
    console.log(error);
     });
}

const User = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        const result = await getData();
        console.log(result);
        setUserData(result); // Almacena el resultado en el estado
      };
      fetchData();
    }, []);

    return (
        <div className='userPage'>
            <h1>Usuario</h1>
            {userData && (
                <div className='userPage-inner'>
                    <h2 className='userPage-inner-title'>Id: {userData.id}</h2>
                    <h3  className='userPage-inner-tag'>Correo electrónico: {userData.email}</h3>
                    <button  className='userPage-inner-button' onClick={logOut}>Cerrar sesión</button>
                    <Link  className='userPage-inner-link' to='/nivelation'>Repetir el formulario de nivelación</Link>
                </div>
              )}
        </div>
    )
}

export default User;
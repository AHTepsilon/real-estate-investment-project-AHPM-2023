import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.scss'
import {Link} from 'react-router-dom'
import { auth } from './firebase/firebase.js'
import { onAuthStateChanged } from "firebase/auth";
import { id } from "./functions/redirectLoggedUser"

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  });

  console.log(isLoggedIn);
  console.log(id);

  return (
    <>
      {isLoggedIn === false &&<section className='section'>
         <h2 className='section-title'>Es necesario iniciar sesión o crear una cuenta para usar nuestros servicios</h2>
        <Link to='/login' className='section-button'>Iniciar Sesión</Link>
        <Link to='/signup' className='section-button'>Crear una Cuenta</Link>
      </section>}
      {isLoggedIn === true &&<section className='section'>
        <Link to='/showcase' className='section-button'>Ver propiedades</Link>
      </section>}
    </>
  )
}

export default App;

import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.scss'
import {Link} from 'react-router-dom'
import { auth, db } from './firebase/firebase.js'
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore"
import { id } from "./functions/redirectLoggedUser"
import { redirectIfProfileUncomplete } from './functions/redirectIfProfileUncomplete'
import LoginSignUpModalComponent from './components/loginSignUpModalComponent'

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");
  const [hasProfiled, setHasProfiled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUserId(uid);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    redirectIfProfileUncomplete(userId);
  }, [userId]);

  return (
    <section className='landing-section'>
      <div className='landing-section-left'>
        <div className='landing-section-left-info'>
          <h2 className='landing-section-left-info-title'>Diversifica tu portafolio financiero invirtiendo en bienes raíces</h2>
          <p className='landing-section-left-info-text'>Busca, encuentra, compara, analiza y haz tu primera inversión con todas las herramientas al alcance de tu mano.</p>
        </div>
        {isLoggedIn === false &&<div className='landing-section-left-div'>
          <button className='landing-section-left-div-button' onClick={() => {setShowModal(true)}}>Busca tu primer inmueble</button>
          {showModal === true && <LoginSignUpModalComponent>
            </LoginSignUpModalComponent>}
        </div>}
        {isLoggedIn === true &&<div className='landing-section-left-div'>
          <Link to='/showcase' className='landing-section-left-div-button'>Busca tu primer inmueble</Link>
        </div>}
      </div>
      <div className='landing-section-right'>
        <img className='landing-section-right-img' src="/landingImage.png" alt="" />
      </div>
    </section>
  )
}

export default App;

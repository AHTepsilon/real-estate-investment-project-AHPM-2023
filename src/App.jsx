import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './AppNew.scss'
import './App-media-queries.scss'
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
      <div className='landing-section-first' id='landing-section-first'>
        <img className='landing-section-first-img' src="/mainImage1v2.png" alt="" />
        <h1 className='landing-section-first-h1'>¡Te ayudamos a invertir en bienes raíces hoy!</h1>
        <h3 className='landing-section-first-h3'>Busca, encuentra, compara, analiza y haz tu primera inversión con todas las herramientas al alcance de tu mano.</h3>
        {isLoggedIn === false &&<div className='landing-section-first-div'>
          <button className='landing-section-first-div-button' onClick={() => {setShowModal(true)}}>Busca tu primer inmueble</button>
          {showModal === true && <LoginSignUpModalComponent>
            </LoginSignUpModalComponent>}
        </div>}
        {isLoggedIn === true &&<div className='landing-section-first-div'>
          <Link to='/showcase' className='landing-section-first-div-button'>Busca tu primer inmueble</Link>
        </div>}
      </div>
      <div className='landing-section-second'>
            <div className='landing-section-second-left'>
              <img className='landing-section-second-left-img' src="/Group8757.png" alt="" />
            </div>
            <div className='landing-section-second-right'>
              <h2 className='landing-section-second-right-h2'>Encuentras el inmueble más afin a ti</h2>
              <p className='landing-section-second-right-p'>Tener visión en bienes raíces es saber identificar proyecciones a futuro de un inmueble con gran potencial en base al crecimiento que lo rodea. <br></br><br></br>
              En dinubi te brindamos una experiencia personalizada en la búsqueda de oportunidades para invertir en bienes raíces en Cali, Colombia. Creamos un sistema que te recomienda inmuebles basandose en tu perfil de riesgo, objetivos de inversión y preferencias. </p>
            </div>
      </div>
      <div className='landing-section-third'>
        <h2 className='landing-section-third-h2'>¿Cómo te ayudamos a buscar la mejor inversión?</h2>
        <p className='landing-section-third-p'>En Dinubi te brindamos las herramientas para que tomes la mejor decisión. Explóralas, úsalas y analiza.</p>
        <div className='landing-section-third-lower'>
            <div className='landing-section-third-lower-left'>
                <h2 className='landing-section-third-lower-left-h2'>1. Perfil de riesgo</h2>
                <p className='landing-section-third-lower-left-p'>Conoce tu perfil de riesgo, con este tenemos la clave para hacer recomendaciones de inmuebles que cumplan con tus necesidades.</p>
                {isLoggedIn === false &&<div className='landing-section-first-div'>
                  <Link to='/signup' className='landing-section-third-lower-left-button'>Inicia sesión</Link>
                </div>}
                {isLoggedIn === true &&<div className='landing-section-first-div'>
                  <Link to='/nivelation' className='landing-section-third-lower-left-button'>Conoce tu perfil</Link>
                </div>}
                <img className='landing-section-third-lower-left-img' src="/house-icon-1.png" alt="" />
            </div>
            <div className='landing-section-third-lower-right'>
                <Link to='' onClick={(e) => {if(isLoggedIn){window.location.href = '/showcase'}else{window.location.href = '/signup'}}} className='landing-section-third-lower-right-inner'>
                <div className='landing-section-third-lower-right-inner-left'>
                  <h2 className='landing-section-third-lower-right-inner-left-h2-or'>2. Buscador</h2>
                  <p className='landing-section-third-lower-right-inner-left-p'>Explora los inmuebles disponibles para comprar, un sistema adaptado a tus necesidades y preferencias </p>
                </div>
                <div className='landing-section-third-lower-right-inner-right'>
                  <img className='landing-section-third-lower-right-inner-right-img' src="/decor-orange.png" alt="" />
                </div>
                </Link>
              <Link to='/analyzer' className='landing-section-third-lower-right-inner'>
              <div className='landing-section-third-lower-right-inner-left'>
                  <h2 className='landing-section-third-lower-right-inner-left-h2-bl'>3. Analiza</h2>
                  <p className='landing-section-third-lower-right-inner-left-p'>El pago de tu siguiente inversión, los costos adicionales y más. </p>
                </div>
                <div className='landing-section-third-lower-right-inner-right'>
                  <img className='landing-section-third-lower-right-inner-right-img' src="/decor-blue.png" alt="" />
                </div>
              </Link>
              <Link to='/resources' className='landing-section-third-lower-right-inner'>
              <div className='landing-section-third-lower-right-inner-left'>
                  <h2 className='landing-section-third-lower-right-inner-left-h2-gr'>4. Infórmate</h2>
                  <p className='landing-section-third-lower-right-inner-left-p'>Sobre el mundo inmobiliario, consejos, noticias, tendencias y más. </p>
                </div>
                <div className='landing-section-third-lower-right-inner-right'>
                  <img className='landing-section-third-lower-right-inner-right-img' src="/decor-green.png" alt="" />
                </div>
              </Link>

        </div>
        </div>
      </div>
    {/*  <section className='landing-section'>
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
          </section> */}
    </section>

  )
}

export default App;

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
    <>
      {isLoggedIn === false &&<section className='section'>
        <button onClick={() => {setShowModal(true)}} className='section-button'>Ver propiedades</button>
        {showModal === true && <LoginSignUpModalComponent>
          </LoginSignUpModalComponent>}
      </section>}
      {isLoggedIn === true &&<section className='section'>
        <Link to='/showcase' className='section-button'>Ver propiedades</Link>
      </section>}
    </>
  )
}

export default App;

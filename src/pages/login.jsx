import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { auth } from '../firebase/firebase.js';
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import {redirectLoggedUser} from '../functions/redirectLoggedUser.js';
import './login.scss'

export default class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
          isLoggedIn: "",
          email: "",
          pass: "",
          error: false,
        }
    }

  componentDidMount = () => {
    redirectLoggedUser();
  }

  userLogIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user.uid);
      alert("acceso con exito");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      this.setState({error: true});
    });
  }

  render() {
    return (
      <div className='login'>
      <section className = 'login-section'>
        <h2 className = 'login-section-title'>Inicia sesión</h2>
        <div className = 'login-section-div'>
            <div className='login-section-div-username'>
                <p className='login-section-div-username-label'>Nombre de usuario</p>
                <input className='login-section-div-username-input' type='text' onChange={(e) => {this.setState({email: e.target.value})}}></input>
            </div>
            <div className='login-section-div-pass'>
                <p className='login-section-div-pass-label'>Contraseña</p>
                <input className='login-section-div-pass-input' type='password' onChange={(e) => {this.setState({pass: e.target.value})}}></input>
            </div>
            {this.state.error && <p className='login-section-div-errorMessage'>Usuario o contraseña incorrectos, por favor intenta otra vez</p>}
        </div>
        <div className='login-section-lower'>
            <Link className='login-section-lower-link' to='/signup'>¿No tienes una cuenta? Regístrate aquí</Link>
            <button className='login-section-lower-button' onClick = {() => {this.userLogIn(this.state.email, this.state.pass)}}>Iniciar sesión</button>
        </div>
      </section>
      <section className = 'img-section'>
      <img src="/keys.png" className='img-section-img' alt="" />
      </section>
      </div>
    )
  }
}
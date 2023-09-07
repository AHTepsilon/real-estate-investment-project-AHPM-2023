import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword} from 'firebase/auth'; 
import { auth, db } from '../firebase/firebase.js';
import { doc, setDoc } from 'firebase/firestore';
import './signup.scss';

export default class SignUp extends Component {

    constructor(props){
        super(props);
        this.state = {
          uid: "",
          name: "",
          lname: "",
          username: "",
          email: "",
          pass: "",
          pass2: "",
        }

    }

  createUser = () => {

    let email = this.state.email;
    let password = this.state.pass;
    let password2 = this.state.pass2;

    if(password === password2){
      createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
        const user = userCredential.user;
        console.log(user.uid);
        this.setState({uid: user.uid}, () => {
          this.sendDataToDatabase(email);
        });
  
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        alert(errorMessage);
      });
    }
    else{
      alert("Las contraseñas no coinciden");
    }
  }

  async sendDataToDatabase(email){
    await setDoc(doc(db, "users", this.state.uid), {
      email: email,
      hasCompletedProfile: false,
    });

    alert("Usuario creado con id " + this.state.uid);

    window.location.href = "/profiling";
  }

  render() {
    return (
      <>
      <section className='signup-section'>
        <div className = 'signup-section-div'>
         {/* <div className = 'signup-section-div-left'>
            <div className = 'signup-section-div-left-name'>
              <p className='signup-section-div-left-name-label'>Nombre</p>
              <input className='signup-section-div-left-name-input' type='text' onChange={(e) => {this.setState({name: e.target.value} )}}></input>
            </div>
            <div className = 'signup-section-div-left-lname'>
              <p className='signup-section-div-left-lname-label'>Apellidos</p>
              <input className='signup-section-div-left-lname-input' type='text' onChange={(e) => {this.setState({lname: e.target.value})}}></input>          
            </div>
            <div className = 'signup-section-div-left-username'>
              <p className='signup-section-div-left-lname-label'>Nombre de usuario</p>
              <input className='signup-section-div-left-username-input' type='text' onChange={(e) => {this.setState({username: e.target.value})}}></input>
            </div>
        </div>*/}
          <div className = 'signup-section-div-right'>
            <div className = 'signup-section-div-right-email'>
              <p className='signup-section-div-right-email-label'>Correo electrónico</p>
              <input className='signup-section-div-right-email-input' type='email' onChange={(e) => {this.setState({email: e.target.value})}}></input>
            </div>
            <div className = 'signup-section-div-right-pass'>
              <p className='signup-section-div-left-right-label'>Contraseña</p>
              <input className='signup-section-div-right-pass-input' type='password' onChange={(e) => {this.setState({pass: e.target.value})}}></input>
            </div>
            <div className = 'signup-section-div-right-pass2'>
              <p className='signup-section-div-right-pass2-label'>Confirmar contraseña</p>
              <input className='signup-section-div-right-pass2-input' type='password' onChange={(e) => {this.setState({pass2: e.target.value})}}></input>              
            </div>
          </div>
        </div>
        <div className = 'signup-section-lower'>
            <Link className='signup-section-lower-link' to='/login'>¿Ya tienes una cuenta? Inicia sesión aquí</Link>
            <button className='signup-section-lower-button' onClick={this.createUser}>Crear cuenta</button>
        </div>
      </section>
      </>
    ) 
  }
}
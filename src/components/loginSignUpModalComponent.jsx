import React from "react";
import { Link } from "react-router-dom";
import './styles/loginSignUpModalComponent.scss'

function LoginSignUpModalComponent(){

    return(
        <div className='Modal-overlay'>
            <div className='LoginSignUpModalComponent-div'>
                <div className='LoginSignUpModalComponent-div-upper'>
                    <div className='LoginSignUpModalComponent-div-upper-left'>
                        <img className='LoginSignUpModalComponent-div-upper-left-smile' src="/smile.png" alt="" />
                    </div>
                    <div className='LoginSignUpModalComponent-div-upper-right'>
                        <h2 className='LoginSignUpModalComponent-div-upper-right-title'>¡Hola inversionisa!</h2>
                        <p className='LoginSignUpModalComponent-div-upper-right-title-info'>Para iniciar tu búsqueda es necesario que <b>inicies sesión</b> o te <b>registres</b>, así podremos moldear la experiencia a tu medida.</p>
                    </div>
                </div>
                <div className='LoginSignUpModalComponent-div-lower'>
                    <button onClick={() => {window.location.href = '/login'}} className='LoginSignUpModalComponent-div-lower-login'>Iniciar sesión</button>
                    <button onClick={() => {window.location.href = '/signup'}} className='LoginSignUpModalComponent-div-lower-signup'>Crear una cuenta</button>
                </div>
            </div>
        </div>
    )
}

export default LoginSignUpModalComponent;
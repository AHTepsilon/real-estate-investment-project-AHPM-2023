import React, {Component} from 'react';
import './styles/header.scss';

export default class Header extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return <header className='header'>
            <div className='header-container'>
                <div className='header-container-left-div'>
                    <div className='header-container-left-div-logo-div'>
                        Logo
                    </div>
                    <div className='header-container-left-div-list-div'>
                        <ul className='header-container-left-div-list-div-ul'>
                            <li className='header-container-left-div-list-div-ul-li'><a href=''>Calculadora de inversión</a></li>
                            <li className='header-container-left-div-list-div-ul-li'><a href=''>Administrador de inversiones</a></li>
                            <li className='header-container-left-div-list-div-ul-li'><a href=''>Recursos y documentación</a></li>
                        </ul>
                    </div>
                </div>
                <div className='header-container-right-div'>
                    <a href='' className='header-container-right-div-link'>Acceder</a>
                </div>
            </div>
        </header>
    }
}
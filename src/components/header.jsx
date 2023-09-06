import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase/firebase';
import { onAuthStateChanged } from "firebase/auth";
import './styles/header.scss';

export default class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoggedIn: true,
        }
    }

    async componentDidMount() {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              const uid = user.uid;
              this.setState({isLoggedIn: true});
            } else {
              this.setState({isLoggedIn: false});
            }
          });
    }

    render(){
        return <header className='header'>
            <div className='header-container'>
                <div className='header-container-left-div'>
                    <div className='header-container-left-div-logo-div'>
                        <Link to='/'><img src='/logo.png'></img></Link>
                    </div>
                    <div className='header-container-left-div-list-div'>
                        <ul className='header-container-left-div-list-div-ul'>
                            <li className='header-container-left-div-list-div-ul-li'><a href=''>Calculadora de inversión</a></li>
                            <li className='header-container-left-div-list-div-ul-li'><a href=''>Administrador de inversiones</a></li>
                            <li className='header-container-left-div-list-div-ul-li'><a href=''>Recursos y documentación</a></li>
                        </ul>
                    </div>
                </div>
                {this.state.isLoggedIn === true && <div className='header-container-right-div'>
                        <img className='header-container-right-div-notif-img' src='/notif.png'></img>
                        <img className='header-container-right-div-user-img' src='/user.png'></img>
                    </div>}
                {this.state.isLoggedIn === false && <div className='header-container-right-div'>
                    <a href='' className='header-container-right-div-link'>Acceder</a>
                </div>}
            </div>
        </header>
    }
}
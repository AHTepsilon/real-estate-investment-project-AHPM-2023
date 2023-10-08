import React, {Component} from 'react';
import { db } from '../firebase/firebase';
import { Link } from 'react-router-dom';
import { auth } from '../firebase/firebase';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { setDoc, doc } from 'firebase/firestore';
import './styles/header.scss';

export default class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoggedIn: true,
            popUpMenu: false,
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

    async signOut(){
        signOut(auth).then(() => {
        window.location.reload(true);
        }).catch((error) => {
        console.log(error);
        });
    }

    handlePopOutMenu = () => {
        this.setState({popUpMenu: !this.state.popUpMenu})
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
                            <li className='header-container-left-div-list-div-ul-li'><Link to='/calculator'>Calculadora de inversión</Link></li>
                            <li className='header-container-left-div-list-div-ul-li'><Link to='/analyzer'>Analizador de inversiones</Link></li>
                            <li className='header-container-left-div-list-div-ul-li'><Link to='/resources'>Recursos y documentación</Link></li>
                        </ul>
                    </div>
                </div>
                {this.state.isLoggedIn === true && <div className='header-container-right-div'>
                        <img className='header-container-right-div-notif-img' src='/notif.png'></img>
                        <img onClick={(e) => {this.signOut()}} className='header-container-right-div-user-img' src='/user.png'></img>
                    </div>}
                {this.state.isLoggedIn === false && <div className='header-container-right-div'>
                    <a href='' className='header-container-right-div-link'>Acceder</a>
                </div>}
            </div>
        </header>
    }
}
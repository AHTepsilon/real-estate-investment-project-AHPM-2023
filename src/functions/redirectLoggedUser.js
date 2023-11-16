import {auth} from "../firebase/firebase.js"
import { onAuthStateChanged } from "@firebase/auth"

let id;

function redirectLoggedUser(){
    onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          id = uid;
          window.location.replace("/");
        } else {
          
        }
      });
}

export {redirectLoggedUser, id};
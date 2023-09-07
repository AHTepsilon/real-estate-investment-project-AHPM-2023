import {auth} from "../firebase/firebase.js"
import { onAuthStateChanged } from "@firebase/auth"

function redirectLoggedUser(){
    onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          window.location.href = "/"
        } else {
          
        }
      });
}

export {redirectLoggedUser};
import {auth} from "../firebase/firebase.js"
import { onAuthStateChanged } from "@firebase/auth";
import goToLink from "./goToLink.js";

let id;

function redirectLoggedUser(){
    onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          id = uid;
          goToLink("/");
        } else {
          
        }
      });
}

export {redirectLoggedUser, id};
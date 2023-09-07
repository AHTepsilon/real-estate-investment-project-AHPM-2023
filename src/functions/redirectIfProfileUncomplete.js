import { auth, db } from "../firebase/firebase.js"
import { getDoc, doc } from "@firebase/firestore"
import { id } from "./redirectLoggedUser.js"

function redirectIfProfileUncomplete(){
    console.log(id);
}
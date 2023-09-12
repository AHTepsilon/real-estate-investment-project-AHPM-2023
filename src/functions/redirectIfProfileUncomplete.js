import { auth, db } from "../firebase/firebase.js"
import { getDoc, doc } from "@firebase/firestore"

async function redirectIfProfileUncomplete(id){
    if(id != null){
        console.log(id);
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            let completedProfile = docSnap.data().hasCompletedProfile;
            if(!completedProfile){
                alert("debes completar tu perfil para usar nuestros servicios");
                window.location.href = '/nivelation'
            }
          } else {
            console.log("No such document!");
          }
    }
}

export {redirectIfProfileUncomplete}
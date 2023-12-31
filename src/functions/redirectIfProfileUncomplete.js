import { auth, db } from "../firebase/firebase.js"
import { getDoc, doc, setDoc } from "@firebase/firestore"
import goToLink from "./goToLink.js";

async function redirectIfProfileUncomplete(id){
    if(id != null){
        console.log(id);
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            let completedProfile = docSnap.data().hasCompletedProfile;
            if(!completedProfile || completedProfile == null){
                alert("debes completar tu perfil para usar nuestros servicios");
                goToLink('/nivelation');
            }
          } else {
            await setDoc(doc(db, "users", id), {
              hasCompletedProfile: false,
              id: id,
            });

            alert("debes completar tu perfil para usar nuestros servicios");
            goToLink('/nivelation');
          }
    }
}

export {redirectIfProfileUncomplete}
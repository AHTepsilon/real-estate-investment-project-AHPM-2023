import { json } from "react-router-dom";

function getSimilarity(data){
    let dataset1 = data
    let dataset2 = [0.69, 0.01, 0.06, 0.37, 0.54]

    let AB = 0;
    let Ap = 0;
    let Bp = 0;

    for (let i = 0; i < dataset1.length; i++) {
        AB += dataset1[i] * dataset2[i];
        Ap += dataset1[i] ** 2;
        Bp += dataset2[i] ** 2;
      }

    Ap = Math.sqrt(Ap);
    Bp = Math.sqrt(Bp);

    let cosineValue = AB/(Ap * Bp);

    console.log(cosineValue);
}

function recSys(array){
    const data = array;
    let cosineSim = 1;

    getSimilarity(data);
}

export {recSys}
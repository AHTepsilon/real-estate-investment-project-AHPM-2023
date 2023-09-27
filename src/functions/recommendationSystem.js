import { json } from "react-router-dom";

function getSimilarity(){
    let dataset1 = [0.63, 0.04, 0.42, 0.83, 0.36, 0.35]
    let dataset2 = [0.69, 0.01, 0.06, 0.37, 0.54, 1.00]

    let AB = (dataset1[0] * dataset2[0]) + (dataset1[1] * dataset2[1])  + (dataset1[2] * dataset2[2])  + (dataset1[3] * dataset2[3]) + (dataset1[4] * dataset2[4]) + (dataset1[5] * dataset2[5])
    let Ap = Math.sqrt((dataset1[0]**2) + (dataset1[1]**2) + (dataset1[2]**2) + (dataset1[3]**2) + (dataset1[4]**2) + (dataset1[5]**2));
    let Bp = Math.sqrt((dataset2[0]**2) + (dataset2[1]**2) + (dataset2[2]**2) + (dataset2[3]**2) + (dataset2[4]**2) + (dataset2[5]**2));

    let cosineValue = AB/(Ap * Bp);

    console.log(cosineValue);
}

function recSys(){
    const data = [];
    let cosineSim = 1;

    getSimilarity();
}

export {recSys}
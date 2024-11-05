
const fs = require('fs');


function parseAndDecode(input) {
    const points = [];
    const n = input.keys.n;
    const k = input.keys.k;


    for (let key in input) {
        if (key === "keys") continue;
        const x = parseInt(key, 10);  
        const base = parseInt(input[key].base, 10);
        const valueInBase = input[key].value;


        const y = parseInt(valueInBase, base);
        points.push({ x, y });
    }

    return { points, k };
}


function lagrangeInterpolation(points, k) {
    let constantTerm = 0;

    for (let j = 0; j < k; j++) {
        let term = points[j].y;  


        for (let m = 0; m < k; m++) {
            if (m !== j) {
                term *= -points[m].x / (points[j].x - points[m].x);
            }
        }


        constantTerm += term;
    }

    return Math.round(constantTerm); 
}


function findSecret(filePath) {
  
    const data = fs.readFileSync(filePath, 'utf8');
    const input = JSON.parse(data);


    const { points, k } = parseAndDecode(input);


    const secret = lagrangeInterpolation(points, k);


    console.log( secret);
}


findSecret('testcase1.json'); 
findSecret('testcase2.json'); 
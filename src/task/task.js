import { polynomial, createSquareMatrix, floor, } from "../common/commonModule";
import squareRootMethod from "./squareRootMethod";

export const lagrange = (x, y) => {
    const n = x.length - 1;

    const l = [];

    for (let i = 0; i <= n; i++) {
        let denominator = 1;
        const dataForNumerator = [];
        for (let j = 0; j < x.length; j++) {
            if (i !== j) {
                const value = x[i] - x[j];
                denominator *= value;
                dataForNumerator.push(x[j]);
            }
        }

        const numerator = polynomial(dataForNumerator);

        const newElement = [];
        for (let i = 0; i < numerator.length; i++) {
            newElement.push(numerator[i] / denominator);
        }
        l.push(newElement);
    }


    for (let i = 0; i < l.length; i++) {
        for (let j = 0; j < l[i].length; j++) {
            l[i][j] *= y[i];
        }
    }


    const result = [];

    for (let i = 0; i <= n; i++) {
        let value = 0;
        for (let j = 0; j < l.length; j++) {
            value += l[j][i];
        }
        result.push(value);
    }
    
    return result;
}

export const interpolate = (x, y) => {
    if (x.length === 0 || y.length === 0) {
        return null;
    }

    const n = x.length - 1;

    const c = [];
    for (let i = 0; i < n; i++) {
        c.push(y[i]);
    }

    const b = Array(n).fill(0);
    b[0] = 0;
    for (let i = 1; i < n + 1; i++) {
        const h = x[i] - x[i - 1];
        const value = ((2 * (y[i] - y[i - 1])) / h) - b[i - 1];
        b[i] = value;
    }

    const a = Array(n).fill(0);
    for (let i = 0; i < n; i++) {
        const h = x[i + 1] - x[i];
        a[i] = (b[i + 1] - b[i]) / 2 * h;
    }

    b.pop();

    a.forEach(element => floor(element, 100));
    b.forEach(element => floor(element, 100));
    c.forEach(element => floor(element, 100));

    return {
        a, b, c
    };

}

export const rmsApproximation = (functions, x, y, m) => {
    const functionsLength = functions.length;

    const matrixC = createSquareMatrix(functionsLength);
    
    for (let i = 0; i < functionsLength; i++) {
        for (let j = 0; j < functionsLength; j++) {
            for (let k = 0; k < m; k++) {
                matrixC[i][j] += functions[i](x[k]) * functions[j](x[k]);
            }
        }
    }
    // console.log(matrixC);
    
    const vectorB = Array(functionsLength).fill(0);
    
    for (let i = 0; i < functionsLength; i++) {
        for (let j = 0; j < 5; j++) {
            vectorB[i] += functions[i](x[j]) * y[j];
        }
    }
    
    // console.log(vectorB);
    
    for (let i = 0; i < functionsLength; i++) {
        matrixC[i].push(floor(vectorB[i], 1000));
    } 

    console.log(matrixC);

    const result = squareRootMethod(matrixC).x;

    // Округляем до тысячных.
    const resultFloor = result.map(element => floor(element, 1000));

    return resultFloor;
}
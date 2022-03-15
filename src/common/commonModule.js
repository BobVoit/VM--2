
// Преобразует уравнение вида (x-x0)(x-x1)...(x-xn) в
// an*x^n + ... + a0*x^0
export const polynomial = (arrayOfCoefficients) => {
    const length = arrayOfCoefficients.length;
    const polynomialsArray = [];
    for (let i = 0; i < length; i++) {
        polynomialsArray.push([-arrayOfCoefficients[i], 1]);       
    }

    if (length > 1) {
        let current = polynomialsArray[0];
        let next = Array(3).fill(0);
        for (let i = 1; i < length; i++) {
            for (let j = 0; j < current.length; j++) {
                for (let k = 0; k < polynomialsArray[i].length; k++) {
                    next[j + k] += current[j] * polynomialsArray[i][k];
                }
            }  
            current = next;
            next = Array(current.length + 1).fill(0); 
        }
        return current;
    } 

    return arrayOfCoefficients;
}


export const spliteLineToString = (x, a, b, c) => {
    let line = "";
    if (a !== 0) {
        if (a === 1) {
            if (x === 0) {
                line += "x^2";
            } else {
                line += "(x " + (x > 0 ? " + " + x + ")^2" : " - " + Math.abs(x) + ")^2");
            }
        } else {
            if (x === 0) {
                line += a + " * x^2";
            } else {
                line += a + " * (x " + (x > 0 ? " + " + x + ")^2" : " - " + Math.abs(x) + ")^2");
            }
        }
    }

    if (b !== 0) {
        if (b === 1) {
            if (line !== "") {
                line += " + ";
            }
            if (x === 0) {
                line += "x";
            } else {
                line += "(x " + (x > 0 ? " + " + x + ")" : " - " + Math.abs(x) + ")");
            }
        } else {
            if (line !== "") {
                line += (b > 0 ? " + " : " - ");
            }
            if (x === 0) {
                line += Math.abs(b) + " * x";
            } else {
                line += Math.abs(b) + " * (x " + (x > 0 ? " + " + x + ")" : " - " + Math.abs(x) + ")");
            }
        }
    }

    if (c !== 0) {
        if (c > 0) {
            line += " + " + c;
        } else {
            line += " - " + Math.abs(c);
        }
    }

    return line;
}


export const createSquareMatrix = (length) => {
    const matrix = [];
    for (let i = 0; i < length; i++) {
        const newLine = Array(length).fill(0);
        matrix.push(newLine);
    }   
    return matrix;
}

export const isSymmetric = (matrix, length) => {
    let tr = [...Array(length)].map(elem => Array(length).fill(0));
    transpose(matrix, tr, length);

    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length; j++) {
            if (matrix[i][j] !== tr[i][j]) {
                return false;
            }
        }
    }

    return true;
}

export const transpose = (mat, tr, length) => {
    for(let i = 0; i < length; i++) {
        for(let j = 0; j < length; j++) {
            tr[i][j] = mat[j][i];
        }
    }
}


export const mult = (a, b) => {
    if (!Array.isArray(a) || !Array.isArray(b) || !a.length || !b.length) {
        throw new Error('arguments should be in 2-dimensional array format');
    }
    let x = a.length,
    z = a[0].length,
    y = b[0].length;
    if (b.length !== z) {
        throw new Error('number of columns in the first matrix should be the same as the number of rows in the second');
    }
    let productRow = Array.apply(null, new Array(y)).map(Number.prototype.valueOf, 0);
    let product = new Array(x);
    for (let p = 0; p < x; p++) {
        product[p] = productRow.slice();
    }
    for (let i = 0; i < x; i++) {
        for (let j = 0; j < y; j++) {
            for (let k = 0; k < z; k++) {
                product[i][j] += a[i][k] * b[k][j];
            }
        }
    }
    return product;
}

export const sum = (a, b, sum = true) => {

    const result = [];

    for (let i = 0; i < a.length; i++) {
        if (sum) {
            result.push(a[i] + b[i]);
        } else {
            result.push(a[i] - b[i]);
        }
    }

    return result;
}

export const floor = (value, rounding = 1000) => Math.floor(value * rounding) / rounding;

export const uniqueId = (size = 20) => "id" + Math.random().toString(size).slice(2);

export const calcPolynomByArray = (value = [], x) => {  
    let result = 0;
    for (let i = 0; i < value.length; i++) {
        // console.log(Math.pow(x, i));
        // console.log(value[i]);
        result += value[i] * Math.pow(x, i);
    } 
    return result;
}
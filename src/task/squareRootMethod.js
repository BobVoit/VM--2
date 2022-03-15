import { isSymmetric, transpose, mult } from "../common/commonModule";

const squareRootMethod = (matr) => {
    console.log(matr);
    let length = matr.length;

    let matrix = matr;

    if (!isSymmetric(matr, length)) {
        const tr = [...Array(length)].map(elem => Array(length).fill(0));

        transpose(matr, tr, length);

        matrix = mult(tr, matr);
    }

    const b = Array(length).fill(0);

    for (let i = 0; i < length; i++) {
        b[i] = matrix[i][matrix.length];
    }

    // Вычисляем треугольные матрицы.
    const T = [...Array(length)].map(elem => Array(length).fill(0));

    for (let i = 0; i < length; i++) {
        for (let j = i; j < length; j++) {
            if (i === 0 && j === 0) {
                T[i][j] = Math.sqrt(matrix[0][0]);
            } else if (i === 0) {
                T[i][j] = matrix[0][j] / T[0][0];
            } else if (i === j) {
                let sum = 0;
                for (let k = 0; k <= i - 1; k++) {
                    sum += T[k][i] * T[k][i];   
                }

                T[i][j] = Math.sqrt(matrix[i][j] - sum);
            } else {
                let sum = 0;
                for (let k = 0; k <= i - 1; k++) {
                    sum += T[k][i] * T[k][j];
                }
                T[i][j] = (matrix[i][j] - sum) / T[i][i];
            }
        }
    }

    // const T_transpose = [...Array(length).map(element => Array(length).fill(0))];

    // T_transpose = commonModule.transpose(T, T_transpose, length);

    const x = Array(length).fill(0);
    const y = Array(length).fill(0);

    for (let i = 0; i < length; i++) {
        if (i === 0) {
            y[i] = b[i] / T[0][0];
        } else {
            let sum = 0;
            for (let k = 0; k <= i - 1; k++) {
                sum += T[k][i] * y[k];
            }
            y[i] = (b[i] - sum) / T[i][i];
        }
    }

    let n = length - 1;

    for (let i = n; i >= 0; i--) {
        if (i === n) {
            x[i] = y[i] / T[i][i];
        } else {
            let sum = 0;
            for (let k = i + 1; k <= n; k++) {
                sum += T[i][k] * x[k];
            }
            x[i] = (y[i] - sum) / T[i][i];
        }
    }

    return { x, y };
}

export default squareRootMethod;
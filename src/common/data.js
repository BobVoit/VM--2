

export const X = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
export const Y = [
    (n, k, m) => 0.2 * n, 
    (n, k, m) => 0.3 * m, 
    (n, k, m) =>  0.5 * k,
    (n, k, m) => 0.6 * n, 
    (n, k, m) => 0.7 * m, 
    (n, k, m) => k, 
    (n, k, m) => 0.8 * n, 
    (n, k, m) => 1.2 * k, 
    (n, k, m) => 1.3 * m, 
    (n, k, m) => n
];



export const phi1 = [
    x => 1 - x,
    x => x * Math.pow(1 - x, 1),
    x => x * Math.pow(1 - x, 2),
    x => x * Math.pow(1 - x, 3),
    x => x * Math.pow(1 - x, 4),
];

export const phi2 = [
    x => 1 - x,
    x => Math.pow(x, 1) * (1 - x),
    x => Math.pow(x, 2) * (1 - x),
    x => Math.pow(x, 3) * (1 - x),
    x => Math.pow(x, 4) * (1 - x),
];

export const phi3 = [
    x => 1,
    x => Math.sin(x),
    x => Math.cos(x),
    x => Math.sin(2 * x),
    x => Math.cos(2 * x)
];
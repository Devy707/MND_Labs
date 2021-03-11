'use strict';

// Варіант
function main() {
    console.log('Стеценко|Богдан ІВ-93|Варіант - 324');
    // Задання за варіантом XnMin, XnMax
    let x1Min = -30;
    let x1Max = 0;
    let x2Min = 15;
    let x2Max = 50;

    let xN = [
        [-1, -1],
        [1, -1],
        [-1, 1]
    ];
    let varik = 324;
    let m = 6;
    let yMax = (30 - varik) * 10;
    let yMin = (20 - varik) * 10;
    console.log(`Максимальне Y: ${yMax}`);
    console.log(`Мінімальне Y: ${yMin}`);

    // Генерація числа в діапазоні
    function randomInteger(min, max) {
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rand);
    }

    let y = [
        [],
        [],
        []
    ];
    // Заповнення матриці планування
    for (let index = 0; index < m; index++) {
        for (let i = 0; i < 3; i++) {
            y[i][index] = yMin + randomInteger(0, 100);
        }
    }

    // Матриця планування
    console.log(`Матриця планування при m = ${m}`);
    console.log(y[0]);
    console.log(y[1]);
    console.log(y[2]);


    //Знайдемо середнє значення Y
    let yAv = [];

    function sumY(arr) {
        let sum = 0;
        for (let index = 0; index < arr.length; index++) {
            sum += arr[index];
        }
        return sum / arr.length;
    }

    console.log('------------------Середнє значення функції відгуку------------------');
    yAv[0] = +sumY(y[0]).toFixed(5);
    yAv[1] = +sumY(y[1]).toFixed(5);
    yAv[2] = +sumY(y[2]).toFixed(5);

    for (let index = 0; index < 3; index++) {
        console.log(yAv[index]);
    }

    function despersion(i) {
        let dis = 0;
        for (let index = 0; index < m; index++) {
            dis += (y[i][index] - yAv[i]) ** 2;
        }
        return 1 / m * dis;
    }

    //Знайдемо дисперсію по рядках
    console.log('------------------Знайдемо дисперсію по рядках------------------');
    let d = [];
    for (let index = 0; index < 3; index++) {
        d[index] = +despersion(index).toFixed(5);
    }
    for (let index = 0; index < 3; index++) {
        console.log(`Дисперсія №${index+1} = ${d[index]}`);

    }

    //Обчислимо основне відхилення
    let t = Math.sqrt((2 * (2 * m - 2)) / (m * (m - 4)));
    console.log(`Основне відхилення = ${t}`);


    function fuv(u, v) {
        if (u > v) {
            return u / v;
        } else {
            return v / u;
        }
    }

    // Обчислимо Fuv
    let fUv = [];
    fUv[0] = (fuv(d[0], d[1])).toFixed(5);
    fUv[1] = (fuv(d[2], d[0])).toFixed(5);
    fUv[2] = (fuv(d[2], d[1])).toFixed(5);

    //Виведемо Fuv
    console.log('------------------Обчислимо Fuv------------------');
    for (let index = 0; index < 3; index++) {
        console.log(`Fuv${index+1} = ${fUv[index]}`);
    }

    let oUv = [];
    //Обчислимо θuv
    oUv[0] = (((m - 2) / m) * fUv[0]).toFixed(5);
    oUv[1] = (((m - 2) / m) * fUv[1]).toFixed(5);
    oUv[2] = (((m - 2) / m) * fUv[2]).toFixed(5);

    //Виведемо θuv
    console.log('------------------Обчислимо θuv------------------');
    for (let index = 0; index < 3; index++) {
        console.log(`θuv${index+1} = ${oUv[index]}`);
    }

    let rUv = [];
    //Обчислимо Ruv
    rUv[0] = (Math.abs(oUv[0] - 1) / t).toFixed(5);
    rUv[1] = (Math.abs(oUv[1] - 1) / t).toFixed(5);
    rUv[2] = (Math.abs(oUv[2] - 1) / t).toFixed(5);

    //Виведемо Ruv
    console.log('------------------Обчислимо Ruv------------------');
    for (let index = 0; index < 3; index++) {
        console.log(`Ruv${index+1} = ${rUv[index]}`);
    }


    let allrk1 = [1.73, 1.72, 1.71, 1.69];
    let allrk2 = [2.16, 2.13, 2.1, 2];
    let allrk3 = [2.43, 2.37, 2.27, 2.17];
    let allrk4 = [2.62, 2.54, 2.41, 2.29];
    let allrk5 = [2.75, 2.66, 2.52, 2.39];
    let allrk6 = [2.9, 2.8, 2.64, 2.49];
    let allrk7 = [3.08, 2.96, 2.78, 2.62];

    let allp = [0.99, 0.98, 0.95, 0.9];
    let rKr;
    let p;
    
    if (m === 2) {
        rKr = allrk1[Math.floor(Math.random() * allrk1.length)];
        p = allp[allrk1.indexOf(rKr)];
    } else if (m > 2 && m < 6) {
        rKr = (Math.random() * (Math.max.apply(null, allrk2) - Math.max.apply(null, allrk1)) + Math.max.apply(null, allrk1)).toFixed(2);
        p = (Math.random() * (Math.max.apply(null, allp) - Math.min.apply(null, allp)) + Math.min.apply(null, allp)).toFixed(2);
    } else if (m === 6) {
        rKr = allrk2[Math.floor(Math.random() * allrk2.length)];
        p = allp[allrk2.indexOf(rKr)];
    } else if (m > 6 && m < 8) {
        rKr = (Math.random() * (Math.max.apply(null, allrk3) - Math.max.apply(null, allrk2)) + Math.max.apply(null, allrk2)).toFixed(2);
        p = (Math.random() * (Math.max.apply(null, allp) - Math.min.apply(null, allp)) + Math.min.apply(null, allp)).toFixed(2);
    } else if (m === 8) {
        rKr = allrk3[Math.floor(Math.random() * allrk3.length)];
        p = allp[allrk3.indexOf(rKr)];
    } else if (m > 8 && m < 10) {
        rKr = (Math.random() * (Math.max.apply(null, allrk4) - Math.max.apply(null, allrk3)) + Math.max.apply(null, allrk3)).toFixed(2);
        p = (Math.random() * (Math.max.apply(null, allp) - Math.min.apply(null, allp)) + Math.min.apply(null, allp)).toFixed(2);
    } else if (m === 10) {
        rKr = allrk4[Math.floor(Math.random() * allrk4.length)];
        p = allp[allrk4.indexOf(rKr)];
    } else if (m > 10 && m < 12) {
        rKr = (Math.random() * (Math.max.apply(null, allrk5) - Math.max.apply(null, allrk4)) + Math.max.apply(null, allrk4)).toFixed(2);
        p = (Math.random() * (Math.max.apply(null, allp) - Math.min.apply(null, allp)) + Math.min.apply(null, allp)).toFixed(2);
    } else if (m === 12) {
        rKr = allrk5[Math.floor(Math.random() * allrk5.length)];
        p = allp[allrk5.indexOf(rKr)];
    } else if (m > 12 && m < 15) {
        rKr = (Math.random() * (Math.max.apply(null, allrk6) - Math.max.apply(null, allrk5)) + Math.max.apply(null, allrk5)).toFixed(2);
        p = (Math.random() * (Math.max.apply(null, allp) - Math.min.apply(null, allp)) + Math.min.apply(null, allp)).toFixed(2);
    } else if (m === 15) {
        rKr = allrk6[Math.floor(Math.random() * allrk6.length)];
        p = allp[allrk6.indexOf(rKr)];
    } else if (m > 15 && m < 20) {
        rKr = (Math.random() * (Math.max.apply(null, allrk7) - Math.max.apply(null, allrk6)) + Math.max.apply(null, allrk6)).toFixed(2);
        p = (Math.random() * (Math.max.apply(null, allp) - Math.min.apply(null, allp)) + Math.min.apply(null, allp)).toFixed(2);
    } else if (m === 20) {
        rKr = allrk7[Math.floor(Math.random() * allrk7.length)];
        p = allp[allrk7.indexOf(rKr)];
    } else if (m > 20) {
        rKr = (Math.random() * ((Math.max.apply(null, allrk7) + 0.12 * m) - Math.max.apply(null, allrk7)) + Math.max.apply(null, allrk7)).toFixed(2);
        p = (Math.random() * (Math.max.apply(null, allp) - Math.min.apply(null, allp)) + Math.min.apply(null, allp)).toFixed(2);
    }
    console.log(`Оскільки m=${m}, візьмемо значення Rkr = ${rKr} і довірчу ймовірність p = ${p}`);

    function test(r) {
        let ttt = 0;
        for (let index = 0; index < r.length; index++) {
            if (r[index] > rKr) {
                console.log('Дисперсія неоднорідна');
                m += 1;
                main();
            } else {
                ttt += 1;
                console.log(`${r[index]} > ${rKr}`);
                console.log(`Підтвердження №${index + 1},що дисперсія однорідна`);
            }
        }
        if (ttt == 3) {
            console.log('Розрахунок нормованих коефіцієнтів рівняння регресії.');
            let mx = [];
            mx[0] = (xN[0][0] + xN[1][0] + xN[2][0]) / 3;
            mx[1] = (xN[0][1] + xN[1][1] + xN[2][1]) / 3;
            for (let index = 0; index < 2; index++) {
                console.log(`Mx${index+1} = ${mx[index]}`);
            }


            function vuz(x11, x12, x13, x21, x22, x23, x31, x32, x33) {
                let det = x11 * x22 * x33 + x12 * x23 * x31 + x32 * x21 * x13 -
                    x13 * x22 * x31 - x32 * x23 * x11 - x12 * x21 * x33;
                return det;
            }

            let mY = (yAv[0] + yAv[1] + yAv[2]) / 3;
            console.log(`My = ${mY}`);
            let allA = [];
            allA[0] = (xN[0][0] ** 2 + xN[1][0] ** 2 + xN[2][0] ** 2) / 3;
            allA[1] = (xN[0][0] * xN[0][1] + xN[1][0] * xN[1][1] + xN[2][0] * xN[2][1]) / 3;
            allA[2] = (xN[1][0] ** 2 + xN[1][1] ** 2 + xN[2][1] ** 2) / 3;
            for (let index = 0; index < allA.length; index++) {
                console.log(`A${index+1} = ${allA[index]}`);
            }
            let a11 = (xN[0][0] * yAv[0] + xN[1][0] * yAv[1] + xN[2][0] * yAv[2]) / 3;
            console.log(`A11 = ${a11}`);
            let a22 = (xN[0][1] * yAv[0] + xN[1][1] * yAv[1] + xN[2][1] * yAv[2]) / 3;
            console.log(`A22 = ${a11}`);
            let b0 = vuz(mY, mx[0], mx[1], a11, allA[0], allA[1], a22, allA[1], allA[2]) /
                vuz(1, mx[0], mx[1], mx[0], allA[0], allA[1], mx[1], allA[1], allA[2]);
            let b1 = vuz(1, mY, mx[1], mx[0], a11, allA[1], mx[1], a22, allA[2]) /
                vuz(1, mx[0], mx[1], mx[0], allA[0], allA[1], mx[1], allA[1], allA[2]);
            let b2 = vuz(1, mx[0], mY, mx[0], allA[0], a11, mx[1], allA[1], a22) /
                vuz(1, mx[0], mx[1], mx[0], allA[0], allA[1], mx[1], allA[1], allA[2]);
            console.log('b0 = ' + b0);
            console.log('b1 = ' + b1);
            console.log('b2 = ' + b2);
            console.log('Нормоване рівнянн регресії');
            console.log(`y = ${b0} + ${b1}*x1 + ${b2}*x2`);
            console.log('Перевірка');
            console.log(b0 + b1 * xN[0][0] + b2 * xN[0][1]);
            console.log(b0 + b1 * xN[1][0] + b2 * xN[1][1]);
            console.log(b0 + b1 * xN[2][0] + b2 * xN[2][1]);
            console.log('Проведемо натуралізацію коефіцієнтів:');
            let dx1 = Math.abs(x1Max - x1Min) / 2;
            console.log('∆x1 = ' + dx1.toFixed(5));
            let dx2 = Math.abs(x2Max - x2Min) / 2;
            console.log('∆x2 = ' + dx2.toFixed(5));
            let x10 = (x1Max + x1Min) / 2;
            console.log('x10 = ' + x10.toFixed(5));
            let x20 = (x2Max + x2Min) / 2;
            console.log('x20 = ' + x20.toFixed(5));
            let a0 = b0 - b1 * (x10 / dx1) - b2 * (x20 / dx2);
            console.log('a0 = ' + a0.toFixed(5));
            let a1 = b1 / dx1;
            console.log('a1 = ' + a1.toFixed(5));
            let a2 = b2 / dx2;
            console.log('a2 = ' + a2.toFixed(5));
            console.log('Запишемо натуралізоване рівняння регресії:');
            console.log(`y = ${a0.toFixed(5)} + ${a1.toFixed(5)}*x1 + ${a2.toFixed(5)}*x2`);
            console.log('Зробимо перевірку по рядках:');
            console.log((a0 + a1 * (x1Min) + a2 * x2Min).toFixed(5));
            console.log((a0 + a1 * (x1Max) + a2 * x2Min).toFixed(5));
            console.log((a0 + a1 * (x1Min) + a2 * x2Max).toFixed(5));
        }
    }
    test(rUv);
}
main();

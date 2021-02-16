'use strict';

alert('Лабораторна робота №1\nСтеценко Богдан ІВ-93');

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function findX0(xmax, xmin, n) {
    let x0 = (xmax + xmin) / 2;
    console.log(`x${n} = ${x0}`);
    return x0;
}

function findDx(x0, xmin, n) {
    let dx = x0 - xmin;
    console.log(`dx${n} = ${dx}`);
    return dx;
}

let arrFindXn = [
    [],
    [],
    []
];

let allY = [];

let arrA;

let arrX0;

let arrDx;

let arr = [
    [],
    [],
    [],
];

function genXRandom(event) {
    event.preventDefault();
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 8; j++) {
            arr[i][j] = randomInteger(0, 20);
        }
    }

    console.log(arr);

    let a = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth'];
    let tt = 0;
    let t = 0;
    let TDs;
    for (let j = 0; j < 8; j++) {
        TDs = document.getElementById(`${a[j]}`).getElementsByTagName('td');
        for (let i = 0; i < 3; i++) {
            TDs[i + 1].innerHTML = arr[i][t];
            tt += 1;
            if (tt % 3 == 0) {
                t += 1;
            }
        }
    }
    console.log(TDs);
}

let x01, x02, x03;

function readX0(event) {
    event.preventDefault();
    x01 = findX0(Math.max.apply(null, arr[0]), Math.min.apply(null, arr[0]), 1);
    x02 = findX0(Math.max.apply(null, arr[1]), Math.min.apply(null, arr[1]), 2);
    x03 = findX0(Math.max.apply(null, arr[2]), Math.min.apply(null, arr[2]), 3);
    arrX0 = [x01, x02, x03];
    console.log(arrX0);
    if (isNaN(arrX0[0])) {
        alert('Згенеруйте спочатку Х!');
    } else {
        let TDs;
        for (let j = 0; j < 8; j++) {
            TDs = document.getElementById(`x0`).getElementsByTagName('td');
            for (let i = 0; i < 3; i++) {
                TDs[i].innerHTML = arrX0[i];
            }
        }
    }
}

function readDX(event) {
    event.preventDefault();
    let dx1 = findDx(x01, Math.min.apply(null, arr[0]), 1);
    let dx2 = findDx(x01, Math.min.apply(null, arr[1]), 2);
    let dx3 = findDx(x01, Math.min.apply(null, arr[2]), 3);
    arrDx = [dx1, dx2, dx3];
    console.log(arrDx);
    let TDs;
    if (arrX0 == undefined) {
        alert('Обчисліть Х0!');
    } else {
        for (let j = 0; j < 8; j++) {
            TDs = document.getElementById(`dx`).getElementsByTagName('td');
            for (let i = 0; i < 3; i++) {
                TDs[i].innerHTML = arrDx[i];
            }
        }
    }
}

let yForX0;
let g = [];

function readAllA(event) {
    event.preventDefault();
    if (arrX0 == undefined) {
        alert('Обчисліть Х0!');
    } else {
        let a0 = document.getElementById('a0').value;
        let a1 = document.getElementById('a1').value;
        let a2 = document.getElementById('a2').value;
        let a3 = document.getElementById('a3').value;
        arrA = [a0, a1, a2, a3].map(function iter(a) {
            return Array.isArray(a) ? a.map(iter) : +a;
        });
        console.log(arrA);
        console.log(arr);

        for (let j = 0; j < 8; j++) {
            allY[j] = arrA[0] + arrA[1] * arr[0][j] + arrA[2] * arr[1][j] + arrA[3] * arr[2][j];
            allY[8] = arrA[0] + arrA[1] * arrX0[0] + arrA[2] * arrX0[1] + arrA[3] * arrX0[2];
            yForX0 = allY[8];
        }
        console.log(allY);
        let ma = Math.max.apply(null, allY);
        let a = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'x0'];
        let TDs;
        if (isNaN(allY[0])) {
            alert('Згенеруйте спочатку Х!');
        } else if (a0 == 0 || a1 == 0 || a2 == 0 || a3 == 0) {
            alert('Задайте: a0,a1,a2,a3');
        } else {
            for (let i = 0; i < 9; i++) {
                console.log(i);
                if (i < 8) {
                    TDs = document.getElementById(`${a[i]}`).getElementsByTagName('td');
                    TDs[4].innerHTML = allY[i];
                    if (allY[i] == ma) {
                        for (let u = 1; u < 4; u++) {
                            g[u - 1] = +TDs[u].outerText;
                            console.log(g);
                        }
                    }
                }
                if (i === 8) {
                    TDs = document.getElementById(`${a[8]}`).getElementsByTagName('td');
                    TDs[3].innerHTML = yForX0;
                }
            }
        }

    }
    let TDs1 = document.getElementById(`et`).getElementsByTagName('td');
    TDs1[0].innerHTML = allY[8];
}


function readXn(event) {
    event.preventDefault();
    if (arrDx == undefined) {
        alert('Обчисліть DX! Обчисліть Х0!');
    } else if (arrX0 == undefined || arrFindXn == undefined) {
        alert('Обчисліть Х0!');
    } else {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 8; j++) {
                arrFindXn[i][j] = ((arr[i][j] - arrX0[i]) / arrDx[i]).toFixed(4);
            }
        }
        console.log(arrFindXn);
        let a = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth'];
        let tt = 0;
        let t = 0;
        let TDs;
        for (let j = 0; j < 8; j++) {
            TDs = document.getElementById(`${a[j]}`).getElementsByTagName('td');
            console.log(TDs);
            for (let i = 0; i < 3; i++) {
                TDs[i + 5].innerHTML = arrFindXn[i][t];
                console.log(arrFindXn[i][t]);
                tt += 1;
                console.log(tt);
                /**
                Змінна TDs, містить колекцію з тегів < td > < /td>,для кожного рядка таблиці(<tr>).
                Масив arrFindXn - це багатовимірний масив виду[[аrr1][arr2][аrr3]], де наприклад arr1 - усі значення Xn1(у 8 точках).
                Створюється змінна t = 0, що вказує номер елемента в масиві.
                Змінна tt - лічильник, до якого при кожній ітерації додається одиниця.
                При першому обході циклу, TDs приймає такі значення: arrFindXn[0][t], arrFindXn[1][t], arrFindXn[2][t],
                Коли остача від ділення tt на 3 стає 0 , тобто ми проходимо усі 3 елементи(однакового індексу) кожного з масивів 
                [аrr1],[arr2] та [аrr3], до t додається одиниця,що при наступній ітерації обирає вже наступний елемент.
                Тобто перевірка створена для того,щоб коли ми дійшли до заповнення Xn3 першого рядку, 
                ми перейшли до Xn1 наступного рядка і так заповнили усі значення Xn  в тиблиці.
                **/
                if (tt % 3 == 0) {
                    t += 1;
                }
            }
        }

    }
}

function creat(event) {
    event.preventDefault();
    let TDs = document.getElementById(`cr`).getElementsByTagName('td');
    TDs[0].innerHTML = Math.max.apply(null, allY);
    let TDs1 = document.getElementById(`tp`).getElementsByTagName('td');
    TDs1[0].innerHTML = `Y(${g[0]},${g[1]},${g[2]})`;
}
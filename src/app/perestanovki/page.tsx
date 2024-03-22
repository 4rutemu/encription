"use client"


import styles from '../page.module.css'
import {useState} from "react";

function simplePerestanovka(message) {
    if (message.length === 0) {
        return "Вы ничего не ввели";
    } else {

        let letters = message.toUpperCase().replaceAll(" ", "").split("")

        const numbers = decomposeNumber(letters.length)
        console.log(numbers)

        const indexToSplit = Math.ceil(numbers.length / 2);

        const endArray = numbers
        const startArray = endArray.splice(0, indexToSplit)
        console.log(startArray)
        console.log(endArray)

        const x = startArray.reduce((prev, curr) => prev * curr, 1)
        const y = endArray.reduce((prev, curr) => prev * curr, 1)

        console.log(x)
        console.log(y)

        const matrix = new Array(x).fill(new Array(y).fill(""))

        let result = [];
        for (let i = 0; i < x; i++) {
            const newLetters = letters.splice(0, y)
            matrix[i] = newLetters;
        };

        for (let k = 0; k < y; k++) {
            for (let l = 0; l < x; l++){
                result.push(matrix[l][k]);
            }
        };

        return result.join('');
    }
}

function simpleDePerestanovka(message) {
    if (message.length === 0) {
        return "Вы ничего не ввели";
    } else {

        let letters = message.toUpperCase().replaceAll(" ", "").split("")

        const numbers = decomposeNumber(letters.length)
        console.log(numbers)

        const indexToSplit = Math.ceil(numbers.length / 2);

        const endArray = numbers
        const startArray = endArray.splice(0, indexToSplit)
        console.log(startArray)
        console.log(endArray)

        const x = startArray.reduce((prev, curr) => prev * curr, 1)
        const y = endArray.reduce((prev, curr) => prev * curr, 1)

        console.log(x)
        console.log(y)

        const matrix = new Array(x).fill(new Array(y).fill(""))

        let result = [];
        for (let i = 0; i < y; i++) {
            const newLetters = letters.splice(0, x)
            matrix[i] = newLetters;
        };

        for (let k = 0; k < x; k++) {
            for (let l = 0; l < y; l++){
                result.push(matrix[l][k]);
            }
        };

        return result.join('');
    }
}

// Функция для разложения на множетели
function decomposeNumber(n) {
    let factors = [];

    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            factors.push(i);
            return factors.concat(decomposeNumber(n / i));
        }
    }

    if (n > 1) {
        factors.push(n);
    }

    return factors;
}

export default function Home() {
    const [message, setMessage] = useState("")
    const [result, setResult] = useState("")

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <input onChange={(event) => {
                    setMessage(event.target.value)
                }}
                       placeholder={"Введите сообщение"}
                />
            </div>

            <div className={styles.container}>
                <button className={styles.button} onClick={() => {
                    setResult(simplePerestanovka(message))
                }}>Encrypt</button>
                <button className={styles.button} onClick={() => {
                    setResult(simpleDePerestanovka(message))
                }}>Decrypt</button>
            </div>


            <h3>{result}</h3>
        </main>
    )
}

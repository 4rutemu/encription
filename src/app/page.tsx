"use client"


import styles from './page.module.css'
import {useState} from "react";

function vigenereCipher(message, key, isDecrypt) {
  if (message.length === 0 || key.length === 0) {
    return "Вы ничего не ввели";
  } else {
    // Создаем алфавит
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    //const alphabet = "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧЩЪЫЬЭЮЯ";
    message = message.toUpperCase();
    key = key.toUpperCase();

    // Повторяем ключ до длины сообщения
    const repeatedKey = key.repeat(Math.ceil(message.length / key.length)).slice(0, message.length);

    // Шифрование или расшифрование сообщения
    let result = "";

    for (let i = 0; i < message.length; i++) {
      const currentChar = message[i];
      if (isAlphabetic(currentChar)) {
        let col;
        if (isDecrypt) {
          col = (currentChar.charCodeAt(0) - repeatedKey.charCodeAt(i) + 26) % 26;
        } else {
          col = (currentChar.charCodeAt(0) + repeatedKey.charCodeAt(i) - 2 * 'A'.charCodeAt(0)) % 26;
        }
        result += alphabet.charAt(col);
      } else {
        result += currentChar; // Символы, не являющиеся буквами, остаются без изменений
      }
    }

    return result;
  }
}

// Функция для проверки, является ли символ буквой
function isAlphabetic(char) {
  return /[A-Z]/i.test(char);
}

export default function Home() {
  const [message, setMessage] = useState("")
  const [key, setKey] = useState("")
  const [result, setResult] = useState("")

  return (
    <main className={styles.main}>
        <div className={styles.container}>
            <input onChange={(event) => {
                setMessage(event.target.value)
            }}
            placeholder={"Введите сообщение"}
            />
            <input onChange={(event) => {
                setKey(event.target.value)
            }}
            placeholder={"Введите ключ"}
            />
        </div>

        <div className={styles.container}>
            <button className={styles.button} onClick={() => {
            setResult(vigenereCipher(message, key, false))
        }}>Encrypt</button>
            <button className={styles.button} onClick={() => {
                setResult(vigenereCipher(message, key, true))
            }}>Decrypt</button>
        </div>


        <h3>{result}</h3>
    </main>
  )
}

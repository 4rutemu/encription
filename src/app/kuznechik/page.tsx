"use client"


import styles from '../page.module.css'
import {useCallback, useState} from "react";
import {CBC} from "cryptokuznechik/lib/CBC";

let cbc: CBC = new CBC();
let buffer;
let message;


export default function Home() {
    // const [message, setMessage] = useState("")
    const [result, setResult] = useState("")
    const [deresult, setDeResult] = useState("")

    const encrypt = useCallback(() => {
        console.log(message)
        buffer = Buffer.from(message, buffer)
        setResult(cbc.Encrypt(buffer).toString())
        setDeResult(cbc.Decrypt(cbc.Encrypt(buffer)).toString())
    }, [])

    const decrypt = useCallback(() => {
        console.log(message, buffer)
        buffer = Buffer.from(message)
        setDeResult(cbc.Decrypt(buffer).toString())
    }, [])

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <input type={"text"} onChange={(event) => {
                    message = event.target.value
                }}
                       placeholder={"Введите сообщение"}
                />
            </div>

            <div className={styles.container}>
                <button className={styles.button} onClick={() => encrypt()}>Encrypt</button>
                {/*<button className={styles.button} onClick={() => decrypt()}>Decrypt</button>*/}
            </div>

            <div className={styles.result}>
               {result}
            </div>
            <br/>
            <div>
                {deresult}
            </div>


        </main>
    )
}

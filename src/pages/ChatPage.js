import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {LOGIN_ROUTE} from "../utils/consts";
import Header from "../components/Header/Header";
import {$auth_host} from "../service";
import {useAuth} from "../auth";
import styles from './Chat.module.css'

const ChatPage = () => {
    const navigate = useNavigate()
    const [messages, setMessages] = useState([
        {
            "id": 92,
            "sender_id": 0,
            "sender": "usert",
            "text": "asdasddsa",
            "timestamp": "1683240116989"
        },
        {
            "id": 91,
            "sender_id": 0,
            "sender": "usert",
            "text": "123",
            "timestamp": "1683239400711"
        },
        {
            "id": 90,
            "sender_id": 0,
            "sender": "usert",
            "text": "asd",
            "timestamp": "1683239005867"
        },
        {
            "id": 89,
            "sender_id": 0,
            "sender": "usert",
            "text": "123",
            "timestamp": "1683236805832"
        },
        {
            "id": 88,
            "sender_id": 0,
            "sender": "usert",
            "text": "sure",
            "timestamp": "1683236787472"
        },
        {
            "id": 87,
            "sender_id": 0,
            "sender": "usert",
            "text": "test",
            "timestamp": "1683235868253"
        },
        {
            "id": 86,
            "sender_id": 0,
            "sender": "usert",
            "text": "asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd",
            "timestamp": "1683234931523"
        },
        {
            "id": 85,
            "sender_id": 0,
            "sender": "userafsaf",
            "text": "asdasd",
            "timestamp": "1683234925515"
        },
        {
            "id": 84,
            "sender_id": 0,
            "sender": "userafasf",
            "text": "asddsa",
            "timestamp": "1683234913203"
        },
        {
            "id": 83,
            "sender_id": 0,
            "sender": "usert",
            "text": "test",
            "timestamp": "1683234878578"
        },
        {
            "id": 82,
            "sender_id": 0,
            "sender": "usert",
            "text": "asd",
            "timestamp": "1683234718655"
        },
        {
            "id": 81,
            "sender_id": 0,
            "sender": "userafadfcdsf",
            "text": "DDD",
            "timestamp": "1683228316481"
        },
        {
            "id": 80,
            "sender_id": 0,
            "sender": "usert",
            "text": "ASD",
            "timestamp": "1683228229096"
        },
    ])

    const socket = new WebSocket('ws://127.0.0.1/ws');
    const {currentUser} = useAuth()
    socket.onopen = function () {
        console.log('Соединение установлено');
    };

    socket.onmessage = function (event) {
        console.log(event.data)
    }
    socket.onclose = function (event) {
        console.log('Соединение закрыто');
    };

    socket.onerror = function (error) {
        console.log(`Ошибка: ${error.message}`);
    };
    return (
        <div>
            <Header/>
            <div>
                <div className={styles.chatPage}>
                    {messages.map((message) => (
                        currentUser === message.sender ?
                            <div>
                                <div className={styles.selfMessageContainer}>
                                    <p className={styles.selfMessage}>
                                        {message.text}
                                    </p>
                                    <p className={styles.actions} >
                                        Delete
                                    </p>
                                    <p className={styles.actions} >
                                        Edit
                                    </p>
                                </div>
                                <p className={styles.selfTime} >
                                    3:00PM
                                </p>
                            </div>
                            :
                            <div >
                                <p className={styles.sender}>
                                    {message.sender}
                                </p>

                                <div className={styles.otherMessageContainer}>
                                <p className={styles.otherMessage}>
                                    {message.text}
                                </p>
                                </div>

                                <p className={styles.time}>
                                    3:00PM
                                </p>
                            </div>
                    ))}
                </div>
            </div>
            <div className={styles.footer}>
                <input
                    id="scroll"
                    className={styles.inputBlock}
                    placeholder="type here..."/>
                <button className={styles.btn} onClick={() => {socket.send('{"sender_id":10,"timestamp":"1683756127129","text":"AAAAAAAAAAAAAAAAAAA "}'); console.log("aboba")}}>➜</button>
            </div>
        </div>
    );
};

export default ChatPage;
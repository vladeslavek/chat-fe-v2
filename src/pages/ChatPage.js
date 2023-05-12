import React, {useContext, useEffect, useMemo, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {LOGIN_ROUTE} from "../utils/consts";
import Header from "../components/Header/Header";
import {$auth_host} from "../service";
import {useAuth} from "../auth";
import styles from './Chat.module.css'
import axios from "axios";
import jwt_decode from "jwt-decode";

const ChatPage = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);
    const [action, setAction] = useState('send')
    const [messages, setMessages] = useState([])
    const [editMessageId, setEditMessageId] = useState('');
    const [editMessage, setEditMessage] = useState('')

    const socket = useMemo(() => {
        const ws = new WebSocket('ws://127.0.0.1/ws');
        return ws;
    }, [])

    const {currentUser} = useAuth()

    socket.onopen = function () {
        console.log('Соединение установлено');
    };
    socket.onclose = function (event) {
        console.log('Соединение закрыто');
    };

    socket.onerror = function (error) {
        console.log(`Ошибка: ${error.message}`);
    };
    const parseTimestamp = (unixTime) => {
        const date = new Date(unixTime * 1000); // Преобразуем unix время в объект Date

        let hours = date.getHours(); // Получаем часы
        const minutes = date.getMinutes(); // Получаем минуты
        const ampm = hours >= 12 ? 'pm' : 'am'; // Получаем AM/PM

        hours %= 12; // Приводим часы к 12-часовому формату
        hours = hours || 12; // Если часы равны 0, то присваиваем значение 12

        const timeString = `${hours}:${minutes < 10 ? '0' : ''}${minutes}${ampm}`; // Собираем строку времени
        return timeString

    }
    const handleEditMessage = (msg) => {
        setAction('edit')
        setEditMessage(msg.text)
        setEditMessageId(msg.id)
    }

    useEffect(() => {
        (async () => {
            const { data } = await $auth_host.get('messages');

            setMessages(data);
            setLoading(false)
        })();
    }, []);

    useEffect(() => {
        setLoading(true)
        socket.onmessage = function (event) {
            setMessages(JSON.parse(event.data))
        }
        setLoading(false)
    }, [socket]);
    const handleDeleteMessage = (id) => {
        socket.send(JSON.stringify({
            "action": "delete",
            "message": {
                "message_id": id
            }
        }));
    }
    const handleSendMessage = () => {
        const date = (Date.now()/1000).toString()
        console.log(date)
        const id = jwt_decode(localStorage.getItem('token')).sub
        const message = (action === 'edit') ?
            {
                "action": "edit",
                "message": {
                    "message_id": editMessageId,
                    "new_text": editMessage
                }
            }
            :
            {
                "action": "create",
                "message": {
                    "sender_id": id,
                    "timestamp": date,
                    "text": editMessage
                }
            };
        console.log(message)
        setAction('')
        setEditMessage('')
        setEditMessageId(null)
        socket.send(JSON.stringify(message))
    }
    return (
        <div>
            <Header/>
            { loading ?
                <div className={styles.chatPage}>

                </div>
                :
                <div className={styles.chatPage}>
                    {messages.map((message,index) => (
                        currentUser === message.sender ?
                            <div key={index}>
                                <div className={styles.selfMessageContainer}>
                                    <p className={styles.selfMessage}
                                    >
                                        {message.text}
                                    </p>
                                    <div className={styles.actionsContainer}>
                                        <p className={styles.actions}
                                           onClick={() => handleDeleteMessage(message.id)}
                                        >
                                            Delete
                                        </p>
                                        <p className={styles.actions} onClick={() => handleEditMessage(message)}>
                                            Edit
                                        </p>
                                    </div>
                                </div>
                                <p className={styles.selfTime} >
                                    {parseTimestamp(message.timestamp)}
                                </p>
                            </div>
                            :
                            <div key={index}>
                                <p className={styles.sender}>
                                    {message.sender}
                                </p>

                                <div className={styles.otherMessageContainer}>
                                    <p className={styles.otherMessage}>
                                        {message.text}
                                    </p>
                                </div>

                                <p className={styles.time}>
                                    {parseTimestamp(message.timestamp)}
                                </p>
                            </div>
                    ))}
                </div>}
            <div className={styles.footer}>
                <input
                    id="scroll"
                    value={editMessage || ""}
                    onChange={e => setEditMessage(e.target.value)}
                    className={styles.inputBlock}
                    placeholder="type here..."/>
                <button className={styles.btn} onClick={() => {handleSendMessage()}}>➜</button>
            </div>
        </div>
    );
};

export default ChatPage;
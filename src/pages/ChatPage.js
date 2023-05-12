import React, {useEffect, useMemo, useRef, useState} from 'react';
import Header from "../components/Header/Header";
import {$auth_host} from "../service";
import {useAuth} from "../auth";
import styles from './Chat.module.css'
import jwt_decode from "jwt-decode";
import Message from "../components/Message/Message";

const ChatPage = () => {
    const [loading, setLoading] = useState(true);
    const [action, setAction] = useState('send')
    const [messages, setMessages] = useState([])
    const [editMessageId, setEditMessageId] = useState('');
    const [inputField, setInputField] = useState('')
    const messagesDiv = useRef(null);

    const socket = useMemo(() => {
        const ws = new WebSocket('ws://127.0.0.1:80/ws');
        return ws;
    }, [])

    const {currentUser} = useAuth()

    socket.onopen = function () {
        console.log('Соединение установлено');
    };
    socket.onclose = function () {
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

        return `${hours}:${minutes < 10 ? '0' : ''}${minutes}${ampm}`; // Собираем строку времени

    }
    const handleEditMessage = (msg) => {
        setAction('edit')
        setInputField(msg.text)
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
            
            messagesDiv.current.scroll({
                top: messagesDiv.current.scrollHeight + 300,
                behavior: 'smooth'
            });
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
        if (inputField === '') {
            alert("Message cannot be empty")
            return
        }
        if (inputField.length > 255 ) {
            alert("Your message is too long")
            return
        }

        const date = Math.ceil(Number(Date.now() / 1000)).toString()
        const id = jwt_decode(localStorage.getItem('token')).sub
        const message = (action === 'edit') ?
            {
                "action": "edit",
                "message": {
                    "message_id": editMessageId,
                    "new_text": inputField
                }
            }
            :
            {
                "action": "create",
                "message": {
                    "sender_id": id,
                    "timestamp": date,
                    "text": inputField
                }
            };
        setAction('')
        setInputField('')
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
                <div className={styles.chatPage} ref={messagesDiv}>
                    {messages.map((msg,index) => (
                        <Message key={index}
                                 message={msg}
                                 currentUser={currentUser}
                                 onEdit={() => handleEditMessage(msg)}
                                 onDelete={() => handleDeleteMessage(msg.id)}
                                 time={parseTimestamp(msg.timestamp)}
                        />
                    ))}
                </div>}
            <div className={styles.footer}>
                <input
                    id="scroll"
                    value={inputField || ""}
                    onChange={e => setInputField(e.target.value)}
                    className={styles.inputBlock}
                    placeholder="type here..."/>
                <button className={styles.btn} onClick={() => {handleSendMessage()}}>➜</button>
            </div>
        </div>
    );
};

export default ChatPage;
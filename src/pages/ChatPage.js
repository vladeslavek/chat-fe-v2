import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {LOGIN_ROUTE} from "../utils/consts";

const ChatPage = () => {
    const navigate = useNavigate()
    const [message, setMessage] = useState({text: ''})
    const sendMessage = () => {
        console.log(messages)
        messages.push(message)
    }


    let messages = [
        {
            text: "aboba"
        },
        {
            text: "bebra"
        },
        {
            text: "KEKWait"
        },
        {
            text: "pnh"
        }
    ]
    return (
        <div className='chat'>
            <div className='chat-messages'>
                {messages.map((message, index) =>
                    <div className='chat-messages__content' id='messages' key={index}>
                        {message.text}
                    </div>
                )}

            </div>
            <div className='chat-input'>
                    <input type='text'
                           id='message-text'
                           className='chat-form__input'
                           placeholder='Введите сообщение'
                           value={message.text}
                           onChange={e => setMessage({text: e.currentTarget.value})}/>
                        <button onClick={() => {sendMessage()}}>Send</button>
            </div>
            <button onClick={() => {navigate(LOGIN_ROUTE);}}>Выйти</button>
        </div>
    );
};

export default ChatPage;
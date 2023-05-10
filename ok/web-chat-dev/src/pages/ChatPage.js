import React from 'react';
import {useNavigate} from "react-router-dom";
import {LOGIN_ROUTE} from "../utils/consts";

const ChatPage = () => {
    const navigate = useNavigate()
    const messages = [
        {
            id: 1,
            text: "aboba"
        },
        {
            id: 2,
            text: "bebra"
        },
        {
            id:3,
            text: "KEKWait"
        },
    ]
    return (
        <div className='chat'>
            <div className='chat-messages'>
                {messages.map(message =>
                    <div className='chat-messages__content' id='messages'>
                        {message.text}
                    </div>
                )}

            </div>
            <div className='chat-input'>
                <form method='post' id='chat-form'>
                    <input type='text' id='message-text' className='chat-form__input' placeholder='Введите сообщение'/>
                        <input type='submit' className='chat-form__submit' value='=>'/>
                </form>
            </div>
            <button onClick={() => navigate(LOGIN_ROUTE)}>Выйти</button>
        </div>
    );
};

export default ChatPage;
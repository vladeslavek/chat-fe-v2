import React from 'react';
import styles from "../../pages/Chat.module.css";

const Message = ({message, currentUser, onEdit, onDelete, time}) => {
    const isSender = true
    return (
        <div>
            {message.sender === currentUser ?
                <div>
                    <div className={styles.selfMessageContainer}>
                        <p className={styles.selfMessage}
                        >
                            {message.text}
                        </p>
                        <div className={styles.actionsContainer}>
                            <p className={styles.actions}
                               onClick={onDelete}
                            >
                                Delete
                            </p>
                            <p className={styles.actions}
                               onClick={onEdit}
                            >
                                Edit
                            </p>
                        </div>
                    </div>
                    <p className={styles.selfTime} >
                        {time}
                    </p>
                </div>
                :
                <div>
                    <p className={styles.sender}>
                        {message.sender}
                    </p>

                    <div className={styles.otherMessageContainer}>
                        <p className={styles.otherMessage}>
                            {message.text}
                        </p>
                    </div>
                    <p className={styles.time}>
                        {time}
                    </p>
                </div>

            }
        </div>
    );
};

export default Message;
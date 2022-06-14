import React from 'react';
import { useState } from 'react';
import SendIcon from '../../../../../images/icon-svg/send-icon.svg';
import PropTypes from 'prop-types';

MessageForm.propTypes = {};

function MessageForm({ handlesendMessage, notificationInput, notificationMouseOut }) {
    const [message, setMessage] = useState('');

    const sendMessage = (e) => {
        e.preventDefault();
        handlesendMessage(message);
        setMessage('');
    };

    return (
        <form onSubmit={sendMessage} className="message__form">
            <input
                type="text"
                placeholder="Nhập tin nhắn ..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onInput={notificationInput}
                onMouseLeave={notificationMouseOut}
            />

            {message && (
                <button style={{ backgroundColor: 'transparent', outline: 'none', border: 'none' }}>
                    <img
                        src={SendIcon}
                        alt="send-icon"
                        style={{
                            width: '2.5rem',
                            cursor: 'pointer',
                            filter: 'invert(0.3) sepia(1) hue-rotate(180deg) saturate(4) brightness(1)',
                        }}
                    />
                </button>
            )}
        </form>
    );
}

export default MessageForm;

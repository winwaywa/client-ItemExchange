import { useRef, forwardRef, useImperativeHandle } from 'react';
import moment from 'moment';

import PropTypes from 'prop-types';

MessageList.propTypes = {};

function MessageList({ me, messageList }, ref) {
    const messagesEnd = useRef();

    useImperativeHandle(ref, () => ({
        scrollToBottom() {
            messagesEnd.current.scrollIntoView({ behavior: 'smooth' });
        },
    }));

    return (
        <div className="message__list">
            {messageList.map((message, index) => (
                <div
                    key={index}
                    className={`${
                        message.user === me.username ? 'message--me' : 'message--other'
                    } message__item`}
                >
                    {message.text}
                    <p className="message__timeline">
                        {moment(message.createdAt).startOf('minutes').fromNow()}
                    </p>
                </div>
            ))}
            <div ref={messagesEnd}></div>
        </div>
    );
}

export default forwardRef(MessageList);

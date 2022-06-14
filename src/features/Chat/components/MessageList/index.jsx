import { useRef, forwardRef, useImperativeHandle } from 'react';
import moment from 'moment';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import PropTypes from 'prop-types';

MessageList.propTypes = {};

function MessageList({ me, messageList, isLoading }, ref) {
    const messagesEnd = useRef();

    useImperativeHandle(ref, () => ({
        scrollToBottom() {
            messagesEnd.current.scrollIntoView({ behavior: 'smooth' });
        },
    }));

    return (
        <div className="message__list">
            {isLoading &&
                messageList.map((message, index) => (
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
            {!isLoading && (
                <Box sx={{ textAlign: 'center' }}>
                    <CircularProgress />
                </Box>
            )}
            <div ref={messagesEnd}></div>
        </div>
    );
}

export default forwardRef(MessageList);

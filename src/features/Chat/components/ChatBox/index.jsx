import './styles.scss';
import { useState, useEffect, useRef } from 'react';
import socketIOClient from 'socket.io-client';
import messageApi from '../../../../api/messageApi';
import PropTypes from 'prop-types';
import MessageList from '../MessageList';
import MessageForm from '../MessageForm';
ChatBox.propTypes = {};

const host = 'http://localhost:5000';

function ChatBox({ me, conversationId }) {
    const [messageList, setMessageList] = useState([]);
    const [entering, setEntering] = useState('');
    const messagesEnd = useRef(null);

    useEffect(() => {
        (async () => {
            const { messages } = await messageApi.getMessagesByConversation(conversationId);
            setMessageList(messages);
        })();
    }, [conversationId]);

    useEffect(() => {
        messagesEnd.current.scrollToBottom();
    }, [messageList]);

    //socket
    const socketRef = useRef();
    useEffect(() => {
        //kết nối
        socketRef.current = socketIOClient.connect(host);

        socketRef.current.emit('myRoom', conversationId);

        socketRef.current.on('sendDataServer', (dataGot) => {
            setMessageList((oldMsgs) => [...oldMsgs, dataGot]);
        }); // mỗi khi có tin nhắn thì mess sẽ được render thêm

        // Khi ai đó đang nhập
        socketRef.current.on('notificationEntering', (dataGot) => {
            setEntering(`${dataGot} đang nhập ...`);
        });
        socketRef.current.on('notificationMouseout', (dataGot) => {
            setEntering('');
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, [conversationId]);

    const handlesendMessage = async (message) => {
        if (message !== '') {
            const msg = {
                conversationId,
                text: message,
                user: me.username,
            };
            try {
                const { message } = await messageApi.createMessage(msg);
                socketRef.current.emit('sendDataClient', message);
            } catch (err) {
                console.log(err);
            }
        }
    };

    const notificationInput = () => {
        socketRef.current.emit('entering', me.username);
    };
    const notificationMouseOut = () => {
        socketRef.current.emit('mouseout', me.username);
    };

    return (
        <div className="chat__box">
            <div className="message">
                <p className="message__entering">{entering}</p>
                <MessageList me={me} messageList={messageList} ref={messagesEnd} />
                <MessageForm
                    handlesendMessage={handlesendMessage}
                    notificationInput={notificationInput}
                    notificationMouseOut={notificationMouseOut}
                />
            </div>
        </div>
    );
}

export default ChatBox;

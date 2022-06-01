import './styles.scss';
import { useState, useEffect, useRef } from 'react';
import socketIOClient from 'socket.io-client';
import { useSelector } from 'react-redux';
import ChatList from './components/ChatList';
const host = 'http://localhost:5000';

function ChatFeature() {
    const me = useSelector((state) => state.user.current);

    const [mess, setMess] = useState([]);
    const [message, setMessage] = useState('');
    const [user, setUser] = useState(me?.username);

    const socketRef = useRef();

    useEffect(() => {
        //kết nối
        socketRef.current = socketIOClient.connect(host);

        socketRef.current.on('sendDataServer', (dataGot) => {
            setMess((oldMsgs) => [...oldMsgs, dataGot]);
        }); // mỗi khi có tin nhắn thì mess sẽ được render thêm

        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    const sendMessage = (event) => {
        event.preventDefault();
        if (message !== null) {
            const msg = {
                content: message,
                user: user,
            };
            socketRef.current.emit('sendDataClient', msg);
            setMessage('');
        }
    };

    const renderMess = mess.map((m, index) => (
        <div
            key={index}
            className={`${m.user === user ? 'your-message' : 'other-people'} chat-item`}
        >
            {m.user} : {m.content}
        </div>
    ));
    console.log(mess);
    return (
        <div>
            <ChatList me={me} />
            <div class="box-chat">
                <div class="send-box">
                    <form>
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            // onChange={}
                            placeholder="Nhập tin nhắn ..."
                        />
                        <button onClick={sendMessage}>Send</button>
                    </form>
                </div>
                <div class="box-chat_message">{renderMess}</div>
            </div>
        </div>
    );
}

export default ChatFeature;

import './styles.scss';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ChatList from './components/ChatList';
import ChatBox from './components/ChatBox';
import conversationApi from '../../api/conversationApi';
import LinearProgress from '@mui/material/LinearProgress';

function ChatFeature() {
    const me = useSelector((state) => state.user.current);
    const [conversations, setConversations] = useState([]);
    const [conversationId, setConversationId] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setIsLoading(false);
            const { conversations } = await conversationApi.getConversationsByUser();
            setConversations(conversations);
            if (conversations.length > 0) setConversationId(conversations[0]._id);
            setIsLoading(true);
        })();
    }, []);

    const handleClickChatItem = (conversationId) => {
        setConversationId(conversationId);
    };

    return (
        <div className="chat">
            {!isLoading && <LinearProgress />}
            {isLoading && conversations.length > 0 && (
                <ChatList me={me} conversations={conversations} onClick={handleClickChatItem} />
            )}
            {isLoading && conversations.length > 0 && (
                <ChatBox me={me} conversationId={conversationId} />
            )}

            {isLoading && conversations.length === 0 && (
                <div className="notes info">
                    <p>Hiện tại bạn không có trong cuộc trò chuyện với người nào!</p>
                </div>
            )}
        </div>
    );
}

export default ChatFeature;

import PropTypes from 'prop-types';
import ChatItem from '../ChatItem';

ChatList.propTypes = {};

function ChatList({ me, conversations, onClick }) {
    return (
        <ul className="chat__list">
            {conversations.map((conversation) => (
                <li key={conversation._id}>
                    <ChatItem me={me} conversation={conversation} onClick={onClick} />
                </li>
            ))}
        </ul>
    );
}

export default ChatList;

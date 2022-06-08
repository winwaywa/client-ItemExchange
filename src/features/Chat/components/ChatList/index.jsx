import PropTypes from 'prop-types';
import ChatItem from '../ChatItem';
import MenuIcon from '../../../../../images/icon-svg/menu-icon.svg';

ChatList.propTypes = {};

function ChatList({ me, conversations, onClick }) {
    return (
        <>
            <input type="checkbox" id="nav-toggle" name="nav-toggle" />
            <label id="nav-btn" htmlFor="nav-toggle">
                <img className="svg-icon" src={MenuIcon} alt="menu-icon" />
            </label>

            <ul className="chat__list">
                {conversations.map((conversation) => (
                    <li key={conversation._id}>
                        <ChatItem me={me} conversation={conversation} onClick={onClick} />
                    </li>
                ))}
            </ul>
        </>
    );
}

export default ChatList;

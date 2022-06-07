import './styles.scss';
import { useEffect, useMemo, useState, useRef } from 'react';
import userApi from '../../../../api/userApi';
import PropTypes from 'prop-types';
ChatItem.propTypes = {};

function ChatItem({ me, conversation, onClick }) {
    const itemRef = useRef();
    const [info, setInfo] = useState({});
    const user = useMemo(
        () =>
            me.username === conversation.members[0]
                ? conversation.members[1]
                : conversation.members[0],
        []
    );

    useEffect(() => {
        (async () => {
            const { user: info } = await userApi.getUserByUserName(user);
            setInfo(info);
            let items = document.getElementsByClassName('chat__item');
            items[0].classList.add('active');
        })();
    }, []);

    const handleClickChatItem = (e, conversationId) => {
        let items = document.getElementsByClassName('chat__item');
        for (let i = 0; i < items.length; i++) {
            items[i].classList.remove('active');
        }
        itemRef.current.classList.add('active');
        onClick(conversationId);
    };

    return (
        <div
            ref={itemRef}
            className="chat__item"
            onClick={(e) => handleClickChatItem(e, conversation._id)}
        >
            <img className="chat__avatar" src={info.avatar}></img>
            <p className="chat__username">{user}</p>
        </div>
    );
}

export default ChatItem;

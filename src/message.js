import {useSelector} from 'react-redux';

export default function Message({ message, timestamp, user, userImage }) {
    const me = useSelector (state=> state.current_user);

    return (
        <div className={me.displayName == user? "me":"message"}>
            <img src={userImage}></img>
            <div className="message__info">
                <p>{user}</p>
                <p>{message}</p>
                {/* <span className='message__time'>{new Date(timestamp?.toDate()).toUTCString}</span> */}
            </div>
        </div>
    );
}

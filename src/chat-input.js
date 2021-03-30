import Button from "@material-ui/core/Button";
import db from "./firebase";
import firebase from "firebase";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function ChatInput({ channelName, channelId }) {
    const user = useSelector((state) => {
        return state.current_user;
    });
    const [input, setInput] = useState("");
    const sendMessage = (e) => {

        e.preventDefault();
        if (channelId) {
            db.collection("chat").doc(channelId).collection('messages').add({
                content: input,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                sender_name: user.displayName,
                sender_image: user.photoURL,
            }).then(result=> console.log(result)).catch(err=> console.log(err));
        };
        document.getElementById('chat-input').value=null;
    };
    return (
        <div className="chat-input">
            <form>
                <input id = 'chat-input'
                    placeholder={channelName?.toLowerCase()}
                    onChange={(e) => {
                        setInput(e.target.value);
                    }}
                />
                <Button type="summit" onClick={sendMessage}>
                    Send
                </Button>
            </form>
        </div>
    );
}

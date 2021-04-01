import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import db from "./firebase";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import Message from "./message";
import ChatInput from './chat-input';
import { useSelector, useDispatch } from "react-redux";
import { putRoomDetails, putRoomMessages } from "./actions";
import Hand from './hand-test';

import VoiceChat from "./voice-chat";

export default function Chat() {
    const { roomId } = useParams();
    const dispatch = useDispatch();
    const right=useSelector(state=>state.right)
    const roomDetails = useSelector((state) => {
        return state.room_details;
    });
    const roomMessages = useSelector((state) => {
        return state.room_messages;
    });
    const elemRef = useRef();

    useEffect(() => {
        if (roomId) {
            db.collection("chat")
                .doc(roomId)
                .onSnapshot((snapshot) => {
                    dispatch(putRoomDetails(snapshot.data()));
                });

            db.collection("chat")
                .doc(roomId)
                .collection("messages")
                .orderBy("timestamp", "asc")
                .onSnapshot((snapshot) => {
                    dispatch(
                        putRoomMessages(
                            snapshot.docs.map((doc) => {
                                return doc.data();
                            })
                        )
                    );
                });
        }
    }, [roomId]);
     useEffect(() => {
        console.log();
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight;
        // elemRef.current.clientHeight;
        console.log(
            "measurements",
            elemRef.current.scrollTop,

            elemRef.current.scrollHeight,
            elemRef.current.clientHeight
            // newRollTop
        );
    },[roomMessages]);

    return (
        <div className="chat">
            <div className="chat__header">
                <div className="chat__header__left">
                    <h4 className="chat__channel-name">
                        <strong># {roomDetails?.topic}</strong>
                        <StarBorderOutlinedIcon />
                    </h4>
                </div>
                <div className="chat__header__right">
                    <p>
                        <InfoOutlinedIcon /> Details
                    </p>
                </div>
            </div>
            <div className="chat__messages" ref={elemRef}>
                {roomMessages &&
                    roomMessages.map(
                        ({ content, timestamp, sender_name, sender_image}) => {
                            return (
                                <Message
                                    message={content}
                                    timestamp={timestamp}
                                    user={sender_name}
                                    userImage={sender_image}
                                    key = {timestamp}
                                />
                            );
                        }
                    )}
            </div>
            <div className='input'>
            {right&&<ChatInput channelName={roomDetails?.topic} channelId ={roomId}/>}
            {!right&&<VoiceChat channelName={roomDetails?.topic} channelId ={roomId} />}
            {!right&&<Hand className= 'emoji-hand'/> }
            </div>
        </div>
    );
}

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

    function manualOn() {
        document.getElementById('manual').style.visibility='visible';
    };
function manualOff() {
        document.getElementById('manual').style.visibility='hidden';
    };
    return (
        <div className="chat">
            <div className="chat__header">
                <div className="chat__header__left">
                    <h4 className="chat__channel-name">
                        <strong># {roomDetails?.topic}</strong>
                       
                    </h4>
                </div>
                <div id='manual'>
                    <p className = 'manual-x' onClick={manualOff}> x </p>
                   <p > 1. Add a friend that has Gmail by clicking "+", put in alias and his/her email </p>
                    <p >2. Click the channel </p>
                    <p> 3. You can toggle between text input / voice input by open your mouth round 😮</p>
                    <p >4. When in text input mode, press enter to send</p>
                    <p> 5. When in voice input mode, raise your hands in the camera till there is 🗣</p>
                   <p > 6. Talk, put down arms to stop voice recognition when you see 🙌🏻</p>
                   <p>  7. Give a big smile 😀 to send this message or give a bad face 😢 to reenter this message</p>
                   <p>  8. Your friend will see this when he / she logs into the app and clicks into this channel</p>
                </div>
                {<div className="chat__header__right">
                    <p onClick={manualOn}>
                        <InfoOutlinedIcon /> User Manual
                    </p>
                </div> }
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

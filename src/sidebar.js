import React, { useEffect, useState, useRef } from "react";

import InsertCommentIcon from "@material-ui/icons/InsertComment";
import SidebarOption from "./sidebar-option";
import InboxIcon from "@material-ui/icons/Inbox";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import AddIcon from "@material-ui/icons/Add";
import db from "./firebase";
import Button from "@material-ui/core/Button";
import { putChannels } from "./actions";
import { useSelector, useDispatch } from "react-redux";
import VoiceChannel from './voice-channel';
import Face from './face-recog';

export default function Sidebar() {
    const dispatch = useDispatch();
    const right = useSelector (state=> state.right)
    const channels = useSelector((state) => {
        return state.channels;
    });
    const saved_command = useSelector(state=>state.saved_command);
    const user = useSelector((state) => {
        return state.current_user;
    });
    useEffect(() => {
        db.collection("chat").onSnapshot((snapshot) => {
            console.log('user email', user.email)
            const ownDocs = snapshot.docs.filter((doc)=>{
                console.log('sender email', doc.data().sender);
                return doc.data().sender === user.email || doc.data().getter===user.email
            })
            console.log('owndocs', ownDocs);
            dispatch(
                putChannels(
                    ownDocs.map((doc) => ({
                        id: doc.id,
                        name: doc.data().topic,
                    }))
                )
            );
        });
    }, []);
   
  
    
    return (
        <div className="sidebar">
            <div className='first-column'>
            
            {channels &&
                channels.map((channel) => {
                    return (
                        <SidebarOption
                            title={channel.name}
                            key={channel.id}
                            id={channel.id}
                            // ref={channel.id}
                            Icon={InsertCommentIcon}
                            
                        />
                    );
                })}
            <SidebarOption Icon={AddIcon} addChannelOption={true} />
            {/* {right && <VoiceChannel/>} */}

                 </div>
                  
                <div className='second-column'>  <Face className='emoji-face' /></div> 
        </div>
    );
}

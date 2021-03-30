import React, { useEffect, useState } from "react";
import FiberManualRecording from "@material-ui/icons/FiberManualRecord";
import CreateIcon from "@material-ui/icons/Create";
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

export default function Sidebar() {
    const dispatch = useDispatch();
   
    const channels = useSelector((state) => {
        return state.channels;
    });
    const user = useSelector((state) => {
        return state.current_user;
    });
    useEffect(() => {
        db.collection("chat").onSnapshot((snapshot) => {
            console.log('user email', user.email)
            const ownDocs = snapshot.docs.filter((doc)=>{
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
            <div className="sidebar__header">
                <div className="sidebar__info">
                    <h2>{user?.displayName}</h2>
                    <h3>
                        <FiberManualRecording />
                        user1
                    </h3>
                </div>
                <CreateIcon />
            </div>
            {/* <SidebarOption Icon={ExpandMoreIcon} title="Show More" /> */}
            {channels &&
                channels.map((channel) => {
                    return (
                        <SidebarOption
                            title={channel.name}
                            key={channel.id}
                            id={channel.id}
                            Icon={InsertCommentIcon}
                        />
                    );
                })}
            <SidebarOption Icon={AddIcon} addChannelOption={true} />
            
        </div>
    );
}

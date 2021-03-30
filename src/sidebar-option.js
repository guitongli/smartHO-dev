import React from "react";
import { useHistory } from "react-router-dom";
import db from "./firebase";
import { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import { useSelector } from "react-redux";

export default function SidebarOption({ Icon, title, id, addChannelOption }) {
	const history = useHistory();
	const selectChannel = () => {
		if (id) {
			history.push(`/room/${id}`);
		} else {
			history.push(title);
		}
	};
	const [newTopic, setNewTopic] = useState();

	const [newEmail, setNewEmail] = useState();
	const user = useSelector((state) => state.current_user);
    
    const addChannel = () => {
		document.getElementById("add-channel").style.display = "block";
    };
    
    useEffect(()=>{
		document.getElementById("add-channel").style.display = "none";

    },[])
	const handleClick = () => {
		if (newEmail && newTopic) {
			db.collection("chat").add({
				topic: newTopic,
				sender: user.email,
				getter: newEmail,
			});
		 
			setNewTopic(null);
			setNewEmail(null);
		document.getElementById("add-channel").style.display = "none";
			 
		}
	};
	return (
		<div
			className="sidebar-option"
			onClick={addChannelOption ? addChannel : selectChannel}
		>
			{Icon && <Icon className="sidebar-option__icon" />}
			{Icon ? (
				<h3>{title}</h3>
			) : (
				<h3 className="sidebar-option__channel">
					<span className="sidebar-option__hash"># {title}</span>
				</h3>
			)}

			<div id="add-channel">
				<input
					type="text"
					placeholder="Topic Name"
					onChange={(e) => setNewTopic(e.target.value)}
				/>
				<input
					type="email"
					placeholder="Invite via email"
					onChange={(e) => setNewEmail(e.target.value)}
				/>
				<Button onClick={handleClick}>Send Invitation</Button>
			</div>
		</div>
	);
}

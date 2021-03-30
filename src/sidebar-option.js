import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import db from "./firebase";
import Button from "@material-ui/core/Button";
import { useSelector } from "react-redux";

export default function SidebarOption({ Icon, title, id, addChannelOption }) {
	const history = useHistory();
	const user = useSelector((state) => {
		return state.current_user;
	});
	const selectChannel = () => {
		if (id) {
			history.push(`/room/${id}`);
		} else {
			history.push(title);
		}
	};
	const [addToggle, setAddToggle] = useState();
	const [newTopic, setNewTopic] = useState();
	const [newEmail, setNewEmail] = useState();

	const handleClick = () => {
        
		if (newEmail && newTopic) {
			db.collection("chat").add({
				topic: newTopic,
				sender: user.email,
				getter: newEmail,
            });
            setAddToggle(false);
		}  
	};
	return (
		<div
			className="sidebar-option"
			onClick={addChannelOption ? setAddToggle(true) : selectChannel}
		>
			{Icon && <Icon className="sidebar-option__icon" />}
			{Icon ? (
				<h3>{title}</h3>
			) : (
				<h3 className="sidebar-option__channel">
					<span className="sidebar-option__hash"># {title}</span>
				</h3>
			)}
			{addToggle && 
				<div>
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
			}
		</div>
	);
}

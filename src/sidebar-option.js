import React from "react";
import { useHistory } from "react-router-dom";
import db from "./firebase";
import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import { toggleSide } from "./actions";

export default function SidebarOption({ Icon, title, id, addChannelOption }) {
	const dispatch = useDispatch();
	const history = useHistory();
	const saved_command = useSelector((state) => state.saved_command);
	const user = useSelector((state) => state.current_user);

	const selectChannel = () => {
		if (id) {
			history.push(`/room/${id}`);
		} else {
			history.push(title);
		}
		dispatch(toggleSide());
	};
	const [addToggle, setAddToggle] = useState(null);
	const [newTopic, setNewTopic] = useState();
	const [newEmail, setNewEmail] = useState();
	useEffect(() => {
		if (saved_command === title) {
			if (id) {
				history.push(`/room/${id}`);
			} else {
				history.push(title);
			}
			dispatch(toggleSide());
		}
	}, [saved_command]);
	const addChannel = () => {
		setAddToggle(true);
	};
	const handleClick = () => {
		if (newEmail && newTopic) {
			db.collection("chat").add({
				topic: newTopic,
				sender: user.email,
				getter: newEmail,
			});
			setAddToggle(false);
			document.getElementById("new-email").value = null;
			document.getElementById("new-topic").value = null;

			console.log("addtoggle", addToggle);
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
			{addToggle && (
				<div>
					<input
						id="new-topic"
						type="text"
						placeholder="Name"
						onChange={(e) => setNewTopic(e.target.value)}
					/>
					<input
						id="new-email"
						type="email"
						placeholder="Invite via email"
						onChange={(e) => setNewEmail(e.target.value)}
					/>
					<Button onClick={handleClick}>Send Invitation</Button>
				</div>
			)}
		</div>
	);
}

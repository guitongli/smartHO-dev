import { useSelector, useDispatch } from "react-redux";
import { putSmileUp, toggleSide, triggerSend, noSend } from "./actions";
import { useState, useEffect } from "react";

export default function Emoji(props) {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(putSmileUp(props.emoji));
		if (props.emoji === "😮") {
			dispatch(toggleSide());
		} else if (props.emoji === "😃"){
            dispatch(triggerSend())
        } else if (props.emoji === "😥"){
        
            dispatch(noSend())
        }
	}, [props.emoji]);

	return <div className="emoji">{props && props.emoji}</div>;
}

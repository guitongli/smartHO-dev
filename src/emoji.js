import { useSelector, useDispatch } from "react-redux";
import { putSmileUp, toggleSide, triggerSend, noSend } from "./actions";
import { useState, useEffect } from "react";

export default function Emoji(props) {
	const dispatch = useDispatch();
const rec = useSelector(state=>state.rec)
	useEffect(() => {
		dispatch(putSmileUp(props.emoji));
		if (props.emoji === "😮" && !rec) {
			dispatch(toggleSide());
		} else if (props.emoji === "😃" && !rec){
            dispatch(triggerSend())
        } else if (props.emoji === "😥" && !rec){
        
            dispatch(noSend())
        }
	}, [props.emoji]);

	return <div className="emoji">{props && props.emoji}</div>;
}

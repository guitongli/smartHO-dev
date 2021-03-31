import { useSelector, useDispatch } from "react-redux";
import { putSmileUp } from "./actions";
import { useState, useEffect } from "react";

export default function Emoji(props) {

    const dispatch = useDispatch();
   
	useEffect(()=>{dispatch(putSmileUp(props.emoji))},[props.emoji]);
	return (<div>{props&&props.emoji}, hi</div>);
}

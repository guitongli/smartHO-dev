import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveNote } from "./actions";
import Button from "@material-ui/core/Button";
import db from "./firebase";
import firebase from "firebase";
import {setNull} from './actions';
const SpeechRecognition =
	window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = "en-US";

export default function VoiceChat({ channelId, channelName }) {
	const rec = useSelector((state) => state.rec);
	const dispatch = useDispatch();
	const [note, setNote] = useState();
	const send = useSelector((state) => state.send);
	const user = useSelector((state) => {
		return state.current_user;
	});
	useEffect(() => {
		handleListen(rec);
	}, [rec]);

	useEffect(() => {
		if (send==='send') {
			if (channelId && note) {
				db.collection("chat")
					.doc(channelId)
					.collection("messages")
					.add({
						content: note,
						timestamp: firebase.firestore.FieldValue.serverTimestamp(),
						sender_name: user.displayName,
						sender_image: user.photoURL,
					})
					.then((result) => console.log(result))
					.catch((err) => console.log(err));
			}
			dispatch(setNull());
			setNote(null);
		} else if (send === 'delete'){
			console.log('trying to deletee');
			setNote(null);
			dispatch(setNull());
		}
	}, [send]);

	const handleListen = (rec) => {
		if (rec) {
			mic.start();
			console.log("mic on");
			mic.onend = () => {
				console.log("continue");
				// mic.start();
			};
		} else {
			mic.stop();
			mic.onend = () => {
				console.log("stopped mic on click");
			};
		}
	};

	mic.onresult = (event) => {
		const transcript = Array.from(event.results)
			.map((result) => result[0])
			.map((result) => result.transcript)
			.join("");
		console.log("transcript", transcript);

		setNote(transcript);
		mic.onerror = (e) => {
			console.log(e);
		};
	};

	return (
		<div className="voice-text">
			<h1>{rec ? "🗣" : "🙌🏻"}</h1>
			{/* <p>hands up to record, hands down to stop, smile to send, look sad to delete</p> */}
			<h6>{note}</h6>
		</div>
	);
}

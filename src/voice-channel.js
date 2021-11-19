import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveNote } from "./actions";

const SpeechRecognition =
	window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = "en-US";

export default function VoiceChannel() {
	const rec = useSelector((state) => state.rec);
	const dispatch = useDispatch();
 

	useEffect(() => {
		handleListen();
	}, [rec]);
	const handleListen = () => {
		if (rec) {
			mic.start();
			console.log('mic on')
			mic.onend = () => {
				console.log("continue");
				mic.start();
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

		dispatch(saveNote(transcript));
		mic.onerror = (e) => {
			console.log(e);
		};
	};

	return (
		<div className="voice-text">
			{rec ? <span>🗣</span> : <span>🙌🏻</span>}
		</div>
	);
}

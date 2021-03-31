import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";


const SpeechRecognition =
	window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = "en-US";

export default function VoiceText() {
	const [isListening, setIsListening] = useState(false);
	const [note, setNote] = useState(null);
    const [savedNotes, setSavedNotes] = useState([]);
    

    useEffect(()=>{
handleListen();
    },[isListening])
	const handleListen = () => {
		if (isListening) {
			mic.start();
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
	mic.onstart = () => {
		console.log("mics on");
	};
	mic.onresult = (event) => {
		const transcript = Array.from(event.results)
			.map((result) => result[0])
			.map((result) => result.transcript)
			.join("");
        console.log('transcript', transcript);
        setNote (transcript);
		mic.onerror = (e) => {
			console.log(e);
		};
    };
    
    const handleSaveNote=()=>{
        setSavedNotes([...savedNotes, note]);
        setNote('');
    }
	return (
		<div className="voice-text">
			<h2>Current Note</h2>
			{isListening ? (
				<span> listening</span>
			) : (
				<span>tap start</span>
			)}
			<button onClick={handleSaveNote} disabled={!note}>
				Save Note
			</button>
			<button
				onClick={() => {
					setIsListening(prevState => !prevState);
				}}
				 
			>
				Start /stop
			</button>
			{note}
			<div className="box">
				{savedNotes.map(n => 
					<p key={n}>{n}</p>
				)}
			</div>
		</div>
	);
}

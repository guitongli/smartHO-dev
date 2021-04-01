import * as handTrack from "handtrackjs";
import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { putHandUp, micOn, micOff } from "./actions";

export default function Hand() {
	const dispatch = useDispatch();
	const myvideo = useRef();
	const video = document.getElementById("myvideo");
	// const canvas = document.getElementById("canvas");
	const detections = useSelector((state) => state.detections);
	const predictions = useSelector((state) => state.predictions);
	let trackButton = document.getElementById("trackbutton");

	let isVideo = false;
	let model = null;

	const modelParams = {
		flipHorizontal: false, // flip e.g for video
		maxNumBoxes: 20, // maximum number of boxes to detect
		iouThreshold: 0.3, // ioU threshold for non-max suppression
		scoreThreshold: 0.6, // confidence threshold for predictions.
	};

	function startVideo() {
		console.log("video started");
		if (video) {
			handTrack.startVideo(video).then(function (status) {
				console.log("video status", status);
				if (status) {
					// isVideo = true;
					
					// runDetection()
				} else {
				}
			});
		}
	}

	// function toggleVideo() {
	// 	if (!isVideo) {
	// 		startVideo();
	// 	} else {
	// 		handTrack.stopVideo(video);
	// 		isVideo = false;
	// 	}
	// }

	function runDetection() {
		if (video) {
			model.detect(video).then((predictions) => {
				console.log("Predictions", predictions);

				if (predictions.length >= 2) {
					//  dispatch(putHandUp(predictions));
					dispatch(micOn());
				} else if (predictions.length < 2) {
					dispatch(micOff());
				}
			});
        } else {
            console.log('video is empty')
        }
	}
	useEffect(() => {
		 startVideo();
			setTimeout(loadModal(),4000);
		
		// else {
		// 		setInterval(runDetection, 1000);
		// }
	},[]);
	// 	useEffect(()=>{
	// 		if (model){
	// runDetection();
	// 		}
	// },[detections])
	// Load the model.
	function loadModal() {
		handTrack.load(modelParams).then((lmodel) => {
			console.log("modal loaded");

			// detect objects in the image.
			model = lmodel;
            // startVideo();
            setInterval(runDetection, 1000);
			console.log("detection started");
			// updateNote.innerText = "Loaded Model!";
			// trackButton.disabled = false;
		});
	}

	return (
		<div className="hand-video">
			<video
				autoPlay="autoplay"
                id="myvideo"
                ref={myvideo}
				width="100"
				// style={{visibility: 'hidden'}}
			></video>
		</div>
	);
}

// import Webcam from "react-webcam";
// export default function Hand() {
//     const modelParams = {
//   flipHorizontal: true,   // flip e.g for video
//   imageScaleFactor: 0.7,  // reduce input image size for gains in speed.
//   maxNumBoxes: 20,        // maximum number of boxes to detect
//   iouThreshold: 0.5,      // ioU threshold for non-max suppression
//   scoreThreshold: 0.79,    // confidence threshold for predictions.
// }
// 	const handVideo = useRef(null);
// 	navigator.getUserMedia =
// 		navigator.getUserMedia ||
// 		navigator.webkitGetUserMedia ||
// 		navigator.mozGetUserMedia;
// 	// const video = document.getElementById("hand-video");
// 	// const canvas = document.getElementById("hand-canvas");

// 	let model;

//     useEffect(startVideo, []);

// 	function startVideo() {
// 		handTrack.startVideo(handVideo).then((status) => {
// 			if (status) {
//                 console.log('video down')
// 				navigator.getUserMedia(
// 					{ video: {} },
// 					(stream) => {
// 					handVideo.srcObject = stream;
// 						setInterval(runDetection, 1000);
// 					},
// 					(err) => console.log(err)
// 				);
// 			}
// 		});
// 	}
// 	function runDetection() {
// 		model.detect(handVideo).then((predictions) => {
// 			console.log("predictions", predictions);
// 		});
// 	}
// 	// Load the model.
// 	handTrack.load().then((model) => {
// 		// detect objects in the image.
// 		console.log("model loaded");
// 		model.detect(handVideo).then((predictions) => {
// 			console.log("Predictions: ", predictions);
// 		});
//     });

//     handTrack.load(modelParams).then(lmodel => {
//         console.log('hi')

// });

// 	return (
// 		<div className="hand-emoji">
// 			{/* <Webcam
// 				ref={video}
// 				style={{
// 					position: "absolute",
// 					marginLeft: "auto",
// 					marginRight: "auto",
// 					left: 0,
// 					right: 0,
// 					textAlign: "center",
// 					zindex: 9,
// 					width: 640,
// 					height: 480,
// 				}}
// 			/> */}
// 			<video
// 				id="hand-video"
// 				width="640"
// 				height="480"
// 				autoPlay
// 				muted
// 				ref={handVideo}
// 			></video>

// 		</div>
// 	);
// }

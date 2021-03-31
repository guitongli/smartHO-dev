import * as handTrack from "handtrackjs";
import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {putHandUp} from './actions'

export default function Hand() {
    const dispatch = useDispatch();
	const video = document.getElementById("myvideo");
	// const canvas = document.getElementById("canvas");
	 
	let trackButton = document.getElementById("trackbutton");

	let isVideo = false;
	let model = null;

	const modelParams = {
		flipHorizontal: true, // flip e.g for video
		maxNumBoxes: 20, // maximum number of boxes to detect
		iouThreshold: 0.5, // ioU threshold for non-max suppression
		scoreThreshold: 0.6, // confidence threshold for predictions.
	};

	function startVideo() {
        if (video){
		handTrack.startVideo(video).then(function (status) {
			// console.log("video started", status);
			if (status) {
				isVideo = true;
				setInterval(runDetection,1000);
			} else {
			}
        });
        }
	}

	function toggleVideo() {
		if (!isVideo) {
			startVideo();
		} else {
			handTrack.stopVideo(video);
			isVideo = false;
		}
	}

	function runDetection() {
        if(video){
		model.detect(video).then((predictions) => {
            // console.log('Predictions', predictions);
            dispatch(putHandUp(predictions));
			 
		});}
	}
	useEffect(loadModal, []);
	// Load the model.
	function loadModal() {
		handTrack.load(modelParams).then((lmodel) => {
            console.log('handworking')
           
			// detect objects in the image.
            model = lmodel;
             startVideo();
			// updateNote.innerText = "Loaded Model!";
			// trackButton.disabled = false;
		});
    }
    

    

	return (
		<div className="bx--body p20">
		 
			 
			<video
				className="videobox"
				autoPlay="autoplay"
                id="myvideo"
                // width = '300'
                style={{display: 'none'}}
			></video>

			<canvas id="canvas" className="border canvasbox"  style={{display: 'none'}}></canvas>
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

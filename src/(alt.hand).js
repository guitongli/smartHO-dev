import React, { useRef, useState, useEffect } from "react";

import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import * as fp from "fingerpose";

export default function HandEmoji() {
	const webcamRef = useRef(null);
	const [emoji, setEmoji] = useState(null);
	// const images

	useEffect(() => {
		runHandpose();
	}, []);

	const runHandpose = async () => {
		const net = await handpose.load();
		console.log("Handpose model loaded.");
		//  Loop and detect hands
		setInterval(() => {
			camdetect(net);
		}, 100);
	};

	const camdetect = async (net) => {
		if (
			typeof webcamRef.current !== "undefined" &&
			webcamRef.current !== null &&
			webcamRef.current.video.readyState === 4
		) {
			const video = webcamRef.current.video;
			const videoWidth = webcamRef.current.video.videoWidth;
			const videoHeight = webcamRef.current.video.videoHeight;

			webcamRef.current.video.width = videoWidth;
			webcamRef.current.video.height = videoHeight;

			const hand = await net.estimateHands(video);
			console.log("hand", hand);

			if (hand.length > 0) {
				const GE = new fp.GestureEstimator([
					fp.Gestures.VictoryGesture,
					fp.Gestures.ThumbsUpGesture,
				]);
				const gesture = await GE.estimate(hand[0].landmarks, 4);
				if (gesture.gestures) {
                    console.log("gesture", gesture.gestures[0].name);
                    setEmoji (gesture.gestures[0].name)
				}
				// console.log ('original gesture', hand[0].name);
				//   if (gesture.gestures !== undefined && gesture.gestures.length>0){
				//       console.log('gestures', gesture.gestures);
				//       const confidence = gesture.getures.map(
				//           prediction=> prediction.confidence
				//       );
				//       const maxConfidence = confidence.indexOf(
				//           Math.mas.apply(null, confidence)
				//       );

				//       console.log('best confidence', gesture.gestures[maxConfidence].name);
				//       setEmoji(gesture.gestures[maxConfidence].name);
				//       console.log('emoji', emoji)
				//   }
			}
		}
	};
	return (
		<div className="hand-emoji">
			<Webcam
				ref={webcamRef}
				style={{
					position: "absolute",
					marginLeft: "auto",
					marginRight: "auto",
					left: 0,
					right: 0,
					textAlign: "center",
					zindex: 9,
					width: 640,
					height: 480,
				}}
			/>
            <h1>{emoji}</h1>
			
		</div>
	);
}

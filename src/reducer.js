const initialState = { right: true, rec: false };

export default function Reducer(state = initialState, action) {
	if (action.type === "PUT_USER") {
		state = {
			...state,
			current_user: action.idToken,
		};
		return state;
	}
	if (action.type === "PUT_CHANNELS") {
		state = {
			...state,
			channels: action.channels,
		};
		return state;
	}
	if (action.type === "PUT_ROOM_DETAILS") {
		state = {
			...state,
			room_details: action.room_details,
		};
		return state;
	}
	if (action.type === "PUT_ROOM_MESSAGES") {
		state = {
			...state,
			room_messages: action.room_messages,
		};
		console.log("updated msg", state.room_messages);

		return state;
	}
	if (action.type === "PUT_HAND_UP") {
		state = {
			...state,
			predictions: action.predictions,
		};
		console.log("predictions length", state.predictions.length);

		return state;
	}
	if (action.type === "PUT_SMILE_UP") {
		state = {
			...state,
			detections: action.detections,
		};
		console.log("detection emoji", state.detections);

		return state;
	}
	if (action.type === "TOGGLE_SIDE") {
		state = {
			...state,
			right: !state.right,
		};
		console.log("side change", state.right);

		return state;
	}
	if (action.type === "MIC_ON") {
		state = {
			...state,
			rec: true,
		};

		return state;
	}
	if (action.type === "MIC_OFF") {
		state = {
			...state,
			rec: false,
		};

		return state;
	}
	if (action.type === "SAVE_NOTE") {
		state = {
			...state,
			saved_note: action.saved_note,
		};
		console.log("side change", state.side);

		return state;
	}
	if (action.type === "SAVE_COMMAND") {
		state = {
			...state,
			saved_command: action.saved_command,
		};

		return state;
	}
	if (action.type === "TRIGGER_SEND") {
		state = {
			...state,
			send: 'send',
		};

		return state;
	}
	if (action.type === "NO_SEND") {
		state = {
			...state,
			send: 'delete',
		};

		return state;
	}
	if (action.type === "MIC_ON") {
		console.log("mic turned on");

		state = {
			...state,
			rec: true,
		};

		return state;
	}
	if (action.type === "MIC_OFF") {
		console.log("mic turned off");
		state = {
			...state,
			rec: false,
		};

		return state;
	}
	return state;
}

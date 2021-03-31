export default function Reducer(state = {}, action) {
    if (action.type == "PUT_USER") {
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
  
    return state;
}

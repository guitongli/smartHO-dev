import db from "./firebase";

export function putChannels(array) {
    
    return {
        type: "PUT_CHANNELS",
        channels: array
       
    };
}

export function putUser(idToken) {
    return {
        type: "PUT_USER",

        idToken,
    };
}
export function putRoomDetails(room_details) {
    return {
        type: "PUT_ROOM_DETAILS",

        room_details,
    };
}
export function putRoomMessages(room_messages) {
    return {
        type: "PUT_ROOM_MESSAGES",

        room_messages,
    };
}
export function putHandUp(predictions) {
    return {
        type: "PUT_HAND_UP",

        predictions,
    };
}
export function putSmileUp(detections) {
    return {
        type: "PUT_SMILE_UP",

        detections,
    };
}
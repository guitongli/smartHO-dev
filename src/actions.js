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
export function toggleSide() {
    return {
        type: "TOGGLE_SIDE"
    };
}

export function toggleMic (rec){
    return {
        type:'TOGGLE_MIC',
        rec
    }
}

export function saveNote (saved_note){
    return {
        type:'SAVE_NOTE',
        saved_note
    }
}
export function saveCommand (saved_note){
    return {
        type:'SAVE_COMMAND',
        saved_note
    }
}
export function triggerSend (){
    return {
        type:'TRIGGER_SEND'
    }
}
export function noSend (){
    return {
        type:'NO_SEND'
    }
}
export function micOn (){
    return {
        type:'MIC_ON'
    }
}
export function micOff (){
    return {
        type:'MIC_OFF'
    }
}
export function setNull (){
    return {
        type:'SET_NULL'
    }
}
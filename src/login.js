import { Button } from "@material-ui/core";
import {auth, provider} from './firebase';
import { useDispatch, useSelector } from "react-redux";
import {putUser} from './actions';

export default function Login() {
    const dispatch = useDispatch();
    const signIn = () => {
        auth.signInWithPopup(provider)
            .then((result) => {
                dispatch(putUser(result.user));

            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div className="login">
            <div className="login__container">
                <img src="https://img.icons8.com/plasticine/2x/uwu-emoji.png"></img>

                <h1>Nice Chat</h1>
                <Button onClick={signIn}>sign in with Google</Button>
                <p>your camera will be turned on after login</p>
            </div>
        </div>
    );
}
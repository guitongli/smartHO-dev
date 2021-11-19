import Header from "./header";
import Sidebar from "./sidebar";
import Chat from "./chat";
import { useState } from "react";
import Login from './login';

// import HandEmoji from './hand-emoji';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {useSelector} from 'react-redux';

export default function App() {
    const user = useSelector((state)=>{
        return state && state.current_user;
    });
    console.log('user', user);
    return (
        <div className="app">
            <Router>
                {user ? (
                    <>
                   
                        <Header />
                        <div className="app__body">
                            <Sidebar />
                            <Switch>
                                <Route path="/room/:roomId">
                                    <Chat />
                                </Route>
                                <Route path="/">
                                    <div className='welcome'>
                                    <h1>Welcome to NICE CHAT</h1>
                                    <img src="https://img.icons8.com/plasticine/2x/uwu-emoji.png"></img>

                                    <p>Click on Channels to begin</p>
                                    </div>
                                </Route>
                            </Switch>
                        </div>
                    </>
                ):(
                    <Login/>
                ) }
            </Router>
        </div>
    );
}
// import React from 'react';
import {Avatar} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import SearchIcon from '@material-ui/icons/Search';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { useSelector, useDispatch } from "react-redux";

export default function Header(){
    const user = useSelector((state)=>{
        return state.current_user;
    })
    return (
        <div className='header'>
          
                <Avatar className='header__avatar' alt = {user?.displayName} src ={user?.photoURL}/>
                <h2>{user?.displayName}</h2>
          
            {/* <div className='header__search'>
                <SearchIcon/>
                <input placeholder='smile to send, bad face to delete'></input>
            </div>
            <div className='header__right'>
                <HelpOutlineIcon/>
            </div> */}
        </div>
    )
}
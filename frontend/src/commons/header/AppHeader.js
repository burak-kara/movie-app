import React, {Component} from "react";
import {BrowserRouter, NavLink} from "react-router-dom";
import "./AppHeader.css";
import {IoIosLogOut, IoIosSettings} from 'react-icons/io';
import {FaHome, FaUserAlt} from 'react-icons/fa';

export default class AppHeader extends Component {
    render() {
        return (
            <BrowserRouter>
                <ul className="bar">
                    <li><NavLink exact to="/"><FaHome/> Home</NavLink></li>
                    <li><NavLink to="/user">Users</NavLink></li>
                    <li><NavLink to="/movie">Movies</NavLink></li>
                    <li><NavLink to="/director">Directors</NavLink></li>
                    <li className="profile">
                        <NavLink to="profile"><FaUserAlt/> Profile</NavLink>
                        <div className="profileContent">
                            <NavLink className="settings" to="/settings"><IoIosSettings/> Settings</NavLink>
                            <NavLink className="logout" to="/"><IoIosLogOut/> Logout</NavLink>
                        </div>
                    </li>
                </ul>
            </BrowserRouter>
        );
    }
};
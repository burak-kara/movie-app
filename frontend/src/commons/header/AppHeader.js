import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import "./AppHeader.css";
import {IoIosLogOut, IoIosSettings} from 'react-icons/io';
import {FaHome, FaUserAlt} from 'react-icons/fa';

export default class AppHeader extends Component {
    render() {
        if (this.props.currentUser) {
            return (this.renderUserBar());
        } else {
            return (this.renderBar());
        }
    }

    renderUserBar = () => {
        return (
            <ul className="app-header-bar">
                <li><NavLink exact to="/"><FaHome/> Home</NavLink></li>
                <li><NavLink to="/users">Users</NavLink></li>
                <li><NavLink to="/movies">Movies</NavLink></li>
                <li><NavLink to="/directors">Directors</NavLink></li>
                <li className="profile">
                    <NavLink to={`/users/${this.props.currentUser.id}`}><FaUserAlt/> Profile</NavLink>
                    <div className="profileContent">
                        <NavLink className="settings" to="/settings"><IoIosSettings/> Settings</NavLink>
                        <NavLink className="logout" to="/" onClick={this.props.onLogout}><IoIosLogOut/> Logout</NavLink>
                    </div>
                </li>
            </ul>
        );
    };

    renderBar = () => {
        return (
            <ul className="app-header-bar">
                <li><NavLink exact to="/login">Login</NavLink></li>
            </ul>
        );
    }
};
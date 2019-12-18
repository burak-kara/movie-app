import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import {IoIosLogOut, IoIosSettings} from 'react-icons/io';
import {FaHome, FaUserAlt} from 'react-icons/fa';
import "./AppHeader.css";

export default class AppHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
            userID: ""
        }
    }

    componentDidMount() {
        this.setState({
            isAuthenticated: this.props.isAuthenticated,
            userID: this.props.userID
        });
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            isAuthenticated: nextProps.isAuthenticated,
            userID:nextProps.userID
        })
    }

    render() {
        return this.state.isAuthenticated ? this.renderUserBar() : this.renderBar();
    }

    renderUserBar = () => {
        return (
            <ul className="app-header-bar">
                <img className="header-amblem" src={require('../../assets/images/logo83.png')} />
                <li><NavLink exact to="/"><FaHome/> Home</NavLink></li>
                <li><NavLink to="/users">Users</NavLink></li>
                <li><NavLink to="/movies">Movies</NavLink></li>
                <li><NavLink to="/directors">Directors</NavLink></li>
                <li className="profile">
                    <NavLink to={`/users/${this.state.userID}`}><FaUserAlt/> Profile</NavLink>
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
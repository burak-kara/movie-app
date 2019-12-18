import React, {Component} from 'react';
import {ACCESS_TOKEN} from "../../utils/Constants";
import {login} from "../../utils/UserUtils";
import './Login.css';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            status: 200,
            renderAlert: false
        }
    }

    render() {
        return (
            <div className="login">
                <h1 className="title">Login</h1>
                <form className="login-form-container needs-validation">
                    <div className="form-group login-form">
                        <label>Username</label>
                        <input
                            className="form-control" name="username"
                            placeholder="Enter username"
                            onChange={this.handleChange} required
                        />
                    </div>
                    <div className="form-group login-form">
                        <label>Password</label>
                        <input
                            type="password" className="form-control"
                            name="password" placeholder="Password"
                            onChange={this.handleChange} required
                        />
                    </div>
                    <button type="button" className="btn btn-success login-btn" onClick={this.handleSubmit}>
                        Login
                    </button>
                </form>
                {this.renderAlerts()}
            </div>
        );
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    };

    handleSubmit = () => {
        const params = {
            "username": this.state.username,
            "password": this.state.password
        };
        login(params)
            .then((response) => {
                if (response.status !== 200) {
                    this.setState({renderAlert: true, status: response.status})
                } else {
                    console.log("Login response: "); // TODO delete
                    console.log(response);
                    localStorage.setItem(ACCESS_TOKEN, response.user.accessToken);
                    this.props.onLogin(response);
                    this.props.history.push("/");
                }
            }).catch((error) => {
            if (error.status === 502) {
                this.props.history.push({
                    pathname: "/error",
                    state: {
                        title: "500",
                        info: "Oops! Something went wrong",
                        buttonText: "Go Back",
                        link: "/"
                    }
                });
            }
        })
    };

    renderAlerts = () => {
        if (this.state.renderAlert) {
            if (this.state.status === 401) {
                return (
                    <div className="alert alert-warning alert-dismissible fade show" role="alert">
                        <strong>Error!</strong> username or password is incorrect.
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                );
            } else {
                return (
                    <div className="alert alert-warning alert-dismissible fade show" role="alert">
                        <strong>Error!</strong> Please try again!
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                );
            }
        }
    };
}

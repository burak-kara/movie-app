import React, {Component} from 'react';
import {ACCESS_TOKEN} from "../../utils/Constants";
import {login} from "../../utils/UserUtils";
import './Login.css';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
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
                        <label>Email address</label>
                        <input
                            type="email" className="form-control" name="email"
                            aria-describedby="emailHelp" placeholder="Enter email"
                            onChange={this.handleChange} required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password" className="form-control"
                            name="password" placeholder="Password"
                            onChange={this.handleChange} required
                        />
                    </div>
                    <button type="submit" className="btn btn-success login-btn" onClick={this.handleSubmit}>
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
        login(Object.assign({}, this.state.email, this.state.password))
            .then(response => {
                localStorage.setItem(ACCESS_TOKEN, response.accessToken);
            }).catch(error => {
            this.setState({renderAlert: true, status: error.status})
        })
    };

    renderAlerts = () => {
        if (this.state.renderAlert) {
            if (this.state.status === 401) {
                return (
                    <div className="alert alert-warning alert-dismissible fade show" role="alert">
                        <strong>Error!</strong> Email or password is incorrect.
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

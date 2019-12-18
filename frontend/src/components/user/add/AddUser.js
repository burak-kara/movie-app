import React, {Component} from 'react';
import {ACCESS_TOKEN} from "../../../utils/Constants";
import {addUser, getUser, updateUser} from "../../../utils/UserUtils";

export default class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            isUpdate: false,
            role: "Role"
        }
    }

    componentDidMount() {
        this.checkAccessToken();
        this.checkRole();
        this.checkErrorStates();
        if (this.props.location.state) {
            let id = this.props.location.state.id;
            if (id) {
                this.loadUser(id);
                this.setState({
                    isUpdate: true
                });
            }
        }
        this.setState({
            isNotAdmin: localStorage.getItem("userRole") !== "Admin"
        });
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            isNotAdmin: localStorage.getItem("userRole") !== "Admin"
        });
    }

    render() {
        this.checkAccessToken();
        this.checkRole();
        this.checkErrorStates();
        return (
            <div className="container border director-list-container">
                <div className="row">
                    <div className="form-group col-md-3 offset-md-4 add-director">
                        <label>Username</label>
                        <input
                            type="text" className="form-control"
                            name="username" value={this.state.username}
                            placeholder="Enter username"
                            disabled={this.state.isUpdate}
                            onChange={this.handleChange}
                        />
                        <label>Name</label>
                        <input
                            type="text" className="form-control"
                            name="name" value={this.state.name}
                            placeholder="Enter name"
                            onChange={this.handleChange}
                        />
                        <label>Surname</label>
                        <input
                            type="text" className="form-control"
                            name="surname" value={this.state.surname}
                            placeholder="Enter surname"
                            onChange={this.handleChange}
                        />
                        <label>Password</label>
                        <input
                            type="text" className="form-control"
                            name="password" value={this.state.password}
                            placeholder="Enter password"
                            disabled={this.state.isUpdate}
                            onChange={this.handleChange}
                        />
                        <label>Role</label>
                        <div className="dropdown">
                            <button className="btn btn-outline-secondary dropdown-toggle" type="button"
                                    id="dropdownMenuButton"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {this.getDropDownValue()}
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <button
                                    type="button"
                                    className="dropdown-item"
                                    key={"admin"}
                                    onClick={() => {
                                        this.handleRoleChange("Admin")
                                    }}
                                >
                                    Admin
                                </button>
                                <button
                                    type="button"
                                    className="dropdown-item"
                                    key={"user"}
                                    onClick={() => {
                                        this.handleRoleChange("User")
                                    }}
                                >
                                    User
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-group col-md-6 offset-md-4">
                    <button
                        type="button" className="btn btn-success btn-lg"
                        onClick={this.handleSaveClick}
                    >
                        Save
                    </button>
                    {'          '}
                    <button
                        type="button" className="btn btn-danger btn-lg"
                        onClick={this.handleBackClick}
                    >
                        Back
                    </button>
                </div>
            </div>
        );
    }

    checkAccessToken = () => {
        if (!localStorage.getItem(ACCESS_TOKEN)) {
            this.props.history.push({
                pathname: "/please-login",
                state: {
                    title: "Welcome",
                    info: "Please Login",
                    buttonText: "Login",
                    link: "/login"
                }
            });
        }
    };

    checkRole = () => {
        if (this.state.isNotAdmin) {
            this.props.history.push({
                pathname: "/error",
                state: {
                    title: "401",
                    info: "Unauthorized Please Login as Admin",
                    buttonText: "Go Back",
                    link: "/directors"
                }
            });
        }
    };

    checkErrorStates = () => {
        if (this.state.isBadRequest) {
            this.props.history.push({
                pathname: "/error",
                state: {
                    title: "400",
                    info: "Bad Request",
                    buttonText: "Go Back",
                    link: "/"
                }
            });
        } else if (this.state.isNotFound) {
            this.props.history.push({
                pathname: "/error",
                state: {
                    title: "404",
                    info: "The page you are looking for was not found",
                    buttonText: "Go Back",
                    link: "/"
                }
            });
        } else if (this.state.isServerError) {
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
    };

    loadUser = (id) => {
        this.setState({isLoading: true});
        getUser(id).then(response => {
            this.setState({
                user: response,
                username: response.username,
                name: response.name,
                surname: response.surname,
                password: response.password,
                role: response.role,
                isLoading: false
            });
        })
    };

    getDropDownValue = () => {
        return this.state.role;
    };

    handleChange = (event) => {
        console.log(event.target.value);
        this.setState({[event.target.name]: event.target.value});
    };

    handleRoleChange = (role) => {
        console.log("inside handle role change");
        console.log(role);
        this.setState({
            role: role,
        })
    };

    handleSaveClick = () => {
        if (this.state.username && this.state.name &&
            this.state.surname && this.state.password && this.state.role) {
            const params = {
                "username": this.state.username,
                "name": this.state.name,
                "surname": this.state.surname,
                "password": this.state.password,
                "role": this.state.role
            };
            console.log("add user page for update");
            console.log(this.state.isUpdate);
            if (this.state.isUpdate) {
                console.log(params);
                updateUser(this.props.location.state.id, params)
                    .then((response) => {
                        this.props.history.push("/users");
                    })
            } else {
                addUser(params)
                    .then((response) => {
                        this.props.history.push("/users");
                    })
            }
        }
    };

    handleBackClick = () => {
        this.props.history.push('/users');
    };
}
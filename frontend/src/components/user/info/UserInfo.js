import React, {Component} from 'react';
import {ACCESS_TOKEN} from "../../../utils/Constants";
import {addMovieToList, deleteUser, getUser} from "../../../utils/UserUtils";
import {IconContext} from "react-icons";
import {FaUserAlt} from "react-icons/fa";

export default class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            lists: {},
            isNotAdmin: true
        }
    }

    componentDidMount() {
        this.checkAccessToken();
        this.checkErrorStates();
        if (this.props.location.state) {
            let id = this.props.location.state.id;
            if (id) {
                this.loadUser(id);
                this.setState({
                    id: id
                });
            }
        }
        this.setState({
            isNotAdmin: localStorage.getItem("userRole") !== "Admin"
        });
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.location.state) {
            let id = nextProps.location.state.id;
            if (id) {
                this.loadUser(id);
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            this.loadUser(this.props.location.state.id)
        }
    }

    render() {
        return (
            <div className="container border director-info-container">
                <div className="row user-icon-row movie-icon-row">
                    <IconContext.Provider value={{className: "user-icon"}}>
                        <div>
                            <FaUserAlt/>
                        </div>
                    </IconContext.Provider>
                </div>
                <div className="row justify-content-md-center info-row">
                    <div className="col col-lg-2 info-col">
                        <div className="row info-row-inner">
                            <p className="font-weight-bold">Username:</p>
                            <p className="font-weight-normal">
                                {this.state.user.username}
                            </p>
                        </div>
                        <div className="row info-row-inner">
                            <p className="font-weight-bold">Name:</p>
                            <p className="font-weight-normal">
                                {this.state.user.name}
                            </p>
                        </div>
                    </div>
                    <div className="col col-lg-2 info-col">
                        <div className="row info-row-inner">
                            <p className="font-weight-bold">Surname:</p>
                            <p className="font-weight-normal">
                                {this.state.user.surname}
                            </p>
                        </div>
                        <div className="row info-row-inner">
                            <p className="font-weight-bold">Role:</p>
                            <p className="font-weight-normal">
                                {this.state.user.role}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center movie-info-button-row">
                    <div className="col col-lg-2 movie-info-button-container">
                        <button
                            type="button" className="btn btn-success movie-info-button"
                            onClick={this.handleLeftClick}
                        >
                            {this.state.isNotAdmin ? "Watched" : "Update"}
                        </button>
                    </div>
                    <div className="col col-lg-2 movie-info-button-container">
                        <button
                            type="button" className="btn btn-danger movie-info-button"
                            onClick={this.handleRightClick}
                        >
                            {this.state.isNotAdmin ? "Favorite" : "Delete"}
                        </button>
                    </div>
                    <div className="col col-lg-2 movie-info-button-container">
                        <button
                            type="button" className="btn btn-secondary movie-info-button"
                            onClick={this.handleBackClick}
                        >
                            {"Back"}
                        </button>
                    </div>
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

    checkErrorStates = () => {
        if (this.state.isBadRequest) {
            this.props.history.push({
                pathname: "/error",
                state: {
                    title: "400",
                    info: "Bad Request",
                    buttonText: "Go Back",
                    link: "/directors"
                }
            });
        } else if (this.state.isNotFound) {
            this.props.history.push({
                pathname: "/error",
                state: {
                    title: "404",
                    info: "The page you are looking for was not found",
                    buttonText: "Go Back",
                    link: "/directors"
                }
            });
        } else if (this.state.isServerError) {
            this.props.history.push({
                pathname: "/error",
                state: {
                    title: "500",
                    info: "Oops! Something went wrong",
                    buttonText: "Go Back",
                    link: "/directors"
                }
            });
        }
    };

    loadUser = (id) => {
        this.setState({isLoading: true});

        getUser(id).then((response) => {
            console.log(response);
            this.setState({
                user: response,
                lists: response.lists,
                isLoading: false
            });
        })
    };

    handleLeftClick = () => {
        this.state.isNotAdmin ? this.handleWatchedClick(this.state.id) : this.handleUpdateClick(this.state.id);
    };

    handleUpdateClick = (userID) => {
        console.log("-----------user update------------");
        this.props.history.push({
            pathname: "/users/update/" + userID,
            state: {id: userID}
        });
    };

    //TODO go to watched list
    handleWatchedClick = (userID) => {
        this.props.history.push({
            pathname: "/users/" + userID + "/0",
            state: {
                listID: 0,
                userID: userID
            }
        });
    };

    handleRightClick = () => {
        this.state.isNotAdmin ? this.handleFavoriteClick(this.state.id) : this.handleDeleteClick(this.state.id);
    };

    handleDeleteClick = (userID) => {
        console.log("-----------user delete------------");
        deleteUser(userID)
            .then((result) => {
                this.props.history.push("/users");
            });
    };

    handleFavoriteClick = (userID) => {
        this.props.history.push({
            pathname: "/users/" + userID + "/1",
            state: {
                listID: 1,
                userID: userID
            }
        });
    };

    handleBackClick = () => {
        let path = this.state.isNotAdmin ? "/" : "/users";
        this.props.history.push(path);
    };
}
import React, {Component} from 'react';
import {ACCESS_TOKEN} from "../../utils/Constants";
import {deleteUser, getAllUsers} from "../../utils/UserUtils";
import LoadingIndicator from "../../commons/loading/LoadingIndicator";
import FilterableTable from "../../commons/table/FilterableTable";

export default class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            isLoading: true,
            isNotAdmin: true
        }
    }

    componentDidMount() {
        this.checkAccessToken();
        this.checkRole();
        this.loadUsers();
        this.setState({
            isNotAdmin: localStorage.getItem("userRole") !== "Admin"
        });
    }

    render() {
        this.checkAccessToken();
        this.checkRole();
        if (this.state.isLoading) {
            return (<LoadingIndicator/>);
        }
        this.checkErrorStates();
        return (
            <div className="container border director-list-container">
                <div className="row">
                    <FilterableTable
                        data={this.state.data}
                        addButtonText={"Add User"}
                        leftButtonText={"Update"}
                        rightButtonText={"Delete"}
                        isNotAdmin={this.state.isNotAdmin}
                        isInfo={false}
                        isMovieList={false}
                        addHandler={this.handleAddClick}
                        leftButtonHandler={this.handleUpdateClick}
                        rightButtonHandler={this.handleDeleteClick}
                        infoHandler={this.handleInfoClick}
                        {...this.props}
                    />
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
        if (localStorage.getItem("userRole") !== "Admin") {
            this.props.history.push({
                pathname: "/users/me",
                state: {
                    id: localStorage.getItem("userID")
                }
            });
        }
    };

    loadUsers = () => {
        this.setState({
            isLoading: true
        });
        getAllUsers()
            .then(response => {
                this.setState({
                    data: response,
                    isLoading: false
                }, () => {
                    console.log("inside get all users"); // TODO delete
                    console.log(this.state.data);
                });
            })
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

    handleAddClick = () => {
        console.log("-----------user add------------");
        this.props.history.push({
            pathname: "/users/add",
            state: {}
        });
    };

    handleUpdateClick = (userID) => {
        console.log("-----------user update------------");
        this.props.history.push({
            pathname: "/users/update/" + userID,
            state: {id: userID}
        });
    };

    // error when try to delete tba directors. backend error
    handleDeleteClick = (userID) => {
        console.log("-----------user delete------------");
        deleteUser(userID)
            .then((response) => {
                console.log("Deleted done in users");
                this.loadUsers();
            })
    };

    handleInfoClick = (userID) => {
        console.log("-----------user info------------" + userID);
        this.props.history.push({
            pathname: "/users/" + userID,
            state: {id: userID}
        });
    };
}

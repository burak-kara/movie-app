import React, {Component} from 'react';
import {ACCESS_TOKEN} from "../../utils/Constants";
import FilterableTable from "../../commons/table/FilterableTable";
import {deleteUser, getAllUsers} from "../../utils/UserUtils";
import UserInfo from './info/UserInfo';
import users from '../../assets/test_data/users.json'

export default class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            isLoading: true,
            isNotAdmin: this.props.currentUser.role !== "Admin"
        }
    }

    componentDidMount() {
        this.loadUsers();
    }

    render() {
        this.checkAccessToken();
        this.checkErrorStates();
        this.checkUserType();
        // TODO
        return (
            <div>
                {/*  
                IF -> notAdmin
                    Call User Info that has Info and Lists 
                ELSE 
                    Call UserList as Component that shows all
                    users
                */}

            </div>
        );
    }

    loadUsers = () => {
        this.setState({
            isLoading: true
        });
        getAllUsers()
            .then((response) => {
                console.log(response);
                this.setState({
                    data: response
                })
            })
        console.log(this.state.data)
    };

    catchError = (status) => {
        if (status === 404) {
            this.setState({
                isNotFound: true,
                isLoading: false
            })
        } else if (status === 400) {
            this.setState({
                isBadRequest: true,
                isLoading: false
            })
        } else {
            this.setState({
                isServerError: true,
                isLoading: false
            })
        }
    };

    checkUserType = () => {
        if(this.state.isNotAdmin){
            this.props.history.push({
                pathname: "/users/mypage"
            });
        }

    };

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

    handleUpdateClick = (userID) => {
        console.log("-----------user update------------");
        this.props.history.push({
            pathname: "/users/update/" + userID,
            state: {id: userID}
        });
    };

    handleDeleteClick = (userID) => {
        console.log("-----------user delete------------");
        deleteUser(userID)
            .then((result) => {
                this.loadUsers();
            }).catch(error => this.catchError(error.status));
        this.setState({
            unAuthorized: this.props.currentUser.role !== "Admin"
        });
    };
}
import React, {Component} from 'react';
import {ACCESS_TOKEN} from "../../../utils/Constants";
import {deleteUser, getMoviesFromUserList} from "../../../utils/UserUtils";
import FilterableTable from "../../../commons/table/FilterableTable";

export default class MovieList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: null,
            movies: null,
            isLoading: true,
            isNotAdmin: true
        }
    }

    componentDidMount() {
        this.checkAccessToken();
        this.checkRole();
        if (this.props.location.state) {
            console.log(this.props.location.state.listID);
            let listID = this.props.location.state.listID;
            let userID = this.props.location.state.userID;
            // if (listID && userID) {
            console.log(listID);
            this.loadMoviesFromList(userID, listID);
            this.setState({
                isUpdate: true
            });
            // }
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
        return (
            <div className="container border director-list-container">
                <div className="row">
                    <FilterableTable
                        data={this.state.movies}
                        addButtonText={"Add Movie"}
                        leftButtonText={"Update"}
                        rightButtonText={"Delete"}
                        isNotAdmin={this.state.isNotAdmin}
                        isInfo={false}
                        isMovieList={true}
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
        if (localStorage.getItem("userRole") === "Admin") {
            this.props.history.push({
                pathname: "/users"
            });
        }
    };

    loadMoviesFromList = (userID, listID) => {
        this.setState({
            isLoading: true
        });
        getMoviesFromUserList(userID, listID)
            .then((response) => {
                console.log(response);
                this.setState({
                    list: response,
                    listName: response.name,
                    movies: response.movies,
                    isLoading: false
                }, () => {
                    console.log("inside get movies from user list"); // TODO delete
                    console.log(this.state.list);
                });
            })
    };

    handleAddClick = () => {
        console.log("-----------user add movie to list------------");
        this.props.history.push({
            pathname: "/movies",
            state: {}
        });
    };

    handleUpdateClick = (userID) => {
        console.log("-----------user update------------");
        this.props.history.push({
            pathname: "/users/" + userID + "/" + this.state.listID,
            state: {id: userID}
        });
    };

    //TODO
    handleDeleteClick = (userID) => {
        console.log("-----------user delete------------");
        deleteUser(userID)
            .then((response) => {
                console.log("Deleted done in users");
                this.loadUsers();
            })
    };

    handleInfoClick = (movieID) => {
        console.log("-----------movie info------------" + movieID);
        this.props.history.push({
            pathname: "/movies/" + movieID,
            state: {id: movieID}
        });
    };
}
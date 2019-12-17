import React, {Component} from 'react';
import {deleteMovie, getAllMovies} from "../../utils/MovieUtils";
import FilterableTable from "../../commons/table/FilterableTable";
import {ACCESS_TOKEN} from "../../utils/Constants";
import "./Movies.css";
import LoadingIndicator from "../../commons/loading/LoadingIndicator";

export default class Movies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            isLoading: true,
            isNotAdmin: this.props.currentUser.role !== "Admin"
        }
    }

    componentDidMount() {
        this.loadMovies();
    }

    render() {
        this.checkAccessToken();
        if (this.state.isLoading) {
            return (<LoadingIndicator/>);
        }
        this.checkErrorStates();
        return (
            <div className="container border movie-list-container">
                <div className="row">
                    <FilterableTable
                        data={this.state.data}
                        addButtonText={"Add Movies"}
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
    
    loadMovies = () => {
        this.setState({
            isLoading: true
        });
        getAllMovies()
            .then(response => {
                this.setState({
                    data: response,
                    isLoading: false
                }, () => {
                    console.log("inside get all movies" + this.state.data);
                });
            }).catch(error => this.catchError(error.status))
    };

    catchError = (status) => {
        console.log("asd" + status);
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
        } else if (status === 500) {
            this.setState({
                isServerError: true,
                isLoading: false
            })
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

    handleAddClick = () => {
        console.log("-----------movie add------------");
        this.props.history.push({
            pathname: "/movies/add",
            state: {}
        });
    };

    handleUpdateClick = (movieID) => {
        console.log("-----------movie update------------");
        this.props.history.push({
            pathname: "/movies/update/" + movieID,
            state: {id: movieID}
        });
    };

    handleDeleteClick = (movieID) => {
        console.log("-----------movie delete------------");
        deleteMovie(movieID)
            .then(response => {
                console.log("Deleted done in movies");
                this.loadMovies();
            })
            .catch((error) => this.catchError(error.status));
    };

    handleInfoClick = (movieID) => {
        console.log("-----------movie info------------" + movieID);
        this.props.history.push({
            pathname: "/movies/" + movieID,
            state: {id: movieID}
        });
    };
}
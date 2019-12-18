import React, {Component} from 'react';
import {ACCESS_TOKEN} from "../../utils/Constants";
import FilterableTable from "../../commons/table/FilterableTable";
import LoadingIndicator from "../../commons/loading/LoadingIndicator";
import {deleteMovie, getAllMovies} from "../../utils/MovieUtils";
import {addMovieToList} from "../../utils/UserUtils";

export default class Movies extends Component {
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
        this.loadMovies();
        this.setState({
            isNotAdmin: localStorage.getItem("userRole") !== "Admin",
            id: localStorage.userID
        });
    }

    render() {
        this.checkAccessToken();
        if (this.state.isLoading) {
            return (<LoadingIndicator/>);
        }
        this.checkErrorStates();
        return (
            <div className="container border director-list-container">
                <div className="row">
                    <FilterableTable
                        data={this.state.data}
                        addButtonText={"Add Movie"}
                        leftButtonText={this.getLeftButtonText()}
                        rightButtonText={this.getRightButtonText()}
                        isNotAdmin={this.state.isNotAdmin}
                        isInfo={false}
                        isMovieList={true}
                        addHandler={this.handleAddClick}
                        leftButtonHandler={this.handleLeftClick}
                        rightButtonHandler={this.handleRightClick}
                        infoHandler={this.handleInfoClick}
                        {...this.props}
                    />
                </div>
            </div>
        );
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
                    console.log("inside get all movies"); // TODO delete
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

    getLeftButtonText = () => {
        return this.state.isNotAdmin ? "Watched" : "Update";
    };

    getRightButtonText = () => {
        return this.state.isNotAdmin ? "Favorite" : "Delete";
    };

    handleLeftClick = (movieID) => {
        this.state.isNotAdmin ? this.handleAddWatchedClick(movieID) : this.handleUpdateClick(movieID);
    };
    
    handleAddWatchedClick = (movieID) => {
        console.log("-----------watched click------------");
        addMovieToList(this.state.id, "0", movieID)
            .then((result) => {
                // this.loadDirectorMovies();
            })
    };

    handleUpdateClick = (movieID) => {
        console.log("-----------movie update------------");
        this.props.history.push({
            pathname: "/movies/update/" + movieID,
            state: {id: movieID}
        });
    };

    handleRightClick = (movieID) => {
        this.state.isNotAdmin ? this.handleAddFavoriteClick(movieID) : this.handleDeleteClick(movieID);
    };

// error when try to delete tba directors. backend error
    handleDeleteClick = (movieID) => {
        console.log("-----------movie delete------------");
        deleteMovie(movieID)
            .then((response) => {
                console.log("Deleted done in movies");
                this.loadMovies();
            })
    };

    handleAddFavoriteClick = (movieID) => {
        console.log("-----------favorite click------------");
        addMovieToList(this.state.id, "1", movieID)
            .then((result) => {
                // this.loadDirectorMovies();
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
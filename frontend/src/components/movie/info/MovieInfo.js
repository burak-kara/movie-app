import React, {Component} from 'react';
import {ACCESS_TOKEN} from "../../../utils/Constants";
import {deleteMovie, getMovieProfile} from "../../../utils/MovieUtils";
import {IconContext} from "react-icons";
import {MdMovie} from "react-icons/md";
import {addMovieToList} from "../../../utils/UserUtils";
import "./MovieInfo.css";

export default class MovieInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: {},
            director: {},
            isNotAdmin: true
        }
    }

    componentDidMount() {
        this.checkAccessToken();
        this.checkErrorStates();
        if (this.props.location.state) {
            let id = this.props.location.state.id;
            if (id) {
                this.loadMovie(id);
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
                this.loadMovie(id);
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            this.loadMovie(this.props.location.state.id)
        }
    }

    render() {
        return (
            <div className="container border director-info-container">
                <div className="row user-icon-row movie-icon-row">
                    <IconContext.Provider value={{className: "user-icon"}}>
                        <div>
                            <MdMovie/>
                        </div>
                    </IconContext.Provider>
                </div>
                <div className="row justify-content-md-center info-row">
                    <div className="col col-lg-2 info-col">
                        <div className="row info-row-inner">
                            <p className="font-weight-bold">Title:</p>
                            <p className="font-weight-normal">
                                {this.state.movie.title}
                            </p>
                        </div>
                        <div className="row info-row-inner">
                            <p className="font-weight-bold">Release Year:</p>
                            <p className="font-weight-normal">
                                {this.state.movie.releaseYear}
                            </p>
                        </div>
                    </div>
                    <div className="col col-lg-2 info-col">
                        <div className="row info-row-inner">
                            <p className="font-weight-bold">Duration:</p>
                            <p className="font-weight-normal">
                                {this.state.movie.duration}
                            </p>
                        </div>
                        <div className="row info-row-inner movie-info-director-div" onClick={this.handleDirectorClick}>
                            <p className="font-weight-bold">Director:</p>
                            <p className="font-weight-normal">
                                {this.state.director.name + " " + this.state.director.surname}
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

    loadMovie = (id) => {
        this.setState({isLoading: true});

        getMovieProfile(id).then((response) => {
            console.log(response);
            this.setState({
                movie: response,
                director: response.director,
                isLoading: false
            });
        })
    };

    handleDirectorClick = () => {
        this.props.history.push({
            pathname: "/directors/" + this.state.director.id,
            state: {id: this.state.director.id}
        });
    };

    handleLeftClick = () => {
        this.state.isNotAdmin ? this.handleAddWatchedClick(this.state.id) : this.handleUpdateClick(this.state.id);
    };

    handleUpdateClick = (movieID) => {
        console.log("-----------movie update------------");
        this.props.history.push({
            pathname: "/movies/update/" + movieID,
            state: {id: movieID}
        });
    };

    handleAddWatchedClick = (movieID) => {
        // TODO what's list id?
        addMovieToList(this.props.currentUser.id, "listID", movieID)
            .then((result) => {
                // this.loadDirectorMovies();
            })
    };

    handleRightClick = () => {
        this.state.isNotAdmin ? this.handleAddFavoriteClick(this.state.id) : this.handleDeleteClick(this.state.id);
    };

    handleDeleteClick = (movieID) => {
        console.log("-----------movie delete------------");
        deleteMovie(movieID)
            .then((result) => {
                this.props.history.push("/movies");
            });
    };

    handleAddFavoriteClick = (movieID) => {
        // TODO what's list id?
        addMovieToList(this.props.currentUser.id, "listID", movieID)
            .then((result) => {
                // this.loadDirectorMovies();
            })
    };

    handleBackClick = () => {
        this.props.history.push('/movies');
    };
}
import React, {Component} from 'react';
import {deleteDirector, getDirectorMovies, getDirectorProfile} from "../../../utils/DirectorUtils";
import {ACCESS_TOKEN} from "../../../utils/Constants";
import {FaUserAlt} from "react-icons/fa";
import {IconContext} from "react-icons";
import FilterableTable from "../../../commons/table/FilterableTable";
import './DirectorInfo.css';
import {deleteMovie} from "../../../utils/MovieUtils";
import {addMovieToList} from "../../../utils/UserUtils";

export default class DirectorInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            director: {},
            movies: {},
            isNotAdmin: this.props.currentUser.role !== "Admin"
        }
    }

    componentDidMount() {
        let id;
        if (this.props.location.state) {
            id = this.props.location.state.id;
        }
        if (id) {
            this.loadDirector(id);
        }
    }

    render() {
        this.checkAccessToken();
        this.checkErrorStates();
        return (
            <div className="container border director-info-container">
                <div className="row user-icon-row">
                    <IconContext.Provider value={{className: "user-icon"}}>
                        <div>
                            <FaUserAlt/>
                        </div>
                    </IconContext.Provider>
                </div>
                <div className="row justify-content-md-center info-row">
                    <div className="col col-lg-2 info-col">
                        <div className="row info-row-inner">
                            <p className="font-weight-bold">Name:</p>
                            <p className="font-weight-normal">
                                {this.state.director.name}
                            </p>
                        </div>
                        <div className="row info-row-inner">
                            <p className="font-weight-bold">{"Surname:"}</p>
                            <p className="font-weight-normal">
                                {this.state.director.surname}
                            </p>
                        </div>
                    </div>
                    <div className="col col-lg-2 info-col">
                        <div className="row info-row-inner">
                            <p className="font-weight-bold">{"Birthday:"}</p>
                            <p className="font-weight-normal">
                                {this.state.birthDate}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="row movies-row">
                    {/*<FilterableTable*/}
                    {/*    data={this.state.movies}*/}
                    {/*    addButtonText={"Add Movie"}*/}
                    {/*    leftButtonText={this.getLeftButtonText}*/}
                    {/*    rightButtonText={this.getRightButtonText}*/}
                    {/*    isNotAdmin={this.state.isNotAdmin}*/}
                    {/*    isInfo={true}*/}
                    {/*    isMovieList={false}*/}
                    {/*    addHandler={this.handleAddClick}*/}
                    {/*    leftButtonHandler={this.handleLeftClick}*/}
                    {/*    rightButtonHandler={this.handleRightClick}*/}
                    {/*    infoHandler={this.handleInfoClick}*/}
                    {/*    {...this.props}*/}
                    {/*/>*/}
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

    loadDirector = (id) => {
        this.setState({isLoading: true});

        getDirectorProfile(id).then((response) => {
            console.log(response);
            this.setState({
                director: response,
                movies: response.movies,
                birthDate: response.birthDate["day"] + "."
                    + response.birthDate["month"] + "."
                    + response.birthDate["year"],
                isLoading: false
            });
        })
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
        } else if (status === 500) {
            this.setState({
                isServerError: true,
                isLoading: false
            })
        }
    };

    getLeftButtonText = () => {
        if (this.props.currentUser.role === "Admin") {
            return "Update";
        } else {
            return "Add Watched";
        }
    };

    getRightButtonText = () => {
        if (this.props.currentUser.role === "Admin") {
            return "Update";
        } else {
            return "Add Favorite";
        }
    };

    handleAddClick = () => {
        console.log("-----------movie add------------");
        this.props.history.push("/movies/add");
    };

    handleLeftClick = (movieID) => {
        if (this.props.currentUser.role === "Admin") {
            this.handleUpdateClick(movieID);
        } else {
            this.handleAddWatchedClick(movieID);
        }
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
            }).catch((error) => this.catchError(error.status));
    };

    handleRightClick = (movieID) => {
        if (this.props.currentUser.role === "Admin") {
            this.handleDeleteClick(movieID);
        } else {
            this.handleAddFavoriteClick(movieID);
        }
    };

    handleDeleteClick = (movieID) => {
        console.log("-----------movie delete------------");
        deleteMovie(movieID)
            .then((result) => {
                this.loadDirectors();
            }).catch(error => this.catchError(error.status));
        this.setState({
            unAuthorized: this.props.currentUser.role !== "Admin"
        });
    };

    handleAddFavoriteClick = (movieID) => {
        // TODO what's list id?
        addMovieToList(this.props.currentUser.id, "listID", movieID)
            .then((result) => {
                // this.loadDirectorMovies();
            }).catch((error) => this.catchError(error.status));
    };

    handleInfoClick = (movieID) => {
        console.log("-----------movie info------------" + movieID);
        this.props.history.push({
            pathname: "/movies/" + movieID,
            state: {id: movieID}
        });
    };
}
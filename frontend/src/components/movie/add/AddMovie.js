import React, {Component} from 'react';
import {ACCESS_TOKEN} from "../../../utils/Constants";
import {getAllDirectors} from "../../../utils/DirectorUtils";
import {addMovie, getMovieProfile, updateMovie} from "../../../utils/MovieUtils";

export default class AddMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: null,
            director: null,
            directors: null,
            isUpdate: false,
            directorName: "Choose",
            directorSurname: "Director"
        }
    }

    componentDidMount() {
        this.checkAccessToken();
        this.checkRole();
        this.checkErrorStates();
        this.loadDirectors();
        if (this.props.location.state) {
            let id = this.props.location.state.id;
            if (id) {
                this.loadMovie(id);
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
                        <label>Title</label>
                        <input
                            type="text" className="form-control"
                            name="title" value={this.state.title}
                            placeholder="Enter movie title"
                            onChange={this.handleChange}
                        />
                        <label>Release Year</label>
                        <input
                            type="text" className="form-control"
                            name="releaseYear" value={this.state.releaseYear}
                            placeholder="Enter movie release year"
                            onChange={this.handleChange}
                        />
                        <label>Duration</label>
                        <input
                            type="text" className="form-control"
                            name="duration" value={this.state.duration}
                            placeholder="Enter movie duration"
                            onChange={this.handleChange}
                        />
                        <label>Director</label>
                        <div className="dropdown">
                            <button className="btn btn-outline-secondary dropdown-toggle" type="button"
                                    id="dropdownMenuButton"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {this.getDropDownValue()}
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                {this.getDropDownContent()}
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
        )
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

    loadMovie = (id) => {
        this.setState({isLoading: true});
        getMovieProfile(id).then(response => {
            this.setState({
                movie: response,
                title: response.title,
                releaseYear: response.releaseYear,
                duration: response.duration,
                director: response.director,
                directorName: response.director.name,
                directorSurname: response.director.surname,
                isLoading: false
            });
        })
    };

    loadDirectors = () => {
        this.setState({
            isLoading: true
        });
        getAllDirectors()
            .then(response => {
                this.setState({
                    directors: response,
                    isLoading: false
                }, () => {
                    console.log("inside add movie get directors"); // TODO delete
                    console.log(this.state.directors);
                });
            })
    };

    getDropDownValue = () => {
        return this.state.directorName + " " + this.state.directorSurname;
    };

    getDropDownContent = () => {
        let dropdownDirectors = [];
        console.log(this.state.directors);
        if (this.state.directors) {
            this.state.directors.forEach((director) => {
                dropdownDirectors.push(
                    <button
                        type="button"
                        className="dropdown-item"

                        key={director.id}
                        onClick={() => {
                            this.handleDirectorChange(director)
                        }}
                    >
                        {director.name + " " + director.surname}
                    </button>
                );
            });
        }
        return dropdownDirectors;
    };

    handleChange = (event) => {
        console.log(event.target.value);
        this.setState({[event.target.name]: event.target.value});
    };

    handleDirectorChange = (director) => {
        console.log("inside handle director change");
        console.log(director);
        this.setState({
            director: director,
            directorName: director.name,
            directorSurname: director.surname
        })
    };

    handleSaveClick = () => {
        if (this.state.title && this.state.releaseYear &&
            this.state.duration && this.state.director) {
            const params = {
                "title": this.state.title,
                "releaseYear": parseInt(this.state.releaseYear),
                "duration": this.state.duration,
                "director": this.state.director
            };
            console.log("add movie page for update");
            console.log(this.state.isUpdate);
            if (this.state.isUpdate) {
                console.log(params);
                updateMovie(this.props.location.state.id, params)
                    .then((response) => {
                        this.props.history.push("/movies");
                    })
            } else {
                addMovie(params)
                    .then((response) => {
                        this.props.history.push("/movies");
                    })
            }
        }
    };

    handleBackClick = () => {
        this.props.history.push('/movies');
    };
}
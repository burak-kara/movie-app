import React, {Component} from 'react';
import {ACCESS_TOKEN} from "../../../utils/Constants";
import {checkAccessToken} from "../../../utils/APIUtils";
import {WarningPage} from "../../../commons/warning/WarningPage";
import {addMovie, getMovieProfile} from "../../../utils/MovieUtils";
import movies from "../../../assets/test_data/movies";

export default class AddMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: null,
            dateType: "text"
        }
    }
    componentDidMount() {
        let id;
        if (this.props.location.state) {
            id = this.props.location.state.id;
        }
        if (id) {
            console.log(id);
            this.loadMovie(id);
        }
        this.setState({isAuthorized: this.props.currentUser.role === "Admin"})
    }

    render() {
        checkAccessToken(ACCESS_TOKEN);
        this.checkRole();
        const values = this.assignValues();
        console.log(values);
        return (
            <div className="container border movie-list-container">
                <div className="row">
                    <div className="form-group col-md-3 offset-md-4 add-movie">
                        <label>Name</label>
                        <input
                            type="text" className="form-control"
                            name="name" value={values.name}
                            placeholder="Enter movie name"
                            onChange={this.handleChange}
                        />
                        <label>Director</label>
                        <input
                            type="text" className="form-control"
                            name="director" value={values.director}
                            placeholder="Enter director name"
                            onChange={this.handleChange}
                        />
                        <label>Year</label>
                        <input
                            type="text" className="form-control"
                            name="year" value={values.year}
                            placeholder="Enter year"
                            onChange={this.handleChange}
                        />
                        <label>Duration</label>
                        <input
                            type="text" className="form-control"
                            name="duration" value={values.duration}
                            placeholder="Enter duration"
                            onChange={this.handleChange}
                        />
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

    checkRole = () => {
        if (!this.props.currentUser) {
            return (
                <WarningPage
                    title={"404"}
                    info={"The page you are looking for was not found"}
                    buttonText={"Home"}
                    link={"/"}
                />
            );
        } else if (!this.state.isAuthorized) {
            return (
                <WarningPage
                    title={"401"}
                    info={"UnAuthorized Please Login as Admin"}
                    buttonText={"Home"}
                    link={"/"}
                />
            );
        }
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

    assignValues = () => {
        return {
            "name": this.state.movie ? this.state.name : "",
            "director": this.state.movie ? this.state.director : "",
            "year": this.state.movie ? this.state.year : "",
            "duration": this.state.movie ? this.state.duration : ""
        }
    };

    loadMovie = (id) => {
        // this.setState({isLoading: true});
        //
        // getDirectorProfile(id).then(response => {
        //     this.setState({
        //         director: response,
        //         name: response.name,
        //         surname: response.surname,
        //         birthday: response.birthday,
        //         isLoading: false
        //     });
        // }).catch(error => this.catchError(error.status))
        // TODO delete
        const moviess = movies.movies;
        for (let i = 0; i < moviess.length; i++) {
            if (moviess[i].id === id) {
                console.log(moviess[i]);
                this.setState({
                    movie: moviess[i],
                    name: moviess[i].name,
                    surname: moviess[i].surname,
                    birthday: moviess[i].birthday
                });
            }
        }
    };

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
        console.log(event.target.value); // TODO delete debug
    };

    handleSaveClick = () => {
        const params = {
            "name": this.state.movie,
            "director": this.state.movie,
            "year": this.state.movie,
            "duration": this.state.movie
        };
        addMovie(params)
            .then(response => {
                console.log(response);
                this.props.history.push("/movies");
            })
    };

    handleBackClick = () => {
        this.props.history.push('/movies');
    };
}
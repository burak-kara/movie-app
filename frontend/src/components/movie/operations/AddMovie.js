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
            dateType: "text",
            key: null
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
        const moviesArray = movies.movies; // change to response
        const distinctDirectorList = Object.keys(moviesArray).map(i => moviesArray[i].director).filter((value,index,self)=> self.indexOf(value)===index);
        // value of select is not dynamically changing!
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
                            <select className="custom-select" onChange={this.handleChange.bind(this)}>
                                <option selected>Choose a Director</option>
                                {Object.keys(distinctDirectorList).map( i =>
                                    <option value={distinctDirectorList[i]}> {distinctDirectorList[i]} 
                                    </option>
                                    )
                                }
                            </select>   
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
        console.log(this.state.name);
        return {
            "name": this.state.movie ? this.state.name : "",
            "director": this.state.movie ? this.state.director : "",
            "year": this.state.movie ? this.state.year : "",
            "duration": this.state.movie ? this.state.duration : ""
        }
    };

    loadMovie = (id) => {
        // this.setState({isLoading: true});
        // getMovieProfile(id).then(response => {
        //     this.setState({
        //         movie: response,
        //         name: response.name,
        //         director: response.director,
        //         year: response.year,
        //         duration: response.duration
        //         isLoading: false
        //     });
        // }).catch(error => this.catchError(error.status))
        // TODO delete
        const moviesArray = movies.movies;
        for (let i = 0; i < moviesArray.length; i++) {
            console.log(moviesArray[i]);
            if (moviesArray[i].id === id) {
                this.setState({
                    movie: moviesArray[i],
                    name: moviesArray[i].name,
                    director: moviesArray[i].director,
                    year: moviesArray[i].year,
                    duration: moviesArray[i].duration
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

    // handleTextFieldChange(event){
    //     let loc =event.target.value;
    //     this.props.setState(loc,'key');
    // }
}
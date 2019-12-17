import React, {Component} from 'react';
import {ACCESS_TOKEN} from "../../../utils/Constants";
import {addDirector, getDirectorProfile, updateDirector} from "../../../utils/DirectorUtils";

export default class AddDirector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            director: null,
            dateType: "text",
            isUpdate: false,
            isAuthorized: this.props.currentUser.role === "Admin"
        }
    }

    componentDidMount() {
        let id;
        if (this.props.location.state) {
            id = this.props.location.state.id;
        }
        if (id) {
            this.loadDirector(id);
            this.setState({isUpdate: true});
        }
    }

    render() {
        this.checkAccessToken();
        this.checkRole();
        this.checkErrorStates();
        return (
            <div className="container border director-list-container">
                <div className="row">
                    <div className="form-group col-md-3 offset-md-4 add-director">
                        <label>Name</label>
                        <input
                            type="text" className="form-control"
                            name="name" value={this.state.name}
                            placeholder="Enter director name"
                            onChange={this.handleChange}
                        />
                        <label>Surname</label>
                        <input
                            type="text" className="form-control"
                            name="surname" value={this.state.surname}
                            placeholder="Enter director surname"
                            onChange={this.handleChange}
                        />
                        <label>Birthday</label>
                        <input type={this.state.dateType} className="form-control"
                               name="birthDate" value={this.state.birthDate}
                               placeholder="Enter birthday"
                               onFocus={() => {
                                   this.setState({dateType: "date"})
                               }}
                               onBlur={() => {
                                   this.setState({dateType: "text"})
                               }}
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
        if (!this.state.isAuthorized) {
            this.props.history.push({
                pathname: "/error",
                state: {
                    title: "401",
                    info: "Unauthorized Please Login as Admin",
                    buttonText: "Go Back",
                    link: "/"
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
        getDirectorProfile(id).then(response => {
            this.setState({
                director: response,
                name: response.name,
                surname: response.surname,
                birthDate: response.birthDate,
                isLoading: false
            });
        }).catch(error => this.catchError(error.status));
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

    handleChange = (event) => {
        console.log(event.target.value);
        this.setState({[event.target.name]: event.target.value});
    };

    handleSaveClick = () => {
        if (this.state.name && this.state.surname && this.state.birthDate) {
            const params = {
                "name": this.state.name,
                "surname": this.state.surname,
                "birthDate": {
                    "year": this.state.birthDate.split("-")[0],
                    "month": this.state.birthDate.split("-")[1],
                    "day": this.state.birthDate.split("-")[2]
                }
            };
            console.log(this.state.isUpdate);
            if (this.state.isUpdate) {
                updateDirector(this.props.location.state.id, params)
                    .then((response) => {
                        this.props.history.push("/directors");
                    })
            } else {
                addDirector(params)
                    .then((response) => {
                        this.props.history.push("/directors");
                    })
            }
        }
    };

    handleBackClick = () => {
        this.props.history.push('/directors');
    };
}
import React, {Component} from 'react';
import {ACCESS_TOKEN} from "../../../utils/Constants";
import {checkAccessToken} from "../../../utils/APIUtils";
import {WarningPage} from "../../../commons/warning/WarningPage";
import {addDirector, getDirectorProfile} from "../../../utils/DirectorUtils";
import directors from "../../../assets/test_data/directors";

export default class AddDirector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            director: null,
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
            this.loadDirector(id);
        }
        this.setState({isAuthorized: this.props.currentUser.role === "Admin"})
    }

    render() {
        checkAccessToken(ACCESS_TOKEN);
        this.checkRole();
        const values = this.assignValues();
        console.log(values);
        return (
            <div className="container border director-list-container">
                <div className="row">
                    <div className="form-group col-md-3 offset-md-4 add-director">
                        <label>Name</label>
                        <input
                            type="text" className="form-control"
                            name="name" value={values.name}
                            placeholder="Enter director name"
                            onChange={this.handleChange}
                        />
                        <label>Surname</label>
                        <input
                            type="text" className="form-control"
                            name="surname" value={values.surname}
                            placeholder="Enter director surname"
                            onChange={this.handleChange}
                        />
                        <label>Birthday</label>
                        <input type={this.state.dateType} className="form-control"
                               name="birthday" value={values.birthday}
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
            "name": this.state.director ? this.state.name : "",
            "surname": this.state.director ? this.state.surname : "",
            "birthday": this.state.director ? this.state.birthday : ""
        }
    };

    loadDirector = (id) => {
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
        const directorss = directors.directors;
        for (let i = 0; i < directorss.length; i++) {
            if (directorss[i].id === id) {
                console.log(directorss[i]);
                this.setState({
                    director: directorss[i],
                    name: directorss[i].name,
                    surname: directorss[i].surname,
                    birthday: directorss[i].birthday
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
            "name": this.state.name,
            "surname": this.state.surname,
            "birthday": this.state.birthday
        };
        addDirector(params)
            .then(response => {
                console.log(response);
                this.props.history.push("/directors");
            })
    };

    handleBackClick = () => {
        this.props.history.push('/directors');
    };
}
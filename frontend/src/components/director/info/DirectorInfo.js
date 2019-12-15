import React, {Component} from 'react';
import {checkAccessToken, checkStates} from "../../../utils/APIUtils";
import {getDirectorMovies, getDirectorProfile} from "../../../utils/DirectorUtils";
import {ACCESS_TOKEN} from "../../../utils/Constants";
import {FaUserAlt} from "react-icons/fa";
import {IconContext} from "react-icons";
import FilterableTable from "../../../commons/table/FilterableTable";
import directors from "../../../assets/test_data/directors.json";
import './DirectorInfo.css';

export default class DirectorInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            director: null,
            movies: null,
        }
    }

    componentDidMount() {
        let id;
        if (this.props.location.state) {
            console.log("aaaaaaaaaaaaaaaaaaaa");
            id = this.props.location.state.id;
        }
        if (id) {
            this.loadDirector(id);
            this.loadDirectorMovies(id);
        }
    }

    render() {
        checkAccessToken(ACCESS_TOKEN);
        checkStates(this.state);
        const values = this.assignValues();
        console.log(values);
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
                                {values.name}
                            </p>
                        </div>
                        <div className="row info-row-inner">
                            <p className="font-weight-bold">{"Surname:"}</p>
                            <p className="font-weight-normal">
                                {values.surname}
                            </p>
                        </div>
                    </div>
                    <div className="col col-lg-2 info-col">
                        <div className="row info-row-inner">
                            <p className="font-weight-bold">{"Birthday:"}</p>
                            <p className="font-weight-normal">
                                {values.birthday}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="row movies-row">
                    {/*<FilterableTable data={values.movies} buttonText={"Add Movie"}/>*/}
                </div>
            </div>
        );
    }

    loadDirector = (id) => {
        this.setState({isLoading: true});

        // getDirectorProfile(id).then(response => {
        //     this.setState({
        //         director: response,
        //         isLoading: false
        //     });
        // }).catch(error => this.catchError(error.status));
        // TODO delete
        const directorss = directors.directors;
        for (let i = 0; i < directorss.length; i++) {
            if (directorss[i].id === id) {
                console.log(directorss[i].id);
                this.setState({
                    director: directorss[i],
                    name: directorss[i].name,
                    surname: directorss[i].surname,
                    birthday: directorss[i].birthday,
                    isLoading: false
                });
            }
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

    loadDirectorMovies = (id) => {
        // this.setState({isLoading: true});
        //
        // getDirectorMovies(id).then(response => {
        //     this.setState({
        //         movies: response,
        //         isLoading: false
        //     });
        // }).catch(error => this.catchError(error.status));
        //    TODO
        const directorss = directors.directors;
        for (let i = 0; i < directorss.length; i++) {
            if (directorss[i].id === id) {
                this.setState({
                    movies: directorss[i].movies
                });
            }
        }
    };

    assignValues = () => {
        return {
            "name": this.state.director ? this.state.name : "",
            "surname": this.state.director ? this.state.surname : "",
            "birthday": this.state.director ? this.state.birthday : "",
            "movies": this.state.director ? this.state.movies : null,
        }
    };
}
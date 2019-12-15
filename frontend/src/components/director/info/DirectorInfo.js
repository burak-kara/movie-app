import React, {Component} from 'react';
import {checkAccessToken, checkStates} from "../../../utils/APIUtils";
import {getDirectorMovies, getDirectorProfile} from "../../../utils/DirectorUtils";
import {ACCESS_TOKEN} from "../../../utils/Constants";
import {FaUserAlt} from "react-icons/fa";
import {IconContext} from "react-icons";
import './DirectorInfo.css';
import FilterableTable from "../../../commons/table/FilterableTable";
import movies from "../../../assets/test_data/movies.json"


export default class DirectorInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            director: null,
            movies: null,
            isLoading: false,
            isBadRequest: false,
            isNotFound: false,
            isServerError: false,
        }
    }

    componentDidMount() {
        this.loadDirector(this.props.id);
        this.loadDirectorMovies(this.props.id);
    }

    render() {
        checkAccessToken(ACCESS_TOKEN);
        checkStates(this.state);
        // TODO contains
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
                                {/*    TODO */}
                                {/*{this.state.director.name}*/}Director Name
                            </p>
                        </div>
                        <div className="row info-row-inner">
                            <p className="font-weight-bold">{"Surname:"}</p>
                            <p className="font-weight-normal">
                                {/*    TODO */}
                                {/*{this.state.director.surname}*/}Director Surname
                            </p>
                        </div>
                    </div>
                    <div className="col col-lg-2 info-col">
                        <div className="row info-row-inner">
                            <p className="font-weight-bold">{"Birthday:"}</p>
                            <p className="font-weight-normal">
                                {/*    TODO */}
                                {/*{this.state.director.birthday}*/}Director Birthday
                            </p>
                        </div>
                        <div className="row info-row-inner">
                            <p className="font-weight-bold">{"Place:"}</p>
                            <p className="font-weight-normal">
                                {/*    TODO */}
                                {/*{this.state.director.place}*/}Director Place
                            </p>
                        </div>
                    </div>
                </div>
                <div className="row movies-row">
                    {/* TODO change movies.movies*/}
                    <FilterableTable data={movies.movies} buttonText={"Add Movie"}/>
                </div>
            </div>
        );
    }

    loadDirector = (id) => {
        this.setState({isLoading: true});

        getDirectorProfile(id).then(response => {
            this.setState({
                director: response,
                isLoading: false
            });
        }).catch(error => this.catchError(error.status))
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
        this.setState({isLoading: true});

        getDirectorMovies(id).then(response => {
            this.setState({
                movies: response,
                isLoading: false
            });
        }).catch(error => this.catchError(error.status))
    }
}
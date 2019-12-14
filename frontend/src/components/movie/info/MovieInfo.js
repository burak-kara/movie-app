import React, {Component} from 'react';
import {checkAccessToken, checkStates} from "../../../utils/APIUtils";
import {getMovieProfile} from "../../../utils/MovieUtils";
import {ACCESS_TOKEN} from "../../../utils/Constants";
import {FaUserAlt} from "react-icons/fa";
import {IconContext} from "react-icons";
import './MovieInfo.css';
import FilterableTable from "../../../commons/table/FilterableTable";
import movie from "../../../assets/test_data/movie.json"

export default class MovieInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: null,
            isLoading: false,
            isBadRequest: false,
            isNotFound: false,
            isServerError: false,
        }
    }

    componentDidMount() {
        this.loadMovie(this.props.id);
    }

    render() {
        checkAccessToken(ACCESS_TOKEN);
        checkStates(this.state);
        // TODO contains
        return (
            <div className="container border director-info-container">
                <div className="row justify-content-md-center info-row">
                    <div className="col col-lg-2 info-col">
                        <div className="row info-row-inner">
                            <p className="font-weight-bold">Name:</p>
                            <p className="font-weight-normal">
                                {/*    TODO */}
                                {/*{this.state.director.name}*/}{movie.name}
                            </p>
                        </div>
                        <div className="row info-row-inner">
                            <p className="font-weight-bold">{"Director:"}</p>
                            <p className="font-weight-normal">
                                {/*    TODO */}
                                {/*{this.state.director.surname}*/}{movie.director}
                            </p>
                        </div>
                    </div>
                    <div className="col col-lg-2 info-col">
                        <div className="row info-row-inner">
                            <p className="font-weight-bold">{"Year:"}</p>
                            <p className="font-weight-normal">
                                {/*    TODO */}
                                {/*{this.state.director.birthday}*/}{movie.year}
                            </p>
                        </div>
                        <div className="row info-row-inner">
                            <p className="font-weight-bold">{"Duration:"}</p>
                            <p className="font-weight-normal">
                                {/*    TODO */}
                                {/*{this.state.director.place}*/}{movie.duration}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    loadMovie = (id) => {
        this.setState({isLoading: true});

        getMovieProfile(id).then(response => {
            this.setState({
                movie: response,
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

}
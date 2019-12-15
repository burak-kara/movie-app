import React, {Component} from 'react';
import {checkAccessToken, checkStates} from "../../../utils/APIUtils";
import {getMovieProfile} from "../../../utils/MovieUtils";
import {ACCESS_TOKEN} from "../../../utils/Constants";
import './MovieInfo.css';
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
            <div className="container border movie-info-container">
                <div className="row justify-content-md-center info-row">
                    <img className="image-container col-lg-2" src={require('../../../assets/images/logo83.png')} />
                    <div className="col col-lg-2 info-col">
                        <div className="row info-row-inner">
                            <p className="font-weight-bold">{"Name:"}&nbsp;</p>
                            <p className="font-weight-normal">
                                {/*    TODO */}
                                {/*{this.state.movie.name}*/}{movie.name}
                            </p>
                        </div>
                        <div className="row info-row-inner">
                            <p className="font-weight-bold">{"Director:"}&nbsp;</p>
                            <p className="font-weight-normal">
                                {/*    TODO */}
                                {/*{this.state.movie.director}*/}{movie.director}
                            </p>
                        </div>
                    </div>
                    <div className="col col-lg-2 info-col">
                        <div className="row info-row-inner">
                            <p className="font-weight-bold">{"Year:"}&nbsp;</p>
                            <p className="font-weight-normal">
                                {/*    TODO */}
                                {/*{this.state.movie.year}*/}{movie.year}
                            </p>
                        </div>
                        <div className="row info-row-inner">
                            <p className="font-weight-bold" >{"Duration:"}&nbsp;</p>
                            <p className="font-weight-normal">
                                {/*    TODO */}
                                {/*{this.state.movie.duration}*/}{movie.duration}
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
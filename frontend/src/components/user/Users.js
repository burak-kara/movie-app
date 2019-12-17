import React, {Component} from 'react';
import {deleteMovie, getAllMovies} from "../../utils/MovieUtils";
import {checkAccessToken, checkStates} from "../../utils/APIUtils";
import {ACCESS_TOKEN} from "../../utils/Constants";
import FilterableTable from "../../commons/table/FilterableTable";
import movies from "../../assets/test_data/movies.json";
import UserInfo from './info/UserInfo';

export default class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            isLoading: false,
            isBadRequest: false,
            isNotFound: false,
            isServerError: false,
        }
    }

    componentDidMount() {
        this.loadMovies();
    }

    render() {
        checkAccessToken(ACCESS_TOKEN);
        checkStates(this.state);
        return (
            <div>
                  <UserInfo 
                    />
            </div>
        );
    }

    loadMovies = () => {
        getAllMovies()
            .then(response => {
                this.setState({
                    data: response
                })
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

    handleInfoClick = (movieID) => {
        console.log("-----------movie info------------" + movieID);
        this.props.history.push("/movies/" + movieID);
    };

    handleAddClick = () => {
        console.log("-----------movie add------------");
        this.props.history.push("/movies/add");
    };

    handleUpdateClick = (movieID) => {
        console.log("-----------movie update------------");
        this.props.history.push({
            pathname: "/movies/update/" + movieID,
            state: {id: movieID}
        });
    };

    handleDeleteClick = (movieID) => {
        console.log("-----------movie delete------------");
        deleteMovie(movieID)
            .then((result) => {
                this.loadMovies();
            }).catch(error => this.catchError(error.status));
        this.setState({
            unAuthorized: this.props.currentUser.role !== "Admin"
        });
    };

    handleWatchedClick = (userID, listID, movieID) => {
        console.log("-----------add movie to watched list------------");
        this.props.history.push("/"+userID+"/lists/"+listID);// TODO
    };

    handleFavoriteClick = (userID, listID, movieID) => {
        console.log("-----------add movie to favorite list------------");
        this.props.history.push("/"+userID+"/lists/"+listID);// TODO
    };
}
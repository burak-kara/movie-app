import React, {Component} from 'react';
import {deleteDirector, getAllDirectors} from "../../utils/DirectorUtils";
import {checkAccessToken, checkStates} from "../../utils/APIUtils";
import {ACCESS_TOKEN} from "../../utils/Constants";
import FilterableTable from "../../commons/table/FilterableTable";
import directors from "../../assets/test_data/directors.json";
import "./Directors.css";

export default class Directors extends Component {
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
        this.loadDirectors();
    }

    render() {
        checkAccessToken(ACCESS_TOKEN);
        checkStates(this.state);
        return (
            <div className="container border director-list-container">
                <div className="row">
                    {/* TODO change directors.directors*/}
                    <FilterableTable
                        data={directors.directors}
                        buttonText={"Add Director"}
                        addHandler={this.handleAddClick}
                        deleteHandler={this.handleDeleteClick}
                        updateHandler={this.handleUpdateClick}
                        infoHandler={this.handleInfoClick}
                        userRole={this.props.currentUser.role}
                    />
                </div>
            </div>
        );
    }

    loadDirectors = () => {
        getAllDirectors()
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

    handleInfoClick = (directorID) => {
        console.log("-----------director info------------" + directorID);
        this.props.history.push("/directors/" + directorID);
    };

    handleAddClick = () => {
        console.log("-----------director add------------");
        this.props.history.push("/directors/add");
    };

    handleUpdateClick = (directorID) => {
        console.log("-----------director update------------");
        this.props.history.push({
            pathname: "/directors/update/" + directorID,
            state: {id: directorID}
        });
    };

    handleDeleteClick = (directorID) => {
        console.log("-----------director delete------------");
        deleteDirector(directorID)
            .then((result) => {
                this.loadDirectors();
            }).catch(error => this.catchError(error.status));
        this.setState({
            unAuthorized: this.props.currentUser.role !== "Admin"
        });
    };
}
import React, {Component} from 'react';
import {deleteDirector, getAllDirectors} from "../../utils/DirectorUtils";
import {checkAccessToken, checkStates} from "../../utils/APIUtils";
import {ACCESS_TOKEN} from "../../utils/Constants";
import FilterableTable from "../../commons/table/FilterableTable";
import directors from "../../assets/test_data/directors.json";
import {confirmAlert} from 'react-confirm-alert';
import {notification} from 'antd';
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
                        deleteHandler={this.handleDeleteClick}
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

    handleDeleteClick = (movieID) => {
        return (
            <div className="modal" id="myModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Delete Director</h4>
                            <button type="button" className="close" data-dismiss="modal"/>
                        </div>
                        <div className="modal-body">
                            Are you sure to delete the director?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-success" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal"
                                    >Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
        // if (this.props.currentUser.role === "Admin") {
        //     this.setState({unAuthorized: false});
        // } else {
        //     this.setState({unAuthorized: true})
        // }
    };
}
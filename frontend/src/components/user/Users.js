import React, {Component} from 'react';
import {ACCESS_TOKEN} from "../../utils/Constants";
import FilterableTable from "../../commons/table/FilterableTable";
import {deleteUser, getAllUsers} from "../../utils/UserUtils";
import UserInfo from './info/UserInfo';
import users from '../../assets/test_data/users.json'

export default class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            isLoading: true,
            isNotAdmin: this.props.currentUser.role !== "Admin"
        }
    }

    componentDidMount() {
        this.loadUsers();
    }

    render() {
        // TODO
        return (
            <div>
                {/*  
                IF -> notAdmin
                    Call User Info that has Info and Lists 
                ELSE 
                    Call UserList as Component that shows all
                    users
                */}
            </div>
        );
    }

    loadUsers = () => {
        getAllUsers()
            .then(response => {
                this.setState({
                    data: response
                })
            })
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

    handleUpdateClick = (userID) => {
        console.log("-----------user update------------");
        this.props.history.push({
            pathname: "/users/update/" + userID,
            state: {id: userID}
        });
    };

    handleDeleteClick = (userID) => {
        console.log("-----------user delete------------");
        deleteUser(userID)
            .then((result) => {
                this.loadUsers();
            }).catch(error => this.catchError(error.status));
        this.setState({
            unAuthorized: this.props.currentUser.role !== "Admin"
        });
    };
}
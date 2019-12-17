import React, {Component} from 'react';
import {checkAccessToken, checkStates} from "../../../utils/APIUtils";
import {ACCESS_TOKEN} from "../../../utils/Constants";
import {getUser} from "../../../utils/UserUtils";
import {FaUserAlt} from "react-icons/fa";
import {IconContext} from "react-icons";
import './UserInfo.css'
import FilterableTable from "../../../commons/table/FilterableTable";
import user from "../../../assets/test_data/user.json"

export default class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            isLoading: false,
            isBadRequest: false,
            isNotFound: false,
            isServerError: false,
        }
    }

    componentDidMount() {
        this.loadUser(this.props.id);
    }

    render() {
        checkAccessToken(ACCESS_TOKEN);
        checkStates(this.state);
        // TODO contains
        return (
            <div className="container border user-info-container">
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
                                {user.name}
                            </p>
                        </div>
                    </div>
                    <div className="col col-lg-2 info-col">
                        <div className="row info-row-inner">
                            <p className="font-weight-bold">Surname:</p>
                            <p className="font-weight-normal">
                                {user.surname}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="row movies-row">
                    <FilterableTable data={user.lists} buttonText={"Add Movie"}/>
                </div>
            </div>
        );
    }

    loadUser = (id) => {
        this.setState({isLoading: true});

        getUser(id).then(response => {
            this.setState({
                user: response,
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
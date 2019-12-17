import React, {Component} from 'react';
import {getUser, getMoviesFromUserList, getAllUsers, getAllUserLists} from "../../../utils/UserUtils";
import {ACCESS_TOKEN} from "../../../utils/Constants";
import {FaUserAlt} from "react-icons/fa";
import {IconContext} from "react-icons";
import FilterableTable from "../../../commons/table/FilterableTable";
import './UserInfo.css'

export default class UserInfo extends Component {
    constructor(props) {
        console.log("GELDİM AMCIK")
        super(props);
        this.state = {
            user: {},
            isNotAdmin: true
        }
    }

    componentDidMount() {
        this.checkAccessToken();
        if (this.props.location.state) {
            let id = this.props.location.state.id;
            if (id) {
                console.log("çağırdım oç")
                this.loadUser(id);
            }
        }
        this.setState({
            isNotAdmin: localStorage.getItem("userRole") !== "Admin"
        });
    }

    render() {
        this.checkAccessToken();
        this.checkErrorStates();

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
                                {this.state.user.name}
                            </p>
                        </div>
                    </div>
                    <div className="col col-lg-2 info-col">
                        <div className="row info-row-inner">
                            <p className="font-weight-bold">Surname:</p>
                            <p className="font-weight-normal">
                                {this.state.user.surname}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="row movies-row">
                {/* <FilterableTable data={user.lists} buttonText={"Add Movie"}/> */}
                </div>
            </div>
        );
    }

    loadUser = (id) => {
        this.setState({isLoading: true});
        console.log("USER ID: "+id)
        getUser(id).then((response) => {
            console.log("###"+response)
            this.setState({
                user: response,
                isLoading: false
            });
        })
    };

    checkAccessToken = () => {
        if (!localStorage.getItem(ACCESS_TOKEN)) {
            this.props.history.push({
                pathname: "/please-login",
                state: {
                    title: "Welcome",
                    info: "Please Login",
                    buttonText: "Login",
                    link: "/login"
                }
            });
        }
    };

    checkErrorStates = () => {
        if (this.state.isBadRequest) {
            this.props.history.push({
                pathname: "/error",
                state: {
                    title: "400",
                    info: "Bad Request",
                    buttonText: "Go Back",
                    link: "/"
                }
            });
        } else if (this.state.isNotFound) {
            this.props.history.push({
                pathname: "/error",
                state: {
                    title: "404",
                    info: "The page you are looking for was not found",
                    buttonText: "Go Back",
                    link: "/"
                }
            });
        } else if (this.state.isServerError) {
            this.props.history.push({
                pathname: "/error",
                state: {
                    title: "500",
                    info: "Oops! Something went wrong",
                    buttonText: "Go Back",
                    link: "/"
                }
            });
        }
    };

}
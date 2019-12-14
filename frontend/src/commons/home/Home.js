import React, {Component} from "react";
import {BrowserRouter, Link} from "react-router-dom";
import {ACCESS_TOKEN} from "../../utils/Constants";
import LoadingIndicator from "../loading/LoadingIndicator";
import {checkAccessToken} from "../../utils/APIUtils";


export default class Home extends Component {
    render() {
        checkAccessToken(ACCESS_TOKEN);

        return (
            <BrowserRouter>
                <row>
                    <Link to={`/movies`}>
                        <button type="button" className="btn btn-success m-3">Movies</button>
                    </Link>
                    <Link to={`/users`}>
                        <button type="button" className="btn btn-success m-3">Users</button>
                    </Link>
                    <Link to={`/directors`}>
                        <button type="button" className="btn btn-success m-3">Directors</button>
                    </Link>
                    <Link to={`/movieLists`}>
                        <button type="button" className="btn btn-success m-3">MovieLists</button>
                    </Link>
                    <Link to={`/places`}>
                        <button type="button" className="btn btn-success m-3">Places</button>
                    </Link>
                    <Link to={`/Roles`}>
                        <button type="button" className="btn btn-success m-3">Roles</button>
                    </Link>
                </row>
                <row>

                    {this.props.currentUser ? this.props.currentUser.role === "Admin" ?
                        <div>
                            <Link to={`/userAdd`}>
                                <button type="button" className="btn btn-primary  m-3">Add User</button>
                            </Link>
                            <Link to={`/directorAdd`}>
                                <button type="button" className="btn btn-primary  m-3">Add Director</button>
                            </Link>
                            <Link to={`/movieListAdd`}>
                                <button type="button" className="btn btn-primary  m-3">Add Movie List</button>
                            </Link>
                            <Link to={`/placeAdd`}>
                                <button type="button" className="btn btn-primary  m-3">Add Place</button>
                            </Link>
                            <Link to={`/roleAdd`}>
                                <button type="button" className="btn btn-primary  m-3">Add Role</button>
                            </Link>
                        </div> : "" : ""}
                    <Link to={`/addImdbMovie`}>
                        <button type="button" className="btn btn-primary  m-3">Add Movie</button>
                    </Link>
                </row>
            </BrowserRouter>
        );
    }
}
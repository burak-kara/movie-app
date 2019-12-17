import React, {Component} from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from "../commons/login/Login";
import {getCurrentUser} from "../utils/UserUtils";

import AppHeader from "../commons/header/AppHeader";
import Home from "../commons/home/Home";

import Users from "../components/user/Users";

import Movies from "../components/movie/Movies";
import MovieInfo from "../components/movie/info/MovieInfo";
import AddMovie from "../components/movie/operations/AddMovie";

import Directors from "../components/director/Directors";
import DirectorInfo from "../components/director/info/DirectorInfo";
import AddDirector from "../components/director/operations/AddDirector";

import users from "../assets/test_data/users.json";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // TODO
            // currentUser: localStorage.getItem("user"),
            // isAuthenticated: localStorage.getItem("isAuth"),
            // isLoading: false
            currentUser: users.users[0],
            isAuthenticated: true,
            isLoading: false
        }
    }

    componentDidMount() {
        // TODO uncomment
        // this.loadCurrentUser();
    }

    render() {
        return (
            <BrowserRouter>
                <AppHeader
                    currentUser={this.state.currentUser}
                    isAuthenticated={this.state.isAuthenticated}
                    onLogout={this.handleLogout}
                />
                <Switch>
                    <Route
                        exact path="/"
                        component={Home}
                    />
                    <Route
                        exact path="/login"
                        render={(props) =>
                            <Login
                                onLogin={this.handleLogin}
                                {...props}
                            />
                        }
                    />
                    <Route
                        exact path="/users"
                        render={(props) =>
                            <Users
                                isAuthenticated={this.state.isAuthenticated}
                                currentUser={this.state.currentUser}
                                {...props}
                            />
                        }
                    />
                    <Route
                        exact path="/movies"
                        render={(props) =>
                            <Movies
                                isAuthenticated={this.state.isAuthenticated}
                                currentUser={this.state.currentUser}
                                {...props}
                            />
                        }
                    />
                    <Route
                        exact path="/movies/add"
                        render={(props) =>
                            <AddMovie
                                isAuthenticated={this.state.isAuthenticated}
                                currentUser={this.state.currentUser}
                                {...props}
                            />
                        }
                    />
                    <Route
                        exact path="/movies/update/:id"
                        render={(props) =>
                            <AddMovie
                                isAuthenticated={this.state.isAuthenticated}
                                currentUser={this.state.currentUser}
                                {...props}
                            />
                        }
                    />
                    <Route
                        exact path="/movies/:id"
                        render={(props) =>
                            <MovieInfo
                                isAuthenticated={this.state.isAuthenticated}
                                currentUser={this.state.currentUser}
                                {...props}
                            />
                        }
                    />
                    <Route
                        exact path="/directors"
                        render={(props) =>
                            <Directors
                                isAuthenticated={this.state.isAuthenticated}
                                currentUser={this.state.currentUser}
                                {...props}
                            />
                        }
                    />
                    <Route
                        exact path="/directors/add"
                        render={(props) =>
                            <AddDirector
                                isAuthenticated={this.state.isAuthenticated}
                                currentUser={this.state.currentUser}
                                {...props}
                            />
                        }
                    />
                    <Route
                        exact path="/directors/update/:id"
                        render={(props) =>
                            <AddDirector
                                isAuthenticated={this.state.isAuthenticated}
                                currentUser={this.state.currentUser}
                                {...props}
                            />
                        }
                    />
                    <Route
                        exact path="/directors/:id"
                        render={(props) =>
                            <DirectorInfo
                                isAuthenticated={this.state.isAuthenticated}
                                currentUser={this.state.currentUser}
                                {...props}
                            />
                        }
                    />
                </Switch>
            </BrowserRouter>
        );
    }

    loadCurrentUser = () => {
        this.setState({isLoading: true});

        getCurrentUser()
            .then(response => {
                this.setState({
                    currentUser: response,
                    isAuthenticated: true,
                    isLoading: false
                });
                localStorage.setItem("user", response);
                localStorage.setItem("isAuthenticated", true);
            }).catch(error => {
            this.setState({isLoading: false})
        });
    };

    handleLogout = () => {
        localStorage.clear();
        this.setState({currentUser: null, isAuthenticated: false});
        this.props.history.push("/");
    };

    handleLogin = () => {
        this.loadCurrentUser();
        this.props.history.push("/");
    };
}

export default App;

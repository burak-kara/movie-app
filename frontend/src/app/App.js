import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import Login from "../commons/login/Login";

import AppHeader from "../commons/header/AppHeader";
import Home from "../commons/home/Home";

import Users from "../components/user/Users";
import UserInfo from "../components/user/info/UserInfo"

import Movies from "../components/movie/Movies";
import MovieInfo from "../components/movie/info/MovieInfo";
import AddMovie from "../components/movie/operations/AddMovie";

import Directors from "../components/director/Directors";
import DirectorInfo from "../components/director/info/DirectorInfo";
import AddDirector from "../components/director/operations/AddDirector";

import WarningPage from "../commons/warning/WarningPage";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: localStorage.getItem("user"),
            isAuthenticated: localStorage.getItem("isAuthenticated"),
            isLoading: false
        }
    }

    render() {
        return (
            <BrowserRouter>
                <AppHeader
                    currentUser={this.state.currentUser}
                    isAuthenticated={this.state.isAuthenticated}
                    userID={this.state.userID}
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
                        exact path="/users/:id"
                        render={(props) =>
                            <UserInfo
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
                        exact path="/please-login"
                        render={(props) =>
                            <WarningPage {...props}/>
                        }
                    />
                    <Route
                        exact path="/error"
                        render={(props) =>
                            <WarningPage {...props}/>
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

    handleLogout = () => {
        localStorage.clear();
        this.setState({currentUser: null, isAuthenticated: false});
    };

    handleLogin = (response) => {
        this.setState({
            currentUser: response.user,
            isAuthenticated: true,
            isLoading: false
        });
        localStorage.setItem("user", response.user);
        localStorage.setItem("isAuthenticated", "true");
    };
}

export default App;

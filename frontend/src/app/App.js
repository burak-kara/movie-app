import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import Login from "../commons/login/Login";

import AppHeader from "../commons/header/AppHeader";
import Home from "../commons/home/Home";

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
                        render={(props) => <Home {...props}/>}
                    />
                    <Route
                        exact path="/login"
                        render={(props) => <Login onLogin={this.handleLogin} {...props}/>}
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
            isLoading: false,
            userID: response.user.id
        });
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userRole", response.user.role);
        localStorage.setItem("userID", response.user.id);
    };
}

export default App;

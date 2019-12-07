import React, {Component} from 'react';
import {checkAccessToken} from "../../../utils/APIUtils";
import {getDirectorMovies, getDirectorProfile} from "../../../utils/DirectorUtils";
import {ACCESS_TOKEN} from "../../../utils/Constants";
import {WarningPage} from "../../../commons/warning/WarningPage";
import LoadingIndicator from "../../../commons/loading/LoadingIndicator";
import {Col, Container, Row} from "react-bootstrap";
import {Avatar, Descriptions} from "antd";
import './DirectorInfo.css';

export default class DirectorInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            director: null,
            movies: null,
            isLoading: false,
            isBadRequest: false,
            isNotFound: false,
            isServerError: false,
        }
    }

    componentDidMount() {
        this.loadDirector(this.props.id);
        this.loadDirectorMovies(this.props.id);
    }

    render() {
        checkAccessToken(ACCESS_TOKEN);
        this.checkStates();
        // TODO contains
        return (
            <Container fluid={true}>
                <Row>
                    <Col md={{span: 8, offset: 2}} className="director-icon-column">
                        <Avatar icon="user" style={{color: "#cecac6", fontSize: "80px"}}/>
                        {/* TODO */}
                        {/*{this.state.director.name + " " + this.state.director.surname}*/}
                        {"Christopher Nolan"}
                    </Col>
                </Row>
                <Row>
                    <Col md={{span: 8, offset: 2}} className="director-info-column">
                        <Col>
                            <Descriptions bordered size="middle">
                                <Descriptions.Item
                                    label="Name: "
                                    span={6}>{"this.state.director.name"} {/* TODO */}
                                </Descriptions.Item>
                                <Descriptions.Item
                                    label="Surname: "
                                    span={6}>{"this.state.director.surname"} {/* TODO */}
                                </Descriptions.Item>
                            </Descriptions>
                        </Col>
                        <Col>
                            <Descriptions bordered size="middle">
                                <Descriptions.Item
                                    label="Birth Date: "
                                    span={6}>{"this.state.director.birthDate.split('T')[0]"} {/* TODO */}
                                </Descriptions.Item>
                                <Descriptions.Item
                                    label="Birth Place: "
                                    span={6}>{"this.state.director.place" ? "this.state.director.place.name" : "N/A"} {/* TODO */}
                                </Descriptions.Item>
                            </Descriptions>
                        </Col>
                    </Col>
                </Row>
                <Row>
                    {/*    TODO list movies */}
                </Row>
            </Container>
        );
    }

    checkStates = () => {
        if (this.state.isLoading) {
            return <LoadingIndicator/>
        }

        if (this.state.isBadRequest) {
            return (
                <WarningPage
                    title={"400"}
                    info={"Bad Request"}
                    buttonText={"Go Back"}
                    link={"/"}
                />
            )
        } else if (this.state.isNotFound || !this.state.director) {
            return (
                <WarningPage
                    title={"404"}
                    info={"The page you are looking for was not found"}
                    buttonText={"Home"}
                    link={"/"}
                />
            )
        } else if (this.state.isServerError) {
            return (
                <WarningPage
                    title={"500"}
                    info={"Oops! Something went wrong"}
                    buttonText={"Go Back"}
                    link={"/"}
                />
            )
        }
    };

    loadDirector = (id) => {
        this.setState({isLoading: true});

        getDirectorProfile(id).then(response => {
            this.setState({
                director: response,
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

    loadDirectorMovies = (id) => {
        this.setState({isLoading: true});

        getDirectorMovies(id).then(response => {
            this.setState({
                movies: response,
                isLoading: false
            });
        }).catch(error => this.catchError(error.status))
    }
}
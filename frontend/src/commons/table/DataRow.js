import React, {Component} from "react";

export default class DataRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        };
    }

    componentDidMount() {
        this.setState({
            data: this.props.data,
        }, () => {
            console.log("Data Row componentDidMount");
            console.log(this.props.data);
        })
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            data: nextProps.data,
        }, () => {
            console.log("Data Row componentWillReceiveProps");
            console.log(this.props.data);
        })
    }

    render() {
        return (
            <tr>
                {this.renderData()}
                {this.renderButtons()}
            </tr>
        );
    }


    renderData = () => {
        let columns = [];
        for (let key in this.state.data) {
            if (key !== "id" && key !== "movies"
                && key !== "lists" && key !== "password"
                && key !== "accessToken")
                columns.push(
                    <td
                        onClick={this.handleInfoClick}
                        style={{"cursor": "pointer"}}
                        key={key}
                    >
                        {this.getData(this.state.data[key], key)}
                    </td>
                )
        }
        return columns;
    };

    handleInfoClick = () => {
        this.props.infoHandler(this.state.data["id"]);
    };

    getData = (obj, key) => {
        if (key === "birthDate") {
            return obj["day"] + "." + obj["month"] + "." + obj["year"];
        }
        if (key === "director") {
            return obj["name"] + " " + obj["surname"];
        } else {
            return obj
        }
    };

    renderButtons = () => {
        return (
            <td key={"buttons"}>
                <div className="container">
                    <div className="row justify-content-around data-row">
                        <div className="col">
                            <button
                                type="button" className="btn btn-success"
                                disabled={
                                    this.props.isMovieList ? false : this.props.isNotAdmin
                                }
                                onClick={this.leftButtonHandler}
                            >
                                {this.props.leftButtonText}
                            </button>
                        </div>
                        <div className="col">
                            <button
                                type="button" className="btn btn-danger"
                                disabled={
                                    this.props.isMovieList ? false : this.props.isNotAdmin
                                }
                                onClick={this.rightButtonHandler}
                            >
                                {this.props.rightButtonText}
                            </button>
                        </div>
                    </div>
                </div>
            </td>
        );
    };

    leftButtonHandler = () => {
        this.props.leftButtonHandler(this.state.data["id"]);
    };

    rightButtonHandler = () => {
        this.props.rightButtonHandler(this.state.data["id"]);
    };
}
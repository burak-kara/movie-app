import React, {Component} from "react";

export default class DataRow extends Component {
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
        for (let key in this.props.data) {
            if (key !== "id" && key !== "movies")
                columns.push(
                    <td
                        onClick={this.handleInfoClick}
                        style={{"cursor": "pointer"}}
                    >
                        {this.props.data[key]}
                    </td>
                )
        }
        return columns;
    };

    handleInfoClick = () => {
        this.props.infoHandler(this.props.data["id"]);
    };

    renderButtons = () => {
        var buttonLeftText = this.props.isNotAdmin ? ("Watched"):("Update");
        var buttonRightText = this.props.isNotAdmin ? ("Favorite"):("Delete");
        return (
            <td>
                <div className="container">
                    <div>
                        <div className="row justify-content-around data-row">
                            <div className="col">
                                <button
                                    type="button" className="btn btn-success"
                                    disabled={this.props.isNotAdmin}
                                    onClick={this.props.isNotAdmin?(this.handleWatchedClick):(this.handleUpdateClick)}
                                >
                                    {buttonLeftText}
                                </button>
                            </div>
                            <div className="col">
                                <button
                                    type="button" className="btn btn-danger"
                                    disabled={this.props.isNotAdmin}
                                    onClick={this.props.isNotAdmin ? (this.handleFavoriteClick):(this.handleDeleteClick)}
                                >
                                {buttonRightText}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </td>
        );
    };

    handleUpdateClick = () => {
        this.props.updateHandler(this.props.data["id"]);
    };

    handleDeleteClick = () => {
        this.props.deleteHandler(this.props.data["id"]);
    };

    handleWatchedClick = (id) => {
        this.props.watchedHandler(this.props.data["id"]);
    };

    handleFavoriteClick = () => {
        this.props.favoriteHandler(this.props.data["id"]);
    };
}

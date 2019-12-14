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
            if (key !== "id")
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
        return (
            <td>
                <div className="container">
                    <div className="row justify-content-around data-row">
                        <div className="col">
                            <button
                                type="button" className="btn btn-success"
                                disabled={this.props.isNotAdmin}
                                onClick={this.handleUpdateClick}
                            >
                                Update
                            </button>
                        </div>
                        <div className="col">
                            <button
                                type="button" className="btn btn-danger"
                                disabled={this.props.isNotAdmin}
                                onClick={this.handleDeleteClick}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </td>
        );
    };

    handleUpdateClick = (id) => {
        this.props.updateHandler(this.props.data["id"]);
    };

    handleDeleteClick = () => {
        this.props.deleteHandler(this.props.data["id"]);
    };
}
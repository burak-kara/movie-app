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
                columns.push(<td>{this.props.data[key]}</td>)
        }
        return columns;
    };

    renderButtons = () => {
        return (
            <td>
                <div className="container">
                    <div className="row justify-content-around data-row">
                        <div className="col">
                            <button
                                type="button" className="btn btn-success"
                                onClick={this.handleUpdateClick}
                            >
                                Update
                            </button>
                        </div>
                        <div className="col">
                            <button
                                type="button" className="btn btn-danger"
                                onClick={this.props.deleteHandler(this.props.data["id"])}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </td>
        );
    };

    handleUpdateClick = () => {
        //    TODO
    };

    handleDeleteClick = () => {
        //    TODO
    };
}
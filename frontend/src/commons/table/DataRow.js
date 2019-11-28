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
            columns.push(<td>{this.props.data[key]}</td>)
        }
        return columns;
    };

    renderButtons = () => {
        return (
            <td>
                <button type="button" className="btn btn-success" onClick={this.handleUpdateClick}>
                    Update
                </button>
                {'  '}
                <button type="button" className="btn btn-danger" onClick={this.handleDeleteClick}>
                    Delete
                </button>
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
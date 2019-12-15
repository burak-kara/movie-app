import React, {Component} from "react";
import DataRow from "./DataRow";

export default class DataTable extends Component {
    render() {
        return (
            <table className='table table-hover'>
                <thead>
                <tr>
                    {this.renderHeaders()}
                </tr>
                </thead>
                <tbody>
                {this.renderRows()}
                </tbody>
            </table>
        );
    }

    renderHeaders = () => {
        let keys = Object.keys(this.props.objects[0]);
        let headers = [];
        for (let key in keys) {
            let str = keys[key];
            if (str !== "id" && str !== "movies")
                headers.push(<th>{str[0].toUpperCase() + str.slice(1)}</th>);
        }
        return headers;
    };

    // TODO implement filter here
    // render only filtered rows
    renderRows = () => {
        let rows = [];
        this.props.objects.forEach((object) => {
            rows.push(
                <DataRow
                    data={object}
                    isNotAdmin={this.props.isNotAdmin}
                    updateHandler={this.props.updateHandler}
                    deleteHandler={this.props.deleteHandler}
                    infoHandler={this.props.infoHandler}
                />
            );
        });
        return rows;
    };
}
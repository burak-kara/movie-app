import React, {Component} from "react";
import DataRow from "./DataRow";

export default class DataTable extends Component {
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
            console.log("Data Table");
            console.log(this.props.data);
        })
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            data: nextProps.data,
        }, () => {
            console.log("Data Table");
            console.log(this.props.data);
        })
    }

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
        let headers = [];
        if (this.state.data) {
            console.log(typeof this.state.data);
            let keys = Object.keys(this.state.data[0]);
            for (let key in keys) {
                let str = keys[key];
                if (str !== "id" && str !== "movies")
                    headers.push(
                        <th key={key}>
                            {str[0].toUpperCase() + str.slice(1).toLowerCase()}
                        </th>
                    );
            }
            return headers;
        }
    };

    // TODO implement filter here
    // render only filtered rows
    renderRows = () => {
        let rows = [];
        if (this.state.data) {
            this.state.data.forEach((object) => {
                rows.push(
                    <DataRow
                        data={object}
                        leftButtonText={this.props.leftButtonText}
                        rightButtonText={this.props.rightButtonText}
                        isNotAdmin={this.props.isNotAdmin}
                        isInfo={this.props.isInfo}
                        isMovieList={this.props.isMovieList}
                        leftButtonHandler={this.props.leftButtonHandler}
                        rightButtonHandler={this.props.rightButtonHandler}
                        infoHandler={this.props.infoHandler}
                    />
                );
            });
        }
        return rows;
    };
}
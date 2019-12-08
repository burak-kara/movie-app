import React, {Component} from "react";
import DataTable from "./DataTable";
import {WarningPage} from "../warning/WarningPage";
import "./Table.css";
import {IoIosSearch} from 'react-icons/io';

export default class FilterableTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            filterText: '',
        };
    }

    componentDidMount() {
        this.checkData();
        this.setState({data: this.props.data})
    }

    render() {
        return (
            <div className="container table-container">
                {this.renderSearchBar()}
                {this.renderDataTable()}
            </div>
        );
    }

    checkData = () => {
        if (!this.props.data) {
            return (
                <WarningPage
                    title={"404"}
                    info={"The page you are looking for was not found"}
                    buttonText={"Home"}
                    link={"/"}
                />
            );
        }
    };

    renderSearchBar = () => {
        return (
            <div className="row search-row">
                <div className="col search-col">
                    <IoIosSearch/>
                    <input
                        className="form-control form-control-sm ml-3 w-75"
                        type="text" placeholder="Search by name" aria-label="Search"
                        onChange={this.onChange}
                    />
                </div>
                <div className="col button-col">
                    <button type="button" className="btn btn-primary add-button" onClick={this.handleAddClick}>
                        {this.props.buttonText}
                    </button>
                </div>
            </div>
        );
    };

    onChange = (event) => {
        console.log(event.target.value);
        this.setState({filterText: event.target.value})
    };

    handleAddClick = () => {
        //    TODO
    };

    renderDataTable = () => {
        return (
            <DataTable objects={this.props.data} filterText={this.state.filterText}/>
        );
    };
}
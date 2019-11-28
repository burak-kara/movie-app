import React, {Component} from "react";
import DataTable from "./DataTable";
import {WarningPage} from "../warning/WarningPage";

export default class FilterableTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            filterText: '',
        };
    }

    componentDidMount() {
        this.setState({data: this.props.data})
    }

    render() {
        this.checkData();
        return (
            <div>
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
            <div>
                <button type="button" className="btn btn-primary btn-lg btn-block" onClick={this.handleAddClick}>
                    {this.props.buttonText}
                </button>
            </div>
            //    TODO implement search bar
        );
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
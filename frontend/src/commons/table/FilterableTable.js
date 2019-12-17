import React, {Component} from "react";
import DataTable from "./DataTable";
import {IoIosSearch} from 'react-icons/io';
import "./Table.css";

export default class FilterableTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            filterText: '',
        };
    }

    componentDidMount() {
        this.setState({
            data: this.props.data,
        }, () => {
            console.log("Filterable Table componentDidMount");
            console.log(this.props.data);
        })
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            data: nextProps.data,
        }, () => {
            console.log("Filterable Table componentWillReceiveProps");
            console.log(this.props.data);
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            this.setState({
                data: this.props.data
            })
        }
    }

    render() {
        return (
            <div className="container table-container">
                {this.renderSearchBar()}
                {this.renderDataTable()}
            </div>
        );
    }

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
                <div className="col add-button-col">
                    <button
                        type="button" className="btn btn-primary add-button"
                        onClick={this.handleAddClick}
                        disabled={this.props.isNotAdmin}
                    >
                        {this.props.addButtonText}
                    </button>
                </div>
            </div>
        );
    };

    onChange = (event) => {
        this.setState({filterText: event.target.value})
    };

    handleAddClick = () => {
        this.props.addHandler();
    };

    renderDataTable = () => {
        return (
            <DataTable
                data={this.state.data}
                filterText={this.state.filterText}
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
    };
}
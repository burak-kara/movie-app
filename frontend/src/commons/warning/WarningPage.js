import React, {Component} from 'react';
import "./WarningPage.css";
/*
* How to use
* For UnAuthorized requests; title=401 info=UnAuthorized Please Login buttonText=Home link=/
* For Not Found requests; title= 404 info=The page you are looking for was not found. buttonText=Home link=/
* For Any Request; title=Welcome info=Please Login buttonText=Login link=/
* For Server Error; title=500 info=Oops! Something went wrong. buttonText=Go Back link=/
* For Bad Request; title=400 info=Bad Request buttonText=Go Back link=/
* */

export default class WarningPage extends Component {
    render() {
        let state;
        if (this.props.location.state) {
            state = this.props.location.state;
            console.log(state);
        }
        return (
            <div className="container border warning-page-container">
                <div className="row warning-title">
                    {state.title}
                </div>
                <div className="row warning-info">
                    {state.info}
                </div>
                <div className="row warning-button">
                    <button
                        className="btn btn-outline-success btn-lg"
                        onClick={() => {
                            this.props.history.push(state.link)
                        }}
                    >
                        {state.buttonText}
                    </button>
                </div>
            </div>
        );
    }
}

import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';

/*
* How to use
* For UnAuthorized requests; title=401 info=UnAuthorized Please Login buttonText=Home link=/
* For Not Found requests; title= 404 info=The page you are looking for was not found. buttonText=Home link=/
* For Any Request; title=Welcome info=Please Login buttonText=Login link=/
* For Server Error; title=500 info=Oops! Something went wrong. buttonText=Go Back link=/
* For Bad Request; title=400 info=Bad Request buttonText=Go Back link=/
* */

export class WarningPage extends Component {
    render() {
        // TODO contains
        return (
            <div className="class-container">
                <h1 className="title">
                    {this.props.title}
                </h1>
                <div className="desc">
                    {this.props.info}
                </div>
                {/*TODO link*/}
                {/*<Link to="/">*/}
                <Button variant="outline-success" size="lg">
                    {this.props.buttonText}
                </Button>
                {/*</Link>*/}
            </div>
        );
    }
}

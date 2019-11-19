import React, {Component} from 'react';
import {getDirectorProfile} from "../../../utils/DirectorUtils";

export default class AddDirectorForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            director: null,
            isLoading: false,
            notFound: false,
            error: false
        }
    }

    render() {
        return (
            <div>

            </div>
        );
    }

    componentDidMount() {
    }

    loadProfile = (id) => {
        this.setState({isLoading: true});

        getDirectorProfile(id)
            .then(response =>
                this.setState({director: response})
            ).catch(error => {
                if (error.status === 404) {
                    this.setState({notFound: true, isLoading: false});
                } else {
                    this.setState({error: true, isLoading: false})
                }
            }
        );
    }
}
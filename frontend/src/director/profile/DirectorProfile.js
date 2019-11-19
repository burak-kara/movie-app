import React, {Component} from 'react';

export default class DirectorProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            director: null,
            isLoading: false,
        }
    }

    render() {
        return (
            <div>
            
            </div>
        );
    }

    loadDirector = (id) => {
      this.setState({isLoading:true});
    };
}
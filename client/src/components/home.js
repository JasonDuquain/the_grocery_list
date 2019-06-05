import React, { Component } from 'react';


class Home extends Component {
    constructor() {
        super();
        
    }

    render() {

        if (this.props.loggedIn) {
            return (
              <div>
                CREATE TODO PAGE HERE
              </div>
            );
        } else {
            return (
              <div>
                Please sign up/login to get started
              </div>
            );
        }
        
    }
}


export default Home;
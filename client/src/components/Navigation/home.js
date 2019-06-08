import React, { Component } from 'react';
import CreateItem from '../List/create-item';


/***** If no state is needed change this to a function *****/

class Home extends Component {
    constructor() {
        super();
        
    }

    render() {

        if (this.props.loggedIn) {
            return (
              <div>
                {/* 20190608 - DONT USE THIS AS IT DOES NOT HIT THE ROUTE AND THE ROUTE IS WHERE THE PROP IS SENT  
                <CreateItem />
                */}
                
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
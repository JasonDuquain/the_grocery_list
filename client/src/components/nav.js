import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../App.scss';



class Nav extends Component {
    constructor() {
        super()
		
        
    }

    
	
    render() {
        
        
        return (
            <div>
                <header>
                    <nav style={{padding: 40, backgroundColor: 'gray'}}>
                        <Link to="/signup"><span>sign up</span>
                        </Link>
                    </nav>
                </header>
            </div>

        );

    }
}

export default Nav;
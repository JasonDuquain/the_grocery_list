import React from 'react';
import { NavLink } from 'react-router-dom';
import './home.scss';


const Home = (props) => {

    return (
    
        <div className="main">
        
            {props.loggedIn ? (
                 <div className="main__section">
                    <h1 className="main__heading">The Grocery List</h1>
                    <h2 className="main__subheading">An app that lets you and your family shop together</h2>
                    <p className="main__notice">Please click 
        
                        <NavLink className="header__link" to="/create" activeClassName="is-active">
                            Create Item
                        </NavLink>to get started or view your  

                        <NavLink className="header__link" to="/list" activeClassName="is-active">
                            Grocery List
                        </NavLink>
                    </p>
                 </div>
                ) : (
                 <div className="main__section">
                    <h1 className="main__heading">The Grocery List</h1>
                    <h2 className="main__subheading">An app that lets you and your family shop together</h2>
                    <p className="main__notice">Please 
                        <NavLink className="header__link" to="/signup" activeClassName="is-active">Signup</NavLink> to get started
                    </p>
                 </div>
             )}
   
        </div>
    
    );
    
}



export default Home;


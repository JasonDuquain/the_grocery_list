import React from 'react';


const Home = (props) => {

    return (
    
        <div>
        
            {props.loggedIn ? (
                 <div>
                    Please click create item get started or view your lists
                 </div>
                ) : (
                 <div>
                    Please sign up to get started 
                 </div>
             )}
   
        </div>
    
    );
    
}



export default Home;


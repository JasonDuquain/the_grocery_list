import React from 'react';
import { Link } from 'react-router-dom';


const NotFound = (props) => (
        <div style={{textAlign: "center"}}>
            <h2 style={{textAlign: "center", fontSize: "2em", margin: "2em"}}>Page Not Found</h2>
        
            <Link to="/" style={{color: "#fff", textAlign: "center", display: "inlineBlock", textDecoration: "underline"}}>Go Home</Link>
        </div> 
);



export default NotFound;
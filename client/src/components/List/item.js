import React, {Component} from 'react';
import { Link } from 'react-router-dom';


// Add edit and delete links/buttons and maybe a checkbox for the complted prop

const ItemRow = (props) => (
    
    <tr>
        {console.log(props)} 
        <td>{props.name}</td>    
        <td>{props.quantity}</td>       
        <td>{props.completed}</td> 
        <td>EDIT BTN/LINK</td> 
        <td>DELETE BTN/LINK</td> 
    </tr>
    
)



export default ItemRow;
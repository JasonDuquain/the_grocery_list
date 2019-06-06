import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

/******************************

Items are getting deleted but not sure how state is updated in the parent?? But it appears to. Might need to move the handleDelete fn to ItemRow if any issues

**************************/


//// Add edit link and maybe a checkbox for the complted prop

class ItemRow extends Component {
    constructor() {
        super();
        this.handleDelete = this.handleDelete.bind(this);
    }
    
    handleDelete(index) {
        axios.post('/items/delete/' + this.props.item._id)
        .then(deletedItem => console.log(deletedItem))
        .catch(err => console.log(err))
    }
    
    render() {
        return (
        
            <tr>
                {console.log(this.props)} 
                <td>{this.props.item.name}</td>    
                <td>{this.props.item.quantity}</td>       
                <td>{this.props.item.purchased}</td> 
                <td>EDIT BTN/LINK</td> 
                <td><button onClick={this.handleDelete}>Delete</button></td> 
            </tr>
        
        );
    }
    
    
}



export default ItemRow;
import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

/******************************

Items are getting deleted but not sure how state is updated in the parent?? But it appears to. Might need to move the handleDelete fn to ItemRow if any issues

**************************/


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
                <td className={this.props.item.purchased === false ? '' : 'fade'}>{this.props.item.name}</td>    
                <td className={this.props.item.purchased === false ? '' : 'fade'}>{this.props.item.quantity}</td>       
                <td><button onClick={this.props.handleTogglePurchase}>{this.props.item.purchased === false ? 'Purchase' : 'Unpurchase'}</button></td> 
                <td>
                    <Link to={"/edit/" + this.props.item._id}>Edit</Link>
                </td> 
                <td><button onClick={this.handleDelete}>Delete</button></td> 
            </tr>
        
        );
    }
    
    
}



export default ItemRow;
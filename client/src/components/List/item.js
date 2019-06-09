import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

/**************

Items are getting deleted but not sure how state is updated in the parent?? But it appears to. Might need to move the handleDelete fn to ItemRow if any issues

***************/


class ItemRow extends Component {
    
    constructor() {
        super();
        this.handleDelete = this.handleDelete.bind(this);
    }
    
    handleDelete(index) {
        axios.post('/items/delete/' + this.props.item._id)
        .then(deletedItem => {
            /* 2019608 temp fix to get items to be visually removed from the UI w/o a manual refresh */
            window.location.reload();
        })
        .catch(err => console.log(err))
    }
    
    render() {
        return (
        
            <tr className="tablelist__tablerow"> 
                <td className={this.props.item.purchased === false ? '' : 'fade'}>{this.props.item.name}</td>    
                <td className={this.props.item.purchased === false ? '' : 'fade'}>{this.props.item.quantity}</td>       
                <td className={this.props.item.purchased === false ? '' : 'fade'}>{this.props.item.price}</td>       
                <td><button className="tablelist__button" onClick={this.props.handleTogglePurchase}>{this.props.item.purchased === false ? 'Purchased' : 'Unpurchase'}</button></td> 
                <td>
                    <Link className="edit-button tablelist__button" to={"/edit/" + this.props.item._id}>Edit</Link>
                </td> 
                <td><button className="tablelist__button" onClick={this.handleDelete}>Delete</button></td> 
            </tr>
        
        );
    }
    
    
}



export default ItemRow;
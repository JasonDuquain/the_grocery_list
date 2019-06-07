import React, {Component} from 'react';
import ItemRow from './item';

import axios from 'axios';


class ItemList extends Component {
    constructor(props) {
        super(props);
        this.state = { items: [] }
        
        /* Dont think this is needed since the fn is passed inside an anonymous fn */
        //this.handleTogglePurchase = this.handleTogglePurchase.bind(this);
    }
    
    componentDidMount() {
        axios.get('/items/')
            .then(response => {
            console.log(response)
                this.setState({ items: response.data });
            })
            .catch(err => console.log(err));
    }
    
    handleTogglePurchase(index) {
        const items = this.state.items.slice();
        const item = items[index];
        item.purchased = item.purchased ? false : true;
        this.setState({ items: items });    
    }
    
    render() {
        
        if (this.props.loggedIn) {       
            return (
              <div>
                <h1>Grocery items</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Purchased?</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.items.map((item, idx) => <ItemRow item={item} key={idx} handleTogglePurchase={() => this.handleTogglePurchase(idx)} />)
                        }
                    </tbody>
                </table>
              </div>
            );
        } else {
            return (
                <div>
                    Please sign up/login to create a grocery list
                </div>
            );
        }
        
        
    }
    
}


export default ItemList;
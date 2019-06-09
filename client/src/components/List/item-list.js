import React, {Component} from 'react';
import ItemRow from './item';
import axios from 'axios';

import './item-list.scss';


class ItemList extends Component {
    constructor(props) {
        super(props);
        this.state = { items: [] }
        
        /* 20190606 Dont think this is needed since the fn is passed inside an anonymous fn but keep just in case any issues */
        //this.handleTogglePurchase = this.handleTogglePurchase.bind(this);
    }
    
    componentDidMount() {
        axios.get('/items/')
            .then(response => {
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
              <div className="tablelist">
                <h2 className="tablelist__heading form-heading">Grocery items</h2>
                <table className="tablelist__table">
                    <thead className="tablelist__thead">
                        <tr className="tablelist__tablerow">
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Purchased?</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody className="tablelist__tbody">
                        {
                            this.state.items.map((item, idx) => <ItemRow item={item} key={idx} handleTogglePurchase={() => this.handleTogglePurchase(idx)} />)
                        }
                    </tbody>
                </table>
              </div>
            );
        } else {
            return (
                <div style={{textAlign: "center", padding: "2em"}}>
                    Please sign up/login to create a grocery list
                </div>
            );
        }
          
    }
    
}


export default ItemList;



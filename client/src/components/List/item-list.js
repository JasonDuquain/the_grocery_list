import React, {Component} from 'react';
import ItemRow from './item';

import axios from 'axios';


class ItemList extends Component {
    constructor(props) {
        super(props);
        this.state = { items: [] }
    }
    
    componentDidMount() {
        axios.get('/items/')
            .then(response => {
            console.log(response)
                this.setState( {items: response.data} );
            })
            .catch(err => console.log(err));
    }
    
    render() {
        
        return (
              <div>
                <h1>Grocery items</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Purchased</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.items.map((item, idx) => <ItemRow item={item} key={idx} />)
                        }
                    </tbody>
                </table>
              </div>
            );
        
    }
    
}


export default ItemList;
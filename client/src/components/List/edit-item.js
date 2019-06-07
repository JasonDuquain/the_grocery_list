import React, {Component} from 'react';

import axios from 'axios';


class EditItem extends Component {
    
    constructor() {
        super();
        
        this.state = {
            name: '',
            quantity: 1,
            purchased: false
        }
        
        this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
    }
    
    componentDidMount() {
        axios.get('/items/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    quantity: response.data.quantity,
                    purchased: response.data.purchased
                })
            })
            .catch(err => console.log(err));
    }
    
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        const item = {
            name: this.state.name,
            quantity: this.state.quantity,
            purchased: this.state.purchased
        }
        
        
        
        this.setState({
            name: '',
            quantity: 1,
            purchased: false
        })
        
        this.props.history.push('/list');
    }
    
    render() {
        
        return (
            <div>
                <h2>Edit Item</h2>
                <form>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input  
                            type="text"
                            name="name"
                            id="name"
                            value={this.state.name}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="quantity">Quantity:</label>
                        <input  
                            type="number"
                            min="1"
                            max="99999"
                            name="quantity"
                            id="quantity"
                            value={this.state.quantity}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <button onClick={this.handleSubmit}>Submit Changes</button>
                    </div>
                </form>
            </div>
        );  
    }
    
}

export default EditItem;
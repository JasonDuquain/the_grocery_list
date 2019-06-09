import React, {Component} from 'react';
import axios from 'axios';

import './create-item.scss';


class CreateItem extends Component {
    constructor() {
        super();
        
        this.state = {
            name: '',
            quantity: 1,
            price: '',
            purchased: false
        }
        
        this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        const item = {
            name: this.state.name,
            quantity: this.state.quantity,
            price: this.state.price,
            purchased: this.state.purchased,
            username: this.props.username // PROPS not state!!

        };
        
        if (item.name === '' || item.quantity === '' || item.price === '') {
            alert('please enter data into all fields');
            return;
        }
        
        axios.post('/items/add/', item)
            .then(response => console.log(response.data))
            .catch((err) => console.log(err))
        
        this.setState({
            name: '',
            quantity: 1,
            price: '',
            purchased: false
        });
        
    }
    
    render() {
        
        if (this.props.loggedIn) {
            return (
                <div className="create">
                    <h2 className="create__heading form-heading">Create New Item</h2>
                    <form className="create__form">
                        <div className="create__form-container">
                            <p className="create__group form-group">
                                <label className="create__label" htmlFor="name">Name:</label>
                                <input autoFocus
                                    className="create__input"
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                />
                            </p>
                            <p className="create__group form-group">
                                <label className="create__label" htmlFor="quantity">Quantity:</label>
                                <input
                                    className="create__input"
                                    type="number"
                                    min="1"
                                    max="99999"
                                    name="quantity"
                                    id="quantity"
                                    value={this.state.quantity}
                                    onChange={this.handleChange}
                                />
                            </p>
                            <p className="create__group form-group">
                                <label htmlFor="price">Price:</label>
                                <input 
                                    className="create__input"
                                    type="text"
                                    name="price"
                                    id="price"
                                    value={this.state.price}
                                    onChange={this.handleChange}
                                />
                            </p>
                        </div>
                        <div className="create__button-container button-container">
                            <button className="login__button" onClick={this.handleSubmit}>Add Item</button>
                        </div>
                    </form>
                </div>
            );
            
        } else {
            return (
                <div style={{textAlign: "center", padding: "2em"}}>
                    Please sign up/login to create items for your grocery list
                </div>
            );
        }
        
    }
}



export default CreateItem;
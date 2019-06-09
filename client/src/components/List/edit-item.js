import React, {Component} from 'react';
import axios from 'axios';

import './edit-item.scss';


class EditItem extends Component {
    
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
    
    // need this to get the input fields to populate with the values
    componentDidMount() {
        axios.get('/items/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    quantity: response.data.quantity,
                    price: response.data.price,
                    purchased: response.data.purchased
                });
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
            purchased: this.state.purchased,
            price: this.state.price
        };
        
        if (item.name === '' || item.quantity === '' || item.price === '') {
            alert('please enter values into each field');
            return;
        }
        
        axios.post('/items/update/' + this.props.match.params.id, item)
            .then(res => {
                this.setState({
                    name: '',
                    quantity: 1,
                    price: '',
                    purchased: false
                });

                this.props.history.push('/list');
            })
            .catch(err => console.log(err));
    }
    
    render() {
        
        return (
            <div className="edit">
                <h2 className="edit__heading form-heading">Edit Item</h2>
                <form className="edit__form">
                    <div className="edit__form-container">
                       <p className="edit__group form-group"> 
                            <label className="edit__label" htmlFor="name">Name:</label>
                            <input autoFocus 
                                className="edit__input"
                                type="text"
                                name="name"
                                id="name"
                                value={this.state.name}
                                onChange={this.handleChange}
                            />
                        </p>
                        <p className="edit__group form-group"> 
                            <label className="edit__label" htmlFor="quantity">Quantity:</label>
                            <input  
                                className="edit__input"
                                type="number"
                                min="1"
                                max="99999"
                                name="quantity"
                                id="quantity"
                                value={this.state.quantity}
                                onChange={this.handleChange}
                            />
                        </p>
                        <p className="edit__group form-group"> 
                            <label className="edit__label" htmlFor="price">Price:</label>
                            <input 
                                className="edit__input"
                                type="text"
                                name="price"
                                id="price"
                                value={this.state.price}
                                onChange={this.handleChange}
                            />
                        </p>
                    </div>
                    <div className="edit__button-container button-container">
                        <button className="edit__button"  onClick={this.handleSubmit}>Submit</button>
                    </div>
                </form>
            </div>
        );  
    }
    
}

export default EditItem;
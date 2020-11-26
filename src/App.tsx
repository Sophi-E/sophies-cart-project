import React, { Component } from 'react';

import StoreListing from './components/store-listing';
import LineItem from './components/line-item';
import './tailwind.output.css';

interface CartItem {
  onQuantityChange: any;
  id: number;
  title: string;
  category?: string;
  description?: string;
  image?: string;
  price: number;
  quantity: number;
  taxable?: boolean;  
};

class App extends Component<{},{store: any, cart:any}> {
  constructor(props:any){
    super(props)
    this.state = {
      "store": [],
      "cart": [
        {
          id: 1,
          quantity: 1,
        },{
          id: 13,
          quantity: 3,
        },
      ]
    }
    this.handleItemQuantityChange = this.handleItemQuantityChange.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.handleEmptyCart = this.handleEmptyCart.bind(this);
  }

  handleItemQuantityChange(event:any){
    // This will handle the quantity buttons updating. In order
    //  to work, we need two things from the clicked button: a
    //  data-id key and the value (1 or -1).
    const clickedEl = event.target;
    const qty = Number(clickedEl.value);
    const id = Number(clickedEl.dataset.id);

    this.setState(prevState=>({
      ...prevState,
      cart: prevState.cart.map((item:any)=>item.id===id ? {...item, quantity: item.quantity+qty} : item )
    }))
  }

  handleAddItem(event:any){
    const clickedEl = event.target;
    const id = Number(clickedEl.dataset.id);

    this.setState(prevState=>({
      ...prevState,
      cart: [...prevState.cart, {id, quantity: 1}]
    }))
  }

  handleRemoveItem(event:any){
    const clickedEl = event.target;
    const id = Number(clickedEl.dataset.id);

    this.setState(prevState=>({
      ...prevState,
      cart: prevState.cart.filter((item:any)=>item.id!==id)
    }))
  }

  handleEmptyCart(){
    this.setState(prevState=>({
      ...prevState,
      cart: []
    }))
  }

  componentDidMount(){
    fetch('https://fakestoreapi.com/products')
        .then(res=>res.json())
        .then(json=>this.setState(prevState=>({...prevState, store: [...json]})))

  }

  render(){
    return (
      <>
        <header className="flex space-between">
          <h1 className="w-1/2 text-4xl font-black text-indigo-600">Shop O Stuff</h1>
          <span className='w-1/4 text-md text-indigo-300'>Your cart contains {this.state.cart.length} items.</span>
        </header>

        <StoreListing onAddToCart={this.handleAddItem} items={this.state.store} />
      </>

    );
    }
}

export default App;

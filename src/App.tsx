import React, { Component } from 'react';
import Modal from 'react-modal';

import StoreListing from './components/store-listing';
import CartListing from './components/cart-listing';

import './tailwind.output.css';

interface AppProps {

}

interface AppState {
  store: any, 
  cart:any, 
  modalOpen:boolean
}

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

Modal.setAppElement("#root");

class App extends Component<AppProps, AppState> {
  constructor(props:any){
    super(props)
    this.state = {
      "store": [],
      "cart": [],
      "modalOpen":false
    }
    this.handleItemQuantityChange = this.handleItemQuantityChange.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.handleEmptyCart = this.handleEmptyCart.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
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
    let cart;
    this.setState(prevState=>{
      if(prevState.cart.find((item:any)=>item.id===id)){
        cart = prevState.cart.map((cartItem:any)=>cartItem.id===id?{...cartItem, quantity: cartItem.quantity+1}:cartItem)
      } else {
        cart = [...prevState.cart, {id, quantity:1}]
      }
      return {
        ...prevState,
        cart
      }
    })
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

  toggleModal(){
    this.setState((prevState:any)=>({...prevState, modalOpen:!prevState.modalOpen}) )
  }

  componentDidMount(){
    let cartStr = localStorage.getItem("cart");

    const cart = cartStr !== null ? JSON.parse(cartStr) : []
    console.log(cart);

    this.setState((prevState:AppState)=>({...prevState, cart }) );

    fetch('https://fakestoreapi.com/products')
        .then(res=>res.json())
        .then(json=>this.setState(prevState=>({...prevState, store: [...json]})))
  }

  componentDidUpdate(prevProps:AppProps, prevState:AppState){
    /***
     * I don't really care if props has changes, but state matters
     *  here. I want to check if the cart array has changed, and it has,
     *  I want to update the localStorage. I *think* this is the sanest 
     *  way...
     ***/
    console.log(this.state.cart);
    let isCartChanged = prevState.cart.length !== this.state.cart.length ? true :
                        this.state.cart.filter((item1:any)=> !prevState.cart.some((item2:any)=>
                          item1.id===item2.id && item1.quantity===item2.quantity
                        ) ).length!==0 ? true : false;
  

    if(isCartChanged){
      localStorage.setItem("cart", JSON.stringify(this.state.cart) )
    }

  }

  render(){
    return (
      <>
        <header className="flex space-between">
          <h1 className="w-1/2 text-4xl font-black text-indigo-600">Shop O Stuff</h1>
          <a href="#" onClick={this.toggleModal}>
            <span className='w-1/4 text-md text-indigo-300'>Your cart contains {this.state.cart.length} items.</span>
          </a>
        </header>

        <StoreListing onAddToCart={this.handleAddItem} items={this.state.store} />

        <Modal isOpen={this.state.modalOpen}
               onRequestClose={this.toggleModal}
               contentLabel="My cart"
               >
          <div>My cart!</div>
          <CartListing store={this.state.store} cart={this.state.cart} onChangeQuantity={this.handleItemQuantityChange} onRemoveItem={this.handleRemoveItem} />
          <a href="#" onClick={this.toggleModal}>Close cart</a>
        </Modal>
      </>

    );
    }
}

export default App;

import { on } from 'process';
import React from 'react';

import QuantityWidget from '../quantity-widget';

interface StoreItem {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  price: number;
};

interface CartItem {
  id: number;
  quantity: number;
}

interface CartItemListingProps {
  onChangeQuantity: any;
  onRemoveItem: any;
  id?: number;
  title?: string;
  price?: number;
  quantity?: number;
}

interface CartListingProps {
  onChangeQuantity: any;
  onRemoveItem: any;
  cart: [CartItem?];
  store: [StoreItem?]
}

const CartItemListing = (props:CartItemListingProps)=>{
  const {onChangeQuantity, onRemoveItem, id, title, price, quantity} = props;

  return (
  <div>
    <span>{title}</span>
    <span>${price}</span>
    <span>{quantity}</span>
    <span>${quantity? (Number(price)*quantity).toFixed(2) : "0.00"}</span>
    <QuantityWidget id={id?id:-1} quantity={quantity?quantity:1} onChangeQuantity={onChangeQuantity} />
    <a onClick={onRemoveItem} data-id={id}>X</a>
  </div>

  )}

const CartListing = (props: CartListingProps) => {
  const {cart, store, onChangeQuantity, onRemoveItem} = props;

  return (
    <section>
      <header>
        <h2>My cart</h2>
      </header>
      <div>
        {cart.map((cartItem:CartItem|undefined, index:number)=>{
          const storeItem = store.find((storeItem:StoreItem|undefined)=>storeItem?.id===cartItem?.id)

          return(
            <CartItemListing key={index} 
                             id={cartItem?.id} 
                             title={storeItem?.title} 
                             price={storeItem?.price}
                             quantity={cartItem?.quantity}
                             onChangeQuantity={onChangeQuantity}
                             onRemoveItem={onRemoveItem}
            />)

        })}
      </div>
      
    </section>
  )
}

export default CartListing;
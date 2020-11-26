import React from 'react';
import { JsxElement } from 'typescript';

interface StoreItem {
  id: number;
  price: string;
}

interface CartItem {
  id: number;
  quantity: number;
}

interface CartSummaryProps {
  store: [StoreItem];
  cart: [CartItem?]
}

const CartSummary = (props: CartSummaryProps ) => {
  const {store, cart} = props;
  const cartTotal = cart.reduce((total:number, cartItem:CartItem|undefined)=>{

    return total+(cartItem ? cartItem.quantity*Number(store?.find((storeItem:StoreItem)=>storeItem.id===cartItem.id)?.price ) : 0);
  }, 0)

  return(
    <div className="bg-indigo-600 text-gray-100 rounded-md flex justify-center items-center py-2 w-full">
      <div className="px-2">{cart.length} items</div>
      <div className="px-2">${cartTotal.toFixed(2)}</div>
    </div>
  )
}

export default CartSummary;
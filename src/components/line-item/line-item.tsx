import React from 'react';
import QuantityWidget from '../quantity-widget';

interface LineItemProps {
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

const LineItem = (props:LineItemProps) => {
  const {id, quantity, onQuantityChange: handleQuantityChange} = props
  return (
    <section>
      <div>{props.title}</div>
      {props.description? <div>{props.description}</div> : ""}
      <div>{props.price}</div>
      <QuantityWidget id={id} 
                      quantity={quantity}
                      onChangeQuantity={handleQuantityChange}
      />
    </section>
  )
}

export default LineItem;
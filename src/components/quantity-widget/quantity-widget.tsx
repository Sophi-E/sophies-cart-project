import React from 'react';

interface handlerFunction {
  (): void
}
interface QuantityProps {
  id: number;
  onChangeQuantity: handlerFunction;

  quantity: number;
}

const QuantityWidget = (props: QuantityProps) => {
  const {id, quantity, onChangeQuantity} = props;

  return (
    <div className="w-24 bg-gray-300 py-4 px-2 rounded-full shadow-lg flex justify-between">
      <button className="px-2 bg-gray-100  outline-none rounded-full focus:outline-none" data-id={id} value='1' onClick={onChangeQuantity}>+</button>
      {quantity}
      <button className="px-2 bg-gray-100  outline-none rounded-full focus:outline-none" data-id={id} value='-1' onClick={onChangeQuantity}>-</button>
    </div>
  )
}

export default QuantityWidget;
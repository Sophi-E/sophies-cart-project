import React from 'react';

interface StoreItem {
  onAddToCart: any;
  id?: number;
  title?: string;
  category?: string;
  description?: string;
  image?: string;
  price?: number;
};

interface StoreListingProps {
  onAddToCart: any;
  items: [StoreItem?]
}

const StoreListingItem = (props:StoreItem) => {
  const {id, title, category, description, price, image, onAddToCart} = props;
  return (
    <section className='w-1/4 bg-gray-200 rounded-md shadow-xl p-4 m-4 transition-colors transition-500 hover:bg-indigo-300'>
      <header>
        <h3 className='text-xl font-extrabold text-gray-600'>{title ? title : "Fake Title"}</h3>
      </header>
      <div className='p-2 rounded-sm bg-gray-100 flex flex-col'>
      <p>{description ? description : "fake description, too" }</p>
      <span>{category}</span>
      <span>{price}</span>
      <a className="p-2 bg-indigo-600 text-gray-200 rounded-full shadow-md" data-id={id} href="#" onClick={onAddToCart}>Add to cart</a>
      </div>
      
    </section>
  )
}

const StoreListing = (props:StoreListingProps)=>{
  const {onAddToCart, items} = props;
  return (
    <article className='store-listing w-full flex flex-wrap space-around bg-gray-100'>
      {items.map((item:StoreItem|undefined, index:number)=><StoreListingItem key={index} onAddToCart={onAddToCart} {...item} /> )}
    </article>
  )
}

export default StoreListing;
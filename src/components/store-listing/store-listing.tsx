import React from 'react';

interface StoreItem {
  onAddToCart: any;
  id: number;
  title: string;
  category?: string;
  description?: string;
  image?: string;
  price: number;
  quantity: number;
  taxable?: boolean;  
};

interface StoreListingProps {
  items: [StoreItem?]
}

const StoreListing = (props:StoreListingProps)=>{
  const {items} = props;
  return (
    <article className='store-listing w-full flex flex-wrap space-around bg-gray-100'>
      {items.map((item:StoreItem|undefined, index:number)=>{
        return (
          <section className='w-1/4 bg-gray-200 rounded-md shadow-xl p-4 m-4 transition-colors transition-500 hover:bg-indigo-300' key={index}>
            <header>
              <h3 className='text-xl font-extrabold text-gray-600'>{item?.title ? item.title : "Fake Title"}</h3>
            </header>
            <p>{item?.description ? item.description : "fake description, too" }</p>
          </section>
        )
      })}
    </article>
  )
}

export default StoreListing;
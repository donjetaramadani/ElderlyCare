import React, { createContext, useState } from 'react';

export const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
  const [basketItems, setBasketItems] = useState([]);

  const addToBasket = (item) => {
    setBasketItems((prevItems) => [...prevItems, item]); 
  };

  const removeFromBasket = (itemId) => {
    setBasketItems((prevItems) => prevItems.filter(item => item.id !== itemId)); 
  };

  return (
    <BasketContext.Provider value={{ basketItems, addToBasket, removeFromBasket }}>
      {children}
    </BasketContext.Provider>
  );
};

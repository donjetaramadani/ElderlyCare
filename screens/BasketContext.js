import React, { createContext, useState } from "react";

export const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
  const [basketItems, setBasketItems] = useState([]);

  // Function to add items to the basket
  const addToBasket = (item) => {
    setBasketItems((prevItems) => [...prevItems, item]);
  };

  return (
    <BasketContext.Provider value={{ basketItems, addToBasket }}>
      {children}
    </BasketContext.Provider>
  );
};

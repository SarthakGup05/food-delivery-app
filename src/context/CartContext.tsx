import React, { createContext } from 'react';

export const CartContext = createContext<any>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <CartContext.Provider value={{}}>
      {children}
    </CartContext.Provider>
  );
};

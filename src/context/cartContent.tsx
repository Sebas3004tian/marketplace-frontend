"use client"

import { createContext, useCallback, useMemo, useState } from "react";
import { ReactNode } from 'react';
import { NewProduct } from "@/interfaces/newProduct";

interface ShoppingCartContextType {
    products: NewProduct[];
    totalAmount: number;
    addProduct: (product: NewProduct) => void;
    removeProduct: (productId: string) => void;
    clearShoppingCart: () => void;
  }
  
export const ShoppingCartContext = createContext<ShoppingCartContextType>({
    products: [],
    totalAmount: 0,
    addProduct: () => {},
    removeProduct: () => {},
    clearShoppingCart: () => {},
});


export const ShoppingCartProvider = ({ children}:{children: ReactNode}) => {
  const [products, setProducts] = useState<NewProduct[]>([]);

  const totalAmount = useMemo(() => {
    return products.reduce((total, product) => total + product.price, 0);
  }, [products]);

  const addProduct = useCallback((product: NewProduct) => {
    setProducts((productsP) => [...productsP, product]);
  }, []);

  const removeProduct = useCallback((productId:string) => {
    setProducts((prevProducts) => {
      return prevProducts.filter((product) => product.id !== productId);
    });
  }, []);

  const clearShoppingCart = useCallback(() => setProducts([]), []);

  return (
    <ShoppingCartContext.Provider
      value={{ products, totalAmount, addProduct, removeProduct, clearShoppingCart }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
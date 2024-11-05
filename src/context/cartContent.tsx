"use client"

import { createContext, useCallback, useMemo, useState } from "react";
import { ReactNode } from 'react';
import { Product } from "@/interfaces/product";

interface ShoppingCartContextType {
    products: Product[];
    totalAmount: number;
    addProduct: (product: Product) => void;
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
  const [products, setProducts] = useState<Product[]>([]);

  const totalAmount = useMemo(() => {
    return products.reduce((total, product) => total + product.price, 0);
  }, [products]);

  const addProduct = useCallback((product: Product) => {
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
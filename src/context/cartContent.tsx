"use client"

import { createContext, useCallback, useMemo, useState } from "react";
import { ReactNode } from 'react';
import { NewProduct } from "@/interfaces/newProduct";

interface ShoppingCartContextType {
    productFilter:string;
    products: NewProduct[];
    totalAmount: number;
    addProduct: (product: NewProduct) => void;
    removeProduct: (productId: string) => void;
    clearShoppingCart: () => void;
    changeTypeProduct: (filter: string) => void;
  }
  
export const ShoppingCartContext = createContext<ShoppingCartContextType>({
    productFilter:"All",
    products: [],
    totalAmount: 0,
    addProduct: () => {},
    removeProduct: () => {},
    clearShoppingCart: () => {},
    changeTypeProduct: () => {}
});


export const ShoppingCartProvider = ({ children}:{children: ReactNode}) => {
  const [products, setProducts] = useState<NewProduct[]>([]);
  const [productFilter, setProductFilter] = useState<string>("")

  const totalAmount = useMemo(() => {
    return products.reduce((total, product) => Number(total) + Number(product.price), 0);
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

  const changeTypeProduct = useCallback((filter:string) => setProductFilter(filter),[])

  return (
    <ShoppingCartContext.Provider
      value={{ productFilter, products, totalAmount, addProduct, removeProduct, clearShoppingCart, changeTypeProduct}}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
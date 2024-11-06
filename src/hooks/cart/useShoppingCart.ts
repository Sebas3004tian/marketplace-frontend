import { useContext } from "react";
import { ShoppingCartContext } from "@/context/cartContent";

export const useShoppingCart = () => useContext(ShoppingCartContext);
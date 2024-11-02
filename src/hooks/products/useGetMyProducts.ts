import { Product } from "@/interfaces/product";
import {ProductsService} from "@/services/products.service";

export const useGetMyProducts = () => {
    const getMyProducts = async () => {
        const productsService = new ProductsService("http://localhost:3001/");
        const allProducts = await productsService.getMyProducts();

        return allProducts as Product[];
    }

    return {getMyProducts};
};
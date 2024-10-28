import { Product } from "@/interfaces/product";
import {ProductsService} from "@/services/products.service";

export const useGetProducts = () => {
    const getProducts = async () => {
        const productsService = new ProductsService("http://localhost:3001/");
        const allProducts = await productsService.getAll();

        return allProducts as Product[];
    }

    return {getProducts};
};
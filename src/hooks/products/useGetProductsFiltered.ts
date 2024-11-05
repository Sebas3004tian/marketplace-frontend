import { Product } from "@/interfaces/product";
import {ProductsService} from "@/services/products.service";

export const useGetProductsFiltered = () => {
    const getProducts = async () => {
        const productsService = new ProductsService("http://localhost:3001/");
        const allProducts = await productsService.getProductFiltered();

        return allProducts as Product[];
    }

    return {getProducts};
};
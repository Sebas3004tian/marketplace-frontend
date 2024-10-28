import { Product } from "@/interfaces/product";
import {ProductsService} from "@/services/products.service";

export const useCreateProduct = () => {
    const createProduct = async (product: Product) => {
        const productsService = new ProductsService("http://localhost:3001/");
        await productsService.create(product);
    }

    return {createProduct};
};
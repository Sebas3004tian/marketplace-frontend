import { Product } from "@/interfaces/product";
import {ProductsService} from "@/services/products.service";

export const useGetProduct = () => {
    const getProduct = async (id: string) => {
        const productsService = new ProductsService("http://localhost:3001/");
        const product = await productsService.getProduct(id);

        return product as Product;
    }

    return {getProduct};
};
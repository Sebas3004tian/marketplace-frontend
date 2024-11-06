import { Product } from "@/interfaces/product";
import {ProductsService} from "@/services/products.service";

export const useGetProducts = () => {
    const getProducts = async () => {
        const productsService = new ProductsService("https://marketplace-backend-production-d4eb.up.railway.app/");
        const allProducts = await productsService.getAll();

        return allProducts as Product[];
    }

    return {getProducts};
};
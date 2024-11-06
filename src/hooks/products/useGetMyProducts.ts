import { Product } from "@/interfaces/product";
import {ProductsService} from "@/services/products.service";

export const useGetMyProducts = () => {
    const getMyProducts = async () => {
        const productsService = new ProductsService("https://marketplace-backend-production-d4eb.up.railway.app/");
        const allProducts = await productsService.getMyProducts();

        return allProducts as Product[];
    }

    return {getMyProducts};
};
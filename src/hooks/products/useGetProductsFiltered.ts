import { Product } from "@/interfaces/product";
import {ProductsService} from "@/services/products.service";
import { QueryParams } from "@/interfaces/queryParams";

export const useGetProductsFiltered = () => {


    const getProductsFiltered = async (query: QueryParams) => {
        const productsService = new ProductsService("https://marketplace-backend-production-d4eb.up.railway.app/");
        const allProducts = await productsService.getProductFiltered(query);

        return allProducts as Product[];
    }

    return {getProductsFiltered};
};
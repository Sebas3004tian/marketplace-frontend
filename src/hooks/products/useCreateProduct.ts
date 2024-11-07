import {ProductsService} from "@/services/products.service";
import {CreateProductDto} from "@/dto/product/createProduct.dto";

export const useCreateProduct = () => {
    const createProduct = async (product: CreateProductDto) => {
        const productsService = new ProductsService("https://marketplace-backend-production-d4eb.up.railway.app/");
        await productsService.create(product);
    }

    return {createProduct};
};
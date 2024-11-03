import { Product } from "@/interfaces/product";
import {ProductsService} from "@/services/products.service";
import {CreateProductDto} from "@/dto/product/createProduct.dto";

export const useCreateProduct = () => {
    const createProduct = async (product: CreateProductDto) => {
        const productsService = new ProductsService("http://localhost:3001/");
        await productsService.create(product);
    }

    return {createProduct};
};
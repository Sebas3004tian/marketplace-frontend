import { ProductsService } from "@/services/products.service";
import { Product } from "@/interfaces/product";

export const useUpdateProduct = () => {
    const updateProduct = async (id: string, updatedProductData: Partial<Product>) => {
        const productsService = new ProductsService("https://marketplace-backend-production-d4eb.up.railway.app/");
        try {
            await productsService.update(id, updatedProductData);
        } catch (error) {
            console.error("Error updating product:", error);
            throw error;
        }
    };

    return { updateProduct };
};
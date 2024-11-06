import { ProductsService } from "@/services/products.service";

export const useDeleteProduct = () => {
    const deleteProduct = async (id: string) => {
        const productsService = new ProductsService("https://marketplace-backend-production-d4eb.up.railway.app/");
        await productsService.delete(id);
    };

    return { deleteProduct };
};

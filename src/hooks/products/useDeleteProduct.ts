import { ProductsService } from "@/services/products.service";

export const useDeleteProduct = () => {
    const deleteProduct = async (id: string) => {
        const productsService = new ProductsService("http://localhost:3001/");
        await productsService.delete(id);
    };

    return { deleteProduct };
};

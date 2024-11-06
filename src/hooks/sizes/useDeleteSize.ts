import { SizesService } from "@/services/sizes.service";

export const useDeleteSize = () => {
    const deleteSize = async (id: string) => {
        const sizesService = new SizesService("https://marketplace-backend-production-d4eb.up.railway.app/");
        await sizesService.delete(id);
    }
    return {deleteSize};
};
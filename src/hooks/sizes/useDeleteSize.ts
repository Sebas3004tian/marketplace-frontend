import { SizesService } from "@/services/sizes.service";

export const useDeleteSize = () => {
    const deleteSize = async (id: string) => {
        const sizesService = new SizesService("http://localhost:3001/");
        await sizesService.delete(id);
    }
    return {deleteSize};
};
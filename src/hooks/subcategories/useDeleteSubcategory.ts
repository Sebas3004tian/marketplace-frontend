import {SubcategoriesService} from "@/services/subcategories.service";

export const useDeleteSubcategory = () => {
    const deleteSubcategory = async (subcategoryId: string) => {
        const subcategoriesService = new SubcategoriesService("https://marketplace-backend-production-d4eb.up.railway.app/");
        await subcategoriesService.delete(subcategoryId);
    }

    return {deleteSubcategory};
};
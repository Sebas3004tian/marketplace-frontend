import {SubcategoriesService} from "@/services/subcategories.service";

export const useDeleteSubcategory = () => {
    const deleteSubcategory = async (subcategoryId: string) => {
        const subcategoriesService = new SubcategoriesService("http://localhost:3001/");
        await subcategoriesService.delete(subcategoryId);
    }

    return {deleteSubcategory};
};
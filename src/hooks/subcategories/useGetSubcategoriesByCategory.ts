import {SubcategoriesService} from "@/services/subcategories.service";
import {Subcategory} from "@/interfaces/subcategory";

export const useGetSubcategoriesByCategory = () => {
    const getSubcategoriesByCategory = async (categoryId: string) => {
        const subcategoriesService = new SubcategoriesService("https://marketplace-backend-production-d4eb.up.railway.app/");
        const filteredSubcategories = await subcategoriesService.getByCategory(categoryId);

        return filteredSubcategories as Subcategory[];
    }

    return {getSubcategoriesByCategory};
};
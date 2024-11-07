import {SubcategoriesService} from "@/services/subcategories.service";
import {Subcategory} from "@/interfaces/subcategory";

export const useGetMySubcategoriesByCategory = () => {
    const getMySubcategoriesByCategory = async (categoryId: string) => {
        const subcategoriesService = new SubcategoriesService("https://marketplace-backend-production-d4eb.up.railway.app/");
        const filteredSubcategories = await subcategoriesService.getMineByCategory(categoryId);

        return filteredSubcategories as Subcategory[];
    }

    return {getMySubcategoriesByCategory};
};
import {SubcategoriesService} from "@/services/subcategories.service";
import {Subcategory} from "@/interfaces/subcategory";

export const useGetMySubcategoriesByCategory = () => {
    const getMySubcategoriesByCategory = async (categoryId: string) => {
        const subcategoriesService = new SubcategoriesService("http://localhost:3001/");
        const filteredSubcategories = await subcategoriesService.getMineByCategory(categoryId);

        return filteredSubcategories as Subcategory[];
    }

    return {getMySubcategoriesByCategory};
};
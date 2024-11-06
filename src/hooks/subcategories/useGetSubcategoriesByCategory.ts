import {SubcategoriesService} from "@/services/subcategories.service";
import {Subcategory} from "@/interfaces/subcategory";

export const useGetSubcategoriesByCategory = () => {
    const getSubcategoriesByCategory = async (categoryId: string) => {
        const subcategoriesService = new SubcategoriesService("http://localhost:3001/");
        const filteredSubcategories = await subcategoriesService.getByCategory(categoryId);

        return filteredSubcategories as Subcategory[];
    }

    return {getSubcategoriesByCategory};
};
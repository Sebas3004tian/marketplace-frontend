import {SubcategoriesService} from "@/services/subcategories.service";
import {Subcategory} from "@/interfaces/subcategory";

export const useGetSubcategories = () => {
    const getSubcategories = async () => {
        const subcategoriesService = new SubcategoriesService("http://localhost:3001/");
        const allSubcategories = await subcategoriesService.getAll();

        return allSubcategories as Subcategory[];
    }

    return {getSubcategories};
};
import {SubcategoriesService} from "@/services/subcategories.service";
import {Subcategory} from "@/interfaces/subcategory";

export const useGetSubcategories = () => {
    const getSubcategories = async () => {
        const subcategoriesService = new SubcategoriesService("https://marketplace-backend-production-d4eb.up.railway.app/");
        const allSubcategories = await subcategoriesService.getAll();

        return allSubcategories as Subcategory[];
    }

    return {getSubcategories};
};
import {CategoriesService} from "@/services/categories.service";
import {Category} from "@/interfaces/category";

export const useGetCategories = () => {
    const getCategories = async () => {
        const categoriesService = new CategoriesService("https://marketplace-backend-production-d4eb.up.railway.app/");
        const allCategories = await categoriesService.getAll();

        return allCategories as Category[];
    }

    return {getCategories};
};
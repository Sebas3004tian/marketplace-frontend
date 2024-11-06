import {CategoriesService} from "@/services/categories.service";
import {Category} from "@/interfaces/category";

export const useGetCategories = () => {
    const getCategories = async () => {
        const categoriesService = new CategoriesService("http://localhost:3001/");
        const allCategories = await categoriesService.getAll();

        return allCategories as Category[];
    }

    return {getCategories};
};
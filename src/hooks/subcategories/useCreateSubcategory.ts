import {SubcategoriesService} from "@/services/subcategories.service";
import {CreateSubcategoryDto} from "@/dto/subcategory/createSubcategory.dto";

export const useCreateSubcategory = () => {
    const createSubcategory = async (createSubcategoryDto: CreateSubcategoryDto) => {
        const subcategoriesService = new SubcategoriesService("https://marketplace-backend-production-d4eb.up.railway.app/");
        await subcategoriesService.create(createSubcategoryDto);
    }

    return {createSubcategory};
};
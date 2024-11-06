import {SubcategoriesService} from "@/services/subcategories.service";
import {CreateSubcategoryDto} from "@/dto/subcategory/createSubcategory.dto";

export const useCreateSubcategory = () => {
    const createSubcategory = async (createSubcategoryDto: CreateSubcategoryDto) => {
        const subcategoriesService = new SubcategoriesService("http://localhost:3001/");
        await subcategoriesService.create(createSubcategoryDto);
    }

    return {createSubcategory};
};
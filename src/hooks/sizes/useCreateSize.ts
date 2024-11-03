import { SizesService } from "@/services/sizes.service";
import {CreateSizeDto} from "@/dto/size/createSize.dto";

export const useCreateSize = () => {
    const createSize = async (createSizeDto: CreateSizeDto) => {
        const sizesService = new SizesService("http://localhost:3001/");
        await sizesService.create(createSizeDto);
    }
    return {createSize};
};
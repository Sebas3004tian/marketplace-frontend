import { SizesService } from "@/services/sizes.service";
import {CreateSizeDto} from "@/dto/size/createSize.dto";

export const useCreateSize = () => {
    const createSize = async (createSizeDto: CreateSizeDto) => {
        const sizesService = new SizesService("https://marketplace-backend-production-d4eb.up.railway.app/");
        await sizesService.create(createSizeDto);
    }
    return {createSize};
};
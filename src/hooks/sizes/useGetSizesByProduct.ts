import { SizesService } from "@/services/sizes.service";
import {Size} from "@/interfaces/size";

export const useGetSizesByProduct = () => {
    const getSizesByProduct = async (productId: string) => {
        const sizesService = new SizesService("http://localhost:3001/");
        const filteredSizes = await sizesService.getByProduct(productId);

        return filteredSizes as Size[];
    }

    return {getSizesByProduct};
};
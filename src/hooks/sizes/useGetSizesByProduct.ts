import { SizesService } from "@/services/sizes.service";
import {Size} from "@/interfaces/size";

export const useGetSizesByProduct = () => {
    const getSizesByProduct = async (productId: string) => {
        const sizesService = new SizesService("https://marketplace-backend-production-d4eb.up.railway.app/");
        const filteredSizes = await sizesService.getByProduct(productId);

        return filteredSizes as Size[];
    }

    return {getSizesByProduct};
};
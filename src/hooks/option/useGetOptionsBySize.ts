import { OptionsService } from "@/services/options.service";
import { Option } from "@/interfaces/option";

export const useGetOptionsBySize = () => {
    const getOptionsBySize = async (sizeId: string) => {
        const optionsService = new OptionsService("https://marketplace-backend-production-d4eb.up.railway.app/");
        const filteredOptions = await optionsService.getBySize(sizeId);

        return filteredOptions as Option[];
    }

    return {getOptionsBySize};
};
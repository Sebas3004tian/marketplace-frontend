import { OptionsService } from "@/services/options.service";
import { Option } from "@/interfaces/option";

export const useGetOptionsBySize = () => {
    const getOptionsBySize = async (sizeId: string) => {
        const optionsService = new OptionsService("http://localhost:3001/");
        const filteredOptions = await optionsService.getBySize(sizeId);

        return filteredOptions as Option[];
    }

    return {getOptionsBySize};
};
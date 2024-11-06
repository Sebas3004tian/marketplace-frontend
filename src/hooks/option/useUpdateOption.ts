import {Option} from "@/interfaces/option";
import {OptionsService} from "@/services/options.service";

export const useUpdateOption = () => {
    const updateOption = async (id: string, updatedOptionData: Partial<Option>) => {
        const optionsService = new OptionsService("https://marketplace-backend-production-d4eb.up.railway.app/");
        try {
            await optionsService.update(id, updatedOptionData);
        } catch (error) {
            console.error("Error updating option:", error);
            throw error;
        }
    };

    return { updateOption };
};
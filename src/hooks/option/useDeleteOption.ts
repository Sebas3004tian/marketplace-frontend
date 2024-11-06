import {OptionsService} from "@/services/options.service";

export const useDeleteOption = () => {
    const deleteOption = async (id: string) => {
        const optionsService = new OptionsService("https://marketplace-backend-production-d4eb.up.railway.app/");
        try {
            await optionsService.delete(id);
        } catch (error) {
            console.error("Error deleting option:", error);
            throw error;
        }
    };

    return { deleteOption };
};
import {OptionsService} from "@/services/options.service";
import {CreateOptionDto} from "@/dto/option/createOption.dto";

export const useCreateOption = () => {
    const createOption = async (createOptionDto: CreateOptionDto) => {
        const optionsService = new OptionsService("https://marketplace-backend-production-d4eb.up.railway.app/");
        try {
            await optionsService.create(createOptionDto);
        } catch (error) {
            console.error("Error creating option:", error);
            throw error;
        }
    };

    return { createOption };
};
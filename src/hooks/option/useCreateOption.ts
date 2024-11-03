import {OptionsService} from "@/services/options.service";
import {CreateOptionDto} from "@/dto/option/createOption.dto";

export const useCreateOption = () => {
    const createOption = async (createOptionDto: CreateOptionDto) => {
        const optionsService = new OptionsService("http://localhost:3001/");
        try {
            await optionsService.create(createOptionDto);
        } catch (error) {
            console.error("Error creating option:", error);
            throw error;
        }
    };

    return { createOption };
};
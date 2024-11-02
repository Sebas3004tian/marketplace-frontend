import { UploadService } from "@/services/upload.service";

export const useUploadImage = () => {
    const uploadImage = async (file: File) => {
        const uploadService = new UploadService("http://localhost:3001/");
        return await uploadService.upload(file);
    };

    return { uploadImage };
};

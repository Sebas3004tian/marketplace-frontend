import { UploadService } from "@/services/upload.service";

export const useUploadImage = () => {
    const uploadImage = async (file: File) => {
        const uploadService = new UploadService("https://marketplace-backend-production-d4eb.up.railway.app/");
        return await uploadService.upload(file);
    };

    return { uploadImage };
};

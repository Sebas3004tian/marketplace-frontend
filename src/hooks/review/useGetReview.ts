import { Review } from "@/interfaces/review";
import { ReviewService } from "@/services/review.service";

export const useGetReview = () => {
    const getReview = async (id: string) => {
        const reviewService = new ReviewService("https://marketplace-backend-production-d4eb.up.railway.app/");
        const review = await reviewService.getAll(id);

        return review as Review[];
    }

    return {getReview};
};
import { Review } from "@/interfaces/review";
import { ReviewService } from "@/services/review.service";

export const useGetReview = () => {
    const getReview = async (id: string) => {
        const reviewService = new ReviewService("http://localhost:3001/");
        const review = await reviewService.getAll(id);

        return review as Review[];
    }

    return {getReview};
};
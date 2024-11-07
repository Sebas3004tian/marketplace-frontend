import { ReviewService } from "@/services/review.service";
import { CreateReviewDto } from "@/dto/review/createReview.dto";

export const useCreateReview = () => {
    const createReview = async (createReviewDto: CreateReviewDto) => {
        const reviewService = new ReviewService("https://marketplace-backend-production-d4eb.up.railway.app/");
        await reviewService.create(createReviewDto);
    }
    return {createReview};
};
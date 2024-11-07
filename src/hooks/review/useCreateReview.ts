import { ReviewService } from "@/services/review.service";
import { CreateReviewDto } from "@/dto/review/createReview.dto";

export const useCreateReview = () => {
    const createReview = async (createReviewDto: CreateReviewDto) => {
        const reviewService = new ReviewService("http://localhost:3001/");
        await reviewService.create(createReviewDto);
    }
    return {createReview};
};
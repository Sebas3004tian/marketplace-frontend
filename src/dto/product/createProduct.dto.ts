export interface CreateProductDto {
    name: string;
    description: string;
    price: number;
    mainImageUrl: string;
    subcategoryId: string;
}
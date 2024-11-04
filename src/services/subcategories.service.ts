import axios, {AxiosInstance}  from 'axios';
import Cookies from "js-cookie";
import {CreateSubcategoryDto} from "@/dto/subcategory/createSubcategory.dto";

export class SubcategoriesService {
    protected readonly axios: AxiosInstance;
    constructor(url: string) {
        this.axios= axios.create({
            baseURL: url,
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: 30000,
            timeoutErrorMessage: 'Request Timeout'
        });
    }

    public async getAll() {
        const response = await this.axios.get('/subcategories/all', {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        });
        return response.data;
    }

    public async getByCategory(categoryId: string) {
        const response = await this.axios.get("/subcategories/"+categoryId, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        });
        return response.data;
    }

    public async getMineByCategory(categoryId: string) {
        const response = await this.axios.get("/subcategories/mine/"+categoryId, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        });
        return response.data;
    }

    public async create(createSubcategoryDto: CreateSubcategoryDto) {
        const response = await this.axios.post("/subcategories/create", createSubcategoryDto, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        });
        return response.data;
    }

    public async delete(subcategoryId: string) {
        const response = await this.axios.delete("/subcategories/delete/"+subcategoryId, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        });
        return response.data;
    }
}
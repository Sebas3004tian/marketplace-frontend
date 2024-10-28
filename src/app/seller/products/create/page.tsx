"use client";

import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGetCategories } from '@/hooks/categories/useGetCategories';
import { useGetSubcategoriesByCategory } from '@/hooks/subcategories/useGetSubcategoriesByCategory';
import { useCreateProduct } from '@/hooks/products/useCreateProduct';
import { Category } from '@/interfaces/category';
import { Subcategory } from "@/interfaces/subcategory";
import { Product } from "@/interfaces/product";

const CreateProductPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Product>();
    const { getCategories } = useGetCategories();
    const { getSubcategoriesByCategory } = useGetSubcategoriesByCategory();
    const { createProduct } = useCreateProduct();

    const [categories, setCategories] = useState<Category[]>([]);
    const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const fetchCategories = useCallback(async () => {
        const categories = await getCategories();
        if (categories) setCategories(categories);
    }, [getCategories]);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    useEffect(() => {
        if (selectedCategory) {
            (async () => {
                const subcategories = await getSubcategoriesByCategory(selectedCategory);
                if (subcategories) setSubcategories(subcategories);
            })();
        }
    }, [selectedCategory]);

    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: Product) => {
        data.price = parseFloat(data.price as unknown as string)
        console.log("Form submitted:", data);
        if (loading) return;
        setLoading(true);
        try {
            await createProduct(data);
            alert('Product created successfully!');
        } catch (error) {
            console.error('Failed to create product:', error);
            alert('Failed to create product.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6">Create New Product</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                <div>
                    <label className="block text-sm font-medium">Product Name</label>
                    <input
                        type="text"
                        {...register("name", { required: "Product name is required" })}
                        placeholder="Enter product name"
                    />
                    {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium">Description</label>
                    <input
                        type="text"
                        {...register("description", { required: "Description is required" })}
                        placeholder="Enter product description"
                    />
                    {errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium">Price</label>
                    <input
                        type="number"
                        {...register("price", { required: "Price is required" })}
                        placeholder="Enter product price"
                    />
                    {errors.price && <p className="text-red-500 text-xs">{errors.price.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium">Main Image URL</label>
                    <input
                        type="url"
                        {...register("mainImageUrl", { required: "Image URL is required" })}
                        placeholder="Enter image URL"
                    />
                    {errors.mainImageUrl && <p className="text-red-500 text-xs">{errors.mainImageUrl.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium">Category</label>
                    <select
                        onChange={(e) => {
                            setSelectedCategory(e.target.value);
                            // Optional: Reset subcategory when category changes
                            setSubcategories([]);
                        }}
                        className="border rounded px-3 py-2 w-full"
                    >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                {subcategories.length > 0 && (
                    <div>
                        <label className="block text-sm font-medium">Subcategory</label>
                        <select
                            {...register("subcategoryId", { required: "Please select a subcategory" })}
                            className="border rounded px-3 py-2 w-full"
                        >
                            <option value="">Select Subcategory</option>
                            {subcategories.map((subcategory) => (
                                <option key={subcategory.id} value={subcategory.id}>
                                    {subcategory.name}
                                </option>
                            ))}
                        </select>
                        {errors.subcategoryId && <p className="text-red-500 text-xs">{errors.subcategoryId.message}</p>}
                    </div>
                )}

                <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">
                    Create Product
                </button>
            </form>
        </div>
    );
};

export default CreateProductPage;

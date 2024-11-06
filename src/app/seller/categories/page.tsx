"use client";

import React, { useEffect, useState } from 'react';
import { useGetCategories } from '@/hooks/categories/useGetCategories';
import { useGetMySubcategoriesByCategory } from '@/hooks/subcategories/useGetMySubcategoriesByCategory';
import { useCreateSubcategory } from '@/hooks/subcategories/useCreateSubcategory';
import { useDeleteSubcategory } from '@/hooks/subcategories/useDeleteSubcategory';
import { Category } from '@/interfaces/category';
import { Subcategory } from '@/interfaces/subcategory';
import CreateSubcategoryModal from '@/components/CreateSubcategoryModal';
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal';
import { ClipLoader } from "react-spinners";

const CategoriesPage: React.FC = () => {
    const { getCategories } = useGetCategories();
    const { getMySubcategoriesByCategory } = useGetMySubcategoriesByCategory();
    const { createSubcategory } = useCreateSubcategory();
    const { deleteSubcategory } = useDeleteSubcategory();

    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [subcategoryToDelete, setSubcategoryToDelete] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            const allCategories = await getCategories();
            setCategories(allCategories);
            setLoading(false);
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchSubcategories = async () => {
            if (selectedCategory) {
                setLoading(true);
                const filteredSubcategories = await getMySubcategoriesByCategory(selectedCategory);
                setSubcategories(filteredSubcategories);
                setLoading(false);
            } else {
                setSubcategories([]);
            }
        };
        fetchSubcategories();
    }, [selectedCategory]);

    const handleAddSubcategory = async (name: string) => {
        setCreateModalOpen(false);
        if (selectedCategory) {
            setLoading(true);
            await createSubcategory({ name, categoryId: selectedCategory });
            const updatedSubcategories = await getMySubcategoriesByCategory(selectedCategory);
            setSubcategories(updatedSubcategories);
            setLoading(false);
        }
    };

    const handleDeleteSubcategory = async () => {
        if (subcategoryToDelete) {
            setLoading(true);
            await deleteSubcategory(subcategoryToDelete);
            const updatedSubcategories = await getMySubcategoriesByCategory(selectedCategory!);
            setSubcategories(updatedSubcategories);
            setLoading(false);
        }
        setDeleteModalOpen(false);
    };

    return (
        <div className="container mx-auto p-4">
            {loading && (
                <div className="absolute inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-10">
                    <ClipLoader color="#000000" size={150} />
                </div>
            )}
            <div className="flex space-x-8">
                {/* Categories Section */}
                <div className="w-1/2">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Categorías</h2>
                    <ul className="space-y-3">
                        {categories.map((category) => (
                            <li key={category.id}>
                                <button
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={`w-full text-left py-2 px-4 rounded-lg shadow-md transition duration-200 font-medium ${
                                        selectedCategory === category.id
                                            ? 'bg-blue-200 text-blue-800'
                                            : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                                    }`}
                                >
                                    {category.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Subcategories Section */}
                <div className="w-1/2">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Subcategorías</h2>
                    {selectedCategory ? (
                        <>
                            <button
                                onClick={() => setCreateModalOpen(true)}
                                className="mb-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                            >
                                Añadir Subcategoría
                            </button>
                            {subcategories.length > 0 ? (
                                <ul className="space-y-3">
                                    {subcategories.map((subcategory) => (
                                        <li key={subcategory.id} className="flex items-center space-x-4">
                                            <span className="w-full text-left py-2 px-4 rounded-lg shadow-md bg-green-50 text-green-700 font-medium">
                                                {subcategory.name}
                                            </span>
                                            <button
                                                onClick={() => {
                                                    setSubcategoryToDelete(subcategory.id);
                                                    setDeleteModalOpen(true);
                                                }}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                Eliminar
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500">No hay subcategorías para esta categoría.</p>
                            )}
                        </>
                    ) : (
                        <p className="text-gray-500">Selecciona una categoría para ver sus subcategorías.</p>
                    )}
                </div>
            </div>

            {/* Modales */}
            <CreateSubcategoryModal
                isOpen={isCreateModalOpen}
                onClose={() => setCreateModalOpen(false)}
                onSubmit={handleAddSubcategory}
            />
            <ConfirmDeleteModal
                isOpen={isDeleteModalOpen}
                onConfirm={handleDeleteSubcategory}
                onCancel={() => setDeleteModalOpen(false)}
            />
        </div>
    );
};

export default CategoriesPage;

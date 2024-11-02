"use client";

import React, {useCallback, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useGetCategories} from '@/hooks/categories/useGetCategories';
import {useGetSubcategoriesByCategory} from '@/hooks/subcategories/useGetSubcategoriesByCategory';
import {useCreateProduct} from '@/hooks/products/useCreateProduct';
import {useUploadImage} from '@/hooks/common/useUploadImage';
import {Category} from '@/interfaces/category';
import {Subcategory} from "@/interfaces/subcategory";
import {Product} from "@/interfaces/product";

const CrearProducto = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Product>();
    const { getCategories } = useGetCategories();
    const { getSubcategoriesByCategory } = useGetSubcategoriesByCategory();
    const { createProduct } = useCreateProduct();
    const { uploadImage } = useUploadImage();

    const [categorias, setCategorias] = useState<Category[]>([]);
    const [subcategorias, setSubcategorias] = useState<Subcategory[]>([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchCategories = useCallback(async () => {
        const categories = await getCategories();
        if (categories) setCategorias(categories);
    }, [getCategories]);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    useEffect(() => {
        if (categoriaSeleccionada) {
            (async () => {
                const subcategories = await getSubcategoriesByCategory(categoriaSeleccionada);
                if (subcategories) setSubcategorias(subcategories);
            })();
        }
    }, [categoriaSeleccionada]);

    const onSubmit = async (data: Product) => {
        if (loading) return;
        setLoading(true);

        try {
            data.price = parseFloat(data.price as unknown as string);

            const file = (data.mainImageUrl as unknown as FileList)[0];
            if (file) {
                data.mainImageUrl = await uploadImage(file);
            }

            await createProduct(data);
            alert('¡Producto creado exitosamente!');
        } catch (error) {
            console.error('Error al crear el producto:', error);
            alert('No se pudo crear el producto.');
        } finally {
            setLoading(false);
        }
    };




    return (
        <div className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Crear Nuevo Producto</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nombre del producto</label>
                    <input
                        type="text"
                        {...register("name", {required: "El nombre del producto es obligatorio"})}
                        placeholder="Ingresa el nombre del producto"
                        className="mt-1 border-gray-300 rounded-md shadow-sm focus:border-green-600 focus:ring focus:ring-green-600 focus:ring-opacity-50 w-full px-3 py-2"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Descripción</label>
                    <input
                        type="text"
                        {...register("description", {required: "La descripción es obligatoria"})}
                        placeholder="Ingresa una descripción del producto"
                        className="mt-1 border-gray-300 rounded-md shadow-sm focus:border-green-600 focus:ring focus:ring-green-600 focus:ring-opacity-50 w-full px-3 py-2"
                    />
                    {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Precio</label>
                    <input
                        type="number"
                        {...register("price", {required: "El precio es obligatorio"})}
                        placeholder="Ingresa el precio del producto"
                        className="mt-1 border-gray-300 rounded-md shadow-sm focus:border-green-600 focus:ring focus:ring-green-600 focus:ring-opacity-50 w-full px-3 py-2"
                    />
                    {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Imagen principal</label>
                    <input
                        type="file"
                        {...register("mainImageUrl", {required: "La imagen es obligatoria"})}
                        className="mt-1 w-full"
                    />
                    {errors.mainImageUrl && <p className="text-red-500 text-xs mt-1">{errors.mainImageUrl.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Categoría</label>
                    <select
                        onChange={(e) => {
                            setCategoriaSeleccionada(e.target.value);
                            setSubcategorias([]);
                        }}
                        className="mt-1 border-gray-300 rounded-md shadow-sm focus:border-green-600 focus:ring focus:ring-green-600 focus:ring-opacity-50 w-full px-3 py-2"
                    >
                        <option value="">Selecciona una categoría</option>
                        {categorias.map((categoria) => (
                            <option key={categoria.id} value={categoria.id}>
                                {categoria.name}
                            </option>
                        ))}
                    </select>
                </div>

                {subcategorias.length > 0 && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Subcategoría</label>
                        <select
                            {...register("subcategoryId", {required: "Selecciona una subcategoría"})}
                            className="mt-1 border-gray-300 rounded-md shadow-sm focus:border-green-600 focus:ring focus:ring-green-600 focus:ring-opacity-50 w-full px-3 py-2"
                        >
                            <option value="">Selecciona una subcategoría</option>
                            {subcategorias.map((subcategoria) => (
                                <option key={subcategoria.id} value={subcategoria.id}>
                                    {subcategoria.name}
                                </option>
                            ))}
                        </select>
                        {errors.subcategoryId &&
                            <p className="text-red-500 text-xs mt-1">{errors.subcategoryId.message}</p>}
                    </div>
                )}

                <button
                    type="submit"
                    className="w-full bg-green-600 text-white font-semibold py-2 rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 transition duration-150"
                >
                    Crear Producto
                </button>
            </form>
        </div>
    );
};

export default CrearProducto;

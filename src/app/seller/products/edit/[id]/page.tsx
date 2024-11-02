"use client";

import { useRouter } from 'next/navigation'; // Correct import for the App Router
import React, { useEffect, useState } from 'react';
import { Product } from "@/interfaces/product";
import { useGetProduct } from "@/hooks/products/useGetProduct";
import { useUpdateProduct } from "@/hooks/products/useUpdateProduct";
import Image from 'next/image';

interface EditProductPageProps {
    params: {
        id: string; // Define the expected params shape
    };
}

export default function EditProductPage({ params }: EditProductPageProps) {
    const router = useRouter();
    const [product, setProduct] = useState<Product | null>(null);
    const [updatedProduct, setUpdatedProduct] = useState<Partial<Product>>({});
    const { getProduct } = useGetProduct();
    const { updateProduct } = useUpdateProduct();

    useEffect(() => {
        const fetchProduct = async () => {
            if (params.id) {
                const productData = await getProduct(params.id); // Use params.id here
                setProduct(productData);
                setUpdatedProduct(productData);
            }
        };
        fetchProduct();
    }, [params.id]);

    const handleUpdate = async () => {
        if (updatedProduct && params.id) {
            await updateProduct(params.id, updatedProduct);
            router.push('/seller/products');
        }
    };

    const handleInputChange = (field: keyof Product, value: any) => {
        setUpdatedProduct((prevProduct) => ({
            ...prevProduct,
            [field]: value
        }));
    };

    if (!product) return <p>Cargando...</p>; // Loading state
    if (!params.id) return <p>Producto no encontrado.</p>; // Handle case when ID is missing

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Editar Producto</h1>
            <div className="flex space-x-6">
                <div className="w-1/3">
                    <Image
                        src={product.mainImageUrl || '/placeholder-image.png'}
                        alt={product.name}
                        width={300}
                        height={300}
                        className="object-cover rounded-md shadow"
                    />
                    <button className="bg-gray-500 text-white px-4 py-2 mt-4 rounded w-full">
                        Editar Imagen (png, jpg)
                    </button>
                </div>

                <div className="flex-grow bg-gray-100 p-6 rounded-md shadow">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Título:</label>
                            <input
                                type="text"
                                value={updatedProduct.name || ''}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                className="w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Categorías:</label>
                            <select
                                value={updatedProduct.category || ''}
                                onChange={(e) => handleInputChange('category', e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            >
                                <option value="Camisetas">Camisetas</option>
                                <option value="Pantalones">Pantalones</option>
                                <option value="Accesorios">Accesorios</option>
                            </select>
                        </div>
                    </div>
                    <div className="mt-4">
                        <label className="block text-gray-700 font-semibold mb-2">Descripción:</label>
                        <textarea
                            value={updatedProduct.description || ''}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            className="w-full h-32 border border-gray-300 rounded px-3 py-2 resize-none"
                        />
                    </div>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                        onClick={handleUpdate}
                    >
                        Editar Producto
                    </button>
                </div>
            </div>
        </div>
    );
}

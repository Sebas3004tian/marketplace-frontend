"use client";

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { UpdateProductDto } from "@/dto/updateProduct.dto";
import { useGetProduct } from "@/hooks/products/useGetProduct";
import { useUpdateProduct } from "@/hooks/products/useUpdateProduct";
import { useUploadImage } from '@/hooks/common/useUploadImage';
import Image from 'next/image';
import {ClipLoader} from "react-spinners";

interface EditProductPageProps {
    params: {
        id: string;
    };
}

export default function EditProductPage({ params }: EditProductPageProps) {
    const router = useRouter();
    const { uploadImage } = useUploadImage();
    const [product, setProduct] = useState<UpdateProductDto | null>(null);
    const [updatedProduct, setUpdatedProduct] = useState<UpdateProductDto>({
        name: '',
        description: '',
        price: 0,
        mainImageUrl: '',
    });
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const { getProduct } = useGetProduct();
    const { updateProduct } = useUpdateProduct();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            if (params.id) {
                setLoading(true);
                const productData = await getProduct(params.id);
                setProduct(productData);
                setUpdatedProduct(productData);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [params.id]);

    const handleUpdate = async () => {
        if(loading) return;
        if (updatedProduct && params.id) {
            setLoading(true);
            let imageUrl = updatedProduct.mainImageUrl;

            if (selectedImage) {
                imageUrl = await uploadImage(selectedImage);
            }

            const updatedData: UpdateProductDto = {
                name: updatedProduct.name,
                description: updatedProduct.description,
                mainImageUrl: imageUrl,
                price: parseFloat(updatedProduct.price as unknown as string),
            };

            await updateProduct(params.id, updatedData);
            setLoading(false);
            router.push('/seller/products');
        }
    };

    const handleInputChange = (field: keyof UpdateProductDto, value: any) => {
        setUpdatedProduct((prevProduct) => ({
            ...prevProduct,
            [field]: value,
        }));
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            setUpdatedProduct((prevProduct) => ({
                ...prevProduct,
                mainImageUrl: URL.createObjectURL(file),
            }));
        }
    };

    if (!product) return <p>Cargando...</p>;
    if (!params.id) return <p>Producto no encontrado.</p>;

    return (
        <div className="p-6 max-w-4xl mx-auto">
            {loading && (
                <div className="absolute inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-10">
                    <ClipLoader color="#000000" size={150} /> {}
                </div>
            )}
            <h1 className="text-3xl font-bold mb-6 text-center">Editar Producto</h1>
            <div className="flex space-x-6">
                <div className="w-1/3">
                    <Image
                        src={updatedProduct.mainImageUrl || '/placeholder-image.png'}
                        alt={updatedProduct.name}
                        width={300}
                        height={300}
                        className="object-cover rounded-md shadow"
                    />
                    <input
                        type="file"
                        accept="image/png, image/jpeg"
                        onChange={handleImageChange}
                        className="bg-gray-500 text-white px-4 py-2 mt-2 rounded w-full"
                    />
                </div>

                <div className="flex-grow bg-gray-100 p-6 rounded-md shadow-lg">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-700 font-semibold mb-1">Título:</label>
                            <input
                                type="text"
                                value={updatedProduct.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold mb-1">Descripción:</label>
                            <textarea
                                value={updatedProduct.description}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                                className="w-full h-32 border border-gray-300 rounded px-3 py-2 resize-none"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold mb-1">Precio:</label>
                            <input
                                type="number"
                                value={updatedProduct.price}
                                onChange={(e) => handleInputChange('price', e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                        </div>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded w-full mt-4"
                            onClick={handleUpdate}
                        >
                            Editar Producto
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

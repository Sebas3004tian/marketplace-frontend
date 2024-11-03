"use client";

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { UpdateProductDto } from "@/dto/product/updateProduct.dto";
import { useGetProduct } from "@/hooks/products/useGetProduct";
import { useUpdateProduct } from "@/hooks/products/useUpdateProduct";
import { useUploadImage } from '@/hooks/common/useUploadImage';
import { useGetSizesByProduct } from "@/hooks/sizes/useGetSizesByProduct";
import { useGetOptionsBySize } from "@/hooks/option/useGetOptionsBySize";
import Image from 'next/image';
import {ClipLoader} from "react-spinners";
import { Size } from "@/interfaces/size";
import { Option } from "@/interfaces/option";


interface EditProductPageProps {
    params: {
        id: string;
    };
}

export default function EditProductPage({ params }: EditProductPageProps) {
    const router = useRouter();
    const { uploadImage } = useUploadImage();
    const { getProduct } = useGetProduct();
    const { updateProduct } = useUpdateProduct();
    const { getSizesByProduct } = useGetSizesByProduct();
    const { getOptionsBySize } = useGetOptionsBySize();

    const [product, setProduct] = useState<UpdateProductDto | null>(null);
    const [updatedProduct, setUpdatedProduct] = useState<UpdateProductDto>({
        name: '',
        description: '',
        price: 0,
        mainImageUrl: '',
    });
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const [sizes, setSizes] = useState<Size[]>([]);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [options, setOptions] = useState<Option[]>([]);

    useEffect(() => {
        const fetchProduct = async () => {
            if (params.id) {
                setLoading(true);
                const productData = await getProduct(params.id);
                setProduct(productData);
                setUpdatedProduct(productData);
                const fetchedSizes = await getSizesByProduct(params.id);
                setSizes(fetchedSizes);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [params.id]);

    useEffect(() => {
        const fetchOptions = async () => {
            if (selectedSize) {
                setLoading(true);
                const fetchedOptions = await getOptionsBySize(selectedSize);
                setOptions(fetchedOptions);
                setLoading(false);
            } else {
                setOptions([]);
            }
        };
        fetchOptions();
    }, [selectedSize]);

    const handleUpdate = async () => {
        if (loading) return;
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

    const handleSizeClick = (sizeId: string) => {
        setSelectedSize(sizeId);
    };

    if (!product) return <p className="text-center text-gray-600">Cargando...</p>;
    if (!params.id) return <p className="text-center text-red-500">Producto no encontrado.</p>;

    return (
        <div className="p-6 max-w-6xl mx-auto space-y-8">
            {loading && (
                <div className="absolute inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-10">
                    <ClipLoader color="#000000" size={150} />
                </div>
            )}
            <h1 className="text-3xl font-bold text-center mb-6">Editar Producto</h1>
            <div className="flex space-x-4">
                <div className="flex-grow min-w-[40%]">
                    <ProductInfoSection
                        updatedProduct={updatedProduct}
                        handleInputChange={handleInputChange}
                        handleImageChange={handleImageChange}
                        handleUpdate={handleUpdate}
                    />
                </div>
                <div className="flex-none w-[20%]">
                    <SizeListSection sizes={sizes} handleSizeClick={handleSizeClick} selectedSize={selectedSize} />
                </div>
                <div className="flex-grow min-w-[40%]">
                    <OptionsSection selectedSize={selectedSize} options={options} />
                </div>
            </div>
        </div>
    );
}

const ProductInfoSection = ({ updatedProduct, handleInputChange, handleImageChange, handleUpdate }) => (
    <div className="bg-gray-100 p-6 rounded-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">Información del Producto</h2>
        <div className="space-y-4">
            <div>
                <label className="block text-gray-700 font-semibold mb-1">Título:</label>
                <input
                    type="text"
                    value={updatedProduct.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                />
            </div>
            <div>
                <label className="block text-gray-700 font-semibold mb-1">Descripción:</label>
                <textarea
                    value={updatedProduct.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="w-full h-32 border border-gray-300 rounded px-3 py-2 resize-none focus:outline-none focus:border-blue-500"
                />
            </div>
            <div>
                <label className="block text-gray-700 font-semibold mb-1">Precio:</label>
                <input
                    type="number"
                    value={updatedProduct.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                />
            </div>
            <div>
                <label className="block text-gray-700 font-semibold mb-1">Imagen Principal:</label>
                <input
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={handleImageChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                />
                {updatedProduct.mainImageUrl && (
                    <Image
                        src={updatedProduct.mainImageUrl}
                        alt="Imagen del producto"
                        width={150}
                        height={150}
                        className="mt-4 rounded-md shadow"
                    />
                )}
            </div>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded w-full mt-4 hover:bg-blue-600 transition-colors"
                onClick={handleUpdate}
            >
                Guardar Cambios
            </button>
        </div>
    </div>
);

const SizeListSection = ({ sizes, handleSizeClick, selectedSize }) => (
    <div className="bg-gray-100 p-6 rounded-md shadow-lg h-full">
        <h2 className="text-xl font-bold mb-4">Tallas</h2>
        <ul className="space-y-2">
            {sizes.map((size) => (
                <li
                    key={size.id}
                    onClick={() => handleSizeClick(size.id)}
                    className={`p-3 border rounded cursor-pointer ${selectedSize === size.id ? 'bg-blue-100 border-blue-500' : 'bg-white border-gray-300'} transition-colors hover:bg-blue-50`}
                >
                    {size.name}
                </li>
            ))}
        </ul>
    </div>
);

const OptionsSection = ({ selectedSize, options }) => (
    <div className="bg-gray-100 p-6 rounded-md shadow-lg h-full">
        <h2 className="text-xl font-bold mb-4">Opciones</h2>
        {selectedSize && options.length > 0 ? (
            <div className="space-y-4">
                {options.map((option) => (
                    <div key={option.id} className="flex items-center space-x-4">
                        <Image src={option.imageUrl} alt={option.description} width={80} height={80} className="object-cover rounded" />
                        <div>
                            <h3 className="font-semibold">{option.description}</h3>
                            <p className="text-gray-600">Unidades disponibles: {option.availableUnits}</p>
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <p className="text-gray-500">Selecciona una talla para ver las opciones disponibles.</p>
        )}
    </div>
);
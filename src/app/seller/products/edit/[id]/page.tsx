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
import { ClipLoader } from "react-spinners";
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
                const fetchedOptions = await getOptionsBySize(selectedSize);
                setOptions(fetchedOptions);
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

    const handleInputChange = (field: keyof UpdateProductDto, value: string | number | boolean) => {
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
                    <ClipLoader size={150} color={"#123abc"} loading={loading} />
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
                    <SizeListSection
                        sizes={sizes}
                        handleSizeClick={handleSizeClick}
                        selectedSize={selectedSize}
                    />
                </div>
                <div className="flex-grow min-w-[40%]">
                    <OptionsSection
                        selectedSize={selectedSize}
                        options={options}
                    />
                </div>
            </div>
        </div>
    );
}

const ProductInfoSection = ({ updatedProduct, handleInputChange, handleImageChange, handleUpdate }: { updatedProduct: UpdateProductDto, handleInputChange: (field: keyof UpdateProductDto, value: string | number | boolean) => void, handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void, handleUpdate: () => void }) => (
    <div className="bg-gray-100 p-6 rounded-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">Información del Producto</h2>
        <div className="space-y-4">
            <div>
                <label className="block text-gray-700 font-semibold mb-1">Título:</label>
                <input
                    type="text"
                    value={updatedProduct.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div>
                <label className="block text-gray-700 font-semibold mb-1">Descripción:</label>
                <textarea
                    value={updatedProduct.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div>
                <label className="block text-gray-700 font-semibold mb-1">Precio:</label>
                <input
                    type="number"
                    value={updatedProduct.price}
                    onChange={(e) => handleInputChange('price', parseFloat(e.target.value))}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div>
                <label className="block text-gray-700 font-semibold mb-1">Imagen Principal:</label>
                <input
                    type="file"
                    onChange={handleImageChange}
                    className="w-full p-2 border rounded"
                />
                {updatedProduct.mainImageUrl && (
                    <Image
                        src={updatedProduct.mainImageUrl}
                        alt="Imagen del producto"
                        width={200}
                        height={200}
                        className="mt-4"
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

const SizeListSection = ({ sizes, handleSizeClick, selectedSize }: { sizes: Size[], handleSizeClick: (sizeId: string) => void, selectedSize: string | null }) => (
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

const OptionsSection = ({ selectedSize, options }: { selectedSize: string | null, options: Option[] }) => (
    <div className="bg-gray-100 p-6 rounded-md shadow-lg h-full">
        <h2 className="text-xl font-bold mb-4">Opciones</h2>
        {selectedSize && options.length > 0 ? (
            <div className="space-y-4">
                {options.map((option) => (
                    <div key={option.id} className="flex items-center space-x-4">
                        <span>{option.description}</span>
                    </div>
                ))}
            </div>
        ) : (
            <p className="text-gray-500">Selecciona una talla para ver las opciones disponibles.</p>
        )}
    </div>
);
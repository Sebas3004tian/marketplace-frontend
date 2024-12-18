"use client";

import { useShoppingCart } from '@/hooks/cart/useShoppingCart';
import React, { useEffect, useState } from 'react';
import Image from "next/image"
import { ClipLoader } from 'react-spinners';
import { Product } from '@/interfaces/product';
import { Size } from '@/interfaces/size';
import { useGetProduct } from '@/hooks/products/useGetProduct';
import BackVector from "@/components/svg/Arrow.svg"
import { useGetSizesByProduct } from '@/hooks/sizes/useGetSizesByProduct';
import { useGetOptionsBySize } from '@/hooks/option/useGetOptionsBySize';
import { Option } from '@/interfaces/option';
import { NewProduct } from '@/interfaces/newProduct';
import { Review } from '@/interfaces/review';
import { useGetReview } from '@/hooks/review/useGetReview';

interface Props{

    params:{
        id:string
    }

}

// Removed ProductDto interface

export default function AddShoppingCart({ params }: Props) {
    const fakeProduct: Product = {
        id: "",
        name: "",
        description: "",
        price: 0,
        mainImageUrl: "",
        subcategory: "",
        category: "",

    } 
    const { addProduct } = useShoppingCart();
    const [sizes, setSizes] = useState<Size[]>([])
    const [loading, setLoading] = useState(false)
    const [selectedSize, setSelectedSize] = useState("")
    const [selectedSizeEnun, setSelectedSizeEnun] = useState("")
    const [selectedOption, setSelectedOption] = useState("")
    const [selectedOptionEnun, setSelectedOptionEnun] = useState("")
    const [product, setProduct] = useState<Product>(fakeProduct)
    const {getProduct} = useGetProduct()
    const {getSizesByProduct} = useGetSizesByProduct()
    const {getOptionsBySize} = useGetOptionsBySize()
    const [options, setOptions] = useState<Option[]>([])
    const [maxQuantity, setMaxQuantity] = useState<number>(0)
    const [quantity, setQuantity] = useState<number>(0)
    const [image,setImage] = useState(fakeProduct.mainImageUrl)
    const [reviews, setReviews] = useState<Review[]>([])
    const {getReview} = useGetReview()

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response2 = await getSizesByProduct(params.id);
                setSizes(response2);
                const response = await getProduct(params.id);
                setProduct(response)
                setImage(response.mainImageUrl)
                const response3 = await getReview(params.id)
                setReviews(response3)
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [params.id]);

    useEffect(() => {
        if (selectedSize === "") return;
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await getOptionsBySize(selectedSize);
                setOptions(response);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchData();
    }, [selectedSize]);

    const handleSize = (id: string, size: string) => {
        setSelectedSizeEnun(size);
        setSelectedSize(id);
    };

    const handleOption = (id: string) => {
        const selected = options.find((item) => item.id === id);
        if (selected) {
            setMaxQuantity(Number(selected.availableUnits));
            setSelectedOptionEnun(selected.description);
            setSelectedOption(id);
            setImage(selected.imageUrl);
        }
    };

    const handleIncrement = () => {
        if (quantity < maxQuantity) {
            setQuantity(quantity + 1);
        }
    };

    const handleDecrement = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    };

    const handleSubmit = () => {
        if (quantity !== 0) {
            const element: NewProduct = {
                ...product,
                optionId: selectedOption,
                amount: quantity,
                size: selectedSizeEnun,
                color: selectedOptionEnun,
                mainImageUrl: image,
            };
            addProduct(element);
        }
    };

    return (
        <div className='relative'>
            <button
                className='absolute top-0 left-0 p-3 bg-gray-200 rounded-full shadow hover:bg-gray-300 transition'
                onClick={() => window.history.back()}
            >
                <Image priority src={BackVector} alt="Back" width={30} height={30} />
            </button>

            <div className="flex flex-col md:flex-row p-8 max-w-6xl mx-auto">
                {loading && (
                    <div className="absolute inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-10">
                        <ClipLoader color="#000000" size={150} />
                    </div>
                )}

                <div className="flex-1 flex justify-center items-center">
                    {image ? (
                        <Image priority src={image} alt="Product" width={2000} height={2000}/>
                    ) : (
                        <div className="w-full h-[400px] bg-gray-200 flex items-center justify-center">
                            <p>No image available</p>
                        </div>
                    )}
                </div>

                <div className="flex-1 mt-8 md:mt-0 md:ml-8 space-y-6">
                    <div>
                        <h1 className="text-2xl font-semibold">{product?.name}</h1>
                        <p className="text-gray-600 text-lg mt-2">${product?.price}</p>
                    </div>

                    <div>
                        <p className="font-semibold text-gray-700">Tamaño</p>
                        <div className="flex space-x-4 mt-2">
                            {sizes?.map((size) => (
                                <button
                                    key={size.id} // added key prop
                                    className="px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-200"
                                    onClick={() => handleSize(size.id, size.name)}
                                >
                                    {size.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="text-gray-700">Color:</label>
                        <select
                            value={selectedOption}
                            onChange={(e) => handleOption(e.target.value)}
                            className="p-2 border rounded-lg text-gray-700 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Selecciona una opción</option>
                            {options.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {option.description}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <p className="font-semibold text-gray-700">Cantidad</p>
                        <div className="flex items-center mt-2">
                            <button
                                className="px-3 py-1 border rounded-l-lg text-gray-700 hover:bg-gray-200"
                                onClick={handleDecrement}
                            >
                                -
                            </button>
                            <input
                                type="text"
                                value={quantity}
                                className="w-12 text-center border-t border-b border-gray-300 focus:outline-none"
                                readOnly
                            />
                            <button
                                className="px-3 py-1 border rounded-r-lg text-gray-700 hover:bg-gray-200"
                                onClick={handleIncrement}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div>
                        <button
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
                            onClick={handleSubmit}
                        >
                            Añadir al carrito
                        </button>
                    </div>

                    <div>
                        <p className="font-semibold text-gray-700">Descripción</p>
                        <p className="text-gray-600 mt-2">{product?.description}</p>
                    </div>
                </div>
            </div>

            {/*Descripción del Producto*/} 
            <div>
                <p className="font-semibold text-gray-700">Descripción</p>
                <p className="text-gray-600 mt-2">
                    {product?.description}
                </p>
                
            </div>

            {/* Sección de Comentarios */}
            <div className="mt-8">
                <p className="font-semibold text-gray-700">Comentarios</p>
                <div className="space-y-4 mt-4">
                {reviews.map((comment, index) => (
                    <div key={index} className="p-4 border rounded-lg shadow-sm">
                    <div className="flex items-center space-x-2 mb-2">
                        <p className="font-semibold text-gray-800">{`Rating: ${comment.rating} / 5`}</p>
                    </div>
                    <p className="text-gray-600">{comment.comment}</p>
                    </div>
                ))}
                </div>
            </div>
        </div>
    );
}

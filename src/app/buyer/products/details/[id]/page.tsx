"use client";

import { useShoppingCart } from '@/hooks/cart/useShoppingCart';
import { useRouter } from 'next/navigation';
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

interface ProductDto extends Product{
    
}
export default function AddShoppingCart({params}:Props){
    const fakeProduct: Product ={
        id: "",
        name: "",
        description: "",
        price: 0,
        mainImageUrl: "",
        subcategory: "",
        category: "",
    } 
    const { products, addProduct } = useShoppingCart();
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
    const [image,setImage] = useState("")
    const [reviews, setReviews] = useState<Review[]>([])
    const router = useRouter()
    const {getReview} = useGetReview()

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                console.log(params.id)
                const response2 = await getSizesByProduct(params.id);
                setSizes(response2)
                const response = await getProduct(params.id);
                setProduct(response)
                setImage(response.mainImageUrl)
                const response3 = await getReview(params.id)
                setReviews(response3)
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchData();
    }, [setProduct]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await getOptionsBySize(selectedSize);
                console.log("inside size change")
                setOptions(response)
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchData();
    }, [selectedSize]);

    const handleSize = async (id:string, size:string) =>{
        setSelectedSizeEnun(size)
        setSelectedSize(id)
    } 

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchData();
    }, [image]);
    
    const handleOption = async (id:string) => {
        setSelectedOption(id);
        const max = options.find((item) => item.id === selectedOption);
        for(const element of options){
            if(element.id === id){
                setMaxQuantity(Number(element.availableUnits))
                setSelectedOptionEnun(element.description)
                setImage(element.imageUrl)
            }
            console.log(maxQuantity)
        }
        
    }

    const handleIncrement = async () =>{
        if(quantity < maxQuantity){
            setQuantity(quantity+1)
        } 
        console.log(maxQuantity)
    }

    const handleDecrement = async () =>{
        if(quantity > 0){
            setQuantity(quantity-1)
        } 
        console.log(maxQuantity)
    }

    const handleSubmit = async () =>{
        if(quantity !==0){
            const element: NewProduct = {
                ...product,
                optionId:selectedOption,
                amount:quantity,
                size:selectedSizeEnun,
                color:selectedOptionEnun,
                mainImageUrl:image
                
            }
            addProduct(element)
        }
       
    }

    return(
        <div className='relative'>
            {/*Flecha*/}
            <button className='absolute top-0 left-0 p-3 bg-gray-200 rounded-full shadow hover:bg-gray-300 transition' onClick={() => window.history.back()}>
                <Image 
                priority
                src={BackVector}
                alt="Back"
                width={30}
                height={30}/>

            </button>
    
        <div className="flex flex-col md:flex-row p-8 max-w-6xl mx-auto ">

            {loading && (
                <div className="absolute inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-10">
                    <ClipLoader color="#000000" size={150} />
                </div>
            )}

            {/*Sección de Imagen del Producto*/}
            <div className="flex-1 flex justify-center items-center">
                <Image 
                priority
                src={image}
                alt="Product"
                width={2000}
                height={2000}/>

            </div>

            {/*Sección de Información del Producto*/}
            <div className="flex-1 mt-8 md:mt-0 md:ml-8 space-y-6">
            {/*Título y Precio del Producto*/}
            <div>
                <h1 className="text-2xl font-semibold">{product?.name}</h1>
                <p className="text-gray-600 text-lg mt-2">${product?.price}</p>
            </div>

            {/*Opciones de Tamaño*/}
            <div>
                <p className="font-semibold text-gray-700">Tamaño</p>
                <div className="flex space-x-4 mt-2">
                    {sizes?.map((size)=>(
                        <button className="px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-200" onClick={()=>handleSize(size.id, size.name)}>{size.name} </button>
                    ))}

                </div>
            </div>

             {/*Opciones de Color*/}
             <div>
             <label className="text-gray-700">Color:</label>
            <select
                value={selectedOption}
                onChange={(e) => {
                    handleOption(e.target.value);
                }}
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

            {/*Sección de Cantidad*/}
            <div>
                <p className="font-semibold text-gray-700">Cantidad</p>
                <div className="flex items-center mt-2">
                    <button className="px-3 py-1 border rounded-l-lg text-gray-700 hover:bg-gray-200" onClick={()=>handleDecrement()}>-</button>
                    <input type="text" value={quantity} className="w-12 text-center border-t border-b border-gray-300 focus:outline-none"/>
                    <button className="px-3 py-1 border rounded-r-lg text-gray-700 hover:bg-gray-200" onClick={()=>handleIncrement()}>+</button>
                </div>
            </div>

            {/*Botón de Añadir al Carrito*/}
            <div>
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700" onClick={()=>handleSubmit()}>Añadir al carrito</button>
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

        </div>
    </div>
    )

    }
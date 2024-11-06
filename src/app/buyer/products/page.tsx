"use client";

import React, { useEffect, useState } from "react";
import { Product } from "@/interfaces/product";
import  ProductCardBuyer from "@/components/ProductCardBuyer"
import { useGetProducts } from "@/hooks/products/useGetProducts";
import {ClipLoader} from "react-spinners"; // Importa el modal


export default function HomeBuyerPage (){
    //const { getProductsFiltered } = useGetProductsFiltered()
    const { getProducts } = useGetProducts()
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await getProducts();
                setProducts(response);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchData();
    }, [setProducts]);

    const handleSubmit = async ( id: string) =>{
        console.log(id);
    }
    return (
        <div>
            {loading && (
                <div className="absolute inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-10">
                    <ClipLoader color="#000000" size={150} /> {}
                </div>
            )}
            <h1 className="text-4xl font-bold mb-4">Productos</h1>
            <div className="space-y-4">
                <h1 className="text-3xl font-bold text-center mb-6">Productos</h1>
                <div className="flex items-center space-x-4">
                    <div className="flex flex-wrap gap-6 justify-center">
                        {products.map((product) => (
                            <ProductCardBuyer
                                key={product.id}
                                mainImageUrl={product.mainImageUrl}
                                name={product.name}
                                price={product.price}
                                onAddCart={() => handleSubmit(product.id)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { Product } from "@/interfaces/product";
import  ProductCardBuyer from "@/components/ProductCardBuyer"
import { useGetProductsFiltered} from "@/hooks/products/useGetProductsFiltered";
import { useGetProducts } from "@/hooks/products/useGetProducts";
import {ClipLoader} from "react-spinners"; 
import { useShoppingCart } from "@/hooks/cart/useShoppingCart";
import { QueryParams } from "@/interfaces/queryParams";


export default function HomeBuyerPage(){
    //const { getProductsFiltered } = useGetProductsFiltered()
    const { getProducts } = useGetProducts()
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState<Product[]>([])
    //const [product, setCurrentProduct] = useState<Product|null>(null)
    const router = useRouter()
    const { productFilter} = useShoppingCart();
    const { getProductsFiltered } = useGetProductsFiltered()

    /*useEffect(() => {
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
    }, []);*/

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const query: QueryParams = {
                    category:productFilter
                }
                let response: Product[]
                if(productFilter === "All"){
                    response = await getProducts();
                }
                else{
                    response = await getProductsFiltered(query);
                }
                setProducts(response);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchData();
    }, [productFilter]);
    
    const handleSubmit = async (id:string) =>{
        router.push(`/buyer/products/details/${id}`)
    }

    
    return (
        <div>
            {loading && (
                <div className="absolute inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-10">
                    <ClipLoader color="#000000" size={150} />
                </div>
            )}
            <h1 className="text-4xl font-bold mb-4">Productos</h1>
            <div className="space-y-4">

                <div className="flex items-center space-x-4">
                    <div className="flex flex-wrap gap-6 justify-center">
                        {products.map((product) => (
                            <ProductCardBuyer
                                key={product.id}
                                mainImageUrl={product.mainImageUrl}
                                name={product.name}
                                price={product.price}
                                onChangePage={()=> handleSubmit(product.id)} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
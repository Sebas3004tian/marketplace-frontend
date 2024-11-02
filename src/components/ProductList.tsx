"use client";

import React, { useEffect, useState } from 'react';
import { useGetProducts } from '@/hooks/products/useGetProducts';
import { useLogin } from "@/hooks/auth/useLogin";
import { useRouter } from 'next/navigation';  // Import useRouter
import Input from '@/components/ui/Input';
import { Product } from "@/interfaces/product";
import ProductCard from "@/components/ProductCard";

const ProductList = () => {
    const { getProducts } = useGetProducts();
    const { login } = useLogin();
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                await login("seller@example.com", "Password123!");
                return await getProducts();
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchData().then(response => {
            if (response) {
                setProducts(response);
            }
        });
    }, [getProducts, login]);

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-bold text-center mb-6">Productos</h1>
            <div className="flex items-center space-x-4">
                <div className="flex-grow">
                    <Input
                        type="text"
                        placeholder="Buscar productos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-64"
                    />
                </div>
                <button
                    className="bg-green-700 text-white px-4 py-2 rounded"
                    onClick={() => router.push('/seller/products/create')}
                >
                    Crear nuevo Producto
                </button>

                <button className="bg-blue-700 text-white px-4 py-2 rounded">Filtrar</button>
            </div>

            {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                    <ProductCard key={product.id} {...product} />  // Pass product props and key
                ))
            ) : (
                <p>No hay productos disponibles.</p>
            )}
        </div>
    );
};

export default ProductList;

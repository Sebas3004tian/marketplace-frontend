"use client";

import React, { useEffect, useState } from 'react';
import { useAxios } from '@/hooks/useAxios';
import Button  from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Image from 'next/image';

interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    mainImageUrl: string;
}

const ProductCard = ({ product }: { product: Product }) => (
    <div className="bg-gray-50 p-4 rounded-lg flex items-start space-x-4 border border-gray-200">
        <Image src={product.mainImageUrl} alt={product.name} width={100} height={100} className="object-cover" />
        <div className="flex-grow">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-sm">Precio: ${product.price.toLocaleString()}</p>
        </div>
        <Button variant="secondary" className="mt-2">Editar producto</Button>
    </div>
);

const ProductList = () => {
    const { getProducts } = useAxios();
    const [products, setProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchData();
    }, [getProducts]);

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-bold text-center mb-6">Productos</h1>
            <div className="flex justify-between items-center mb-4">
                <Input
                    type="text"
                    placeholder="Buscar productos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64"
                />
                <Button variant="outline">
                    Filtrar
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 h-4 w-4"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
                </Button>
            </div>
            {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))
            ) : (
                <p>No hay productos disponibles.</p>
            )}
        </div>
    );
};

export default ProductList;
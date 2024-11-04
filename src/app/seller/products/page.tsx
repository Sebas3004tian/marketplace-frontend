"use client";

import React, { useEffect, useState } from "react";
import { useLogin } from "@/hooks/auth/useLogin";
import { useRouter } from 'next/navigation';
import { Product } from "@/interfaces/product";
import ProductCard from "@/components/ProductCard";
import { useGetMyProducts } from "@/hooks/products/useGetMyProducts";
import { useDeleteProduct } from "@/hooks/products/useDeleteProduct";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";
import {ClipLoader} from "react-spinners"; // Importa el modal

export default function HomeSellerPage() {
    const { getMyProducts } = useGetMyProducts();
    const { deleteProduct } = useDeleteProduct();
    const { login } = useLogin();
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await getMyProducts();
                setProducts(response);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchData();
    }, [setProducts]);

    const handleEdit = (id: string) => {
        router.push(`/seller/products/edit/${id}`);
    };

    const handleDelete = async () => {
        if (!productToDelete) return;
        if(loading) return;
        try {
            setLoading(true);
            await deleteProduct(productToDelete);
            const response = await getMyProducts();
            setProducts(response);
            setIsModalOpen(false);
            setProductToDelete(null);
        } catch (error) {
            console.error('Error deleting product:', error);
        } finally {
            setLoading(false);
        }
    };

    const confirmDelete = (id: string) => {
        setProductToDelete(id);
        setIsModalOpen(true);
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                    <div className="flex-grow">
                        <input
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
                        <ProductCard
                            key={product.id}
                            {...product}
                            onEdit={() => handleEdit(product.id)}
                            onDelete={() => confirmDelete(product.id)} // Llama a confirmDelete
                        />
                    ))
                ) : (
                    <p>No hay productos disponibles.</p>
                )}
            </div>

            <ConfirmDeleteModal
                isOpen={isModalOpen}
                onConfirm={handleDelete}
                onCancel={() => setIsModalOpen(false)}
            />
        </div>
    );
}

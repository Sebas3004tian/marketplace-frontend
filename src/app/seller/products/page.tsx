"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { Product } from "@/interfaces/product";
import ProductCard from "@/components/ProductCard";
import { useGetMyProducts } from "@/hooks/products/useGetMyProducts";
import { useDeleteProduct } from "@/hooks/products/useDeleteProduct";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";
import { ClipLoader } from "react-spinners";
import { Plus, Package } from "lucide-react";

export default function HomeSellerPage() {
    const { getMyProducts } = useGetMyProducts();
    const { deleteProduct } = useDeleteProduct();
    const router = useRouter();
    
    const [products, setProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState('');
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

    const filteredProducts = products
        .filter(product => 
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedCategory ? product.category === selectedCategory : true) &&
            (selectedSubcategory ? product.subcategory === selectedSubcategory : true)
        );

    return (
        <div className="p-8 max-w-7xl mx-auto">
            {/* Loading Overlay */}
            {loading && (
                <div className="absolute inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
                    <ClipLoader color="#000000" size={150} />
                </div>
            )}

            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-700">Total Productos</h3>
                        <Package className="text-blue-500 w-8 h-8" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{products.length}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-700">Categorías Activas</h3>
                        <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                    </div>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                        {new Set(products.map(p => p.category)).size}
                    </p>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Gestión de Productos</h1>
                
                <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
                    <input
                        type="text"
                        placeholder="Buscar productos por nombre..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg"
                    />
                    <select 
                        value={selectedCategory} 
                        onChange={(e) => setSelectedCategory(e.target.value)} 
                        className="border border-gray-300 rounded-lg px-3 py-2">
                        <option value="">Todas las categorías</option>
                        {[...new Set(products.map(p => p.category))].map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                    <select 
                        value={selectedSubcategory} 
                        onChange={(e) => setSelectedSubcategory(e.target.value)} 
                        className="border border-gray-300 rounded-lg px-3 py-2">
                        <option value="">Todas las subcategorías</option>
                        {[...new Set(products.filter(p => p.category === selectedCategory).map(p => p.subcategory))].map(subcategory => (
                            <option key={subcategory} value={subcategory}>{subcategory}</option>
                        ))}
                    </select>
                    
                    <button
                        onClick={() => router.push('/seller/products/create')}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
                    >
                        <Plus className="h-5 w-5" />
                        Nuevo Producto
                    </button>
                </div>

                <div className="space-y-4">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                {...product}
                                onEdit={() => handleEdit(product.id)}
                                onDelete={() => confirmDelete(product.id)}
                            />
                        ))
                    ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-lg">
                            <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                            <p className="text-gray-600 text-lg">No hay productos disponibles.</p>
                            <p className="text-gray-500 mt-2">Comienza agregando tu primer producto</p>
                        </div>
                    )}
                </div>
            </div>

            <ConfirmDeleteModal
                isOpen={isModalOpen}
                onConfirm={handleDelete}
                onCancel={() => setIsModalOpen(false)}
            />
        </div>
    );
}

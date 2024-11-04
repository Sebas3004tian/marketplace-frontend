"use client";

import {useRouter} from "next/navigation";

export default function SellerNavbar() {
    const router = useRouter();
    return (
        <nav className="bg-gray-900 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl">Stock-Vendedor</h1>
                <div>
                    <button onClick={() => router.push('/seller/products')} className="mr-8">Productos</button>
                    <button onClick={() => router.push('/seller/orders')} className="mr-8">Ventas</button>
                    <button onClick={() => router.push('/seller/categories')}>Categorías y subcategorías</button>
                </div>
                <button className="bg-gray-700 p-2 rounded-full">Perfil</button>
            </div>
        </nav>
    );
}
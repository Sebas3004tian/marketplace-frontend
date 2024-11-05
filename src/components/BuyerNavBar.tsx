"use client";

import { useShoppingCart } from "@/hooks/cart/useShoppingCart";
import {useRouter} from "next/navigation";
import { useState } from "react";
import CartVector from "@/components/svg/Cart.svg"
import Image from 'next/image';
import ShoppingCart from "./ShoppingCart";

export default function BuyerNavbar() {
    const router = useRouter();
    const [showCart, setShowCart] = useState(false);
    const { products } = useShoppingCart();
    return (
        <nav className="bg-gray-900 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl">Modi</h1>
                <div>
                    <button onClick={() => router.push('/seller/products')} className="mr-8">Hombre</button>
                    <button onClick={() => router.push('/seller/orders')} className="mr-8">Mujer</button>
                    <button onClick={() => router.push('/seller/categories')}>Niño</button>
                    <button /*onClick={() => router.push('/seller/categories')}*/ className="bg-red-500 ml-4 rounded-sm p-1">%Descuento</button>
                </div>
               
                    <button className=" bg-slate-300 right-2 hover:bg-zinc-50 rounded-full p-2 text-white flex items-center gap-1"
                    onClick={() => setShowCart(!showCart)}>
                        <Image 
                            priority
                            src={CartVector}
                            alt=""
                            width={30}
                            height={30}
                        />

                        <div className="bg-gray-800 p-1 text-xs text-white w-6 h-6 rounded-[50%]">
                            <span>{products.length}</span>
                        </div>
                     </button>

                    {showCart && (
                    <div className="absolute top-12 right-0 w-max">
                        <ShoppingCart />
                    </div>)}
                
                
                <button className="bg-gray-700 p-2 rounded-full">Perfil</button>
            </div>
        </nav>
    );
}
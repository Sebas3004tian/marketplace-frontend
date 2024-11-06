"use client";

import { useShoppingCart } from "@/hooks/cart/useShoppingCart";
import { useRouter } from "next/navigation";
import { useState, useEffect, SetStateAction } from "react";
import CartVector from "@/components/svg/Cart.svg";
import UserVector from '../components/svg/User.svg';
import Image from 'next/image';
import ShoppingCart from "./ShoppingCart";
import { Mail, MapPin } from "lucide-react";
import Cookies from 'js-cookie';
import EditProfileModal from '../components/EditProfileModal';

export default function BuyerNavbar() {
    const router = useRouter();
    const [showCart, setShowCart] = useState(false);
    const { products } = useShoppingCart();
    const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState({id:"", fullName: "", email: "", address: "" });

    useEffect(() => {
        const cookieValue = Cookies.get('currentUser');

        if (cookieValue) {
            const user = JSON.parse(cookieValue);
            setCurrentUser({
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                address: user.address,
            });
        }
    }, []);

    const toggleProfileMenu = () => {
        setProfileMenuOpen(!isProfileMenuOpen);
    };

    const handleLogout = () => {
        Cookies.remove('token');
        Cookies.remove('currentUser');
        window.location.href = "/login";
    };

    const handleEditClick = () => {
        setIsEditModalOpen(true);
    };

    const handleUserUpdate = (updatedUser: SetStateAction<{ id: string, fullName: string; email: string; address: string; }>) => {
        setCurrentUser(updatedUser);
    };

    return (
        <nav className="bg-[#2B2D42] text-white p-4 relative">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl">Modi</h1>
                <div>
                    <button onClick={() => router.push('/seller/products')} className="mr-8">Hombre</button>
                    <button onClick={() => router.push('/seller/orders')} className="mr-8">Mujer</button>
                    <button onClick={() => router.push('/seller/categories')}>Niño</button>
                    <button className="bg-red-500 ml-4 rounded-sm p-1">%Descuento</button>
                </div>

                <div className="flex items-center gap-4">
                    <button 
                        className="bg-slate-300 hover:bg-zinc-50 rounded-full p-2 text-white flex items-center gap-1"
                        onClick={() => setShowCart(!showCart)}
                    >
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
                        <div className="absolute top-16 right-0 w-max z-20">
                            <ShoppingCart />
                        </div>
                    )}

                    <button onClick={toggleProfileMenu} className="bg-[#D9D9D9] p-2 rounded-full">
                        <Image
                            priority
                            src={UserVector}
                            alt=""
                            width={25}
                            height={25}
                        />
                    </button>
                </div>
            </div>

            {isProfileMenuOpen && (
                <div className="absolute top-16 right-0 bg-[#2B2D42] text-white w-[350px] h-[500px] p-4 rounded-bl-lg shadow-lg z-10 flex flex-col">
                    <ul>
                        <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                            <div className="flex flex-col items-center p-6">
                                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 mb-4">
                                    <Image
                                        priority
                                        src={UserVector}
                                        alt=""
                                        width={100}
                                        height={100}
                                    />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">{currentUser.fullName}</h2>
                                <div className="flex flex-col items-center space-y-2 text-sm text-gray-600">
                                    <div className="flex items-center">
                                        <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                                        <span>{currentUser.address}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Mail className="w-4 h-4 mr-2 text-gray-400" />
                                        <span>{currentUser.email}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <li className="border-b border-gray-700 py-2 cursor-pointer hover:bg-gray-700 hover:text-white transition-colors duration-200" onClick={handleEditClick}>
                            | Editar tu información
                        </li>
                        <li className="border-b border-gray-700 py-2 cursor-pointer hover:bg-gray-700 hover:text-white transition-colors duration-200">
                            | Historial
                        </li>
                        <li className="border-b border-gray-700 py-2 cursor-pointer hover:bg-gray-700 hover:text-white transition-colors duration-200">
                            | Pedidos Activos
                        </li>
                    </ul>
                    <button className="w-full mt-auto text-center py-2 border-t border-gray-700 cursor-pointer hover:bg-gray-700 hover:text-white transition-colors duration-200" onClick={handleLogout}>
                        Cerrar Sesión
                    </button>
                </div>
            )}
            
            <EditProfileModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                currentUser={currentUser}
                onUserUpdate={handleUserUpdate}
            />
        </nav>
    );
}
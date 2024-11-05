"use client";

import { useState, useEffect, SetStateAction } from "react";
import { Mail, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import UserVector from '../components/svg/User.svg';
import LogoVector from '../components/svg/LogoPage.svg';
import Image from 'next/image';
import Cookies from 'js-cookie';
import EditProfileModal from '../components/EditProfileModal';

export default function SellerNavbar() {
    const router = useRouter();
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

    const handleUserUpdate = (updatedUser: SetStateAction<{ id: string,fullName: string; email: string; address: string; }>) => {
        setCurrentUser(updatedUser);
    };

    return (
        <nav className="bg-[#2B2D42] text-white p-5 relative">
            <div className="container mx-auto flex justify-between items-center">
                <Image
                    priority
                    src={LogoVector}
                    alt=""
                    width={40}
                    height={39}
                />
                <div>
                    <button onClick={() => router.push('/seller/products')} className="mr-8">Productos</button>
                    <button onClick={() => router.push('/seller/orders')} className="mr-8">Ventas</button>
                    <button onClick={() => router.push('/seller/categories')}>Categorías y subcategorías</button>
                </div>
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
            {isProfileMenuOpen && (
                <div className="absolute top-20 right-0 bg-[#2B2D42] text-white w-[350px] h-[500px] p-4 rounded-bl-lg shadow-lg z-10 flex flex-col">
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
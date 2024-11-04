"use client";

import UserVector from '../../../components/svg/User.svg';
import Image from 'next/image';
import { useState } from "react"; 
import { useRegister } from "@/hooks/auth/useRegister";

const RegisterSellerUser = () => {

    const { register } = useRegister(); 
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [address, setAddress] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (fullName.length < 3) {
            setErrorMessage("El nombre completo debe tener al menos 3 caracteres");
            return;
        }
    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrorMessage("El correo electrónico no es válido");
            return;
        }
    
        const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
        if (password.length < 6) {
            setErrorMessage("La contraseña debe tener al menos 6 caracteres");
            return;
        }
        if (!passwordRegex.test(password)) {
            setErrorMessage("La contraseña es demasiado débil (debe incluir un número, una letra mayúscula, una letra minúscula y un carácter especial)");
            return;
        }
    
        if (password !== confirmPassword) {
            setErrorMessage("Las contraseñas no coinciden");
            return;
        }
    
        if (address.length < 5) {
            setErrorMessage("La dirección debe tener al menos 5 caracteres");
            return;
        }
    
        try {
            const result = await register(fullName, email, password, address, 'buyer');
            if (result) {
                console.log(result);
                window.location.href = "/buyer/products";
            }
        } catch (error) {
            setErrorMessage("Error al registrar el usuario");
            console.error("Error durante el registro:", error);
        }
    };
    
    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative bg-[#2B2D42]">
            {/* User Icon */}
            <div className="absolute top-[410px] right-0">
                <div className="flex justify-end w-full">
                    <button className="flex items-center justify-center rounded-l-[10%] cursor-pointer transition-all duration-300 w-[120px] h-[120px] bg-[#EDF2F4] border-none shadow-md hover:shadow-lg active:shadow-inner active:bg-[#edf2f4e7] active:transform active:translate-y-[2px]">
                        <Image
                            priority
                            src={UserVector}
                            alt=""
                            width={70}
                            height={70}
                        />
                    </button>
                </div>
            </div>

            {/* Registration Form */}
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-center mb-6">Regístrate</h2>
                
                <form className="space-y-4" onSubmit={handleSubmit}>
                    {errorMessage && <p className="text-red-500">{errorMessage}</p>} {/* Mensaje de error */}

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Nombre Completo
                        </label>
                        <input
                            type="text"
                            placeholder="Nombre completo"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Correo Electrónico
                        </label>
                        <input
                            type="email"
                            placeholder="m@example.com"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••••"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Confirma tu contraseña
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••••"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Tu Dirección
                        </label>
                        <input
                            type="text"
                            placeholder="Dirección"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#2B2D42] text-white py-2 px-4 rounded-md hover:bg-slate-800 transition-colors mt-6"
                    >
                        Registrar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterSellerUser;

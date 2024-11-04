"use client";

import UserVector from '../../components/svg/User.svg';
import StoreVector from '../../components/svg/Store.svg';
import LogoVector from '../../components/svg/Logo1.svg';
import { useLogin } from "@/hooks/auth/useLogin";
import Image from 'next/image';
import { useState } from 'react';

const LoginUser = () => {
    const { login } = useLogin();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null); 

        try {
            const result = await login(email, password);
            if (result) {
                const role = result.roleName
                console.log(role);
                if(role === "seller" ){
                    window.location.href = "/seller/products";
                }
                else if(role === "buyer"){
                    window.location.href = "/buyer/products";
                }else if(role === "admin"){
                    setError("Admin no es permitido en esta sección");
                }
            }
        } catch (error) {
            setError("Correo o contraseña incorrectos");
            console.error("Error en el login:", error);
        }
    };

    return (
        <div className="min-h-screen flex">
            <div className="flex-[1] bg-[#EDF2F4] relative">
                {/* Logo */}
                <div className="absolute top-4 left-1">
                    <div className="ml-[25%]">
                        <Image
                            priority
                            src={LogoVector}
                            alt=""
                            width={110}
                            height={108}
                        />
                    </div>
                </div>

                {/* Navigation Icon - Store */}
                <div className="absolute top-[410px] left-0">
                    <div className="flex justify-start w-full">
                        <button className="flex items-center justify-center rounded-r-[10%] cursor-pointer transition-all duration-300 w-[120px] h-[120px] bg-[#2B2D42] border-none shadow-md hover:shadow-lg active:shadow-inner active:bg-[#2b2d42e6] active:transform active:translate-y-[2px]">
                            <Image
                                priority
                                src={StoreVector}
                                alt=""
                                width={80}
                                height={80}
                            />
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex-[1.5] bg-[#2B2D42] relative flex justify-center items-center">
                {/* Navigation Icon - User */}
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

                {/* Login Form */}
                <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-[#0B0000]">Iniciar Sesión</h2>
                        <p className="text-sm text-gray-500">Ingresa tus credenciales para acceder a tu cuenta</p>
                    </div>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-[#0B0000]">Correo Electrónico</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-2 border rounded text-[#0B0000]"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="password" className="block text-sm font-medium text-[#0B0000]">Contraseña</label>
                            <input
                                id="password"
                                type="password"
                                placeholder="••••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-2 border rounded text-[#0B0000]"
                                required
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <label htmlFor="remember" className="text-sm font-medium text-gray-700"> </label>
                            </div>
                            <a href="/" className="text-sm hover:underline text-[#272B3F] no-underline hover:underline">
                                ¿No tienes cuenta? Ingresa aquí
                            </a>
                        </div>
                        <button type="submit" className="w-full p-2 text-white bg-slate-900 rounded hover:bg-slate-800">
                            Iniciar Sesión
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginUser;

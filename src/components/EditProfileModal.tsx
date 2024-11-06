import React, { useState, useEffect } from 'react';
import { useEditUser } from "@/hooks/user/useEditUser";

interface  UpdateUser {
    id: string;
    fullName: string;
    email: string;
    address: string;
}

interface EditProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentUser: UpdateUser;
    onUserUpdate: (updatedUser: UpdateUser) => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose, currentUser, onUserUpdate }) => {
    const { editUser } = useEditUser();
    const [formData, setFormData] = useState({
        id: '',
        fullName: '',
        email: '',
        address: '',
    });

    // Actualiza formData cuando currentUser cambie
    useEffect(() => {
        if (currentUser) {
        setFormData({
            id: currentUser.id || '',
            fullName: currentUser.fullName || '',
            email: currentUser.email || '',
            address: currentUser.address || '',
        });
        }
    }, [currentUser]);

    const handleInputChange = (e: { target: { name: string; value: string; }; }) => {
        const { name, value } = e.target;
        setFormData(prev => ({
        ...prev,
        [name]: value,
        }));
    };

    const handleSubmit = async () => {
        // Llama a la función de actualización del componente padre
        
        console.log(formData.id);
        console.log(formData.fullName);
        console.log(formData.email);
        console.log(formData.address);

        try {
            const result = await editUser(formData.id, formData.fullName, formData.email, formData.address);
            if (result) {
                console.log("Usuario actualizado:", result);
                onUserUpdate(result);
                onClose();
            }
        } catch (error) {
            console.error("Error en el editar:", error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-[#EDF2F4] rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Editar Información Personal</h2>
            <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
            >
                ×
            </button>
            </div>

            <div className="space-y-4">
            <div className="flex flex-col">
                <label htmlFor="fullName" className="text-sm font-medium text-gray-700 mb-1">
                Nombre
                </label>
                <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#0B0000]"
                />
            </div>

            <div className="flex flex-col">
                <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1">
                Email
                </label>
                <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#0B0000]"
                />
            </div>

            <div className="flex flex-col">
                <label htmlFor="address" className="text-sm font-medium text-gray-700 mb-1">
                Dirección
                </label>
                <input
                id="address"
                name="address"
                type="text"
                value={formData.address}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#0B0000]"
                />
            </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
            <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
                Cancelar
            </button>
            <button
                onClick={handleSubmit}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Guardar Cambios
            </button>
            </div>
        </div>
        </div>
    );
};

export default EditProfileModal;

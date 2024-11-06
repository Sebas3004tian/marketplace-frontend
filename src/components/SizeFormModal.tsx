import React, { useState } from 'react';
import { CreateSizeDto } from "@/dto/size/createSize.dto";

interface SizeFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: CreateSizeDto) => void;
    productId: string;
}

export const SizeFormModal: React.FC<SizeFormModalProps> = ({ isOpen, onClose, onSubmit, productId }) => {
    const [name, setName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ name, productId });
        setName('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Agregar Nueva Talla</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Nombre de la Talla:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 border rounded hover:bg-gray-100"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

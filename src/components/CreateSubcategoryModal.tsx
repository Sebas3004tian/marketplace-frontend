import React, { useState } from 'react';

interface CreateSubcategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: string) => void;
}

const CreateSubcategoryModal: React.FC<CreateSubcategoryModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [name, setName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name) {
            onSubmit(name);
            setName(''); // Clear the input field
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md max-h-full overflow-auto">
                <h2 className="text-xl font-bold mb-4 text-center">Agregar Nueva Subcategoría</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Nombre de la Subcategoría:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <div className="flex justify-between mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 border rounded-md hover:bg-gray-100"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateSubcategoryModal;

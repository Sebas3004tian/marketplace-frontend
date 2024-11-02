import React from "react";

interface ConfirmDeleteModalProps {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ConfirmDeleteModal({ isOpen, onConfirm, onCancel }: ConfirmDeleteModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Confirmación</h2>
                <p>¿Estás seguro de que deseas eliminar este producto?</p>
                <div className="mt-4 flex justify-end space-x-4">
                    <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={onCancel}>Cancelar</button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={onConfirm}>Eliminar</button>
                </div>
            </div>
        </div>
    );
}

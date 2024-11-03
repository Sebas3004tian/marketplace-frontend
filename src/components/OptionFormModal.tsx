import React, { useState, useEffect } from 'react';
import { CreateOptionDto } from "@/dto/option/createOption.dto";
import { UpdateOptionDto } from "@/dto/option/updateOption.dto";
import { Option } from "@/interfaces/option";
import { useUploadImage } from '@/hooks/common/useUploadImage';

interface OptionFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: CreateOptionDto | UpdateOptionDto) => void;
    sizeId: string;
    option?: Option;
    isEditing?: boolean;
}

export const OptionFormModal: React.FC<OptionFormModalProps> = ({
                                                                    isOpen,
                                                                    onClose,
                                                                    onSubmit,
                                                                    sizeId,
                                                                    option,
                                                                    isEditing
                                                                }) => {
    const { uploadImage } = useUploadImage();
    const [description, setDescription] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [availableUnits, setAvailableUnits] = useState(0);
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        if (isEditing && option) {
            setDescription(option.description);
            setImageUrl(option.imageUrl);
            setAvailableUnits(option.availableUnits);
        } else {
            // Limpiar los campos si no estamos en modo de edición
            setDescription('');
            setImageUrl('');
            setAvailableUnits(0);
        }
    }, [option, isEditing]);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImageFile(file);
            setImageUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        let uploadedImageUrl = '';

        if (imageFile) {
            uploadedImageUrl = await uploadImage(imageFile);
        }

        if (isEditing) {
            onSubmit({
                description,
                imageUrl: uploadedImageUrl || imageUrl,
                availableUnits,
            });
        } else {
            onSubmit({
                description,
                imageUrl: uploadedImageUrl || '', // O la URL por defecto, si es necesario
                sizeId,
            });
        }

        // Limpiar los campos después de enviar
        setDescription('');
        setImageFile(null);
        setImageUrl('');
        setAvailableUnits(0);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md max-h-full overflow-auto">
                <h2 className="text-xl font-bold mb-4 text-center">
                    {isEditing ? 'Editar Opción' : 'Agregar Nueva Opción'}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Descripción:</label>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Seleccionar Imagen:</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    {/* Solo mostrar la vista previa si estamos editando */}
                    {isEditing && imageUrl && (
                        <div className="mb-4">
                            <img src={imageUrl} alt="Vista previa" className="w-full h-auto max-w-xs max-h-64 rounded-md border" />
                        </div>
                    )}
                    {isEditing && (
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Unidades disponibles:</label>
                            <input
                                type="number"
                                value={availableUnits}
                                onChange={(e) => setAvailableUnits(Math.max(0, Number(e.target.value)))}
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            />
                        </div>
                    )}
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
                            {isEditing ? 'Actualizar' : 'Guardar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

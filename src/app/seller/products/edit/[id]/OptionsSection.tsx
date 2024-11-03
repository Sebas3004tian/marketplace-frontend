import React from 'react';
import { Option } from '@/interfaces/option';

interface OptionsSectionProps {
    selectedSize: string | null;
    options: Option[];
    onDeleteOption: (id: string) => void;
    onEditOption: (option: Option) => void;
    onAddOption: () => void;
}

const OptionsSection: React.FC<OptionsSectionProps> = ({
                                                           selectedSize,
                                                           options,
                                                           onDeleteOption,
                                                           onEditOption,
                                                           onAddOption
                                                       }) => (
    <div className="bg-gray-100 p-6 rounded-md shadow-lg h-full">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Opciones</h2>
            {selectedSize && (
                <button
                    onClick={onAddOption}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    + Añadir
                </button>
            )}
        </div>
        {selectedSize && options.length > 0 ? (
            <div className="space-y-4">
                {options.map((option) => (
                    <div key={option.id}
                         className="flex items-center justify-between p-3 border rounded bg-white space-x-4">
                        <div className="flex items-center space-x-4">
                            <img src={option.imageUrl} alt={option.description}
                                 className="w-16 h-16 object-cover rounded"/>
                            <div>
                                <span className="block font-semibold">{option.description}</span>
                                <span
                                    className="block text-gray-500">Unidades disponibles: {option.availableUnits}</span>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <button
                                onClick={() => onEditOption(option)}
                                className="text-blue-500 font-semibold"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => onDeleteOption(option.id)}
                                className="text-red-500 font-semibold"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <p className="text-gray-500">
                {selectedSize
                    ? "No hay opciones disponibles para esta talla."
                    : "Selecciona una talla para ver las opciones disponibles."}
            </p>
        )}
    </div>
);

export default OptionsSection;

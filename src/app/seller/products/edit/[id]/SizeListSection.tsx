import React from 'react';
import { Size } from '@/interfaces/size';

interface SizeListSectionProps {
    sizes: Size[];
    handleSizeClick: (sizeId: string) => void;
    selectedSize: string | null;
    onDeleteSize: (id: string) => void;
    onAddSize: () => void;
}

const SizeListSection: React.FC<SizeListSectionProps> = ({
                                                             sizes,
                                                             handleSizeClick,
                                                             selectedSize,
                                                             onDeleteSize,
                                                             onAddSize
                                                         }) => (
    <div className="bg-gray-100 p-6 rounded-md shadow-lg h-full">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Tallas</h2>
            <button
                onClick={onAddSize}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            >
                + Añadir
            </button>
        </div>
        <ul className="space-y-2">
            {sizes.map((size) => (
                <li
                    key={size.id}
                    onClick={() => handleSizeClick(size.id)}
                    className={`p-3 border rounded flex items-center justify-between ${
                        selectedSize === size.id ? 'bg-blue-100 border-blue-500' : 'bg-white border-gray-300'
                    } transition-colors hover:bg-blue-50 cursor-pointer`}
                >
                    <span>{size.name}</span>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onDeleteSize(size.id);
                        }}
                        className="text-red-500 font-semibold"
                    >
                        Eliminar
                    </button>
                </li>
            ))}
        </ul>
    </div>
);

export default SizeListSection;
import Image from 'next/image';
import { Product } from "@/interfaces/product";
import DeleteVector from '../components/svg/DeleteButton.svg';

interface ProductCardProps extends Product {
    onEdit: () => void;
    onDelete: () => void;
}

export default function ProductCard({ name, mainImageUrl, category, subcategory, price, onEdit, onDelete }: ProductCardProps) {
    return (
        <div className="border rounded-lg shadow-lg bg-white relative">
            <button 
                onClick={onDelete}
                className="absolute top-4 right-4 z-[1] hover:scale-110 transition-transform"
            >
                <Image
                    priority
                    src={DeleteVector}
                    alt="Eliminar producto"
                    width={40}
                    height={40}
                />
            </button>

            <div className="p-4 flex items-center">
                <Image 
                    src={mainImageUrl} 
                    alt={name} 
                    width={100} 
                    height={100} 
                    className="mr-4"
                />
                <div className="flex-grow">
                    <h2 className="text-xl font-semibold">{name}</h2>
                    <p>{subcategory} - {category}</p>
                    <p>Precio: ${price.toLocaleString()}</p>
                </div>
                <div className="absolute top-20 right-40">
                    <button 
                        className="bg-[#2B2D42] text-white px-4 py-2 rounded hover:bg-[#3E4163] transition-colors z-[2]" 
                        onClick={onEdit}
                    >
                        Editar Producto
                    </button>
                </div>
            </div>
        </div>
    );
}
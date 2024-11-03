import Image from 'next/image';
import { Product } from "@/interfaces/product";

interface ProductCardProps extends Product {
    onEdit: () => void;
    onDelete: () => void;
}

export default function ProductCard({ name, mainImageUrl, category, subcategory, price, onEdit, onDelete }: ProductCardProps) {
    return (
        <div className="border p-4 rounded-lg shadow-lg bg-white flex items-center">
            <Image src={mainImageUrl} alt={name} width={100} height={100} className="mr-4"/>
            <div className="flex-grow">
                <h2 className="text-xl font-semibold">{name}</h2>
                <p>{subcategory} - {category}</p>
                <p>Precio: ${price.toLocaleString()}</p>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={onEdit}>Editar</button>
            <button className="bg-red-500 text-white px-4 py-2 rounded ml-2" onClick={onDelete}>Eliminar</button>
        </div>
    );
}

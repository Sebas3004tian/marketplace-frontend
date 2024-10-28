import Image from 'next/image';
import { Product } from "@/interfaces/product";

export default function ProductCard(product: Product) {
    return (
        <div className="border p-4 rounded-lg shadow-lg bg-white flex items-center">
            <Image src={product.mainImageUrl} alt={product.name} width={100} height={100} className="mr-4"/>
            <div className="flex-grow">
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p>{product.subcategory} - {product.category}</p>
                <p>Precio: ${product.price.toLocaleString()}</p>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Editar</button>
            <button className="bg-red-500 text-white px-4 py-2 rounded ml-2">Eliminar</button>
        </div>
    );
}

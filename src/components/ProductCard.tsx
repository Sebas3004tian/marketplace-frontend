import Image from 'next/image';

interface ProductProps {
    product: {
        name: string;
        price: number;
        mainImageUrl: string;
    };
}

export default function ProductCard({ product }: ProductProps) {
    return (
        <div className="border p-4 rounded-lg shadow-lg bg-white">
            <Image src={product.mainImageUrl} alt={product.name} width={200} height={200} />
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p>Precio: ${product.price.toLocaleString()}</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Editar producto</button>
        </div>
    );
}

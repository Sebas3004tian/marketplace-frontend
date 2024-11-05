import Image from 'next/image';

interface ProductCardProps {

    mainImageUrl: string
    name: string
    price: number
    onAddCart: () => void
  }

export default function ProductCardBuyer({ mainImageUrl, name, price, onAddCart}: ProductCardProps) {
  return (
    <div className="w-64 p-4 bg-white shadow-md rounded-lg border border-gray-200">
      <img className="w-45 h-45 object-cover rounded-md mb-4" src={mainImageUrl} alt={name} />
      <h2 className="text-lg font-semibold mb-1">{name}</h2>
      <p className="text-gray-700 mb-4">${price.toLocaleString()}</p>
      <button className="w-full bg-indigo-800 text-white py-2 rounded-lg hover:bg-indigo-700">
        Ver mas...
      </button>
    </div>
  );
};
import { useShoppingCart } from "@/hooks/cart/useShoppingCart";
import TrashVector  from "@/components/svg/Trash.svg";
import Image from "next/image"
import { useRouter } from 'next/navigation';

export default function ShoppingCart() {
  const { products, removeProduct, totalAmount, clearShoppingCart } =
    useShoppingCart();

  const router = useRouter()

  if (products.length === 0) return (
    <div className="bg-white p-4 rounded-lg border shadow-lg">
      <h5 className="text-lg font-medium border-b text-black">Tu carrito está vacío.</h5>
    </div>
  );

  return (
    <div className="bg-white p-4 rounded-lg border shadow-lg">
      <div className="grid gap-y-3 py-3">
        {products.map((product) => (
          <div key={product.id} className="flex gap-x-4 items-center">
            <img src={product.mainImageUrl} alt={product.name} className="w-12" />
            <h5 className="w-32 text-ellipsis truncate font-medium text-black">
              {product.name}
            </h5>
            <span className="ml-auto text-black">$ {product.price}</span>
            <div>
              <button
                className="bg-red-600 hover:bg-red-800 text-white hover:text-slate-200 rounded-full p-2"
                onClick={() => removeProduct(product.id)}
              >
               <Image 
                    priority
                    src={TrashVector}
                    alt=""
                    width={30}
                    height={30}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between pt-2 border-t">
        <span className="font-medium text-xl text-black">Total:</span>
        <span className="font-medium text-xl text-black">$ {totalAmount}</span>
      </div>
      <button
        className="w-full bg-gray-900 text-white px-4 py-2 mt-2 rounded-lg hover:bg-gray-800"
        onClick={()=>router.push(`/buyer/products/purchase`)}
      >
        Pagar
      </button>
      <button
        className="w-full bg-red-700 text-white px-4 py-2 mt-2 rounded-lg hover:bg-red-600"
        onClick={clearShoppingCart}
      >
        Vaciar carrito
      </button>
      
    </div>
  );
}
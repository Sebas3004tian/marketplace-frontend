import { useShoppingCart } from '@/hooks/cart/useShoppingCart';
import  Image  from 'next/image'
import React, { useEffect, useState } from 'react';
import { useCreateOrder } from '@/hooks/orders/useCreateOrders';
import { useRouter } from 'next/navigation';

export default function PurchaseProduct(){
    const { products, removeProduct, clearShoppingCart} = useShoppingCart();
    const [initial, setInitial] = useState(false)
    const [update, setUpdate] = useState(false)
    const [loading, setLoading] = useState(false)
    const [currentProduct, setCurrentProduct] = useState("")
    const [subtotal, setSubtotal] = useState(0)
    const { createOrder } = useCreateOrder()
    const router = useRouter()

    useEffect(() => {
        const fetchData = async () => {
            try {
                let value = subtotal
                for(const element of products){
                    value+= (element.price*element.amount)
                }

                setSubtotal(value)
                
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchData();
    }, [setInitial]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                removeProduct(currentProduct)
                let value = subtotal
                for(const element of products){
                    value+= (element.price*element.amount)
                }

                setSubtotal(value)
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchData();
    }, [update]);

    const removeItem = (id:string) =>{
        setCurrentProduct(id)
        setUpdate(true)
    }

    const handleSubmit = () =>{
        for(const element of products){
            let order = {
                optionId:element.optionId,
                amount:element.amount
            }

            createOrder(order)
        }

        clearShoppingCart()
        router.push(`/buyer/products/`)
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
            <h1 className="text-2xl font-bold mb-4">Cart</h1>
    
            {products.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b pb-4 mb-4">
                <div className="flex items-center">
                  <Image 
                    src={item.mainImageUrl} 
                    alt=""
                    width={60}
                    height={80}
                    className="mr-4"
                  />
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-gray-500">{item.color}, {item.size}</p>
                    <p className="text-sm mt-1"> {item.amount}</p>
                  </div>
                  <button 
                  className="text-red-500 mt-2 text-sm hover:underline"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>
                </div>
                <p className="text-lg font-semibold">${item.price.toFixed(2)}</p>
                <a> </a>
              </div>
            ))}
    
            <div className="flex justify-end">
              <div className="w-full max-w-sm bg-gray-50 p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="flex justify-between mb-2">
                  <p>Shipping</p>
                  <p>Free</p>
                </div>
                <div className="flex justify-between mb-4">
                  <p>Sales Tax</p>
                  <p>Calculated at checkout</p>
                </div>
                <div className="flex justify-between font-semibold text-lg border-t pt-4">
                  <p>Subtotal</p>
                  <p>${subtotal.toFixed(2)}</p>
                </div>
                <button className="w-full mt-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={()=> handleSubmit()}>
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
    );
}

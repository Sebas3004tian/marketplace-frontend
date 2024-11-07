"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react';
import { useGetBuyerOrders } from '@/hooks/orders/useGetBuyerOrders';
import { useRouter } from 'next/navigation';
import { Order } from '@/interfaces/order';
import { ClipLoader } from 'react-spinners';
import BackVector from '@/components/svg/Arrow.svg'
import ReviewModal from '@/components/ReviewModal'

export default function PurchaseProduct(){
    const [loading, setLoading] = useState(false)
    const [orders, setOrders] = useState<Order[]>([])
    const [isOpen, setIsOpen]= useState(false)
    const [currentProduct, setCurrentProduct] = useState("")
    const { getBuyerOrders } = useGetBuyerOrders()
    const router = useRouter()
  
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await getBuyerOrders();
                setOrders(response);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchData();
    }, []);

    const handleSubmit= (id:string) =>{
        setCurrentProduct(id)
        setIsOpen(true)
    }


    return (
        <div className='relative'>
            <button className='absolute top-0 left-0 p-3 bg-gray-200 rounded-full shadow hover:bg-gray-300 transition' onClick={() => router.push(`/buyer/products/`)}>
                <Image
                    priority
                    src={BackVector}
                    alt="Back"
                    width={30}
                    height={30}
                />
            </button>

            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
                    <h1 className="text-2xl font-bold mb-4">Historial de Ordenes</h1>
                    {loading && (
                        <div className="absolute inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-10">
                            <ClipLoader color="#000000" size={150} />
                        </div>
                    )}

                    {orders.map((item) => (
                        <div key={item.id} className="flex justify-between items-center border-b pb-4 mb-4">
                            <div className="flex items-center">
                                <Image
                                    src={item.optionImageUrl}
                                    alt=""
                                    width={60}
                                    height={80}
                                    className="mr-4"
                                />
                                <div>
                                    <p className="font-semibold">{item.productName}</p>
                                    <p className="text-sm mt-1">Color: {item.optionDescription}</p>
                                    <p className="text-sm mt-1">Talla: {item.sizeName}</p>
                                    <p className="text-sm mt-1">Cantidad: {item.amount}</p>
                                    <p className="text-sm mt-1">Fecha de compra: {new Date(item.createdDate).toLocaleDateString()}</p>
                                    <button
                                        className="w-full mt-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={() => handleSubmit(item.productId)}>
                                        Dar un comentario
                                    </button>
                                </div>
                            </div>
                            <p className="text-lg font-semibold">${item.productPrice}</p>
                        </div>
                    ))}
                </div>
            </div>

            <ReviewModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                currentProduct={currentProduct}
            />
        </div>
    );

}

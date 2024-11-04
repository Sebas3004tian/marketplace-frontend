"use client";

import React, { useEffect, useState } from 'react';
import { Order } from "@/interfaces/order";
import { useGetSellerOrders } from "@/hooks/orders/useGetSellerOrders";
import Image from 'next/image';
import {ClipLoader} from "react-spinners";

export default function SellerOrdersPage() {
    const { getSellerOrders } = useGetSellerOrders();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            const sellerOrders = await getSellerOrders();
            setOrders(sellerOrders);
            setLoading(false);
        };
        fetchOrders();
    }, []);

    if (orders.length === 0) {
        return <p className="text-center text-gray-500">No hay órdenes disponibles.</p>;
    }

    return (
        <div className="p-6 max-w-4xl mx-auto space-y-6">
            {loading && (
                <div className="absolute inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-10">
                    <ClipLoader color="#000000" size={150} /> {}
                </div>
            )}
            <h1 className="text-2xl font-bold text-center mb-6">Órdenes del Vendedor</h1>
            {orders.map((order) => (
                <div key={order.id} className="bg-white p-4 rounded-md shadow-md flex items-center space-x-4">
                    <Image
                        src={order.optionImageUrl}
                        alt="Imagen de la opción"
                        width={80}
                        height={80}
                        className="rounded"
                    />
                    <div className="flex-grow">
                        <h2 className="text-lg font-semibold">{order.productName}</h2>
                        <p className="text-gray-600">{order.optionDescription} - {order.sizeName}</p>
                        <p className="text-gray-500">
                            Precio del producto: ${Number(order.productPrice).toFixed(2)}
                        </p>
                        <p className="text-gray-500">
                            Total: ${Number(order.totalPrice).toFixed(2)} (Cantidad: {order.amount})
                        </p>
                        <p className="text-gray-500">Fecha de creación: {new Date(order.createdDate).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                        <p className="font-semibold">Comprador:</p>
                        <p className="text-gray-700">{order.buyerName}</p>
                        <p className="text-gray-500">{order.buyerEmail}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

import { ReactNode } from 'react';
import BuyerNavbar from '../../components/BuyerNavBar';
import { ShoppingCartProvider } from '@/context/cartContent';

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="bg-gray-100 text-gray-900">
            <ShoppingCartProvider>
                <BuyerNavbar />
                <main className="p-4">{children}</main>
            </ShoppingCartProvider>
        </div>
    );
}

import { ReactNode } from 'react';
import SellerNavbar from '../../../components/SellerNavbar';

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <html lang="es">
        <body className="bg-gray-100 text-gray-900">
        <SellerNavbar />
        <main className="p-4">{children}</main>
        </body>
        </html>
    );
}

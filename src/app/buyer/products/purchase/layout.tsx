import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="bg-gray-100 text-gray-900">
            <main className="p-4">{children}</main>
        </div>
    );
}
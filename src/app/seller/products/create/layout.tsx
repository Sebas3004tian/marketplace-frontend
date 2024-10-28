import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div>
            <main className="p-4">{children}</main>
        </div>
    );
}

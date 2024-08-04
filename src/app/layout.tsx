// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";  // Adjusted import path

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Pantry Management",
    description: "Manage your pantry items",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    );
}

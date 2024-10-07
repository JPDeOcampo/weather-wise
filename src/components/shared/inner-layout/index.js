"use client"
import { useContext } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ShareContext } from "@/components/shared/context/share-state";

const InnerLayout = ({ children }) => {
    const { darkMode } = useContext(ShareContext);
    return (
        <NextUIProvider className={`${darkMode ? 'dark' : 'light'} relative`}>
            <main className="bg-primary h-auto min-h-screen">
                {children}
            </main>
        </NextUIProvider>
    );
}
export default InnerLayout;
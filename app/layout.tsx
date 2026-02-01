import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "F1 stats",
    description: "A website full of F1 statistics",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=arrow_forward,open_in_new,pin_drop" />

                <Script
                    async={true}
                    defer={true}
                    src="https://analytics.loudsheep.dev/script.js"
                    data-website-id="f119f855-6dd1-4bf9-8307-a397d9c2691e"
                    data-domains="loudsheep.dev"
                  />
            </head>

            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-[100vh] flex flex-col`}
            >
                <Navbar />

                <div className="flex-1">{children}</div>

                <Footer />
            </body>
        </html>
    );
}

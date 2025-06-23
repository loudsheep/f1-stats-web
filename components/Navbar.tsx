import React from "react";
import Link from "next/link";
import { Audiowide } from "next/font/google";

const audioWide = Audiowide({
    subsets: ["latin"],
    weight: ["400"],
});

const navLinks = [
    { label: "Home", href: "/" },
    { label: "Schedule", href: "/schedule" },
    { label: "Standings", href: "/standings" },
    { label: "Telemetry", href: "/telemetry" },
];

export default function Navbar() {
    return (
        <nav className="bg-[#281010] sticky top-0 z-20 w-full border-b border-red-700 mb-5">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2 md:p-0">
                <Link
                    href="/"
                    className="flex items-center space-x-3 pl-2 rtl:space-x-reverse"
                >
                    <span
                        className={
                            "text-2xl font-semibold text-white whitespace-nowrap " +
                            audioWide.className
                        }
                    >
                        F1 Stats
                    </span>
                </Link>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse pr-2">
                    <a href="/about">
                        <button
                            type="button"
                            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center cursor-pointer"
                        >
                            About
                        </button>
                    </a>
                </div>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
                    <ul className="flex flex-col p-4 mt-4 font-medium border rounded-lg bg-[#281010] md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
                        {navLinks.map(({ label, href }) => (
                            <li key={href}>
                                <Link
                                    href={href}
                                    className={
                                        "block py-2 px-3 rounded-sm md:p-0 text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent md:hover:text-red-500"
                                    }
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

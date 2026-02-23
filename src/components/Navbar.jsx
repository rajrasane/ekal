"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { isAuthenticated } from "../lib/auth";

const NAV_LINKS = [
    { href: "/", label: "Shop" },
    { href: "/orders", label: "Orders" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const pathname = usePathname();
    const { totalItems } = useCart();

    // Sync auth state on mount and whenever localStorage changes (e.g. login/logout in another tab)
    useEffect(() => {
        setIsLoggedIn(isAuthenticated());
        const syncAuth = () => setIsLoggedIn(isAuthenticated());
        window.addEventListener("storage", syncAuth);
        return () => window.removeEventListener("storage", syncAuth);
    }, []);

    const handleScroll = useCallback(() => {
        setIsScrolled(window.scrollY > 20);
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    useEffect(() => {
        closeMobileMenu();
    }, [pathname]);

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? "bg-white/90 backdrop-blur-md shadow-sm py-4"
                    : "bg-transparent py-6"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
                    <div className="flex items-center gap-8 border-b-0">
                        {/* Logo */}
                        <Link
                            href="/"
                            className="font-outfit text-2xl font-semibold tracking-tighter text-[#111]"
                        >
                            Ekal.
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden md:flex items-center gap-6">
                            {NAV_LINKS.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`text-sm font-medium transition-colors ${pathname === link.href
                                        ? "text-black"
                                        : "text-zinc-500 hover:text-black"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div className="flex items-center gap-5">
                        {/* Login button - shown only when not logged in */}
                        {!isLoggedIn && (
                            <Link
                                href="/login"
                                className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-zinc-600 hover:text-black transition-colors border border-zinc-200 hover:border-zinc-400 rounded-full px-4 py-1.5"
                            >
                                Login
                            </Link>
                        )}

                        {/* Search - placeholder for now */}
                        <button
                            aria-label="Search items"
                            className="text-zinc-600 hover:text-black transition-colors hidden sm:block p-1"
                        >
                            <Search size={20} strokeWidth={1.75} />
                        </button>

                        {/* Cart Icon */}
                        <Link
                            href="/cart"
                            className="relative text-zinc-600 hover:text-black transition-colors p-1"
                            aria-label="Toggle cart"
                        >
                            <ShoppingBag size={20} strokeWidth={1.75} />
                            <AnimatePresence>
                                {totalItems > 0 && (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                        className="absolute -top-1 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white leading-none"
                                    >
                                        {totalItems > 9 ? "9+" : totalItems}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </Link>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={toggleMobileMenu}
                            className="text-zinc-600 hover:text-black transition-colors md:hidden p-1"
                            aria-label="Toggle mobile menu"
                        >
                            {isMobileMenuOpen ? (
                                <X size={24} strokeWidth={1.75} />
                            ) : (
                                <Menu size={24} strokeWidth={1.75} />
                            )}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                        className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
                    >
                        <nav className="flex flex-col gap-6 text-2xl font-outfit font-medium">
                            {NAV_LINKS.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`border-b border-zinc-100 pb-4 ${pathname === link.href ? "text-black" : "text-zinc-500"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            {/* Login link in mobile menu */}
                            {!isLoggedIn && (
                                <Link
                                    href="/login"
                                    className="border-b border-zinc-100 pb-4 text-zinc-500 hover:text-black transition-colors"
                                >
                                    Login
                                </Link>
                            )}
                            <div className="mt-8 relative">
                                <Search
                                    size={20}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                                />
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    className="w-full bg-zinc-50 text-base py-4 pl-12 pr-4 rounded-xl outline-none focus:ring-2 focus:ring-black/5"
                                />
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* spacer to prevent content from hiding under fixed navbar */}
            <div className="h-24"></div>
        </>
    );
}

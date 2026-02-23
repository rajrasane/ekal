import Link from "next/link";

const FOOTER_LINKS = [
    {
        title: "Shop",
        links: [
            { label: "All Products", href: "/" },
            { label: "Furniture", href: "/?category=furniture" },
            { label: "Lighting", href: "/?category=lighting" },
            { label: "Home Decor", href: "/?category=home" },
        ],
    },
    {
        title: "Support",
        links: [
            { label: "FAQ", href: "#" },
            { label: "Shipping & Returns", href: "#" },
            { label: "Contact Us", href: "#" },
        ],
    },
    {
        title: "Company",
        links: [
            { label: "About", href: "#" },
            { label: "Sustainability", href: "#" },
            { label: "Careers", href: "#" },
        ],
    },
];

export default function Footer() {
    return (
        <footer className="bg-white border-t border-black/5 mt-auto">
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8">

                    <div className="lg:col-span-2">
                        <Link href="/" className="font-outfit text-2xl font-semibold tracking-tighter text-[#111]">
                            Ekal.
                        </Link>
                        <p className="mt-6 text-zinc-500 max-w-sm leading-relaxed text-sm">
                            Refined essentials for modern living. We believe in intentional design,
                            quality materials, and creating spaces that inspire.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-8 lg:col-span-3 lg:grid-cols-3">
                        {FOOTER_LINKS.map((group) => (
                            <div key={group.title}>
                                <h3 className="font-semibold text-sm tracking-wide text-black mb-6">
                                    {group.title}
                                </h3>
                                <ul className="flex flex-col gap-4">
                                    {group.links.map((link) => (
                                        <li key={link.label}>
                                            <Link
                                                href={link.href}
                                                className="text-sm text-zinc-500 hover:text-black transition-colors"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                </div>

                <div className="mt-20 pt-8 border-t border-black/5 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-zinc-400">
                        &copy; {new Date().getFullYear()} Ekal Inc. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link href="#" className="text-sm text-zinc-400 hover:text-black transition-colors">Privacy Policy</Link>
                        <Link href="#" className="text-sm text-zinc-400 hover:text-black transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

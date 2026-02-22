import Link from "next/link";
import { VertexMark } from "@/components/system/VertexLogo";

const footerLinks = {
    Product: [
        { label: "Social Media", href: "/social" },
        { label: "Cloud Storage", href: "/storage" },
        { label: "Design Services", href: "/design" },
        { label: "Web Development", href: "/webdev" },
    ],
    About: [
        { label: "Company", href: "/company" },
        { label: "Visi & Misi", href: "/visi-misi" },
        { label: "Developers", href: "/developers" },
    ],
    Resources: [
        { label: "All Products", href: "/product" },
        { label: "Our Vision", href: "/vision" },
        { label: "Ecosystem", href: "/ecosystem" },
        { label: "Contact", href: "/contact" },
    ],
};

export function Footer() {
    return (
        <footer className="border-t border-white/[0.06] bg-neutral-950">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <Link href="/" className="flex items-center gap-2.5 mb-4 group">
                            <VertexMark size={20} color="white" className="group-hover:opacity-80 transition-opacity" />
                            <span className="text-white font-semibold text-sm tracking-tight">
                                Xynoos<span className="text-neutral-500 ml-0.5">Vertex</span>
                            </span>
                        </Link>
                        <p className="text-neutral-500 text-[13px] leading-relaxed max-w-[240px]">
                            Digital platform and professional engineering services — social media,
                            cloud storage, design, and web development.
                        </p>
                    </div>

                    {/* Link columns */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h4 className="text-[11px] font-semibold text-neutral-400 uppercase tracking-[0.15em] mb-4">
                                {category}
                            </h4>
                            <ul className="space-y-2.5">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-[13px] text-neutral-500 hover:text-neutral-200 transition-colors duration-300"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div className="mt-16 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-[12px] text-neutral-600">
                        © {new Date().getFullYear()} Xynoos Vertex. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link
                            href="/privacy"
                            className="text-[12px] text-neutral-600 hover:text-neutral-400 transition-colors"
                        >
                            Privacy
                        </Link>
                        <Link
                            href="/terms"
                            className="text-[12px] text-neutral-600 hover:text-neutral-400 transition-colors"
                        >
                            Terms
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import Magnetic from "../fx/Magnetic";

const links = [
    { href: "#features", label: "Features" },
    { href: "#how-it-works", label: "How it works" },
    { href: "#pricing", label: "Pricing" },
];

export default function Navbar() {
    const { user } = useAuth();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <nav className="sticky top-0 z-50 px-3 sm:px-6 pt-3">
            <div className={`max-w-6xl mx-auto h-14 px-4 sm:px-5 flex items-center justify-between rounded-full border transition-all duration-500 ${scrolled ? "bg-ink-900/70 backdrop-blur-xl border-white/10 shadow-[0_18px_50px_-20px_rgba(0,0,0,0.9)]" : "bg-transparent border-transparent"}`}>
                <Link to="/" onClick={() => scrollTo(0, 0)} className="flex items-center gap-2 group">
                    <img src="/logo.svg" alt="logo" className="size-7 transition-transform duration-500 group-hover:rotate-[24deg] group-hover:scale-110" />
                    <span className="text-xl lg:text-2xl font-medium font-serif text-white tracking-tight">Postora AI</span>
                </Link>

                <div className="hidden md:flex items-center gap-8 text-sm text-muted">
                    {links.map((l) => (
                        <a key={l.href} href={l.href} className="relative py-1 transition-colors hover:text-white after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-brand-400 after:transition-transform after:duration-300 hover:after:scale-x-100">
                            {l.label}
                        </a>
                    ))}
                </div>

                {user ? (
                    <Magnetic>
                        <Link to="/dashboard" className="btn btn-primary text-sm px-5 py-2">
                            Go to Dashboard <ArrowRightIcon className="size-3.5" />
                        </Link>
                    </Magnetic>
                ) : (
                    <div className="flex items-center gap-3">
                        <Link to="/login" className="text-sm text-muted hover:text-white transition-colors hidden sm:block">
                            Sign In
                        </Link>
                        <Magnetic>
                            <Link to="/login" className="btn btn-primary text-sm px-5 py-2">
                                Get Started <ArrowRightIcon className="size-3.5" />
                            </Link>
                        </Magnetic>
                    </div>
                )}
            </div>
        </nav>
    );
}

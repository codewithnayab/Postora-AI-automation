import { Link } from "react-router-dom";

const footerLinks = {
    Product: ["Features", "How it works", "Pricing", "Changelog"],
    Company: ["About", "Blog", "Careers", "Press"],
    Legal: ["Privacy", "Terms", "Security", "Cookies"],
};

export default function Footer() {
    return (
        <footer className="relative overflow-hidden border-t border-white/8 bg-ink-950">
            <div className="relative max-w-6xl mx-auto px-5 sm:px-8 pt-16 pb-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <Link to="/" onClick={() => scrollTo(0, 0)} className="inline-flex items-center gap-2 mb-5">
                            <img src="/logo.svg" alt="logo" className="size-6" />
                            <span className="font-medium font-serif text-xl text-white tracking-tight">Postora AI</span>
                        </Link>
                        <p className="text-sm text-muted leading-relaxed max-w-xs">The AI-powered social media Postora AI that helps creators and teams grow faster with less effort.</p>
                    </div>

                    {/* Links */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <div className="text-sm font-medium mb-5 text-white">{category}</div>
                            <ul className="space-y-2.5">
                                {links.map((link) => (
                                    <li key={link}>
                                        <a href="#" className="inline-block text-sm text-muted transition-all duration-300 hover:text-white hover:translate-x-1">
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/8">
                    <p className="text-xs text-muted  hover:text-white">© {new Date().getFullYear()} Postora AI. All rights reserved.</p>
                    <p className="text-xs text-muted  hover:text-red-100 transition-colors">Made with ❤️ by codewithnayab.</p>
                    <div className="flex items-center gap-6">
                        <a href="#" className="text-xs text-muted hover:text-white transition-colors">
                            Privacy Policy
                        </a>
                        <a href="#" className="text-xs text-muted hover:text-white transition-colors">
                            Terms of Service
                        </a>
                        <Link to="/login" className="text-xs text-muted hover:text-white transition-colors">
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>

            {/* oversized wordmark */}
            <div aria-hidden className="pointer-events-none select-none text-center font-serif font-semibold tracking-[-0.05em] leading-[0.8] text-[22vw] sm:text-[17vw] -mb-[4vw] bg-linear-to-b from-white/15 to-transparent bg-clip-text text-transparent">
                Postora AI
            </div>
        </footer>
    );
}

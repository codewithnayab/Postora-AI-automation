import { Link } from "react-router-dom";
import { ArrowRightIcon } from "lucide-react";
import Reveal from "../fx/Reveal";
import Magnetic from "../fx/Magnetic";

export default function CTA() {
    return (
        <section className="py-20">
            <Reveal className="max-w-6xl mx-auto px-5 sm:px-8">
                <div data-reveal className="relative rounded-[2rem] overflow-hidden p-12 sm:p-20 text-center border border-white/10 bg-linear-to-br from-ink-800 via-ink-900 to-ink-950">
                    {/* Light */}
                    <div className="ambient-orb drift -top-32 -right-24 w-[420px] h-[420px] bg-brand-500/35" />
                    <div className="ambient-orb drift -bottom-32 -left-24 w-[360px] h-[360px] bg-violet-glow/25" style={{ animationDelay: "-8s" }} />
                    <div className="absolute inset-0 opacity-50 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[48px_48px] [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_70%)]" />

                    <div className="relative">
                        <div className="pill mb-6">Ready to grow?</div>
                        <h2 className="font-serif font-semibold tracking-[-0.035em] text-4xl sm:text-5xl md:text-6xl leading-[1.05] text-white">
                            Automate your social
                            <br />
                            <span className="gradient-text">media today</span>
                        </h2>
                        <p className="mt-6 text-muted max-w-lg mx-auto text-lg">Join thousands of creators and marketers who trust Postora AI to grow their audience on autopilot.</p>

                        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
                            <Magnetic className="w-full sm:w-auto">
                                <Link to="/login" className="btn btn-primary text-[15px] px-10 py-4 w-full sm:w-auto">
                                    Get Started Free <ArrowRightIcon className="size-4" />
                                </Link>
                            </Magnetic>
                            <Magnetic className="w-full sm:w-auto">
                                <a href="#pricing" className="btn btn-ghost text-[15px] px-10 py-4 w-full sm:w-auto">
                                    View Pricing
                                </a>
                            </Magnetic>
                        </div>

                        <p className="mt-6 text-xs text-muted/80">No credit card required · Cancel anytime</p>
                    </div>
                </div>
            </Reveal>
        </section>
    );
}

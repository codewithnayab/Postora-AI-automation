import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon, CheckCircle2Icon, DotIcon, SparklesIcon, CalendarClockIcon } from "lucide-react";
import { gsap, canHover, prefersReducedMotion } from "../../lib/gsap";
import Magnetic from "../fx/Magnetic";

export default function Hero() {
    const root = useRef<HTMLElement>(null);
    const stage = useRef<HTMLDivElement>(null);
    const tilt = useRef<HTMLDivElement>(null);

    // One orchestrated load sequence + scroll-flattening 3D mockup + mouse parallax
    useLayoutEffect(() => {
        const el = root.current;
        if (!el || prefersReducedMotion()) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
            tl.from("[data-hero='badge']", { opacity: 0, y: 16, duration: 0.8 })
                .from("[data-line]", { yPercent: 115, duration: 1.15, stagger: 0.12 }, "-=0.5")
                .from("[data-hero='sub']", { opacity: 0, y: 18, duration: 0.9 }, "-=0.7")
                .from("[data-hero='cta'] > *", { opacity: 0, y: 18, duration: 0.8, stagger: 0.1 }, "-=0.65")
                .from("[data-hero='mock']", { opacity: 0, y: 90, rotateX: 38, duration: 1.5, ease: "expo.out" }, "-=0.9")
                .from("[data-depth]", { opacity: 0, scale: 0.6, duration: 0.9, stagger: 0.12, ease: "back.out(1.8)" }, "-=0.7");

            // The mockup starts laid back and flattens as you scroll
            gsap.fromTo(
                "[data-hero='mock-scroll']",
                { rotateX: 22 },
                {
                    rotateX: 0,
                    ease: "none",
                    scrollTrigger: { trigger: stage.current, start: "top 85%", end: "top 25%", scrub: 0.6 },
                }
            );
        }, el);

        return () => ctx.revert();
    }, []);

    const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!stage.current || !tilt.current || !canHover() || prefersReducedMotion()) return;
        const r = stage.current.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) / r.width; // -0.5 … 0.5
        const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
        gsap.to(tilt.current, { rotateY: dx * 10, rotateX: -dy * 8, duration: 0.8, ease: "power3.out", overwrite: "auto" });
        gsap.to("[data-depth]", {
            x: (i, t) => -dx * Number(t.dataset.depth) * 2,
            y: (i, t) => -dy * Number(t.dataset.depth) * 2,
            duration: 1,
            ease: "power3.out",
            overwrite: "auto",
        });
    };

    const onLeave = () => {
        if (!tilt.current) return;
        gsap.to(tilt.current, { rotateY: 0, rotateX: 0, duration: 1.2, ease: "elastic.out(1, 0.6)", overwrite: "auto" });
        gsap.to("[data-depth]", { x: 0, y: 0, duration: 1.2, ease: "elastic.out(1, 0.6)", overwrite: "auto" });
    };

    return (
        <section ref={root} className="relative overflow-hidden">
            {/* Ambient light */}
            <div className="ambient-orb drift -top-40 left-1/2 -translate-x-1/2 w-[760px] h-[460px] bg-brand-500/25" />
            <div className="ambient-orb drift top-40 -left-40 w-[420px] h-[420px] bg-violet-glow/20" style={{ animationDelay: "-6s" }} />
            <div className="ambient-orb drift top-60 -right-40 w-[380px] h-[380px] bg-amber-glow/10" style={{ animationDelay: "-11s" }} />
            <div className="absolute inset-0 pointer-events-none opacity-60 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-size-[64px_64px] [mask-image:radial-gradient(ellipse_70%_55%_at_50%_30%,#000_30%,transparent_75%)]" />

            <div className="relative max-w-6xl mx-auto px-5 sm:px-8 pt-20 sm:pt-24 pb-14 text-center">
                {/* Badge */}
                <div data-hero="badge" className="pill mb-8">
                    <span className="size-1.5 bg-brand-400 rounded-full pulse-dot" />
                    AI-Powered Social Media Automation
                </div>

                {/* Headline */}
                <h1 className="font-serif font-semibold tracking-[-0.035em] leading-[1.02] text-5xl sm:text-6xl md:text-7xl xl:text-[5.5rem] text-white">
                    <span className="block overflow-hidden pb-[0.14em] -mb-[0.14em]">
                        <span data-line className="block">Your social media.</span>
                    </span>
                    <span className="block overflow-hidden pb-[0.14em] -mb-[0.14em]">
                        <span data-line className="block gradient-text">On autopilot.</span>
                    </span>
                </h1>

                {/* Subheadline */}
                <p data-hero="sub" className="mt-7 text-muted max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                 Create scroll-stopping content, plan your posts, and publish across all your social channels from one intelligent workspace.
                </p>

                {/* CTAs */}
                <div data-hero="cta" className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Magnetic className="w-full sm:w-auto">
                        <Link to="/login" className="btn btn-primary text-[15px] px-8 py-3.5 w-full sm:w-auto">
                            Start for free <ArrowRightIcon className="size-4" />
                        </Link>
                    </Magnetic>
                    <Magnetic className="w-full sm:w-auto">
                        <a href="#how-it-works" className="btn btn-ghost text-[15px] px-8 py-3.5 w-full sm:w-auto">
                            See how it works
                        </a>
                    </Magnetic>
                </div>

                <p data-hero="sub" className="mt-5 text-xs text-muted/80">No credit card required · Free forever plan available</p>
            </div>

            {/* 3D dashboard mockup */}
            <div ref={stage} onPointerMove={onMove} onPointerLeave={onLeave} className="relative max-w-5xl mx-auto px-5 sm:px-8 pb-0 [perspective:1600px]">
                <div data-hero="mock-scroll" className="[transform-style:preserve-3d] [transform-origin:50%_100%]">
                    <div data-hero="mock" className="[transform-style:preserve-3d]">
                        <div ref={tilt} className="relative [transform-style:preserve-3d] will-change-transform">
                            {/* glow under the glass */}
                            <div className="absolute -inset-x-10 top-10 bottom-0 bg-brand-500/20 blur-[80px] rounded-full" />

                            <div className="relative rounded-t-2xl overflow-hidden border border-white/12 border-b-0 bg-ink-900/80 backdrop-blur-xl shadow-[0_-30px_120px_-30px_rgba(255,77,109,0.45)]">
                                {/* Browser chrome */}
                                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/8 bg-white/3">
                                    <div className="w-3 h-3 rounded-full bg-brand-500" />
                                    <div className="w-3 h-3 rounded-full bg-amber-glow" />
                                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                                    <div className="flex-1 mx-4 rounded-md h-5 max-w-xs bg-white/6" />
                                </div>

                                {/* Mock content */}
                                <div className="p-5 sm:p-6">
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                                        {[
                                            { val: "12", label: "Scheduled" },
                                            { val: "48", label: "Published" },
                                            { val: "4", label: "Accounts" },
                                            { val: "3", label: "AI Rules" },
                                        ].map((s) => (
                                            <div key={s.label} className="rounded-xl p-4 bg-white/4 border border-white/8 text-left">
                                                <div className="text-2xl font-semibold text-white tabular-nums">{s.val}</div>
                                                <div className="text-xs text-muted mt-1">{s.label}</div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                                        <div className="md:col-span-3 rounded-xl p-4 space-y-3 bg-white/4 border border-white/8 text-left">
                                            <div className="text-xs font-medium text-muted mb-3">Recent activity</div>
                                            {[
                                                { text: "Post published to LinkedIn & Twitter", time: "2m ago" },
                                                { text: "AI replied to 3 comments", time: "15m ago" },
                                                { text: "New post scheduled for tomorrow 9am", time: "1h ago" },
                                            ].map((item) => (
                                                <div key={item.text} className="flex items-center gap-2">
                                                    <DotIcon className="size-5 text-brand-400 shrink-0" />
                                                    <span className="text-sm text-soft flex-1">{item.text}</span>
                                                    <span className="text-xs text-muted/70 shrink-0">{item.time}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="hidden md:flex md:col-span-2 rounded-xl p-4 bg-white/4 border border-white/8 items-end gap-2 h-full min-h-32">
                                            {[38, 62, 45, 80, 58, 92, 70].map((h, i) => (
                                                <div key={i} className="flex-1 rounded-md bg-linear-to-t from-brand-600/70 to-brand-300/90" style={{ height: `${h}%` }} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating depth chips */}
                            <div data-depth="22" className="hidden sm:block absolute -left-4 lg:-left-14 top-[26%] [transform:translateZ(80px)]">
                                <div className="float-y flex items-center gap-2.5 rounded-2xl bg-ink-800/90 backdrop-blur-xl border border-white/12 px-4 py-3 shadow-[0_24px_50px_-20px_rgba(0,0,0,0.9)]">
                                    <CheckCircle2Icon className="size-5 text-emerald-400" />
                                    <div className="text-left">
                                        <div className="text-sm text-white leading-tight">Published</div>
                                        <div className="text-[11px] text-muted">LinkedIn · just now</div>
                                    </div>
                                </div>
                            </div>
                            <div data-depth="34" className="hidden sm:block absolute -right-4 lg:-right-12 top-[12%] [transform:translateZ(120px)]">
                                <div className="float-y flex items-center gap-2.5 rounded-2xl bg-ink-800/90 backdrop-blur-xl border border-white/12 px-4 py-3 shadow-[0_24px_50px_-20px_rgba(0,0,0,0.9)]" style={{ animationDelay: "-2s" }}>
                                    <span className="icon-tile size-8 rounded-lg">
                                        <SparklesIcon className="size-4" />
                                    </span>
                                    <div className="text-left">
                                        <div className="text-sm text-white leading-tight">AI caption ready</div>
                                        <div className="text-[11px] text-muted">3 tones generated</div>
                                    </div>
                                </div>
                            </div>
                            <div data-depth="16" className="hidden md:block absolute -right-2 lg:-right-8 bottom-[22%] [transform:translateZ(60px)]">
                                <div className="float-y flex items-center gap-2.5 rounded-2xl bg-ink-800/90 backdrop-blur-xl border border-white/12 px-4 py-3 shadow-[0_24px_50px_-20px_rgba(0,0,0,0.9)]" style={{ animationDelay: "-4s" }}>
                                    <CalendarClockIcon className="size-5 text-amber-glow" />
                                    <div className="text-left">
                                        <div className="text-sm text-white leading-tight">Queued</div>
                                        <div className="text-[11px] text-muted">Tomorrow, 9:00 AM</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

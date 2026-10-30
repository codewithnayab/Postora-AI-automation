import { useLayoutEffect, useRef } from "react";
import { CheckCircleIcon } from "lucide-react";
import { gsap, prefersReducedMotion } from "../../lib/gsap";
import Reveal from "../fx/Reveal";

const steps = [
    { step: "01", title: "Connect Your Accounts", description: "Link your social profiles in seconds. We support Twitter, LinkedIn, Facebook, and Instagram." },
    { step: "02", title: "Create or Generate Content", description: "Write your own post or let our AI craft a caption and image based on your prompt." },
    { step: "03", title: "Schedule & Publish", description: "Pick a time, select your platforms, and hit schedule. We handle publishing automatically." },
];

export default function HowItWorks() {
    const list = useRef<HTMLDivElement>(null);

    // The rail draws itself as you scroll and lights each step when it's reached
    useLayoutEffect(() => {
        const el = list.current;
        if (!el || prefersReducedMotion()) return;
        const ctx = gsap.context(() => {
            gsap.fromTo("[data-rail]", { scaleY: 0 }, { scaleY: 1, ease: "none", transformOrigin: "top", scrollTrigger: { trigger: el, start: "top 65%", end: "bottom 70%", scrub: 0.5 } });
            gsap.utils.toArray<HTMLElement>("[data-step]").forEach((s) => {
                gsap.fromTo(
                    s,
                    { opacity: 0.35 },
                    { opacity: 1, duration: 0.5, scrollTrigger: { trigger: s, start: "top 68%", toggleActions: "play none none reverse" } }
                );
                gsap.fromTo(
                    s.querySelector("[data-node]"),
                    { scale: 0.85 },
                    { scale: 1, duration: 0.6, ease: "back.out(2)", scrollTrigger: { trigger: s, start: "top 68%", toggleActions: "play none none reverse" } }
                );
            });
        }, el);
        return () => ctx.revert();
    }, []);

    return (
        <section id="how-it-works" className="relative py-28">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                <Reveal className="text-center mb-20">
                    <div data-reveal className="pill mb-6">
                        <CheckCircleIcon className="size-3.5" />
                        Simple setup
                    </div>
                    <h2 data-reveal className="font-serif font-semibold tracking-[-0.03em] text-4xl sm:text-5xl leading-[1.08] text-white">
                        Up and running in <span className="gradient-text">minutes</span>
                    </h2>
                    <p data-reveal className="mt-5 text-muted max-w-lg mx-auto leading-relaxed">
                        No complicated onboarding, no steep learning curve. Just connect, create, and grow.
                    </p>
                </Reveal>

                <div ref={list} className="relative">
                    {/* rail */}
                    <div className="absolute left-6 top-6 bottom-6 w-px bg-white/10" />
                    <div data-rail className="absolute left-6 top-6 bottom-6 w-px bg-linear-to-b from-brand-400 via-brand-500 to-amber-glow shadow-[0_0_14px_rgba(255,77,109,0.8)]" />

                    <div className="space-y-8">
                        {steps.map((s) => (
                            <div key={s.step} data-step className="relative flex gap-6 sm:gap-8 items-start">
                                <div data-node className="relative z-10 shrink-0 size-12 rounded-2xl icon-tile">
                                    <span className="text-sm font-semibold">{s.step}</span>
                                </div>
                                <div className="surface surface-hover flex-1 p-6 sm:p-7">
                                    <h3 className="font-serif text-xl font-medium text-white mb-1.5 tracking-tight">{s.title}</h3>
                                    <p className="text-muted text-sm leading-relaxed">{s.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

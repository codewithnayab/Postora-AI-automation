import { CheckIcon, CircleCheckBigIcon } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "../fx/Reveal";
import TiltCard from "../fx/TiltCard";
import Magnetic from "../fx/Magnetic";

const pricingPlans = [
    {
        name: "Starter",
        price: "Free",
        period: "",
        description: "Perfect for creators just getting started with social media automation.",
        features: ["2 social accounts", "10 scheduled posts/month", "AI content (5 credits/mo)", "Basic dashboard"],
        cta: "Get Started Free",
        highlight: false,
    },
    {
        name: "Pro",
        price: "$29",
        period: "/month",
        description: "Everything you need to grow and automate your social presence.",
        features: ["Unlimited accounts", "Unlimited scheduling", "AI content (200 credits/mo)", "Priority support"],
        cta: "Start 14-day Free Trial",
        highlight: true,
    },
    {
        name: "Agency",
        price: "$79",
        period: "/month",
        description: "For teams and agencies managing multiple brands at scale.",
        features: ["Everything in Pro", "5 team members", "Unlimited AI credits", "Custom AI personas", "Dedicated support"],
        cta: "Contact Sales",
        highlight: false,
    },
];

export default function Pricing() {
    return (
        <section id="pricing" className="relative py-28">
            <Reveal className="relative max-w-6xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-16">
                    <div data-reveal className="pill mb-6">
                        <CircleCheckBigIcon className="size-3.5" />
                        Simple pricing
                    </div>
                    <h2 data-reveal className="font-serif font-semibold tracking-[-0.03em] text-4xl sm:text-5xl leading-[1.08] text-white">
                        Plans for every stage
                        <br />
                        <span className="gradient-text">of growth</span>
                    </h2>
                    <p data-reveal className="mt-5 text-muted max-w-md mx-auto">Start free, upgrade when you're ready. Cancel anytime — no hidden fees.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch [perspective:1400px]">
                    {pricingPlans.map((plan) => (
                        <div key={plan.name} data-reveal className={plan.highlight ? "md:-my-4" : ""}>
                            <TiltCard max={plan.highlight ? 5 : 7} className={`rounded-3xl p-8 flex flex-col gap-7 ${plan.highlight ? "border-orbit bg-linear-to-b from-brand-500/20 via-ink-800/90 to-ink-900/95 border border-brand-500/30 shadow-[0_40px_100px_-30px_rgba(255,77,109,0.55)]" : "surface"}`}>
                                {plan.highlight && <div className="absolute -top-3.5 left-1/2 bg-linear-to-br from-brand-400 to-brand-600 shadow-[0_8px_24px_-6px_rgba(255,77,109,0.8)] rounded-full text-white text-xs font-semibold px-4 py-1.5 z-10 [transform:translateX(-50%)_translateZ(50px)]">Most Popular</div>}
                                <div className="[transform:translateZ(30px)]">
                                    <div className={`text-sm font-medium mb-2 ${plan.highlight ? "text-brand-300" : "text-muted"}`}>{plan.name}</div>
                                    <div className="flex items-end gap-1">
                                        <span className="font-serif text-5xl font-semibold tracking-tight text-white">{plan.price}</span>
                                        <span className="text-sm mb-2 text-muted">{plan.period}</span>
                                    </div>
                                    <p className="text-sm mt-3 leading-relaxed text-muted">{plan.description}</p>
                                </div>

                                <ul className="space-y-3 [transform:translateZ(20px)]">
                                    {plan.features.map((f) => (
                                        <li key={f} className="flex items-center gap-3 text-sm">
                                            <div className={`size-5 rounded-full flex items-center justify-center shrink-0 ${plan.highlight ? "bg-brand-500" : "bg-white/8 border border-white/10"}`}>
                                                <CheckIcon className={`size-3 ${plan.highlight ? "text-white" : "text-brand-300"}`} />
                                            </div>
                                            <span className="text-soft">{f}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-auto [transform:translateZ(40px)]">
                                    <Magnetic className="w-full" strength={0.15}>
                                        <Link to="/#" className={`btn w-full text-sm px-6 py-3 ${plan.highlight ? "btn-primary" : "btn-ghost"}`}>
                                            {plan.cta}
                                        </Link>
                                    </Magnetic>
                                </div>
                            </TiltCard>
                        </div>
                    ))}
                </div>
            </Reveal>
        </section>
    );
}

import { StarIcon } from "lucide-react";
import Reveal from "../fx/Reveal";
import TiltCard from "../fx/TiltCard";

const testimonials = [
    {
        name: "Navya.",
        role: "AI Engineer",
        avatar: "S",
        avatarBg: "from-red-400 to-pink-400",
        text: "Postora AI has saved our team 10+ hours a week. The AI composer is genuinely impressive — it writes content that sounds like us.",
    },
    {
        name: "Sahib Khan.",
        role: "Data Scientist",
        avatar: "S",
        avatarBg: "from-violet-400 to-purple-500",
        text: "I used to dread posting. Now I queue up a whole week of content in 20 minutes. The smart scheduling feature alone is worth it.",
    },
    {
        name: "Aziz.",
        role: "Backend Engineer",
        avatar: "A",
        avatarBg: "from-sky-400 to-blue-500",
        text: "Finally a Postora AI that's beautiful AND powerful. The clean dashboard makes it easy to see exactly what's going out and when.",
    },
];

export default function Testimonials() {
    return (
        <section className="relative py-28">
            <div className="ambient-orb right-0 top-1/4 w-[380px] h-[380px] bg-brand-500/10" />
            <Reveal className="relative max-w-6xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-14">
                    <div data-reveal className="pill mb-6">
                        <StarIcon className="size-3.5" />
                        Testimonials
                    </div>
                    <h2 data-reveal className="font-serif font-semibold tracking-[-0.03em] text-4xl sm:text-5xl leading-[1.08] text-white">
                        Loved by <span className="gradient-text">creators &amp; teams</span>
                    </h2>
                    <p data-reveal className="mt-5 text-muted max-w-md mx-auto">Join thousands of people who automate their social media with Postora AI.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 [perspective:1400px]">
                    {testimonials.map((t, i) => (
                        <div key={i} data-reveal>
                            <TiltCard max={7} className="surface surface-hover p-7 flex flex-col gap-5 overflow-hidden">
                                <span className="absolute -top-4 right-5 font-serif text-9xl leading-none text-brand-500/15 [transform:translateZ(20px)] select-none">”</span>
                                <div className="flex gap-0.5 [transform:translateZ(30px)]">
                                    {Array.from({ length: 5 }).map((_, n) => (
                                        <StarIcon key={n} className="size-4 fill-amber-glow text-amber-glow" />
                                    ))}
                                </div>
                                <p className="text-soft text-[15px] leading-relaxed flex-1 [transform:translateZ(30px)]">"{t.text}"</p>
                                <div className="flex items-center gap-3 pt-5 border-t border-white/8 [transform:translateZ(40px)]">
                                    <div className={`size-10 rounded-full bg-linear-to-br ${t.avatarBg} flex items-center justify-center text-white text-sm font-bold shrink-0 ring-2 ring-white/10`}>{t.avatar}</div>
                                    <div>
                                        <div className="text-sm font-medium text-white">{t.name}</div>
                                        <div className="text-xs text-muted">{t.role}</div>
                                    </div>
                                </div>
                            </TiltCard>
                        </div>
                    ))}
                </div>
            </Reveal>
        </section>
    );
}

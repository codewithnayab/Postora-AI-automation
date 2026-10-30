import { CalendarDaysIcon, Wand2Icon, Share2Icon, ZapIcon, BarChart3Icon, HashIcon } from "lucide-react";
import Reveal from "../fx/Reveal";
import TiltCard from "../fx/TiltCard";

const features = [
    {
        icon: CalendarDaysIcon,
        title: "Smart Scheduling",
        description: "Queue posts across all platforms with a single click. Set it once and let us handle the rest.",
        span: "lg:col-span-4",
    },
    {
        icon: Wand2Icon,
        title: "AI Content Generator",
        description: "Generate on-brand captions and stunning images with our built-in AI. Never stare at a blank page again.",
        span: "lg:col-span-2",
    },
    {
        icon: BarChart3Icon,
        title: "Activity Dashboard",
        description: "Get a bird's eye view of all published posts, scheduled content, and engagement activity in one place.",
        span: "lg:col-span-2",
    },
    {
        icon: Share2Icon,
        title: "Multi-Platform",
        description: "Connect Twitter, LinkedIn, Facebook, and Instagram. Post everywhere from one unified workspace.",
        span: "lg:col-span-4",
    },
    {
        icon: ZapIcon,
        title: "Instant Publishing",
        description: "Need to go live now? Publish immediately or schedule for peak engagement times with full timezone support.",
        span: "lg:col-span-3",
    },
    {
        icon: HashIcon,
        title: "Hashtag Suggestions",
        description: "Get AI-powered hashtag suggestions to reach a wider audience.",
        span: "lg:col-span-3",
    },
];

export default function Features() {
    return (
        <section id="features" className="relative py-28">
            <div className="ambient-orb -left-40 top-1/3 w-[420px] h-[420px] bg-violet-glow/10" />
            <Reveal className="relative max-w-6xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-16">
                    <div data-reveal className="pill mb-6">
                        <ZapIcon className="size-3.5" />
                        Everything you need
                    </div>
                    <h2 data-reveal className="font-serif font-semibold tracking-[-0.03em] text-4xl sm:text-5xl leading-[1.08] text-white">
                        Automate your entire
                        <br />
                        <span className="gradient-text">social media workflow</span>
                    </h2>
                    <p data-reveal className="mt-5 text-muted max-w-xl mx-auto leading-relaxed">
                        From content creation to scheduling — Postora AI handles it all so you can focus on what matters most.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5 [perspective:1400px]">
                    {features.map((f) => (
                        <div key={f.title} data-reveal className={f.span}>
                            <TiltCard className="surface surface-hover overflow-hidden p-7 min-h-52">
                                {/* oversized watermark icon sits deeper in the card */}
                                <f.icon className="absolute -right-6 -bottom-8 size-40 text-brand-500/[0.07] [transform:translateZ(10px)]" strokeWidth={1.2} />
                                <div className="relative [transform:translateZ(40px)]">
                                    <div className="icon-tile size-12 rounded-2xl mb-6">
                                        <f.icon className="size-5" />
                                    </div>
                                    <h3 className="font-serif text-xl font-medium text-white mb-2 tracking-tight">{f.title}</h3>
                                    <p className="text-sm text-muted leading-relaxed max-w-md">{f.description}</p>
                                </div>
                            </TiltCard>
                        </div>
                    ))}
                </div>
            </Reveal>
        </section>
    );
}

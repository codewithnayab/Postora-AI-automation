import { useLayoutEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../../lib/gsap";

interface RevealProps {
    children: React.ReactNode;
    className?: string;
    stagger?: number;
    y?: number;
}

/**
 * Scroll-triggered stagger: every descendant marked `data-reveal` fades & rises into place
 * the first time the section scrolls into view.
 */
export default function Reveal({ children, className = "", stagger = 0.09, y = 32 }: RevealProps) {
    const ref = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const el = ref.current;
        if (!el || prefersReducedMotion()) return;
        const ctx = gsap.context(() => {
            const items = gsap.utils.toArray<HTMLElement>("[data-reveal]", el);
            gsap.from(items, {
                opacity: 0,
                y,
                duration: 1,
                ease: "power3.out",
                stagger,
                scrollTrigger: { trigger: el, start: "top 85%", once: true },
            });
        }, el);
        return () => ctx.revert();
    }, [stagger, y]);

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}

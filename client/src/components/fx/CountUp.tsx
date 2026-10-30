import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../../lib/gsap";

/** Animates a number from its previous value to the new one. */
export default function CountUp({ value }: { value: number }) {
    const ref = useRef<HTMLSpanElement>(null);
    const prev = useRef(0);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (prefersReducedMotion()) {
            el.textContent = String(value);
            prev.current = value;
            return;
        }
        const obj = { v: prev.current };
        const tween = gsap.to(obj, {
            v: value,
            duration: 1.3,
            ease: "power2.out",
            onUpdate: () => {
                el.textContent = String(Math.round(obj.v));
            },
        });
        prev.current = value;
        return () => {
            tween.kill();
        };
    }, [value]);

    return <span ref={ref}>0</span>;
}

import { useRef } from "react";
import { gsap, canHover, prefersReducedMotion } from "../../lib/gsap";

interface MagneticProps {
    children: React.ReactNode;
    className?: string;
    strength?: number;
}

/** Wraps a button/link so it gently follows the cursor when hovered. */
export default function Magnetic({ children, className = "", strength = 0.28 }: MagneticProps) {
    const ref = useRef<HTMLSpanElement>(null);

    const onMove = (e: React.PointerEvent<HTMLSpanElement>) => {
        if (!ref.current || !canHover() || prefersReducedMotion()) return;
        const r = ref.current.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) * strength;
        const y = (e.clientY - (r.top + r.height / 2)) * strength;
        gsap.to(ref.current, { x, y, duration: 0.4, ease: "power3.out", overwrite: "auto" });
    };

    const onLeave = () => {
        if (!ref.current) return;
        gsap.to(ref.current, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.4)", overwrite: "auto" });
    };

    return (
        <span ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className={`inline-block ${className}`}>
            {children}
        </span>
    );
}

import { useRef } from "react";
import { gsap, canHover, prefersReducedMotion } from "../../lib/gsap";

interface TiltCardProps {
    children: React.ReactNode;
    className?: string;
    /** max rotation in degrees */
    max?: number;
}

/**
 * 3D tilt-on-hover wrapper with a cursor-following light.
 * Children can use the `.z-1 / .z-2 / .z-3` helpers (see below) to float above the card plane.
 */
export default function TiltCard({ children, className = "", max = 9 }: TiltCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const lightRef = useRef<HTMLDivElement>(null);

    const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!ref.current || !canHover() || prefersReducedMotion()) return;
        const r = ref.current.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        gsap.to(ref.current, {
            rotateY: (px - 0.5) * max * 2,
            rotateX: (0.5 - py) * max * 2,
            transformPerspective: 900,
            duration: 0.45,
            ease: "power2.out",
            overwrite: "auto",
        });
        if (lightRef.current) {
            lightRef.current.style.opacity = "1";
            lightRef.current.style.background = `radial-gradient(380px circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.11), rgba(255,77,109,0.06) 35%, transparent 60%)`;
        }
    };

    const onLeave = () => {
        if (!ref.current) return;
        gsap.to(ref.current, { rotateX: 0, rotateY: 0, duration: 0.9, ease: "elastic.out(1, 0.55)", overwrite: "auto" });
        if (lightRef.current) lightRef.current.style.opacity = "0";
    };

    return (
        <div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className={`relative h-full will-change-transform [transform-style:preserve-3d] ${className}`}>
            {children}
            <div ref={lightRef} className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300" />
        </div>
    );
}

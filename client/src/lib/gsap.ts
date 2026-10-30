import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const prefersReducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const canHover = () => typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

export { gsap, ScrollTrigger };

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MailIcon, LockIcon, ArrowRightIcon, User2Icon, CheckCircle2Icon, SparklesIcon } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import toast from "react-hot-toast";
import { gsap, prefersReducedMotion } from "../lib/gsap";
import Magnetic from "../components/fx/Magnetic";
import TiltCard from "../components/fx/TiltCard";

export default function Login() {
    const [loginState, setLoginState] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {login, user} = useAuth()
    const root = useRef<HTMLDivElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
       try {
            const { data } = await api.post(`/api/auth/${loginState ? "login" : "register"}`, { name, email, password })

            login(data, data.token)
            navigate("/dashboard")
       } catch (error: any) {
            toast.error(error.response?.data?.message || error?.message)
       }finally{
        setLoading(false)
       }
    };

    useEffect(()=>{
        if(user) navigate('/dashboard')
    },[user])

    useLayoutEffect(() => {
        const el = root.current;
        if (!el || prefersReducedMotion()) return;
        const ctx = gsap.context(() => {
            gsap.timeline({ defaults: { ease: "power4.out" } })
                .from("[data-in='panel']", { opacity: 0, y: 40, rotateX: 12, duration: 1.1 })
                .from("[data-in='field']", { opacity: 0, y: 16, duration: 0.7, stagger: 0.08 }, "-=0.6")
                .from("[data-in='brand'] > *", { opacity: 0, x: -24, duration: 0.9, stagger: 0.1 }, "-=1.1")
                .from("[data-in='float']", { opacity: 0, scale: 0.7, duration: 0.9, stagger: 0.12, ease: "back.out(1.7)" }, "-=0.8");
        }, el);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={root} className="relative min-h-screen bg-ink-950 text-slate-100 grid lg:grid-cols-2 overflow-hidden">
            <div className="ambient-orb drift -top-40 -left-40 w-[520px] h-[520px] bg-brand-500/25" />
            <div className="ambient-orb drift bottom-0 right-0 w-[460px] h-[460px] bg-violet-glow/20" style={{ animationDelay: "-7s" }} />

            {/* Brand panel */}
            <div className="relative hidden lg:flex flex-col justify-between p-14 border-r border-white/8">
                <div className="absolute inset-0 opacity-50 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-size-[56px_56px] [mask-image:radial-gradient(ellipse_at_30%_40%,#000_20%,transparent_70%)]" />
                <Link to="/" className="relative flex items-center gap-2 w-fit">
                    <img src="/logo.svg" alt="Logo" className="size-7" />
                    <span className="font-serif text-2xl font-medium tracking-tight text-white">Postora AI</span>
                </Link>

                <div data-in="brand" className="relative">
                    <h2 className="font-serif font-semibold tracking-[-0.035em] leading-[1.03] text-6xl text-white">
                        Your social media.
                        <br />
                        <span className="gradient-text">On autopilot.</span>
                    </h2>
                    <p className="mt-6 text-muted max-w-md leading-relaxed">Create, schedule, and auto-engage across all your social platforms — powered by AI that writes your captions and replies for you.</p>
                </div>

                <div className="relative h-56 [perspective:1200px]">
                    <div data-in="float" className="absolute left-0 top-2 w-72">
                        <TiltCard max={10} className="surface p-4 flex items-center gap-3">
                            <CheckCircle2Icon className="size-6 text-emerald-400 [transform:translateZ(30px)]" />
                            <div className="[transform:translateZ(30px)]">
                                <div className="text-sm text-white">Post published</div>
                                <div className="text-xs text-muted">LinkedIn & Twitter · 2m ago</div>
                            </div>
                        </TiltCard>
                    </div>
                    <div data-in="float" className="absolute left-24 top-24 w-72">
                        <TiltCard max={10} className="surface p-4 flex items-center gap-3">
                            <span className="icon-tile size-9 rounded-xl [transform:translateZ(30px)]"><SparklesIcon className="size-4" /></span>
                            <div className="[transform:translateZ(30px)]">
                                <div className="text-sm text-white">AI replied to 3 comments</div>
                                <div className="text-xs text-muted">15m ago</div>
                            </div>
                        </TiltCard>
                    </div>
                </div>
            </div>

            {/* Form panel */}
            <div className="relative flex items-center justify-center p-5 sm:p-8 [perspective:1400px]">
                <div data-in="panel" className="relative w-full max-w-md">
                    <div className="absolute -inset-px rounded-[1.6rem] bg-linear-to-b from-brand-500/40 via-white/5 to-transparent" />
                    <div className="relative surface rounded-3xl p-8 sm:p-9 bg-ink-900/80!">
                        <div className="flex flex-col items-center mb-8 lg:hidden">
                            <Link to="/" className="flex items-center gap-2">
                                <img src="/logo.svg" alt="Logo" className="size-7" />
                                <h1 className="font-serif text-2xl font-medium text-white">Scheduler</h1>
                            </Link>
                        </div>
                        <div className="mb-8 text-center lg:text-left">
                            <h1 className="hidden lg:block font-serif text-3xl font-semibold tracking-tight text-white">{loginState ? "Welcome back" : "Create your account"}</h1>
                            <p className="text-muted text-sm mt-1">Sign in to your Dashboard</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5 text-sm">
                            {!loginState && (
                                <div data-in="field">
                                    <label className="label">Name</label>
                                    <div className="relative">
                                        <User2Icon className="size-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
                                        <input type="text" required placeholder="Enter your name" className="field pl-11 pr-4 py-3 rounded-xl" value={name} onChange={(e) => setName(e.target.value)} />
                                    </div>
                                </div>
                            )}
                            <div data-in="field">
                                <label className="label">Email</label>
                                <div className="relative">
                                    <MailIcon className="size-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
                                    <input type="email" required placeholder="you@company.com" className="field pl-11 pr-4 py-3 rounded-xl" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                            </div>
                            <div data-in="field">
                                <label className="label">Password</label>
                                <div className="relative">
                                    <LockIcon className="size-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
                                    <input type="password" required placeholder="********" className="field pl-11 pr-4 py-3 rounded-xl" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                            </div>

                            <div data-in="field">
                                <Magnetic className="w-full" strength={0.12}>
                                    <button type="submit" disabled={loading} className="btn btn-primary w-full py-3 px-4 text-sm">
                                        {loading ? (
                                            "Signing in..."
                                        ) : (
                                            <>
                                                {loginState ? "Sign In" : "Sign Up"} <ArrowRightIcon className="size-4" />
                                            </>
                                        )}
                                    </button>
                                </Magnetic>
                            </div>
                        </form>

                        <div className="mt-7 text-center text-sm text-muted">
                            {loginState ? (
                                <>
                                    Don't have an account?{" "}
                                    <button onClick={() => setLoginState(false)} className="text-brand-300 hover:text-white transition-colors underline-offset-4 hover:underline">
                                        Create one free
                                    </button>
                                </>
                            ) : (
                                <>
                                    Already have an account?{" "}
                                    <button onClick={() => setLoginState(true)} className="text-brand-300 hover:text-white transition-colors underline-offset-4 hover:underline">
                                        Sign In
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

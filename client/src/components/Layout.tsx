import { useLayoutEffect, useRef, useState } from 'react'
import Sidebar from './Sidebar'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { MenuIcon } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { gsap, prefersReducedMotion } from '../lib/gsap'

const pageTitles: Record<string, string> = {
    "/dashboard" : "Dashboard",
    "/accounts": "Social Accounts",
    "/schedule": "Post Scheduler",
    "/ai-composer": "AI Composer",
}

const Layout = () => {

    const {isAuthenticated, isLoading} = useAuth()

    const location = useLocation()

    const title = pageTitles[location.pathname] || "SocialAI";

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const pageRef = useRef<HTMLDivElement>(null)

    // Soft page transition whenever the route changes
    useLayoutEffect(() => {
        if (!pageRef.current || prefersReducedMotion()) return
        const tween = gsap.fromTo(pageRef.current, { opacity: 0, y: 18, filter: "blur(6px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7, ease: "power3.out", clearProps: "filter,transform" })
        return () => { tween.kill() }
    }, [location.pathname, isLoading, isAuthenticated])

    if(isLoading){
        return (
            <div className="flex h-screen items-center justify-center bg-ink-950">
                <div className='size-9 border-[3px] border-brand-500 border-t-transparent rounded-full animate-spin shadow-[0_0_30px_rgba(255,77,109,0.5)]'/>
            </div>
        )
    }

    if(!isAuthenticated){
        return <Navigate to="/login" replace/>
    }

  return (
    <div className='relative flex h-screen bg-ink-950 text-slate-100 overflow-hidden'>

        {/* Ambient light */}
        <div className="ambient-orb -top-40 right-0 w-[520px] h-[520px] bg-brand-500/15" />
        <div className="ambient-orb bottom-0 left-1/3 w-[480px] h-[480px] bg-violet-glow/10" />

        {/* Mobile Overlay */}
    {isMobileMenuOpen && <div className='fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden backdrop-in' onClick={()=> setIsMobileMenuOpen(false)}/>}

        <Sidebar isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen}/>

    <div className='relative flex-1 flex flex-col overflow-hidden'>
        {/* Top Bar */}
        <header className='h-16 shrink-0 bg-ink-900/60 backdrop-blur-xl border-b border-white/8 flex items-center px-4 md:px-8 gap-4'>

            <button className="md:hidden p-2 -ml-2 text-muted hover:text-white transition-colors" onClick={()=>setIsMobileMenuOpen(true)} aria-label="Open menu">
                <MenuIcon className="size-6"/>
            </button>
            <div>
                <h1 className="font-serif text-lg font-semibold tracking-tight text-white leading-tight">{title}</h1>
                <p className="text-sm text-muted hidden sm:block">Manage and automate your social presence</p>
            </div>

        </header>
        <main className="flex-1 overflow-auto p-4 sm:p-6 md:p-8 xl:p-12 [perspective:1600px]">
            <div ref={pageRef} className="h-full">
                <Outlet />
            </div>
        </main>

    </div>

    </div>
  )
}

export default Layout

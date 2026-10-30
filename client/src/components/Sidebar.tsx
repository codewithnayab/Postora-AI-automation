import { CalendarDaysIcon, LayoutDashboardIcon, LogOutIcon, UsersIcon, Wand2Icon } from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Sidebar = ({isOpen, setIsOpen} : {isOpen: boolean, setIsOpen: (val: boolean) => void}) => {

    const {logout, user} = useAuth()

    const location = useLocation()

    const navItems = [
        {name: "Dashboard", icon: LayoutDashboardIcon, path: "/dashboard"},
        { name: "Accounts", icon: UsersIcon, path: "/accounts" },
        { name: "Scheduler", icon: CalendarDaysIcon, path: "/schedule" },
        { name: "AI Composer", icon: Wand2Icon, path: "/ai-composer" },
    ]

  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-ink-900/90 md:bg-ink-900/50 backdrop-blur-2xl border-r border-white/8 flex flex-col h-full transform transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] md:relative md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>

     {/* Logo */}
     <div className="p-6 pb-4">
        <div className='group font-serif text-xl font-medium tracking-tight text-white flex items-center gap-2'>
            <img src="/logo.svg" alt="logo" className='size-7 transition-transform duration-500 group-hover:rotate-[24deg] group-hover:scale-110' />
            Postora AI
        </div>

     </div>

      {/* Nav section label */}
      <div className='px-6 py-2'>
        <span className='text-xs text-muted'>Menu</span>
      </div>

       {/* Nav links */}
       <nav className='flex-1 px-3 space-y-1'>
            {navItems.map((item)=>{
                const isActive = location.pathname === item.path;

                return (
                    <NavLink key={item.name}
                    to={item.path}
                    end={item.path === "/dashboard"}
                    onClick={()=>setIsOpen(false)} 
                    
                    className={`group relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm transition-all duration-300 border ${isActive ? "bg-linear-to-r from-brand-500/20 to-brand-500/[0.03] text-white border-brand-500/30 shadow-[0_10px_30px_-14px_rgba(255,77,109,0.7)]" : "text-muted hover:bg-white/5 border-transparent hover:text-white hover:translate-x-1"}`}>

                        {isActive && <span className='absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-full bg-brand-400 shadow-[0_0_12px_rgba(255,77,109,0.9)]'/>}
                        <item.icon className={`size-[18px] shrink-0 transition-transform duration-300 group-hover:scale-110 ${isActive ? "text-brand-400" : ""}`} />
                        {item.name}
                    </NavLink>
                )
            })}
       </nav>

       {/* User footer */}
       <div className="p-4 border-t border-white/8">
        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors">
            <div className='size-9 rounded-full bg-linear-to-br from-brand-400 to-amber-glow flex items-center justify-center text-ink-950 text-sm font-semibold shrink-0 ring-2 ring-white/10'>
                {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>

            <div className='flex-1 min-w-0'>
                <div className='text-sm text-white truncate'>{user?.name}</div>
                <div className='text-xs text-muted truncate'>{user?.email}</div>
            </div>
        </div>

        <button onClick={logout} className="mt-1 flex items-center gap-2 px-3 py-2 w-full rounded-xl text-sm text-muted hover:bg-brand-500/10 hover:text-brand-300 transition-all duration-300">
           <LogOutIcon className="size-4" />
           Sign Out
        </button>

       </div>

    </div>
  )
}

export default Sidebar

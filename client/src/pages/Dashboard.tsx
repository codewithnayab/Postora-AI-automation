import { ActivityIcon, CheckCircleIcon, ClockIcon, SendIcon, Share2Icon, TrendingUpIcon } from "lucide-react"
import { useEffect, useState } from "react"
import api from "../api/axios"
import TiltCard from "../components/fx/TiltCard"
import CountUp from "../components/fx/CountUp"



const Dashboard = () => {

  const [stats, setStats] = useState({scheduled: 0, published: 0, connectedAccounts: 0})
  const [activities, setActivities] = useState<any[]>([])

  useEffect(()=>{
    const fetchDashboardData = async () => {
      try {
        const [postsRes, accountsRes, activityRes] = await Promise.all([api.get("/api/posts"), api.get("/api/accounts"), api.get("/api/activity")])

        const posts = postsRes.data;
        setStats({
          scheduled: posts.filter((p: any) => p.status === 'scheduled').length,
          published: posts.filter((p: any) => p.status === 'published').length,
          connectedAccounts: accountsRes.data.filter((a: any) => a.status === 'connected').length,
        })
        setActivities(activityRes.data)
      } catch (error: any) {
        console.error("Error fetching dashboard data", error)
      }
    };
    fetchDashboardData();
  },[])

  const statCards = [
    {
      label: "Scheduled Posts",
      value: stats.scheduled,
      icon: ClockIcon,
      trend: "+2 today",
    },
    {
      label: "Published Posts",
      value: stats.published,
      icon: CheckCircleIcon,
      trend: "All time",
    },
    {
      label: "Connected Accounts",
      value: stats.connectedAccounts,
      icon: Share2Icon,
      trend: "Active",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome bar */}
      <div className="fade-up">
        <h2 className="font-serif text-3xl font-semibold tracking-tight text-white">Good morning! 👋</h2>
        <p className="text-muted text-sm mt-1">Here's what's happening with your social accounts today.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 [perspective:1400px]">
        {statCards.map((card, i)=>(
          <div key={card.label} className="fade-up" style={{ animationDelay: `${80 + i * 90}ms` }}>
            <TiltCard className="surface surface-hover p-6 overflow-hidden">
              <card.icon className="absolute -right-5 -bottom-6 size-32 text-brand-500/[0.07] [transform:translateZ(10px)]" strokeWidth={1.2} />
              <div className="relative flex items-start justify-between [transform:translateZ(36px)]">
                <div className="icon-tile size-11 rounded-xl">
                  <card.icon className="size-5" />
                </div>
                <div className="text-xs text-brand-300 flex items-center gap-1 bg-brand-500/10 border border-brand-500/20 rounded-full px-2.5 py-1">
                  <TrendingUpIcon className="size-3"/>
                  {card.trend}
                </div>
              </div>
              <div className="relative mt-6 [transform:translateZ(28px)]">
                <div className="font-serif text-5xl font-semibold text-white tabular-nums tracking-tight"><CountUp value={card.value} /></div>
                <p className="text-sm text-muted mt-1">{card.label}</p>
              </div>
            </TiltCard>
          </div>
        ))}
      </div>

      {/* Activity Feed */}
      <div className="surface overflow-hidden fade-up" style={{ animationDelay: "380ms" }}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/8">
            <h2 className="font-serif text-lg font-medium text-white">Recent Activity</h2>
            <span className="text-sm text-muted">{activities.length} events</span>
        </div>

        {activities.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-6">
            <div className="size-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-4 float-y">
              <ActivityIcon className="size-6 text-brand-300"/>
            </div>
            <p className="text-soft">No activity yet</p>
            <p className="text-muted text-sm mt-1">Connect accounts and schedule posts to see events here.</p>
          </div>
        ) : (
          <div className="divide-y divide-white/6">
            {activities.map((activity, i)=>(
              <div key={activity._id} className="group flex items-start gap-4 px-6 py-4 hover:bg-white/4 transition-colors fade-up" style={{ animationDelay: `${Math.min(i, 12) * 45}ms` }}>
                <div className="size-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 bg-brand-500/10 border border-brand-500/20 text-brand-300 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                  <SendIcon className="size-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">Published</span>
                    <span className="text-xs text-muted shrink-0">{new Date(activity.createdAt).toLocaleString()}</span>
                  </div>
                    <p className="text-sm text-soft">{activity.description}</p>
                </div>
              </div>
            ))}

          </div>
        )}
      </div>

    </div>
  )
}

export default Dashboard

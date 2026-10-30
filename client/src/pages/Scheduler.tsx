import { useEffect, useState } from "react"
import { PLATFORMS } from "../assets/assets";
import { ArrowRightIcon, CalendarDaysIcon, CalendarIcon, ClockIcon, SendIcon, UploadCloudIcon, XIcon } from "lucide-react";
import api from "../api/axios";
import toast from "react-hot-toast";
import Magnetic from "../components/fx/Magnetic";


const Scheduler = () => {

  const [posts, setPosts] = useState<any[]>([]);
  const [content, setContent] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    try {
      const {data} = await api.get("/api/posts")
      setPosts(data)
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
    }
  }

  useEffect(()=>{
    (async ()=> await fetchPosts())();
    const interval = setInterval(async ()=> await fetchPosts(), 10000);
    return ()=> clearInterval(interval)
  },[])

  const scheduled = posts.filter((p)=> p.status === "scheduled")
  const published = posts.filter((p)=> p.status === "published")

  const togglePlatform = (id: string)=> setSelectedPlatforms((prev)=> (prev.includes(id) ? prev.filter((p)=> p !== id) : [...prev, id])) 

  const handleSchedule = async (e: React.FormEvent) => {
    e.preventDefault()
    if(selectedPlatforms.length === 0){
      toast.error("Select at least one platform");
      return;
    }
    if(!scheduledDate || !scheduledTime){
      toast.error("Select date and time");
      return;
    }
    if(selectedPlatforms.includes('instagram') && !mediaFile){
      toast.error("Instagram requires an image or video");
      return;
    }

    const scheduledFor = new Date(`${scheduledDate}T${scheduledTime}`).toISOString();
    const formData = new FormData();
    formData.append("content", content);
    formData.append("scheduledFor", scheduledFor);
    formData.append("status", "scheduled");
    formData.append("platforms", JSON.stringify(selectedPlatforms));
    if(mediaFile) formData.append("media", mediaFile);

    setLoading(true)
    try {
      await api.post("/api/posts", formData, {headers: {"Content-Type": "multipart/form-data"}})
      toast.success("Post scheduled!");
      setContent("");
      setScheduledDate("");
      setScheduledTime("");
      setSelectedPlatforms([]);
      setMediaFile(null);
      fetchPosts();
    } catch (error:any) {
      toast.error(error?.response?.data?.message || error.message);
    }finally{
      setLoading(false);
    }
  }

  const postRow = (post: any, published: boolean, i: number) => (
    <div key={post._id} className="group px-5 py-4 hover:bg-white/4 transition-colors fade-up" style={{ animationDelay: `${Math.min(i, 10) * 40}ms` }}>
      <div className="flex items-center justify-between mb-2">
          <div className="flex gap-2 items-center">
            {post.platforms.map((pl: string)=>{
              const meta = PLATFORMS.find((p)=> p.id === pl);
              return meta ? <meta.icon key={pl} className="size-3.5 text-muted group-hover:text-brand-300 transition-colors"/> : null
            })}
          </div>
          <div className="flex items-center gap-2">
            {post.mediaType && <span className="text-xs bg-white/6 text-soft border border-white/10 px-1.5 py-0.5 rounded-md font-medium capitalize">{post.mediaType}</span>}

            <span className="text-xs text-muted">{new Date(published ? post.updatedAt : post.scheduledFor).toLocaleString()}</span>
            {published && <span className="text-xs bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 px-2 py-0.5 rounded-full">Published</span>}
          </div>
      </div>
      <p className={`text-sm text-soft line-clamp-2 ${published ? "max-w-4/5" : "max-w-md"}`}>{post.content}</p>
    </div>
  )

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      {/* ── Compose panel ── */}
      <div className="w-full lg:w-[460px] shrink-0 fade-up">
        <div className="surface p-6 sm:p-7">
            <div className="flex items-center gap-2 mb-6">
              <h2 className="font-serif text-xl font-medium text-white">Compose Post</h2>
            </div>

            <form className="space-y-5" onSubmit={handleSchedule}>
              {/* Platforms */}
              <div>
                <label className="label">Platforms</label>
                <div className="flex flex-wrap gap-3">
                  {PLATFORMS.map((p)=>{
                    const active = selectedPlatforms.includes(p.id);
                    return (
                      <button key={p.id} type="button" onClick={()=> togglePlatform(p.id)} aria-pressed={active} title={p.name}
                      className={`flex items-center gap-1.5 p-3 rounded-xl border transition-all duration-300 hover:-translate-y-0.5 ${active ? "bg-brand-500/15 border-brand-400/60 text-brand-300 scale-103 shadow-[0_10px_26px_-10px_rgba(255,77,109,0.8)]" : "border-white/10 bg-white/4 text-muted hover:border-white/25 hover:text-white"}`}>
                        <p.icon className="size-4.5" />
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Content */}
              <div>
                <label className="label">Content</label>
                <textarea required rows={5} placeholder="What do you want to share today?" className="field px-5 py-4 rounded-2xl text-sm resize-none" value={content} onChange={(e)=>setContent(e.target.value)}/>
                  <div className={`text-right text-xs mt-1 font-medium transition-colors ${content.length > 270 ? "text-brand-400" : "text-muted"}`}>
                    {content.length}/280
                  </div>
              </div>

              {/* Media upload */}
              <div>
                <label className="label">Media (optional)</label>
                {mediaFile ? (
                  <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/4">
                    {mediaFile.type.startsWith("image/") 
                    ? 
                    <img src={URL.createObjectURL(mediaFile)} alt="preview" className="w-full h-40 object-cover"/> 
                    : 
                    <video src={URL.createObjectURL(mediaFile)} className="w-full h-40 object-cover" controls/>}

                    <button type="button" onClick={()=> setMediaFile(null)} aria-label="Remove media" className="absolute top-2 right-2 size-8 bg-black/60 hover:bg-brand-500 backdrop-blur text-white rounded-full flex items-center justify-center transition-all hover:rotate-90">
                      <XIcon className="size-3.5" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center gap-2 p-5 py-10 border-2 border-dashed border-white/12 rounded-2xl cursor-pointer hover:border-brand-400/60 hover:bg-brand-500/5 transition-all duration-300 group">
                    <span className="size-10 rounded-xl bg-white/6 border border-white/10 flex items-center justify-center text-muted group-hover:text-brand-300 group-hover:-translate-y-1 transition-all duration-300"><UploadCloudIcon className="size-5" /></span>
                    <span className="text-sm text-muted group-hover:text-brand-300 transition-colors">Click to upload image or video</span>
                    <input type="file" accept="image/*,video/*" className="hidden" onChange={(e)=>e.target.files?.[0] && setMediaFile(e.target.files[0])}/>
                  </label>
                )}
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="label">Date</label>
                  <div className="relative">
                    <CalendarIcon className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none"/>
                    <input type="date" required className="field pl-10 pr-4 py-2.5 rounded-xl text-sm" value={scheduledDate} onChange={(e)=>setScheduledDate(e.target.value)}/>
                  </div>
                </div>
                <div>
                  <label className="label">Time</label>
                  <div className="relative">
                    <ClockIcon className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none"/>

                    <input type="time" required className="field pl-10 pr-4 py-2.5 rounded-xl text-sm" value={scheduledTime} onChange={(e)=>setScheduledTime(e.target.value)}/>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <Magnetic className="w-full" strength={0.1}>
                <button type="submit" disabled={loading} className="btn btn-primary w-full py-3.5">
                  {loading ? (
                    <>
                      <div className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Scheduling…
                    </>
                  ) : (
                    <>
                      Schedule Post
                      <ArrowRightIcon className="size-4"/>
                    </>
                  )}
                </button>
              </Magnetic>
            </form>
        </div>
      </div>

      {/* ── Queue panels ── */}
      <div className="flex-1 flex flex-col gap-6 min-w-0">
        {/* Upcoming */}
        <div className="surface overflow-hidden fade-up" style={{ animationDelay: "90ms" }}>
              <div className="flex items-center gap-2.5 px-5 py-4 border-b border-white/8">
                <CalendarDaysIcon className="size-4 text-brand-300"/>
                <h3 className="text-white text-sm font-medium">Upcoming</h3>
                <span className="ml-auto text-xs font-semibold bg-brand-500/15 text-brand-300 border border-brand-500/25 px-2.5 py-0.5 rounded-full">{scheduled.length}</span>
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-white/6">
                {scheduled.length === 0 ? (
                  <div className="py-10 text-center text-muted text-sm">No posts scheduled yet</div>
                ) : (
                  scheduled.map((post, i)=> postRow(post, false, i))
                )}
              </div>
        </div>

        {/* Published */}
        <div className="surface overflow-hidden fade-up" style={{ animationDelay: "180ms" }}>
              <div className="flex items-center gap-2.5 px-5 py-4 border-b border-white/8">
                <SendIcon className="size-4 text-emerald-400"/>
                <h3 className="text-white text-sm font-medium">Published</h3>
                <span className="ml-auto text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">{published.length}</span>
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-white/6">
                {published.length === 0 ? (
                  <div className="py-10 text-center text-muted text-sm">No published posts yet </div>
                ) : (
                  published.map((post, i)=> postRow(post, true, i))
                )}
              </div>
        </div>


      </div>

    </div>
  )
}

export default Scheduler

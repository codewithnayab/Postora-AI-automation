import { useEffect, useState } from "react"
import { dummyGenerationData, PLATFORMS } from "../assets/assets";
import { ArrowRightIcon, CalendarIcon, ClockIcon, HistoryIcon, Loader2Icon, TimerIcon, Wand2Icon, XIcon } from "lucide-react";
import api from "../api/axios";
import toast from "react-hot-toast";
import TiltCard from "../components/fx/TiltCard";
import Magnetic from "../components/fx/Magnetic";


const AIComposer = () => {

  const [prompt, setPrompt] = useState("");
  const [tone, setTone] = useState("Professional");
  const [generateImage, setGenerateImage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [generations, setGenerations] = useState<any[]>([])

   // Scheduling state
   const [activeScheduler, setActiveScheduler] = useState<any>(null);
   const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
   const [scheduledDate, setScheduledDate] = useState("");
   const [scheduledTime, setScheduledTime] = useState("");
   const [scheduling, setScheduling] = useState(false);

   const fetchGenerations = async () => {
    try {
      const { data } = await api.get("api/posts/generations")
      setGenerations(data)
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error?.message);
    }
   }

   useEffect(()=>{
    fetchGenerations()
   },[])

   const handleGenerate = async ()=>{
    if(!prompt){
      toast.error("Please enter a prompt");
      return;
    }
    setLoading(true)
    try {
      const { data } = await api.post("/api/posts/generate", {prompt, tone, generateImage});
      setGenerations([data, ...generations]);
      setActiveScheduler(data)
      toast.success("Content generated!")
    } catch (error: any) {
       toast.error(error?.response?.data?.message || error?.message);
    }finally{
      setLoading(false)
    }
   }

   const handleSchedule = async ()=>{
    if(!activeScheduler) return;
    if(selectedPlatforms.length === 0){
       toast.error("Select at least one platform");
      return;
    }
    if(!scheduledDate || !scheduledTime){
      toast.error("Select date and time");
      return;
    }

    const scheduledFor = new Date(`${scheduledDate}T${scheduledTime}`).toISOString()
    setScheduling(true);
    try {
      await api.post("/api/posts", {
        content: activeScheduler.content,
        mediaUrl: activeScheduler.mediaUrl,
        mediaType: activeScheduler.mediaType,
        platforms: selectedPlatforms,
        scheduledFor,
        status: "scheduled",
      })
        toast.success("AI Post scheduled!");
        setActiveScheduler(null)
        setSelectedPlatforms([]);
        setScheduledDate("");
        setScheduledTime("");
    } catch (error:any) {
      toast.error(error?.response?.data?.message || "Failed to schedule");
    }finally{
      setScheduling(false);
    }
   }

   const tones = ["Professional", "Creative", "Funny", "Minimalist", "Excited"];

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      {/* Input Section */}
      <div className="space-y-6 text-center mt-10 sm:mt-16">
        <h1 className="fade-up font-serif text-4xl sm:text-5xl font-semibold tracking-[-0.03em] text-white">What should we create <span className="gradient-text">today?</span></h1>

        {/* Prompt box with a glowing orbit border */}
        <div className="relative group mt-12 fade-up" style={{ animationDelay: "120ms" }}>
          <div className="absolute -inset-6 bg-brand-500/10 blur-3xl rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity duration-700" />
          <div className="relative rounded-3xl border-orbit">
            <textarea 
            className="field block px-6 pt-6 pb-20 rounded-3xl text-base resize-none h-48 sm:h-44 bg-ink-900/80! text-left"
            placeholder="Share your idea... (e.g. A post about the launch of our new eco-friendly coffee beans)" value={prompt} onChange={(e)=> setPrompt(e.target.value)}/>
            <div className="absolute bottom-4 right-4 left-4 flex items-center justify-between sm:justify-end gap-3 text-sm">

              <button onClick={()=> setGenerateImage(!generateImage)} aria-pressed={generateImage} className="flex items-center gap-3 bg-white/6 hover:bg-white/10 border border-white/10 text-soft py-2 px-3.5 rounded-xl transition-colors">
                <span>AI Image</span>
                <div className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors duration-300 ease-in-out focus:outline-none ${generateImage ? "bg-brand-500 shadow-[0_0_14px_rgba(255,77,109,0.7)]" : "bg-white/15"}`}>
                  <span className={`pointer-events-none size-4 transform translate-y-0.5 rounded-full bg-white transition-all duration-300 ${generateImage ? "translate-x-4.5" : "translate-x-0.5"}`}/>
                </div>
              </button>

              <Magnetic strength={0.2}>
                <button onClick={handleGenerate} disabled={loading} className="btn btn-primary px-5 py-2.5">
                  {loading ? (
                    <>
                      <Loader2Icon className="size-4 animate-spin"/>
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      Generate
                      <ArrowRightIcon className="size-4"/>
                    </>
                  )}
                </button>
              </Magnetic>

            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2 fade-up" style={{ animationDelay: "220ms" }}>
              {tones.map((t)=>(
                <button key={t} onClick={()=> setTone(t) } aria-pressed={tone === t} className={`px-4 py-1.5 rounded-full text-sm transition-all duration-300 border hover:-translate-y-0.5 ${tone === t ? "bg-brand-500 border-brand-400 text-white shadow-[0_10px_26px_-10px_rgba(255,77,109,0.9)]" : "bg-white/4 border-white/10 text-muted hover:border-white/30 hover:text-white"}`}>
                  {t}
                </button>
              ))}
        </div>
      </div>

      {/* AI Generated Posts */}
      <div className="space-y-6 pt-12 border-t border-white/8">
          <div className="flex items-center justify-between text-soft">
            <div className="flex items-center gap-2">
              <HistoryIcon className="size-5 text-brand-300"/>
              <h2 className="font-serif text-xl font-medium text-white">Recent Generations</h2>
            </div>
            <span className="text-sm text-muted bg-white/5 border border-white/8 rounded-full px-3 py-0.5">{generations.length} total</span>
          </div>

           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 [perspective:1400px]">
              {generations.map((gen, i)=>(
                <div key={gen._id} className="fade-up" style={{ animationDelay: `${Math.min(i, 9) * 60}ms` }}>
                  <TiltCard max={7} className="group surface surface-hover p-5 overflow-hidden">
                    <div className="flex flex-col h-full space-y-4">

                      <div className="flex items-center justify-between gap-2 [transform:translateZ(20px)]">
                        <span className="text-xs text-muted">{new Date(gen.createdAt).toLocaleString()}</span>
                        <span className="text-xs text-brand-300 bg-brand-500/10 border border-brand-500/20 px-2 py-0.5 rounded-md">{gen.tone}</span>
                      </div>

                      <p className="text-sm text-soft line-clamp-3 leading-relaxed flex-1 [transform:translateZ(20px)]">{gen.content}</p>

                      {gen.mediaUrl && (
                        <div className="rounded-xl overflow-hidden border border-white/10 bg-white/4 [transform:translateZ(30px)]">
                          <img src={gen.mediaUrl} alt="Gen" className="w-full aspect-video object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"/>
                        </div>
                      )}

                      <div className="flex items-center gap-2 pt-2 [transform:translateZ(40px)]">
                        <button 
                        onClick={()=> setActiveScheduler(gen)}
                        className="btn btn-ghost flex-1 text-xs py-2.5 rounded-xl! group-hover:border-brand-400/50 hover:bg-brand-500! hover:text-white!">
                          Schedule Post
                        </button>
                      </div>
                    </div>
                  </TiltCard>
                </div>
              ))}

              {
                generations.length === 0 && (
                  <div className="col-span-full py-20 text-center space-y-3">
                    <div className="size-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto text-brand-300 float-y">
                      <Wand2Icon className="size-6" />
                    </div>
                    <p className="text-muted text-sm">No content generated yet. Try generating some content using the AI.</p>
                  </div>
                )
              }
          </div>
      </div>

      {/* Scheduler Modal */}
      {activeScheduler && (
        <div className="fixed inset-0 min-h-screen z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md backdrop-in">
          <div className="modal-in surface bg-ink-900/90! rounded-3xl shadow-[0_40px_120px_-30px_rgba(255,77,109,0.4)] w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">

            <div className="flex items-center justify-between px-8 py-4 border-b border-white/8 bg-white/3">
              <h3 className="font-serif text-lg font-medium text-white">Schedule Generation</h3>
              <button onClick={()=>setActiveScheduler(null)} aria-label="Close" className="p-2 rounded-full hover:bg-white/10 text-muted hover:text-white hover:rotate-90 transition-all duration-300">
                <XIcon className="size-5"/>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-4">
              <div className="bg-white/4 rounded-2xl p-6 border border-white/8 space-y-4">
                <p className="text-soft text-sm leading-relaxed whitespace-pre-wrap">{activeScheduler.prompt}</p>
              </div>

              <div className="bg-white/4 rounded-2xl p-6 border border-white/8 space-y-4">
                <p className="text-white text-sm leading-relaxed whitespace-pre-wrap">{activeScheduler.content}</p>
                {activeScheduler.mediaUrl && <img src={activeScheduler.mediaUrl} alt="preview" className="w-full aspect-video object-cover rounded-xl border border-white/10 shadow-lg"/>}
              </div>
            </div>

            <div className="p-6 sm:p-8 bg-black/20 border-t border-white/8 space-y-8">
              {/* Options */}
              <div className="space-y-6">
                <div>
                  <label className="label">Select Channels</label>
                  <div className="flex flex-wrap gap-2">
                    {PLATFORMS.map((p)=>{
                      const active = selectedPlatforms.includes(p.id);
                      return (
                        <button key={p.id} onClick={()=> setSelectedPlatforms((prev)=> (prev.includes(p.id) ? prev.filter((x)=>x !== p.id) : [...prev, p.id]))} aria-pressed={active} title={p.name}
                        className={`p-3 rounded-xl border text-xs transition-all duration-300 hover:-translate-y-0.5 ${active ? "bg-brand-500/20 border-brand-400/60 text-brand-300 shadow-[0_10px_26px_-10px_rgba(255,77,109,0.8)]" : "bg-white/4 border-white/10 text-muted hover:border-white/25 hover:text-white"}`}>
                          <p.icon className="size-4.5"/>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <CalendarIcon className="size-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none"/>
                    <input type="date" className="field pl-11 pr-4 py-3 rounded-xl text-sm" value={scheduledDate} onChange={(e)=>setScheduledDate(e.target.value)}/>
                  </div>
                  <div className="relative">
                    <ClockIcon className="size-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none"/>
                    <input type="time" className="field pl-11 pr-4 py-3 rounded-xl text-sm" value={scheduledTime} onChange={(e)=>setScheduledTime(e.target.value)}/>
                  </div>
                </div>
              </div>
              <button onClick={handleSchedule} className="btn btn-primary w-full py-3.5">
                {scheduling ? <Loader2Icon className="size-4 animate-spin"/> : <TimerIcon className="size-4"/>}
                 Schedule Post
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}

export default AIComposer

import { CheckCircleIcon, ExternalLinkIcon, XIcon } from "lucide-react";
import { PLATFORMS } from "../assets/assets";


interface PlatformPickerModalProps{
    connectedIds: string[];
    connecting: string | null;
    onClose: () => void;
    onConnect: (platformId: string) => void;
}

const PlatformPickerModal = ({connectedIds, connecting, onClose, onConnect} : PlatformPickerModalProps) => {

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md backdrop-in">
        <div className="modal-in relative surface bg-ink-900/90! rounded-3xl w-full max-w-md shadow-[0_40px_120px_-30px_rgba(255,77,109,0.4)]">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/8">
                <h3 className="font-serif text-lg font-medium text-white">Choose a Platform</h3>
                <button onClick={onClose} aria-label="Close" className="p-2 rounded-full hover:bg-white/10 text-muted hover:text-white hover:rotate-90 transition-all duration-300">
                    <XIcon className="size-4" />
                </button>
            </div>

            {/* Platform list */}
            <div className="p-6 flex flex-col gap-2.5">
                {PLATFORMS.map((p)=>{
                    const isConnected = connectedIds.includes(p.id);
                    const isConnecting = connecting === p.id;
                    return (
                        <button key={p.id}
                        disabled={isConnected || isConnecting}
                        onClick={()=>onConnect(p.id)}
                        className={`group flex items-center gap-3 p-3.5 rounded-2xl border text-left transition-all duration-300 ${isConnected ? "border-brand-500/30 bg-brand-500/10 cursor-default" : "border-white/10 bg-white/4 hover:border-brand-400/60 hover:bg-white/8 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-16px_rgba(255,77,109,0.7)] cursor-pointer"} ${isConnecting ? "opacity-60" : ""}`}>

                            {/* Icon */}
                            <div className="p-2 rounded-xl bg-white/6 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                                <p.icon className={`size-5 ${isConnected ? "text-brand-300" : "text-soft"}`}/>
                            </div>

                            {/* Label */}
                            <div className="flex-1 min-w-0">
                                <div className={`text-sm ${isConnected ? "text-brand-300" : "text-white"}`}>
                                    {p.name}
                                </div>
                                <div className="text-xs text-muted truncate">
                                    {isConnected ? "Already connected" : p.description}
                                </div>
                            </div>

                            
                              {/* Status */}
                            {isConnected && <CheckCircleIcon className="size-4 text-brand-400 shrink-0"/>}
                            {isConnecting && <div className="size-4 border-2 border-brand-400 border-t-transparent rounded-full animate-spin shrink-0"/>}
                            {!isConnected && !isConnecting && <ExternalLinkIcon className="size-3.5 text-muted group-hover:text-brand-300 transition-colors shrink-0"/>}
                        </button>
                    )
                })}

            </div>

        </div>
    </div>
  )
}

export default PlatformPickerModal

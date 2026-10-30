import { AlertCircleIcon, CheckCircleIcon, PlusIcon, UnplugIcon } from "lucide-react";
import { PLATFORMS } from "../assets/assets";
import TiltCard from "./fx/TiltCard";

interface AccountListProps {
    accounts: any[];
    onDisconnect: (accountId: string)=> Promise<void>
}

const AccountList = ({accounts, onDisconnect}: AccountListProps ) => {

    const handleDisconnect = async (accountId: string) => {
        const confirm = window.confirm("Are you sure you want to disconnect this account?");
        if(!confirm) return;
        await onDisconnect(accountId)
    }

    if(accounts.length === 0){
        return (
            <div className="rounded-3xl border-2 border-dashed border-white/12 bg-white/2 flex flex-col items-center justify-center py-20 px-6 fade-up">
                <div className="size-16 bg-brand-500/10 rounded-2xl flex items-center justify-center mb-5 border border-brand-500/25 float-y">
                    <PlusIcon className="size-7 text-brand-300"/>
                </div>
                <p className="font-serif text-xl text-white">No accounts connected</p>
                <p className="text-sm text-muted mt-1.5 max-w-xs text-center">Connect your first social platform to start scheduling and automating your content.</p>
            </div>
        )
    }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 [perspective:1200px]">
        {accounts.map((account, index)=>{
            const meta = PLATFORMS.find((p)=> p.id === account.platform);
            if(!meta) return null;

            return (
                <div key={index} className="fade-up" style={{ animationDelay: `${index * 70}ms` }}>
                    <TiltCard max={7} className="group surface surface-hover p-5 flex items-center gap-4">

                        <div className="size-12 bg-white/6 border border-white/10 rounded-xl flex items-center justify-center shrink-0 [transform:translateZ(30px)] transition-colors group-hover:bg-brand-500/15 group-hover:border-brand-500/30">
                            <meta.icon className="size-6 text-soft group-hover:text-white transition-colors"/>
                        </div>

                        <div className="flex-1 min-w-0 [transform:translateZ(20px)]">
                            <div className="text-white truncate">{account.handle}</div>
                            <div className="text-sm text-muted mt-0.5">{meta.name}</div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0 [transform:translateZ(20px)]">
                            {account.status === 'connected' ? (
                                <>
                                    <CheckCircleIcon className="size-4 text-emerald-400" />
                                    <span className="text-xs text-emerald-300">Connected</span>
                                </>
                            ): (
                                <>
                                    <AlertCircleIcon className="size-4 text-amber-glow"/>
                                    <span className="text-xs text-amber-glow">Disconnected</span>
                                </>
                            )}

                        </div>

                        <button 
                        onClick={()=> handleDisconnect(account._id)}
                        title="Disconnect account"
                        aria-label="Disconnect account"
                        className="ml-1 p-2 rounded-lg text-muted/60 hover:text-brand-300 hover:bg-brand-500/10 group-hover:text-brand-300 transition-all [transform:translateZ(30px)]">
                            <UnplugIcon className="size-4"/>
                        </button>

                    </TiltCard>
                </div>
            )
        })}
    </div>
  )
}

export default AccountList

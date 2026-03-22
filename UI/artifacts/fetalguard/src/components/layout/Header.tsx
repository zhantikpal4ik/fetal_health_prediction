import { Bell, Search } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-3 border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-slate-500 hover:text-slate-900" />
        
        <div className="relative hidden md:block w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
          <Input 
            type="search" 
            placeholder="Search patient ID or name..." 
            className="pl-9 bg-slate-50 border-slate-200 focus-visible:ring-primary/20 rounded-full h-9"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-5">
        <button className="relative text-slate-500 hover:text-slate-900 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white border-2 border-white">
            3
          </span>
        </button>
        
        <div className="flex items-center gap-3 border-l border-slate-200 pl-5">
          <div className="hidden md:flex flex-col items-end text-sm">
            <span className="font-semibold text-slate-900">Dr. Sarah Chen</span>
            <span className="text-xs text-slate-500">OB/GYN</span>
          </div>
          <Avatar className="h-9 w-9 border border-slate-200 cursor-pointer">
            <AvatarImage src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=256&auto=format&fit=crop" alt="Dr. Sarah Chen" />
            <AvatarFallback className="bg-primary/10 text-primary">SC</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}

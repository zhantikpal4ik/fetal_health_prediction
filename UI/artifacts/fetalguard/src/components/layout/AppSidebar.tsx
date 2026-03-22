import { Link, useLocation } from "wouter";
import { 
  Activity, 
  BrainCircuit, 
  Clock, 
  Home, 
  Settings, 
  UserSquare 
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Patient Chart", url: "/patient", icon: UserSquare },
  { title: "CTG Summary", url: "/ctg", icon: Activity },
  { title: "Risk Prediction", url: "/prediction", icon: BrainCircuit },
  { title: "History", url: "/history", icon: Clock },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const [location] = useLocation();

  return (
    <Sidebar className="border-r border-slate-200">
      <SidebarHeader className="p-4 flex items-center border-b border-slate-100">
        <div className="flex items-center gap-2 px-2">
          <div className="bg-primary/10 p-1.5 rounded-lg text-primary">
            <Activity className="w-5 h-5" />
          </div>
          <span className="font-bold text-lg tracking-tight text-slate-900">FetalGuard</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-500 font-medium">Clinical Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_ITEMS.map((item) => {
                const isActive = location === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link 
                        href={item.url} 
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-md transition-all",
                          isActive 
                            ? "bg-primary/10 text-primary font-medium" 
                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                        )}
                      >
                        <item.icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-slate-400")} />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

import { useLocation, Link } from "wouter";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  GitBranch,
  Settings,
  ChevronLeft,
  ChevronRight,
  HardHat,
} from "lucide-react";

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

const navItems = [
  { id: "dashboard", path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "jobs", path: "/jobs", label: "Jobs", icon: Briefcase },
  { id: "candidates", path: "/candidates", label: "Candidates", icon: Users },
  { id: "pipeline", path: "/pipeline", label: "Pipeline", icon: GitBranch },
  { id: "settings", path: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const [location] = useLocation();

  return (
    <div
      className={`flex flex-col bg-slate-900 text-white transition-all duration-200 ${
        collapsed ? "w-16" : "w-60"
      }`}
    >
      <div className="flex items-center gap-2 px-4 py-5 border-b border-slate-700">
        <HardHat className="w-7 h-7 text-blue-400 shrink-0" />
        {!collapsed && (
          <span className="text-xl font-bold tracking-tight text-white">
            Blukers
          </span>
        )}
      </div>

      <nav className="flex-1 py-4 space-y-1 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.path || (item.path !== "/dashboard" && location.startsWith(item.path));
          return (
            <Link
              key={item.id}
              href={item.path}
              className={`flex items-center gap-3 w-full rounded-lg px-3 py-2.5 text-sm font-medium transition-colors no-underline ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-700 p-2">
        <button
          onClick={onToggle}
          className="flex items-center justify-center w-full rounded-lg px-3 py-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
}

import { useAuth } from "../context/AuthContext";
import { auth } from "../lib/firebase";
import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { Bus, Users, Map, LayoutDashboard, LogOut, Activity, BarChart3, Settings } from "lucide-react";

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Failed to sign out", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#07111f] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-white/5 backdrop-blur-xl p-6 flex flex-col hidden md:flex">
        <Link to="/" className="flex items-center gap-3 mb-10">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-400 text-slate-950">
            <Bus size={20} />
          </span>
          <span className="font-black text-lg">AdminPanel</span>
        </Link>
        
        <nav className="flex-1 space-y-2">
          <NavItem icon={<LayoutDashboard />} label="Overview" active />
          <NavItem icon={<Bus />} label="Fleet Management" />
          <NavItem icon={<Map />} label="Live Routes" />
          <NavItem icon={<Users />} label="Passengers" />
          <NavItem icon={<Activity />} label="System Health" />
          <NavItem icon={<Settings />} label="Settings" />
        </nav>

        <div className="mt-auto border-t border-white/10 pt-6">
          <div className="flex items-center gap-3 mb-4">
            <img 
              src={user?.photoURL || "https://ui-avatars.com/api/?name=Admin+User&background=random"} 
              alt="User" 
              className="w-10 h-10 rounded-full"
            />
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate">{user?.displayName || "Admin User"}</p>
              <p className="text-xs text-slate-400 truncate">{user?.email}</p>
            </div>
          </div>
          <button 
            onClick={handleSignOut}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-red-500/10 text-red-400 px-4 py-2 text-sm font-bold transition-colors hover:bg-red-500/20"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-10 max-h-screen overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black">Dashboard Overview</h1>
            <p className="text-slate-400 mt-1">Welcome back, {user?.displayName?.split(" ")[0] || "Admin"}</p>
          </div>
          
          <div className="md:hidden">
            {/* Mobile menu toggle would go here */}
            <button onClick={handleSignOut} className="rounded-xl bg-red-500/10 p-3 text-red-400">
               <LogOut size={20} />
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard title="Active Buses" value="142" change="+12%" positive icon={<Bus />} color="text-cyan-400" bg="bg-cyan-400/10" />
          <StatCard title="Total Passengers" value="8,492" change="+5.4%" positive icon={<Users />} color="text-emerald-400" bg="bg-emerald-400/10" />
          <StatCard title="Revenue (Today)" value="LKR 4.2M" change="-1.2%" positive={false} icon={<BarChart3 />} color="text-indigo-400" bg="bg-indigo-400/10" />
          <StatCard title="System Alerts" value="3" change="Requires attention" positive={false} icon={<Activity />} color="text-amber-400" bg="bg-amber-400/10" />
        </div>

        {/* Recent Activity placeholder */}
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <h2 className="text-xl font-bold mb-6">Live Network Status</h2>
          <div className="h-64 rounded-xl bg-slate-900/50 flex items-center justify-center border border-white/5">
             <p className="text-slate-500 font-medium">Map integration pending API connection...</p>
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active }) {
  return (
    <a href="#" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${active ? "bg-cyan-400/10 text-cyan-400" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}>
      <span className="shrink-0">{icon}</span>
      <span className="font-bold text-sm">{label}</span>
    </a>
  );
}

function StatCard({ title, value, change, positive, icon, color, bg }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
      <div className="flex justify-between items-start mb-4">
        <span className={`p-3 rounded-xl ${bg} ${color}`}>
          {icon}
        </span>
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${positive ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"}`}>
          {change}
        </span>
      </div>
      <div>
        <h3 className="text-3xl font-black">{value}</h3>
        <p className="text-sm text-slate-400 mt-1">{title}</p>
      </div>
    </div>
  );
}

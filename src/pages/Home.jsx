import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Bus, CalendarDays, CheckCircle2, Clock, CreditCard, LocateFixed, MapPin, Navigation, QrCode, Radio, Search, ShieldCheck, Sparkles, Star, Ticket, Users, Wifi, Zap } from "lucide-react";
import { Button, Card } from "../components/UI.jsx";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const cities=["Colombo","Kandy","Galle","Jaffna","Badulla","Anuradhapura","Trincomalee","Matara","Negombo","Ella"];
// Buses will be fetched from API
const seats=Array.from({length:32},(_,i)=>({id:i+1,booked:[2,5,9,13,18,21,26,29].includes(i+1)}));

function Tracker({bus,pulse}){const p=Math.min(bus.progress+pulse,96);return <div className="rounded-3xl border border-cyan-300/20 bg-slate-950/85 p-5 shadow-2xl backdrop-blur-xl">
<div className="flex items-start justify-between gap-3"><div><p className="flex items-center gap-2 text-sm font-bold text-emerald-300"><Radio className="h-4 w-4"/> LIVE GPS</p><h3 className="mt-1 text-2xl font-black">{bus.operator}</h3><p className="text-sm text-slate-300">{bus.busNo} • Driver: {bus.driver}</p></div><div className="rounded-2xl bg-cyan-300 px-4 py-2 text-slate-950"><p className="text-xs font-black">ETA</p><p className="text-xl font-black">{bus.eta}</p></div></div>
<div className="mt-4 grid grid-cols-3 gap-2 text-center"><Stat title={`${bus.speed} km/h`} sub="Speed"/><Stat title={bus.delay} sub="Status"/><Stat title={bus.next} sub="Next stop"/></div>
<div className="mt-5"><div className="mb-2 flex justify-between text-xs text-slate-300"><span>{bus.from}</span><span>{bus.to}</span></div><div className="relative h-3 rounded-full bg-white/10"><motion.div animate={{width:`${p}%`}} className="h-3 rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300"/><motion.div animate={{left:`${p}%`}} className="absolute -top-3 grid h-9 w-9 -translate-x-1/2 place-items-center rounded-full bg-cyan-300 text-slate-950"><Bus className="h-5 w-5"/></motion.div></div><p className="mt-4 text-right text-xs text-slate-400">Demo location refreshes every 1.6 seconds</p></div></div>}
function Stat({title,sub}){return <div className="rounded-2xl bg-white/10 p-3"><p className="font-black">{title}</p><p className="text-xs text-slate-400">{sub}</p></div>}

export default function Home(){
const [buses, setBuses] = useState([]);
const [from,setFrom]=useState("Colombo"),[to,setTo]=useState("Kandy"),[selected,setSelected]=useState(null),[chosen,setChosen]=useState([6,10]),[pulse,setPulse]=useState(0);
useEffect(()=>{
  const fetchBuses = async () => {
    try {
      const res = await fetch("/api/buses");
      const data = await res.json();
      setBuses(data);
      if (data.length > 0) setSelected(data[0]);
    } catch (err) {
      console.error(err);
    }
  };
  fetchBuses();
  const t=setInterval(()=>setPulse(v=>v>=8?0:v+1),1600);return()=>clearInterval(t)
},[]);
const results=useMemo(()=>{const d=buses.filter(b=>b.from===from&&b.to===to);return d.length?d:buses},[from,to]);
const toggle=s=>{if(s.booked)return;setChosen(c=>c.includes(s.id)?c.filter(x=>x!==s.id):c.length<4?[...c,s.id]:c)};
const { user } = useAuth();

return <div className="min-h-screen bg-[#07111f] text-white"><div className="fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,.28),transparent_35%),radial-gradient(circle_at_85%_20%,rgba(16,185,129,.16),transparent_28%)]"/>
<main className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6">
<nav className="flex items-center justify-between rounded-full border border-white/10 bg-white/10 px-5 py-3 backdrop-blur-xl"><div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-full bg-cyan-400 text-slate-950"><Bus/></span><div><p className="font-black">BusMate Lanka</p><p className="text-xs text-slate-300">Smart Sri Lankan bus travel</p></div></div><div className="hidden gap-5 text-sm text-slate-300 md:flex"><span>Routes</span><span>Live Map</span><span>My Tickets</span><span>Support</span></div>
{user ? (
  <Link to="/admin"><Button className="rounded-full bg-emerald-400 px-5 py-2 font-bold text-emerald-950">Dashboard</Button></Link>
) : (
  <Link to="/login"><Button className="rounded-full bg-white px-5 py-2 font-bold text-slate-950">Sign in</Button></Link>
)}
</nav>
<section className="grid gap-8 py-12 lg:grid-cols-2 lg:items-center"><div><p className="inline-flex items-center gap-2 rounded-full bg-cyan-300/10 px-4 py-2 text-sm text-cyan-200"><Sparkles className="h-4 w-4"/> Built for Sri Lanka</p><h1 className="mt-5 text-5xl font-black leading-none sm:text-7xl">Book the best route, not just a seat.</h1><p className="mt-5 max-w-xl text-lg text-slate-300">Find buses, compare fares, choose seats, receive QR tickets and follow the bus with live GPS.</p>
<Card className="mt-8 rounded-3xl bg-white p-4 text-slate-950"><div className="grid gap-3 md:grid-cols-[1fr_1fr_1fr_auto]"><Select label="From" icon={<MapPin/>} value={from} set={setFrom}/><Select label="To" icon={<Navigation/>} value={to} set={setTo}/><label className="rounded-2xl bg-slate-100 p-3"><span className="flex items-center gap-2 text-xs font-bold text-slate-500"><CalendarDays className="h-4 w-4"/> DATE</span><input type="date" className="mt-2 w-full bg-transparent font-bold outline-none"/></label><Button className="rounded-2xl bg-slate-950 px-6 py-4 font-black text-white"><Search className="mx-auto"/></Button></div></Card></div>
<div className="rounded-[2.5rem] border border-white/10 bg-white/10 p-4 backdrop-blur-xl"><div className="relative min-h-[430px] overflow-hidden rounded-[2rem] bg-[#0b263d] p-5"><div className="absolute inset-0 opacity-20" style={{backgroundImage:"linear-gradient(30deg,transparent 48%,#67e8f9 49%,transparent 51%)",backgroundSize:"120px 120px"}}/><div className="relative flex justify-between"><div className="rounded-2xl bg-white p-4 text-slate-950"><p className="text-xs font-bold text-slate-500">LIVE NETWORK</p><p className="font-black">Sri Lanka</p></div><span className="h-fit rounded-full bg-emerald-400/20 px-3 py-2 text-xs font-bold text-emerald-200">GPS ONLINE</span></div><div className="absolute bottom-5 left-5 right-5">{selected && <Tracker bus={selected} pulse={pulse}/>}</div></div></div></section>
<section className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]"><div><p className="text-sm font-bold tracking-widest text-cyan-300">AVAILABLE BUSES</p><h2 className="mt-1 text-3xl font-black">Choose your ride</h2><div className="mt-5 space-y-4">{results.map(bus=><button key={bus.id} onClick={()=>setSelected(bus)} className={`w-full rounded-3xl border p-5 text-left ${selected?.id===bus.id?"border-cyan-300 bg-cyan-300/10":"border-white/10 bg-white/5"}`}><div className="flex flex-col justify-between gap-4 md:flex-row md:items-center"><div className="flex items-center gap-4"><span className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${bus.color}`}><Bus/></span><div><div className="flex flex-wrap items-center gap-2"><h3 className="text-xl font-black">{bus.operator}</h3><span className="rounded-full bg-emerald-400/15 px-2 py-1 text-xs text-emerald-200">Live GPS</span></div><p className="text-sm text-slate-300">{bus.type} • {bus.busNo}</p></div></div><div className="grid grid-cols-3 gap-2 text-center"><Stat title={bus.depart} sub="Depart"/><Stat title={bus.eta} sub="Live ETA"/><Stat title={`LKR ${bus.price.toLocaleString()}`} sub="Per seat"/></div></div><div className="mt-4 flex flex-wrap gap-4 border-t border-white/10 pt-4 text-sm text-slate-300"><span className="flex gap-1"><Star className="h-4 w-4 text-yellow-300"/>{bus.rating}</span><span className="flex gap-1"><Users className="h-4 w-4"/>{bus.seats} seats</span><span className="flex gap-1"><Clock className="h-4 w-4"/>Arrives {bus.arrive}</span><span className="flex gap-1"><LocateFixed className="h-4 w-4 text-emerald-300"/>Next {bus.next}</span></div></button>)}</div></div>
<div><Card className="rounded-[2rem] bg-white p-5 text-slate-950"><div className="flex justify-between"><div><p className="text-xs font-bold tracking-widest text-cyan-700">SEAT STUDIO</p><h2 className="text-3xl font-black">Choose seats</h2></div><span className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-950 text-cyan-300"><Ticket/></span></div><div className="mt-5 rounded-3xl bg-slate-100 p-5"><div className="mx-auto mb-4 w-28 rounded-t-2xl bg-slate-300 py-2 text-center text-xs font-bold">DRIVER</div><div className="grid grid-cols-4 gap-2">{seats.map((s,i)=><button key={s.id} onClick={()=>toggle(s)} disabled={s.booked} className={`h-11 rounded-xl font-black ${i%4===1?"mr-5":""} ${s.booked?"bg-slate-300 text-slate-500":chosen.includes(s.id)?"bg-cyan-500 text-white":"bg-emerald-200 text-emerald-900"}`}>{s.id}</button>)}</div></div><div className="mt-5 rounded-3xl border p-5"><div className="flex justify-between"><div><p className="font-black">{selected?.from || "..."} to {selected?.to || "..."}</p><p className="text-sm text-slate-500">Seats: {chosen.join(", ")||"None"}</p></div><div className="text-right"><p className="text-xs text-slate-500">TOTAL</p><p className="text-2xl font-black">LKR {(chosen.length*(selected?.price || 0)).toLocaleString()}</p></div></div><Button className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 py-4 font-black text-white"><CreditCard/> Pay & Book</Button></div></Card><div className="mt-4 grid grid-cols-3 gap-3">{[[LocateFixed,"Live GPS"],[ShieldCheck,"Safe Pay"],[QrCode,"QR Ticket"]].map(([I,t])=><div key={t} className="rounded-2xl bg-white/10 p-4 text-center"><I className="mx-auto text-cyan-300"/><p className="mt-2 text-sm font-bold">{t}</p></div>)}</div></div></section>
<footer className="mt-16 border-t border-white/10 py-8 text-center text-sm text-slate-400">BusMate Lanka prototype • GPS values are simulated until a backend or vehicle device is connected.</footer></main></div>}
function Select({label,icon,value,set}){return <label className="rounded-2xl bg-slate-100 p-3"><span className="flex items-center gap-2 text-xs font-bold text-slate-500">{icon}{label.toUpperCase()}</span><select value={value} onChange={e=>set(e.target.value)} className="mt-2 w-full bg-transparent text-lg font-black outline-none">{cities.map(c=><option key={c}>{c}</option>)}</select></label>}

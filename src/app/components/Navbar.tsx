"use client";
import Link from "next/link";
import {
  LayoutDashboard,
  PlusCircle,
  ClipboardList,
  Globe,
  UserCircle,
  LogOut,
  ShieldAlert,
  Menu,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/app/lib/supabase";

export default function Navbar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  async function handleLogout() {
    await supabase.auth.signOut();

    router.push("/login");
  }
  return (
    // <nav className="flex items-center justify-between px-8 py-4 border-b">
    <nav className="sticky top-0 z-50 border-b border-slate-700 bg-slate-900/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
        <Link
          href="/dashboard"
          className="flex items-center gap-3"
        >
          <div className="rounded-xl bg-blue-600 p-2 shadow-lg shadow-blue-600/30">
            <ShieldAlert size={22} className="text-white" />
          </div>

          <div>
            <h1 className="text-xl font-bold text-white">
              IncidentIQ
            </h1>

            <p className="text-xs text-slate-400">
              AI Incident Management
            </p>
          </div>
        </Link>

        {/* <div className="flex gap-6"> */}
        <div className="hidden items-center gap-2 lg:flex">

          {/* <Link href="/dashboard">Dashboard</Link> */}
          <Link
            href="/dashboard"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-slate-300 transition-all duration-200 hover:bg-slate-800 hover:text-blue-400"
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>
          {/* <Link href="/incidents">Incidents</Link> */}
          <Link
            href="/incidents"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-slate-300 transition-all duration-200 hover:bg-slate-800 hover:text-blue-400"
          >
            <ClipboardList size={18} />
            My Incidents
          </Link>
          {/* <Link href="/incidents/new">New Incident</Link> */}
          <Link
            href="/incidents/new"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-slate-300 transition-all duration-200 hover:bg-slate-800 hover:text-blue-400"
          >
            <PlusCircle size={18} />
            New
          </Link>
          {/* <Link href="/all-incidents">All Incidents</Link> */}
          <Link
            href="/all-incidents"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-slate-300 transition-all duration-200 hover:bg-slate-800 hover:text-blue-400"
          >
            <Globe size={18} />
            All Incidents
          </Link>
          {/* <Link href="/profile">Profile</Link> */}
          <Link
            href="/profile"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-slate-300 transition-all duration-200 hover:bg-slate-800 hover:text-blue-400"
          >
            <UserCircle size={18} />
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="ml-3 flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition-all duration-200 hover:scale-105 hover:bg-red-700"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg p-2 text-white transition hover:bg-slate-800 lg:hidden"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {menuOpen && (
        <div className="border-t border-slate-700 bg-slate-900 lg:hidden">
          <div className="flex flex-col space-y-2 px-4 py-4">

            <Link
              href="/dashboard"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-4 py-3 text-slate-300 hover:bg-slate-800"
            >
              Dashboard
            </Link>

            <Link
              href="/incidents"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-4 py-3 text-slate-300 hover:bg-slate-800"
            >
              My Incidents
            </Link>

            <Link
              href="/incidents/new"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-4 py-3 text-slate-300 hover:bg-slate-800"
            >
              New Incident
            </Link>

            <Link
              href="/all-incidents"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-4 py-3 text-slate-300 hover:bg-slate-800"
            >
              All Incidents
            </Link>

            <Link
              href="/profile"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-4 py-3 text-slate-300 hover:bg-slate-800"
            >
              Profile
            </Link>

            <button
              onClick={handleLogout}
              className="rounded-lg bg-red-600 px-4 py-3 text-left font-medium text-white hover:bg-red-700"
            >
              Logout
            </button>

          </div>
        </div>
      )}
    </nav>
  );
}
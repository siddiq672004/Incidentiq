"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  async function loadProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    setEmail(user.email || "");

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error && error.code !== "PGRST116") {
      console.error(error);
      return;
    }

    if (data) {
      setFullName(data.full_name || "");
    }

    setLoading(false);
  }
  async function handleSave() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .upsert({
        id: user.id,
        email: user.email,
        full_name: fullName,
      });

    if (error) {
      console.error(error);
      alert("Failed to save profile.");
      return;
    }

    alert("Profile saved successfully!");
  }
  useEffect(() => {
    loadProfile();
  }, []);
  return (
    <main className="max-w-2xl mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-5xl font-bold text-white">
          My Profile
        </h1>

        <p className="mt-2 text-slate-400">
          Manage your personal information and account details.
        </p>
      </div>

      {loading ? (
        // <p>Loading...</p>
        <div className="rounded-2xl border border-slate-700 bg-slate-900 p-8 text-center text-slate-400">
          Loading profile...
        </div>
      ) : (
        <div className="space-y-8 rounded-2xl border border-slate-700 bg-slate-900 p-8 shadow-xl">
          <div>
            <div className="flex flex-col items-center border-b border-slate-700 pb-8">
  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 text-3xl font-bold text-white shadow-lg shadow-blue-600/30">
    {fullName
      ? fullName.charAt(0).toUpperCase()
      : email.charAt(0).toUpperCase()}
  </div>

  <h2 className="mt-4 text-2xl font-semibold text-white">
    {fullName || "Your Name"}
  </h2>

  <p className="text-slate-400">
    {email}
  </p>
</div>
            <label className="mb-2 block text-sm font-semibold uppercase tracking-wide text-slate-300">
              Full Name
            </label>

            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold uppercase tracking-wide text-slate-300">
              Email
            </label>

            <input
              type="email"
              value={email}
              readOnly
              className="w-full cursor-not-allowed rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-slate-400"
            /></div>
            <button
              onClick={handleSave}
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Save Profile
            </button>
          </div>
        
      )}
    </main>
  );
}
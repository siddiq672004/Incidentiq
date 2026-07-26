"use client";
import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/app/lib/supabase";
import { useRouter } from "next/navigation";
import { ShieldAlert } from "lucide-react";
export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerError, setRegisterError] = useState("");
  const router = useRouter();

  async function handleRegister() {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    console.log(data);
    console.log(error);

    if (error) {
      // alert(error.message);
      setRegisterError(error.message);
      return;
    }

    alert("Account created successfully!");
    router.push("/login");
    console.log(data);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-8 shadow-2xl">

        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-600/30">
            <ShieldAlert size={34} className="text-white" />
          </div>

          <h1 className="text-4xl font-bold text-white">
            Create Account
          </h1>

          <p className="mt-2 text-slate-400">
            Join IncidentIQ and start managing incidents.
          </p>
        </div>

        <input
          type="email"
          placeholder="Email"
          className="mb-4 w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition-all duration-200 placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="mb-6 w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition-all duration-200 placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {registerError && (
          <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
            {registerError}
          </div>
        )}

        <button
          onClick={handleRegister}
          className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white shadow-lg shadow-blue-600/30 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-blue-500/40"
        >
          Create Account
        </button>
        <div className="mt-4 text-center">
          <p className="text-sm text-slate-400"></p><p className="text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-blue-400 transition-colors duration-200 hover:text-blue-300"
            >
              Login
            </Link>
          </p>
        </div>

      </div>
    </main>
  );
}
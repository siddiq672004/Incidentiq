"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase";
import StatCard from "@/app/components/StatCard";
import Link from "next/link";
import {
  ClipboardList,
  AlertTriangle,
  CircleCheckBig,
  Sparkles,
  PlusCircle,
} from "lucide-react";

// const incidents = [
//   {
//     id: 1,
//     title: "Database Timeout",
//     severity: "Critical",
//     status: "Pending",
//   },
//   {
//     id: 2,
//     title: "Login Failure",
//     severity: "Medium",
//     status: "Resolved",
//   },
//   {
//     id: 3,
//     title: "Payment API Crash",
//     severity: "Critical",
//     status: "Pending",
//   },
// ];

export default function Dashboard() {
  const router = useRouter();
  const [incidents, setIncidents] = useState<any[]>([]);
  useEffect(() => {
    async function loadDashboard() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("incidents")
        .select("*")
        // .eq("user_id", user.id)
        .eq("assigned_to", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        return;
      }

      setIncidents(data);
    }

    loadDashboard();
  }, []);
  //   const highIncidents = incidents.filter(
  //   (incident) => incident.severity === "High"
  // );

  const resolvedIncidents = incidents.filter(
    (incident) => incident.status === "Resolved"
  );

  const pendingIncidents = incidents.filter(
    (incident) => incident.status === "Pending"
  );

  return (
    <main className="mx-auto max-w-7xl p-4 md:p-6 lg:p-8">

      {/* Header */}

      <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <div className="mb-3 flex items-center gap-2 text-blue-400">

            <Sparkles size={20} />

            <span className="text-sm font-semibold uppercase tracking-widest">
              AI Incident Management
            </span>

          </div>

          <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">

            Dashboard

          </h1>

          <p className="mt-2 text-lg text-slate-400">

            Monitor incidents assigned to you and keep your systems healthy.

          </p>

        </div>

      </div>
      {/* Statistics */}

      {/* <div className="grid grid-cols-3 gap-6"> */}
      <div className="mb-12 grid gap-6 md:grid-cols-3">

        <StatCard
          title="Total Incidents"
          value={incidents.length.toString()}
        />

        {/* <StatCard
  title="High Severity"
  value={highIncidents.length.toString()}
/> */}

        <StatCard
          title="Resolved"
          value={resolvedIncidents.length.toString()}
        />

        <StatCard
          title="Pending"
          value={pendingIncidents.length.toString()}
        />

      </div>

      {/* Recent Incidents */}

      <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-lg">

        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <h2 className="text-2xl font-bold">

            Recent Incidents

          </h2>

          <button
            onClick={() => router.push("/incidents/new")}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-600/30 transition-all duration-300 hover:bg-blue-700 sm:w-auto"
          >
            <PlusCircle size={18} />
            New Incident
          </button>

        </div>

        <div className="overflow-x-auto">
          <table className="mt-4 min-w-full rounded-xl">

            <thead>

              <tr className="border-b border-slate-700 text-slate-400">

                <th className="p-3 text-left">

                  Incident

                </th>

                <th className="p-3">

                  Severity

                </th>

                <th className="p-3">

                  Status

                </th>

              </tr>

            </thead>

            <tbody>

              {incidents.slice(0, 5).map((incident) => (

                <tr
                  key={incident.id}
                  className="border-b border-slate-800 transition-colors hover:bg-slate-800"
                >

                  <td className="p-3">
                    <Link
                      href={`/incidents/${incident.id}`}
                      // className="font-medium text-blue-400 transition hover:text-blue-300 hover:underline"
                      className="font-medium text-slate-200 transition-colors duration-200 hover:text-blue-400"
                    >
                      {incident.title}
                    </Link>
                  </td>

                  <td className="text-center">

                    {incident.severity}

                  </td>

                  <td className="text-center">

                    {incident.status}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>
        </div>

      </div>

    </main>
  );
}
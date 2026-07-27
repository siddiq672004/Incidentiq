"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";

export default function IncidentsPage() {
  const [incidents, setIncidents] = useState<any[]>([]);
  const [profiles, setProfiles] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [severityFilter, setSeverityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    resolved: 0,
  });
  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this incident?"
    );

    if (!confirmed) return;
    const { error } = await supabase
      .from("incidents")
      .delete()
      .eq("id", id);
    if (error) {
      // console.error(error);
      console.log(error);
      alert(JSON.stringify(error));
      return;
    }
    setIncidents((currentIncidents) =>
      currentIncidents.filter((incident) => incident.id !== id)
    );
  }
  useEffect(() => {
    async function loadIncidents() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      // const { data, error } = await supabase
      //   .from("incidents")
      //   .select("*")
      //   // .eq("user_id", user.id)
      // //   .eq("assigned_to", user.id)
      //   .order("created_at", { ascending: false });
      const { data, error } = await supabase
        .from("incidents")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) {
        console.error(error);
        return;
      }

      setIncidents(data);
      setStats({
        total: data?.length || 0,
        pending:
          data?.filter(
            (incident) => incident.status === "Pending"
          ).length || 0,
        resolved:
          data?.filter(
            (incident) => incident.status === "Resolved"
          ).length || 0,
      });
      const { data: profileData, error: profileError } =
        await supabase
          .from("profiles")
          .select("id, full_name");

      if (profileError) {
        console.error(profileError);
      } else {
        setProfiles(profileData);
      }
      console.log(data);

    }

    loadIncidents();
  }, []);
  const filteredIncidents = incidents
    .filter((incident) => {
      const matchesSearch = incident.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesSeverity =
        severityFilter === "All" ||
        incident.severity === severityFilter;

      const matchesStatus =
        statusFilter === "All" ||
        incident.status === statusFilter;

      return (
        matchesSearch &&
        matchesSeverity &&
        matchesStatus
      );
    })
    .sort((a, b) => {
      if (a.status === b.status) {
        return (
          new Date(b.created_at).getTime() -
          new Date(a.created_at).getTime()
        );
      }

      return a.status === "Pending" ? -1 : 1;
    });
  return (
    <main className="max-w-6xl mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-5xl font-bold text-white">
          All Incidents
        </h1>

        <p className="mt-2 text-slate-400">
          Browse and manage incidents across your organization.
        </p>
        <div className="mb-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-lg transition-all duration-300 hover:scale-105">
            <p className="text-sm text-slate-400">
              Total Incidents
            </p>

            <h2 className="mt-3 text-5xl font-bold text-white">
              {stats.total}
            </h2>
          </div>

          <div className="rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-6 shadow-lg transition-all duration-300 hover:scale-105">
            <p className="text-sm text-yellow-400">
              Pending
            </p>

            <h2 className="mt-3 text-5xl font-bold text-yellow-400">
              {stats.pending}
            </h2>
          </div>

          <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-6 shadow-lg transition-all duration-300 hover:scale-105">
            <p className="text-sm text-green-400">
              Resolved
            </p>

            <h2 className="mt-3 text-5xl font-bold text-green-400">
              {stats.resolved}
            </h2>
          </div>
        </div>
      </div>
      <div className="mb-8 flex flex-wrap gap-4 rounded-2xl border border-slate-700 bg-slate-900 p-5 shadow-lg">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded border border-gray-600 bg-gray-800 px-3 py-2 text-white placeholder-gray-400"
        />

        <select
          value={severityFilter}
          onChange={(e) => setSeverityFilter(e.target.value)}
          className="w-72 rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition-all duration-200 placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"        >
          <option value="All">All Severities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>
      <div className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-lg">

        <table className="w-full">
          <thead>
            {/* <tr className="bg-gray-100 text-black"> */}
            <tr className="border-b border-slate-700 bg-slate-800 text-slate-300">
              <th className="border p-3 text-left">Title</th>
              <th className="border p-3 text-left">Severity</th>
              <th className="border p-3 text-left">Assigned To</th>
              <th className="border p-3 text-left">Created</th>
              <th className="border p-3 text-left">Status</th>
              <th className="border p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {/* {incidents.map((incident) => ( */}
            {filteredIncidents.map((incident) => (
              // <tr key={incident.id}>
              <tr
                key={incident.id}
                className="transition-colors duration-200 hover:bg-slate-800"
              >
                <td className="border-b border-slate-800 p-4">
                  <Link
                    href={`/incidents/${incident.id}`}
                    className="font-medium text-slate-200 transition-colors duration-200 hover:text-blue-400"
                  >
                    {incident.title}
                  </Link>
                </td>

                {/* <td className="border p-3">
          {incident.severity}
        </td> */}
                <td className="border-b border-slate-800 p-4">
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${incident.severity === "High"
                      ? "bg-red-500/20 text-red-400"
                      : incident.severity === "Medium"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-green-500/20 text-green-400"
                      }`}
                  >
                    {incident.severity}
                  </span>
                </td>
                {/* <td className="border p-3">
  {incident.assigned_to ?? "Unassigned"}
</td> */}
                <td className="border-b border-slate-800 p-4">
                  {profiles.find(
                    (profile) => profile.id === incident.assigned_to
                  )?.full_name ?? "Unassigned"}
                </td>

                <td className="border-b border-slate-800 p-4">
                  {new Date(incident.created_at).toLocaleDateString()}
                </td>
                {/* <td className="border p-3">
  {incident.status}
</td> */}
                <td className="border-b border-slate-800 p-4">
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${incident.status === "Resolved"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-yellow-500/20 text-yellow-400"
                      }`}
                  >
                    {incident.status}
                  </span>
                </td>
                <td className="border p-3 text-center">

                  <button
                    onClick={() => handleDelete(incident.id)}
                    className="rounded-xl bg-red-600 px-4 py-2 font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
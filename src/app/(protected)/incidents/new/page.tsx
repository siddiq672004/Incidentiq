"use client";

import { useState } from "react";
import { supabase } from "@/app/lib/supabase";

export default function NewIncidentPage() {
  const [title, setTitle] = useState("");
  const [log, setLog] = useState("");
  // const [analysis, setAnalysis] = useState("");
  const [analysis, setAnalysis] = useState<any>(null);

  async function handleAnalyze() {

    try {

      const response = await fetch("/api/analyze", {

        method: "POST",

        headers: {

          "Content-Type": "application/json",

        },

        body: JSON.stringify({

          title,

          log,

        }),

      });

      const data = await response.json();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        alert("You must be logged in.");
        return;
      }
      // const { error } = await supabase
      const { data: incident, error } = await supabase
        .from("incidents")
        .insert({
          user_id: user.id,
          assigned_to: null,
          title: title,
          log: log,
          summary: data.analysis.summary,
          severity: data.analysis.severity,
          status: "Pending",
          possible_cause: data.analysis.possibleCause,
          suggested_fix: data.analysis.suggestedFix,
        })
        .select()
        .single();

      if (error) {
        console.error(error);
        alert("Failed to save incident.");
        return;
      }
      await supabase.from("activity_logs").insert({
        incident_id: incident.id,
        user_id: user.id,
        action: "Created incident",
      });
      setAnalysis(data.analysis);

    } catch (error) {

      console.error(error);

      alert("Something went wrong.");

    }

  }

  return (
    <main className="mx-auto max-w-4xl p-4 md:p-6 lg:p-8">

      <div className="mb-10">
        <h1 className="text-3xl md:text-5xl font-bold text-white">
          New Incident
        </h1>

        <p className="mt-2 text-slate-400">
          Submit an incident log and let AI analyze the issue.
        </p>
      </div>

      <div className="space-y-6 rounded-2xl border border-slate-700 bg-slate-900 p-5 md:p-8 shadow-xl">

        <div>
          <label className="mb-2 block text-sm font-semibold uppercase tracking-wide text-slate-300">            Incident Title
          </label>

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder=""
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition-all duration-200 placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
          />
        </div>

        <div className="rounded-xl bg-slate-800 p-5">
          <label className="block mb-2 font-semibold">
            Error Log
          </label>

          <textarea
            value={log}
            onChange={(e) => setLog(e.target.value)}
            placeholder="Paste your stack trace here..."
            rows={12}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition-all duration-200 placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
          />
        </div>

        <button
          onClick={handleAnalyze}
          className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white shadow-lg shadow-blue-600/30 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-blue-500/40"
        >
          Analyze with AI
        </button>
        {analysis && (
          <div className="mt-10 rounded-2xl border border-blue-500/30 bg-slate-900 p-8 shadow-lg shadow-blue-500/10">
            <h2 className="mb-6 text-3xl font-bold text-blue-400">
              AI Analysis
            </h2>

            {/* <pre className="whitespace-pre-wrap">
            {analysis}
          </pre> */}
            <div className="space-y-6 rounded-2xl border border-slate-700 bg-slate-900 p-8 shadow-xl">

              <div className="rounded-xl bg-slate-800 p-5">
                <h3 className="font-bold text-lg">
                  Summary
                </h3>

                <p>{analysis.summary}</p>
              </div>

              <div className="rounded-xl bg-slate-800 p-5">
                <h3 className="font-bold text-lg">
                  Severity
                </h3>

                {/* <p>{analysis.severity}</p> */}
                <span
                  className={`inline-block rounded-full px-4 py-2 text-sm font-semibold ${analysis.severity === "High"
                    ? "bg-red-500/20 text-red-400"
                    : analysis.severity === "Medium"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-green-500/20 text-green-400"
                    }`}
                >
                  {analysis.severity}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-lg">
                  Possible Cause
                </h3>

                <p>{analysis.possibleCause}</p>
              </div>

              <div className="rounded-xl bg-slate-800 p-5">
                <h3 className="font-bold text-lg">
                  Suggested Fixes
                </h3>

                <ul className="space-y-3">
                  {analysis.suggestedFix.map((fix: string, index: number) => (
                    <li
                      key={index}
                      className="rounded-lg bg-slate-700 px-4 py-3"
                    >
                      ✅ {fix}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        )}
      </div>

    </main>
  );
}
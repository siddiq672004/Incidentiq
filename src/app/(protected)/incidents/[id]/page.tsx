"use client";
// import { useEffect, useState } from "react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/app/lib/supabase";



// export default function IncidentDetailsPage({
//   params,
// }: {
//   params: { id: string };
// }) {
export default function IncidentDetailsPage() {
  const [incident, setIncident] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const params = useParams();
  const id = params.id as string;
  async function handleResolve() {
    const { error } = await supabase
      .from("incidents")
      .update({
        status: "Resolved",
      })
      .eq("id", id);
    console.log("Update error:", error);
    if (error) {
      console.error(error);
      return;
    }

    setIncident({
      ...incident,
      status: "Resolved",
    });
  }
  async function handleAssign() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;
    if (incident.assigned_to) {
      alert("This incident is already assigned.");
      return;
    }

    const { error } = await supabase
      .from("incidents")
      .update({
        assigned_to: user.id,
      })
      .eq("id", id);

    if (error) {
      console.error("Assign Error:", error);
      alert(error.message);
      return;
    }

    setIncident({
      ...incident,
      assigned_to: user.id,
    });
    await supabase.from("activity_logs").insert({
      incident_id: incident.id,
      user_id: user.id,
      action: "Assigned incident",
    });
  }
  async function loadComments() {
    const { data: commentData, error: commentError } = await supabase
      .from("comments")
      .select("*")
      .eq("incident_id", id)
      .order("created_at", { ascending: true });

    if (commentError) {
      console.error(commentError);
      return;
    }

    const userIds = [...new Set(commentData.map((c) => c.user_id))];

    const { data: profiles, error: profileError } = await supabase
      .from("profiles")
      .select("id, full_name")
      .in("id", userIds);

    if (profileError) {
      console.error(profileError);
      return;
    }

    const commentsWithNames = commentData.map((comment) => ({
      ...comment,
      full_name:
        profiles?.find((profile) => profile.id === comment.user_id)?.full_name ??
        "Unknown User",
    }));

    setComments(commentsWithNames);
  }
  async function handleComment() {
    if (!newComment.trim()) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { error } = await supabase
      .from("comments")
      .insert({
        incident_id: id,
        user_id: user.id,
        comment: newComment,
      });

    if (error) {
      console.error(error);
      return;
    }

    setNewComment("");
    await loadComments();

  }
  useEffect(() => {
    async function loadIncident() {
      const { data, error } = await supabase
        .from("incidents")
        .select("*")
        // .eq("id", params.id)
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
        return;
      }

      setIncident(data);
      await loadComments();
    }

    loadIncident();
    // }, [params.id]);
  }, [id]);

  if (!incident) {
    return <p className="p-8">Loading...</p>;
  }
  return (
    <main className="max-w-4xl mx-auto p-8 space-y-8">
      <h1 className="text-4xl font-bold">
        {incident.title}
      </h1>
      {/* <pre>{JSON.stringify(incident, null, 2)}</pre> */}
      <div className="border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2">
          Severity
        </h2>
        <p>{incident.severity}</p>
      </div>
      <div className="border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2">
          Status
        </h2>

        <p className="mb-4">{incident.status}</p>

        {incident.status === "Pending" && (
          <button
            onClick={handleResolve}
            className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
          >
            Mark as Resolved
          </button>
        )}
      </div>
      <div className="border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2">
          Assigned To
        </h2>

        <p className="mb-4">
          {incident.assigned_to ? "Assigned" : "Unassigned"}
        </p>

        {!incident.assigned_to && (
          <button
            onClick={handleAssign}
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Assign to Me
          </button>
        )}
      </div>
      <div className="border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2">
          Summary
        </h2>
        <p>{incident.summary}</p>
      </div>

      <div className="border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2">
          Possible Cause
        </h2>
        <p>{incident.possible_cause}</p>
      </div>

      <div className="border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2">
          Suggested Fixes
        </h2>

        <ul className="list-disc pl-6">
          {incident.suggested_fix.map((fix: string, index: number) => (
            <li key={index}>{fix}</li>
          ))}
        </ul>
      </div>

      <div className="border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2">
          Original Log
        </h2>

        <pre className="rounded bg-gray-100 p-4 whitespace-pre-wrap text-black">
          {incident.log}
        </pre>
      </div>
      <div className="border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">
          Comments
        </h2>

        {comments.map((comment) => (
          <div
            key={comment.id}
            className="mb-4 rounded border p-3"
          >
            {/* <p>{comment.comment}</p> */}
            <p className="font-semibold text-blue-400">
              {/* {comment.profiles?.full_name ?? "Unknown User"} */}
              {comment.full_name}
            </p>

            <p className="mt-2">
              {comment.comment}
            </p>

            <p className="mt-2 text-sm text-gray-500">
              {new Date(comment.created_at).toLocaleString()}
            </p>
          </div>
        ))}

        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="mt-4 w-full rounded border border-gray-600 bg-gray-800 p-3 text-white"
          rows={4}
          placeholder="Write a comment..."
        />

        <button
          onClick={handleComment}
          className="mt-4 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Post Comment
        </button>
      </div>
    </main>
  );
}
"use client";

import { useEffect, useState } from "react";
import { supabase, Incident, IncidentStatus } from "@/lib/supabaseClient";
import { STATUS_LABELS } from "@/lib/incidentMeta";
import Header from "@/components/Header";
import IncidentCard from "@/components/IncidentCard";
import { Loader2 } from "lucide-react";

const STATUS_OPTIONS: IncidentStatus[] = [
  "pending",
  "verified",
  "in_progress",
  "resolved",
  "dismissed",
];

export default function AdminPage() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  async function loadIncidents() {
    setLoading(true);
    // Admin uses the base table (not the public view) since role-checking
    // for reporter identity access would be handled here in a full build.
    const { data } = await supabase
      .from("incidents")
      .select("*")
      .order("created_at", { ascending: false });
    setIncidents((data as Incident[]) || []);
    setLoading(false);
  }

  useEffect(() => {
    loadIncidents();
  }, []);

  async function updateStatus(id: string, status: IncidentStatus) {
    setUpdatingId(id);
    await supabase.from("incidents").update({ status }).eq("id", id);
    setIncidents((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status } : i))
    );
    setUpdatingId(null);
  }

  const pendingCount = incidents.filter((i) => i.status === "pending").length;

  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-bold text-brand-dark">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-slate-600">
          Verify, respond to, and manage all submitted incident reports.
        </p>

        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-lg border border-slate-200 bg-white p-4 text-center">
            <p className="text-2xl font-bold text-brand-dark">
              {incidents.length}
            </p>
            <p className="text-xs text-slate-500">Total Reports</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4 text-center">
            <p className="text-2xl font-bold text-yellow-600">
              {pendingCount}
            </p>
            <p className="text-xs text-slate-500">Pending Review</p>
          </div>
        </div>

        <p className="mt-6 rounded-md bg-amber-50 p-3 text-xs text-amber-800">
          Note: for this assignment demo, admin access is not gated behind
          authentication. A production version would restrict this page to
          authenticated Admin/Security accounts only, per NFR2 in the SRS.
        </p>

        <div className="mt-6 space-y-4">
          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="h-6 w-6 animate-spin text-brand" />
            </div>
          ) : incidents.length === 0 ? (
            <p className="py-10 text-center text-sm text-slate-500">
              No incidents reported yet.
            </p>
          ) : (
            incidents.map((incident) => (
              <IncidentCard key={incident.id} incident={incident}>
                <div className="flex items-center gap-2">
                  <label className="text-xs font-medium text-slate-600">
                    Update status:
                  </label>
                  <select
                    value={incident.status}
                    disabled={updatingId === incident.id}
                    onChange={(e) =>
                      updateStatus(incident.id, e.target.value as IncidentStatus)
                    }
                    className="rounded-md border border-slate-300 px-2 py-1 text-xs focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {STATUS_LABELS[s]}
                      </option>
                    ))}
                  </select>
                  {updatingId === incident.id && (
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-brand" />
                  )}
                </div>
              </IncidentCard>
            ))
          )}
        </div>
      </main>
    </>
  );
}

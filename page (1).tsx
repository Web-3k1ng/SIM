"use client";

import { useEffect, useState } from "react";
import { supabase, Incident, IncidentType } from "@/lib/supabaseClient";
import { INCIDENT_TYPE_LABELS } from "@/lib/incidentMeta";
import Header from "@/components/Header";
import IncidentCard from "@/components/IncidentCard";
import { Loader2, RefreshCw } from "lucide-react";

export default function FeedPage() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<IncidentType | "all">("all");

  async function loadIncidents() {
    setLoading(true);
    const { data } = await supabase
      .from("incidents_public")
      .select("*")
      .order("created_at", { ascending: false });
    setIncidents((data as Incident[]) || []);
    setLoading(false);
  }

  useEffect(() => {
    loadIncidents();
  }, []);

  const filtered =
    filter === "all"
      ? incidents
      : incidents.filter((i) => i.incident_type === filter);

  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-brand-dark">
            Incident Feed
          </h1>
          <button
            onClick={loadIncidents}
            className="flex items-center gap-1 rounded-md border border-slate-300 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50"
          >
            <RefreshCw className="h-4 w-4" /> Refresh
          </button>
        </div>
        <p className="mt-1 text-sm text-slate-600">
          Recent reports from students, staff, and landlords across campus and
          surrounding housing.
        </p>

        <div className="mt-5">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as IncidentType | "all")}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          >
            <option value="all">All Incident Types</option>
            {Object.entries(INCIDENT_TYPE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6 space-y-4">
          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="h-6 w-6 animate-spin text-brand" />
            </div>
          ) : filtered.length === 0 ? (
            <p className="py-10 text-center text-sm text-slate-500">
              No incidents reported yet for this filter.
            </p>
          ) : (
            filtered.map((incident) => (
              <IncidentCard key={incident.id} incident={incident} />
            ))
          )}
        </div>
      </main>
    </>
  );
}

import { Incident } from "@/lib/supabaseClient";
import { INCIDENT_TYPE_LABELS, STATUS_LABELS, STATUS_COLORS } from "@/lib/incidentMeta";
import { MapPin, Clock, User } from "lucide-react";

export default function IncidentCard({
  incident,
  children,
}: {
  incident: Incident;
  children?: React.ReactNode;
}) {
  const date = new Date(incident.created_at).toLocaleString("en-NG", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="inline-block rounded bg-red-50 px-2 py-0.5 text-xs font-semibold text-red-700">
            {INCIDENT_TYPE_LABELS[incident.incident_type]}
          </span>
          <p className="mt-2 text-sm text-slate-800">{incident.description}</p>
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_COLORS[incident.status]}`}
        >
          {STATUS_LABELS[incident.status]}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-500">
        <span className="flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5" /> {incident.location}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" /> {date}
        </span>
        <span className="flex items-center gap-1">
          <User className="h-3.5 w-3.5" />
          {incident.is_anonymous ? "Anonymous" : incident.reporter_name || "Unknown"}
        </span>
      </div>

      {children && <div className="mt-3 border-t border-slate-100 pt-3">{children}</div>}
    </div>
  );
}

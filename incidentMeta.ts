import { IncidentStatus, IncidentType } from "./supabaseClient";

export const INCIDENT_TYPE_LABELS: Record<IncidentType, string> = {
  stabbing: "Stabbing",
  robbery: "Robbery",
  theft: "Theft / Stealing",
  assault: "Assault",
  sexual_assault: "Sexual Assault / Harassment",
  murder: "Murder",
  burglary: "Burglary (Break-in)",
  other: "Other",
};

export const STATUS_LABELS: Record<IncidentStatus, string> = {
  pending: "Pending Review",
  verified: "Verified",
  in_progress: "In Progress",
  resolved: "Resolved",
  dismissed: "Dismissed",
};

export const STATUS_COLORS: Record<IncidentStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  verified: "bg-blue-100 text-blue-800",
  in_progress: "bg-orange-100 text-orange-800",
  resolved: "bg-green-100 text-green-800",
  dismissed: "bg-slate-100 text-slate-600",
};

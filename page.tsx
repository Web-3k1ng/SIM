"use client";

import { useState } from "react";
import { supabase, IncidentType } from "@/lib/supabaseClient";
import { INCIDENT_TYPE_LABELS } from "@/lib/incidentMeta";
import Header from "@/components/Header";
import { CheckCircle2, Loader2 } from "lucide-react";

const INCIDENT_TYPES: IncidentType[] = [
  "stabbing",
  "robbery",
  "theft",
  "assault",
  "sexual_assault",
  "murder",
  "burglary",
  "other",
];

export default function ReportPage() {
  const [incidentType, setIncidentType] = useState<IncidentType>("theft");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [reporterName, setReporterName] = useState("");
  const [reporterContact, setReporterContact] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!description.trim() || !location.trim()) {
      setError("Please fill in both the location and description.");
      return;
    }

    setSubmitting(true);
    const { error: insertError } = await supabase.from("incidents").insert({
      incident_type: incidentType,
      description: description.trim(),
      location: location.trim(),
      is_anonymous: isAnonymous,
      reporter_name: isAnonymous ? null : reporterName.trim() || null,
      reporter_contact: isAnonymous ? null : reporterContact.trim() || null,
    });
    setSubmitting(false);

    if (insertError) {
      setError("Something went wrong submitting your report. Please try again.");
      return;
    }

    setSubmitted(true);
    setDescription("");
    setLocation("");
    setReporterName("");
    setReporterContact("");
  }

  return (
    <>
      <Header />
      <main className="mx-auto max-w-2xl px-4 py-10">
        <h1 className="text-2xl font-bold text-brand-dark">
          Report a Security Incident
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Your report helps make campus and surrounding student housing safer.
          You can report anonymously — no identifying information will be
          stored if you choose that option.
        </p>

        {submitted ? (
          <div className="mt-8 flex flex-col items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-8 text-center">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
            <p className="font-semibold text-green-800">
              Your report has been submitted.
            </p>
            <p className="text-sm text-green-700">
              Thank you for helping keep the community safe.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-2 rounded-md bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-light"
            >
              Submit another report
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Incident Type
              </label>
              <select
                value={incidentType}
                onChange={(e) =>
                  setIncidentType(e.target.value as IncidentType)
                }
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
              >
                {INCIDENT_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {INCIDENT_TYPE_LABELS[type]}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Behind Faculty of Science, or lodge name/street"
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="Describe what happened, when, and any other useful detail"
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="anonymous"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-brand focus:ring-brand"
              />
              <label htmlFor="anonymous" className="text-sm text-slate-700">
                Report anonymously (recommended)
              </label>
            </div>

            {!isAnonymous && (
              <div className="grid grid-cols-1 gap-4 rounded-md bg-slate-50 p-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={reporterName}
                    onChange={(e) => setReporterName(e.target.value)}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Contact (phone/email)
                  </label>
                  <input
                    type="text"
                    value={reporterContact}
                    onChange={(e) => setReporterContact(e.target.value)}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                  />
                </div>
              </div>
            )}

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 rounded-md bg-brand px-4 py-3 text-sm font-semibold text-white hover:bg-brand-light disabled:opacity-60"
            >
              {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
              {submitting ? "Submitting..." : "Submit Report"}
            </button>
          </form>
        )}
      </main>
    </>
  );
}

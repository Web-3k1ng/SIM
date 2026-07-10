import Link from "next/link";
import { ShieldAlert } from "lucide-react";

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <ShieldAlert className="h-6 w-6 text-brand" />
          <span className="text-lg font-bold text-brand-dark">SIM</span>
          <span className="hidden text-sm text-slate-500 sm:inline">
            Security Incident Mapping
          </span>
        </Link>
        <nav className="flex items-center gap-4 text-sm font-medium">
          <Link href="/" className="text-slate-600 hover:text-brand">
            Report
          </Link>
          <Link href="/feed" className="text-slate-600 hover:text-brand">
            Incident Feed
          </Link>
          <Link href="/admin" className="text-slate-600 hover:text-brand">
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}

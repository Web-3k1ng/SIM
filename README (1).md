# SIM — Security Incident Mapping

A mini web platform for reporting and tracking campus security incidents,
built for the SEN202 Weekend 1 assignment.

## Tech Stack
- **Next.js 14** (App Router)
- **Tailwind CSS**
- **Supabase** (PostgreSQL database + Row Level Security)

## Features
- Public incident report form (with anonymous reporting option)
- Public incident feed with filtering by incident type
- Admin dashboard to verify, respond to, and manage reports

## Project Structure
```
sim-app/
├── app/
│   ├── page.tsx          # Report form (home page)
│   ├── feed/page.tsx      # Public incident feed
│   ├── admin/page.tsx     # Admin dashboard
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── Header.tsx
│   └── IncidentCard.tsx
├── lib/
│   ├── supabaseClient.ts
│   └── incidentMeta.ts
├── supabase/
│   └── schema.sql         # Run this in your Supabase SQL Editor
├── .env.local.example
└── package.json
```

## Setup Instructions

### 1. Create a Supabase project
Go to [supabase.com](https://supabase.com), create a free project, and wait
for it to finish provisioning.

### 2. Run the database schema
In your Supabase project dashboard: **SQL Editor → New Query**, paste the
entire contents of `supabase/schema.sql`, and click **Run**. This creates the
`incidents` table, its Row Level Security policies, and a public-safe view
that hides reporter identity on anonymous reports.

### 3. Get your API keys
In your Supabase project: **Settings → API**. Copy the **Project URL** and
the **anon public** key.

### 4. Configure environment variables
Copy `.env.local.example` to `.env.local` and paste in your values:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
```

### 5. Install dependencies and run
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000).

### 6. Deploy (optional, e.g. Vercel)
Push this repo to GitHub, then import it at [vercel.com](https://vercel.com).
Add the two environment variables above in the Vercel project settings, and
deploy.

## Notes on Scope
Per the assignment brief, this build intentionally avoids unnecessary
complexity: there is no full authentication system, and the admin dashboard
is not access-gated in this demo version (this limitation is documented as a
known constraint in the accompanying SRS document, under Non-Functional
Requirements — see NFR2).

## Related Deliverables
- Google Form questionnaire (community research)
- Ishikawa (fishbone) problem analysis diagram — `docs/ishikawa.png`
- Use-case diagram — `docs/use-case-diagram.png`
- SRS document — `docs/SRS.docx`

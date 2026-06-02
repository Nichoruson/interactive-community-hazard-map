# Interactive Community Hazard & Emergency Map

Production-ready geospatial UI built with Next.js App Router, TypeScript, Tailwind CSS, and React-Leaflet.

## Architecture

- **Server Components**
  - `app/page.tsx` fetches initial hazard reports on the server.
  - `lib/hazard-data.ts` acts as a data access layer (replace with DB in production).
- **Client Components**
  - `components/hazard-map-shell.tsx` orchestrates viewport filtering and selected marker state.
  - `components/hazard-map.tsx` renders React-Leaflet map and map event listeners.
  - `components/hazard-sidebar.tsx` shows active reports visible in current viewport.
  - `components/report-hazard-modal.tsx` captures map-click report submissions.
- **Mutation Pipeline**
  - `app/actions.ts` validates and persists new reports via Server Actions.
  - `revalidatePath("/")` refreshes data-backed UI after successful submission.

## Folder Structure

```txt
app/
  actions.ts
  globals.css
  layout.tsx
  page.tsx
components/
  hazard-map-shell.tsx
  hazard-map.tsx
  hazard-sidebar.tsx
  report-hazard-modal.tsx
lib/
  hazard-data.ts
  hazard-utils.ts
types/
  hazard.ts
```

## Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production Notes

- Replace in-memory storage in `lib/hazard-data.ts` with Postgres + PostGIS, Supabase, or Prisma.
- Add authentication and rate limiting for report submissions.
- Use geospatial indexing (PostGIS `GIST`) for large datasets and viewport queries.
- Add clustering (`supercluster`) when marker count grows.

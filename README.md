# Demo Student Management System

A small, intentionally simple [Next.js](https://nextjs.org) CRUD app used as a **demo project for GitHub Copilot app demos**. It manages a single resource — students — with data persisted to a local `data.json` file instead of a database, so the codebase stays small and easy to follow while presenting Copilot features (chat, inline suggestions, code review, agent mode, etc.).

## What it does

A single CRUD flow for students:

- **Create** — add a student (name, email, course, age)
- **Read** — list all students
- **Update** — edit an existing student
- **Delete** — remove a student

No database, no auth, no extra features — just enough surface area to demo Copilot on real code.

## Tech stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- Tailwind CSS
- File-based storage in [`data.json`](./data.json) via the Node `fs` module

## Project structure

```
app/
  page.tsx                    # UI: form + table for the CRUD flow
  api/students/route.ts       # GET (list), POST (create)
  api/students/[id]/route.ts  # PUT (update), DELETE
lib/students.ts               # Reads/writes data.json
data.json                     # The "database"
```

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to use the app.

## Notes

This is a demo/learning project, not production-ready code — there's no validation beyond required fields, no auth, and `data.json` is not safe for concurrent writes at scale. It's meant to be small enough to read in one sitting.

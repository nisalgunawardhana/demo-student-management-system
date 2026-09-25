# Project guidance

- This is a small Next.js App Router CRUD demo for managing students. Keep changes focused, readable, and appropriate for a learning project.
- Use TypeScript. Keep UI in `app/`, API route handlers in `app/api/`, and student file-storage access in `lib/students.ts`.
- Preserve the simple Tailwind UI and existing component/state patterns. Use semantic, accessible HTML and show clear loading, empty, and error states.
- Treat every API body, route parameter, and query parameter as untrusted. Safely handle malformed JSON and validate required fields, value types, whitespace-only strings, numeric ranges, and email format where relevant.
- Normalize validated input before it reaches the data layer. Use consistent JSON error responses and appropriate HTTP status codes: `400` invalid input, `404` missing student, `409` conflicts, and `500` unexpected server or persistence failures.
- Handle failed fetches, non-OK responses, file reads, JSON parsing, file writes, and missing data explicitly. Do not hide failures or expose internal error details to users.
- When reviewing changes, verify the complete create, list, update, and delete path, including validation, async failures, resource-not-found cases, and UI states.
- Avoid unnecessary dependencies, abstractions, authentication, or production-scale infrastructure. `data.json` is demo storage and does not provide database-level concurrency guarantees.
- Run `npm run lint` for relevant changes and `npm run build` when modifying compilation, routing, or production behavior.

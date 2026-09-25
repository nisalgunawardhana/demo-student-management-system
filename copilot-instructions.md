# Copilot Instructions

## Project context

- This is a small Next.js App Router CRUD application for managing students.
- Use TypeScript and follow the existing project structure: UI in `app/`, API route handlers in `app/api/`, and shared student data access in `lib/`.
- Keep changes focused on the requested behavior. Do not add unnecessary abstractions, dependencies, authentication, or production-scale infrastructure to this demo project.
- Read the relevant Next.js documentation in `node_modules/next/dist/docs/` before changing Next.js-specific behavior.

## Frontend guidance

- Keep the frontend simple, readable, and easy to follow. Prefer the existing component and state patterns before introducing new libraries or a complex component hierarchy.
- Preserve the current minimal visual style and Tailwind utility approach unless the request specifically calls for a design change.
- Use semantic HTML, accessible labels, keyboard-friendly controls, and clear loading, empty, success, and error states.
- Validate obvious user input in the UI for a good experience, but never rely on client-side validation alone; the API must validate every request.
- Handle failed network requests and non-OK responses explicitly. Do not assume `fetch()` succeeded or that every response contains valid JSON.
- Keep user-facing error messages clear and safe. Do not expose stack traces, file paths, or internal implementation details.

## Backend and API guidance

- Treat every request body, URL parameter, and query parameter as untrusted input.
- Validate request JSON safely, including malformed JSON, missing fields, types, empty or whitespace-only strings, numeric ranges, and email format where applicable.
- Normalize values deliberately (for example, trim strings and parse numeric fields) before passing them to the data layer.
- Return consistent JSON error responses with an appropriate HTTP status:
  - `400` for malformed or invalid input
  - `404` when a requested student does not exist
  - `409` for a genuine resource conflict
  - `500` for unexpected server or persistence failures
- Wrap file and persistence operations so expected failures become intentional API responses. Log unexpected server-side failures using the project’s logging conventions, but do not send implementation details to clients.
- Check all outcomes from data-layer operations rather than assuming writes or lookups succeeded.
- Preserve correct status codes and response shapes for existing successful CRUD operations.
- Avoid broad catch blocks that silently recover, return success-shaped fallbacks, or hide data corruption.
- Keep file-storage limitations in mind: avoid unnecessary read-modify-write races and do not claim database-level guarantees that `data.json` cannot provide.

## Code review checklist

When reviewing or changing code, inspect the complete logical path, not only the changed line:

- Check input validation at the API boundary and confirm client validation is not the only safeguard.
- Check malformed input, missing resources, empty results, duplicate or conflicting data, and invalid identifiers.
- Check every asynchronous operation for rejected promises and every `fetch` call for non-OK responses.
- Check file reads, JSON parsing, file writes, and data-layer return values for explicit error handling.
- Check loading, empty, success, cancellation, and error states in the UI.
- Check that errors use safe, actionable messages and appropriate HTTP status codes.
- Check for accidental behavior changes in create, list, update, and delete flows.
- Prefer small, targeted fixes that match existing conventions, and update related documentation when behavior changes.

## Validation

- Run the smallest relevant checks after changes.
- Use `npm run lint` for linting and `npm run build` when changes affect compilation, routing, or production behavior.
- Do not consider a change complete if validation reveals an error; fix the underlying issue or report the blocker clearly.

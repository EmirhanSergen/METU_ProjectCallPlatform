# Frontend Development

This directory contains the React application built with Vite and TypeScript.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server with hot reload:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`.
3. Build the production bundle (runs TypeScript compilation using `tsc`):
   ```bash
   npm run build
   ```
4. Preview the built app locally:
   ```bash
   npm run preview
   ```

## Environment Variables

The frontend does not require any environment variables by default. The API base URL is set in [`src/lib/api.ts`](src/lib/api.ts) and defaults to `http://localhost:8000`. Adjust this constant if the backend runs on a different host or port.

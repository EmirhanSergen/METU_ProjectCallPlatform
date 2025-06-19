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

The API base URL is configured using the `VITE_API_BASE` environment variable. Create a `.env` file (see `.env.example`) and set this variable to the URL where the backend is running:

```bash
cp .env.example .env
echo "VITE_API_BASE=http://localhost:8000" > .env
```

Vite reads variables prefixed with `VITE_` at build time, so rebuild the project after changing the value.

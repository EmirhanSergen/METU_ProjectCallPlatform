# Frontend

This directory contains the React/Vite based frontend for the Project Call Platform.

## Development

1. Install Node.js (version 20 or newer).
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`.

### API base URL

The frontend needs the base URL of the API. Set it via the `VITE_API_BASE_URL` environment variable (for example in a `.env` file) or adjust `vite.config.ts` accordingly.

## Build

Create a production build with:
```bash
npm run build
```
The compiled files will be written to the `dist` directory.

## Docker

To build and run the frontend in a container:
```bash
docker build -t projectcall-frontend -f Dockerfile .
docker run -p 8080:80 projectcall-frontend
```
Remember to configure the API base URL for the container as well (e.g. by passing `-e VITE_API_BASE_URL=...`).

# webgpu-particles-demo

A Vite + React + TypeScript showcase application for the [`webgpu-particles`](https://github.com/stamps9k/webgpu-particles-dist) library. Demonstrates all available GPU-accelerated particle effects with interactive controls.

> **Live site:** [wgpu.stampatron.com](https://wgpu.stampatron.com)

---

## Tech Stack

| Layer           | Technology                                                              |
| --------------- | ----------------------------------------------------------------------- |
| Frontend        | React 19, TypeScript, React Router 7                                    |
| Styling         | Bootstrap 5 and Bootstrap Icons                                         |
| Build tool      | Vite                                                                    |
| Backend API     | Express, SQLite (better-sqlite3)                                        |
| Graphics        | [`webgpu-particles`](https://github.com/stamps9k/webgpu-particles-dist) |
| Dev environment | Docker (Vite on port 8080)                                              |

---

## Prerequisites

- A browser with [WebGPU support](https://caniuse.com/webgpu) (Chrome 113+, Edge 113+)
- Node.js 22.18+ (required by tsup 9 and Vite 8)
- Docker (optional, for containerised development and deployment)

---

## Getting Started

### Install dependencies

```bash
npm install
```

### Run in development

```bash
npm run start-dev   # Express API on port 3000 (restarts on change)
npm run dev         # Vite dev server on port 8080
```

The Vite dev server starts on [http://localhost:8080](http://localhost:8080). API requests to `/api` are proxied to the Express backend automatically.

---

## Project Structure

```
webgpu-particles-demo/
├── .husky/                # Git hooks for linting and prettifying on commit
├── api/                   # API call routes
├── config/                # Configuration files for typescript, linter, prettyfier, etc
├── database/              # The database that the api accesses
├── src/
│   ├── apps/              # The app root
│   ├── components/        # The components rendered by React
│   ├── libs/              # Javascript libraries that glue everything together
│   ├── styles/            # Custom styles ontop of Bootstrap
│   └── main.tsx           # Entry point for entire site
├── server.mts             # Express API server
└── package.json
```

---

## Effects Showcased

| Effect            | Description                                                            |
| ----------------- | ---------------------------------------------------------------------- |
| **Scatter Fade**  | Particles burst out from the emitter, fall under gravity and fade out  |
| **Scatter Swirl** | Particles spiral around the emitter like a vortex                      |
| **Fireworks**     | Two-phase rockets that burst into velocity-stretched sparks            |
| **Boids**         | Flocking simulation with adjustable separation, alignment and cohesion |

---

## API

The Express backend serves the shader sets and shader configs the controls are built from, read from the SQLite database in `database/`. In development, Vite proxies `/api/*` requests to the Express server. In production, `npm run build` then `npm run start-prod` runs a single Express server that serves both the built frontend from `dist/` and the API.

### Development proxy (config/vite.config.ts)

```ts
server: {
  port: 8080,
  host: true, // needed in Docker: binds to 0.0.0.0 instead of localhost
  proxy: {
    "/api": {
      target: "http://localhost:3000",
      changeOrigin: true,
    },
  },
},
```

---

## WebGPU Notes

WebGPU is a next-generation graphics API and is not yet universally supported. If the demo fails to load:

- Make sure you're on **Chrome 113+** or **Edge 113+**
- Firefox requires enabling `dom.webgpu.enabled` in `about:config`
- Safari support is experimental on macOS 14+

---

## Related

- [`webgpu-particles`](https://github.com/stamps9k/webgpu-particles-dist) — the underlying particle effects library
- [WebGPU API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)
- [WGSL Spec](https://www.w3.org/TR/WGSL/)

---

## License

GPL-3.0 license

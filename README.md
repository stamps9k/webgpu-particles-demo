# webgpu-particles-demo

A Vite + React + TypeScript showcase application for the [`webgpu-particles`](https://github.com/stamps9k/webgpu-particles-dist) library. Demonstrates all available GPU-accelerated particle effects with interactive controls.

> **Live site:** [stampatron.com](https://wgpu.stampatron.com)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, React Router |
| Styling | Bootstrap (Starter Template) |
| Build tool | Vite |
| Backend API | Express |
| Graphics | [`webgpu-particles`](https://github.com/stamps9k/webgpu-particles-dist) |
| Dev environment | Docker (port 8080), Alpine Linux |

---

## Prerequisites

- A browser with [WebGPU support](https://caniuse.com/webgpu) (Chrome 113+, Edge 113+)
- Node.js 18+
- Docker (optional, for containerised development and deployment)

---

## Getting Started

### Install dependencies

```bash
npm install
```

### Run in development

```bash
npm run start-dev   # Database api
npm run dev         # Webserver from Vite
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

| Effect | Description |
|---|---|
| **Scatter** | Gravity-driven particles emitted from a configurable point or area |
| **Fireworks** | Two-phase rockets that burst into velocity-stretched sparks |
| **Vortex** | Particles that spiral around a central attractor |

---

## API

The Express backend is served alongside the frontend and handles any server-side concerns. In development, Vite proxies `/api/*` requests to the Express server. In production, routing is handled at the infrastructure level.

### Development proxy (vite.config.ts)

```ts
server: {
  proxy: {
    '/api': 'http://localhost:3000',
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
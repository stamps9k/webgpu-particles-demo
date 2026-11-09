# syntax=docker/dockerfile:1
# (Enables COPY --exclude below.)

# --- Build stage -----------------------------------------------------
# Has Vite, TypeScript, bootstrap, all devDependencies. Discarded after
# this stage - none of it becomes part of the shipped image.
FROM node:22-bookworm-slim AS builder
WORKDIR /app

COPY package.json package-lock.json ./
# --ignore-scripts skips lifecycle scripts, notably this repo's own
# "prepare": "husky" script. Husky itself IS present in this stage
# (unlike a --omit=dev install), and modern Husky versions detect
# there's no .git here (excluded via .dockerignore anyway) and no-op
# gracefully rather than erroring - but that's relying on Husky's own
# internal behavior rather than something this build controls directly,
# and this stage has no actual use for git-hook setup regardless, so
# skipping it outright is more robust than depending on Husky continuing
# to self-detect correctly across future versions.
#
# npm is pinned to a major version so a new npm release can't change
# CI builds unannounced. npm 10 (bundled with Node 22) crashes while
# preparing the webgpu-particles git dependency, so it must be >= 11.
RUN npm install -g npm@12
RUN npm ci --ignore-scripts --allow-git=root

# CI passes the current commit of webgpu-particles-dist main so a push
# to that repo produces a new image even though package-lock.json
# still pins an older commit. Declared after npm ci so only this layer
# and the ones below rebuild when the library changes. Left empty
# (local builds), the lockfile pin is used as-is.
ARG PARTICLES_DIST_SHA=""
RUN if [ -n "$PARTICLES_DIST_SHA" ]; then \
      npm install --ignore-scripts --allow-git=root --no-audit --no-fund \
        "webgpu-particles@github:stamps9k/webgpu-particles-dist#${PARTICLES_DIST_SHA}"; \
    fi

# .dockerignore keeps node_modules, dist, and test out of what actually
# gets sent to the build context. package.json and package-lock.json are
# excluded here so the versions written by the reinstall above survive;
# copying the originals back would make the prune below re-fetch the
# old lockfile pin of webgpu-particles.
COPY --exclude=package.json --exclude=package-lock.json . .

# Matches the real build script: tsc --noEmit on the server, vite build,
# tsup for server.mts/api, then copies database/app.db into dist/.
RUN npm run build

# Prune devDependencies here.
RUN npm prune --omit=dev --ignore-scripts --allow-git=root
RUN npm rebuild better-sqlite3

# --- Runtime stage -----------------------------------------------------
# server.mts is a real Express app (serves the built frontend AND API
# routes) - it's not static-only, so this stage needs Node plus the
# production node_modules, not just the dist output. tsup.config.ts has
# bundle: false, so dist/server.mjs still does `import express from
# "express"` etc. and expects it resolved from node_modules at runtime.
#
# node_modules is copied straight from the builder rather than re-running
# npm ci here, so this stage never needs to re-fetch the git+ssh
# dependency (webgpu-particles) a second time. Both stages use the same
# base image, so the native better-sqlite3 build carries over cleanly.
FROM node:22-bookworm-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder --chown=node:node /app/dist ./dist

USER node

EXPOSE 1237
CMD ["node", "dist/server.mjs"]


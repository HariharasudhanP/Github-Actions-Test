# syntax=docker/dockerfile:1.6
# Multi-stage build: Vite build -> nginx static serving (non-root)
# NOTE: This is optional infrastructure for local preview / static hosting.

FROM node:20.15.1-alpine3.20 AS build
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci

# Build
COPY . .
RUN npm run build

FROM nginx:1.27.1-alpine3.20 AS runtime

# Create unprivileged user/group
RUN addgroup -S app && adduser -S -G app -H -s /sbin/nologin app \
    && rm -rf /var/cache/apk/*

# Nginx on 8080 (non-root) + SPA routing
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

# Ensure nginx can read content & write temp dirs
RUN chown -R app:app /usr/share/nginx/html /var/cache/nginx /var/run

USER app
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1:8080/ >/dev/null 2>&1 || exit 1

CMD ["nginx", "-g", "daemon off;"]
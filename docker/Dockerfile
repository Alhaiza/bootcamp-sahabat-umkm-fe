# ==========================================
# Sahabat-UMKM Frontend Multi-Stage Dockerfile
# ==========================================

# Stage 1: Build Frontend Assets
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .

# Set environment variabel saat build
ARG VITE_API_BASE_URL=http://localhost:3000
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

RUN npm run build

# Stage 2: Serve via High-Performance NGINX
FROM nginx:alpine-slim AS runner

# Salin konfigurasi Nginx kustom
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# Salin hasil kompilasi statis dari builder stage
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

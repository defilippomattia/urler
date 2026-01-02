# Stage 1: Build
FROM node:24-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve
FROM nginx:1.29.4
COPY --from=builder /app/dist /usr/share/nginx/html
# Custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8855
CMD ["nginx", "-g", "daemon off;"]

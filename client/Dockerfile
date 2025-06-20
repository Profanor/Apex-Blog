# ---------- build phase ----------
FROM node:18 AS build
WORKDIR /app
# 👇 Copy the env file BEFORE installing or building
COPY .env.production .env

COPY package*.json ./
RUN npm ci           # faster & reproducible
COPY . .
ARG REACT_APP_API_URL   # <-- injected by docker‑compose
ENV REACT_APP_API_URL=$REACT_APP_API_URL
RUN npm run build

# ---------- run phase ----------
FROM nginx:alpine
# copy static assets
COPY --from=build /app/build /usr/share/nginx/html
# add SPA‑friendly nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

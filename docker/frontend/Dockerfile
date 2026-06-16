# React (Create React App) — dev-сервер
FROM node:20-bookworm-slim

WORKDIR /app

# Зависимости отдельным слоем для кеша
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci

# Исходники
COPY frontend/ ./

# Настройки CRA dev-сервера в контейнере
ENV HOST=0.0.0.0
ENV PORT=3000
ENV CI=false
ENV WATCHPACK_POLLING=true
ENV WDS_SOCKET_PORT=0

EXPOSE 3000
CMD ["npm", "start"]

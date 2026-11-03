FROM node:lts-alpine AS runtime
WORKDIR /app

# Install dependencies first so this layer is reused until the lockfile changes
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

ENV HOST=0.0.0.0
ENV PORT=4321
ENV MODE=production

EXPOSE 4321

CMD ["node", "./dist/server/entry.mjs"]

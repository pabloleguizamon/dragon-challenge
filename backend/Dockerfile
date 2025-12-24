# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

# Stage 2: Development
FROM node:18-alpine AS development

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

ENV NODE_ENV=development

EXPOSE 3001

CMD ["npm", "run", "start:dev"]

# Stage 3: Production
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev --legacy-peer-deps

COPY --from=builder /app/dist ./dist

EXPOSE 3001

ENV NODE_ENV=production

ENTRYPOINT []

CMD ["node", "dist/main.js"]

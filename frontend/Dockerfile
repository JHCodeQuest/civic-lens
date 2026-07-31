FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# NEXT_PUBLIC_* values are inlined at build time, so the API URL must be set here.
ARG NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
RUN npm run build

FROM node:22-alpine

WORKDIR /app
RUN npm install -g serve@14

COPY --from=build /app/out ./out

EXPOSE 3000

CMD ["serve", "out", "-l", "3000"]

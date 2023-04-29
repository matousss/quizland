# syntax=docker/dockerfile:1

FROM node:18-alpine AS build

WORKDIR /build
COPY src lib start.ts tsconfig.json webpack.config.cjs package.json yarn.lock .env ./


RUN yarn install


ENV NODE_ENV=production
RUN node_modules/.bin/webpack --env production --mode production



FROM node:18-alpine as run

WORKDIR /app

COPY --from=build package.json yarn.lock ./
COPY --from=build dist/server.bundle.cjs ./

RUN yarn install --production

EXPOSE 4000
CMD node --experimental-specifier-resolution=node server.bundle.cjs

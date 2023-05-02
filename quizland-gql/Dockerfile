# syntax=docker/dockerfile:1

FROM node:18-alpine as deps

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --production

FROM node:18-alpine as runner

WORKDIR /app

COPY --from=deps /app/node_modules /
COPY dist/server.bundle.cjs ./



# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 yoga
# USER yoga

EXPOSE 4000
CMD node --experimental-specifier-resolution=node server.bundle.cjs

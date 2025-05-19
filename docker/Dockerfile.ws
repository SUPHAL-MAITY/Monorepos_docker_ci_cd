FROM oven/bun:1

WORKDIR /usr/src/app

# ✅ Install OpenSSL
RUN apt-get update -y && apt-get install -y openssl

COPY ./packages ./packages
COPY ./bun.lock ./bun.lock

COPY ./package.json ./package.json
COPY ./turbo.json ./turbo.json

COPY ./apps/ws ./apps/ws

RUN bun install
RUN bun run db:generate

EXPOSE 8081

CMD ["bun", "run", "start:ws"]
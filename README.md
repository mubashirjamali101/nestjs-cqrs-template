# NestJS CQRS Boilerplate

## Dev Setup

Requirements:

- Node 20+
- Pnpm globally installed, and setup using `pnpm setup`
- Postgres DB setup and running

### Install Dependencies

```bash
pnpm install
```

### Setup Environment

Copy `.env.example` to `.env` and update the values.

### Run Prisma Migrations

```bash
npx prisma migrate deploy
```

### Generate Migrations and Prisma Client and Apply Migrations (After Schema Changes)

```bash
pnpm prisma:migrate --name <migration-name>
```

### Seed the Database

Current seed data populates:

- one user

> Migrations must be applied before seeding.

```bash
pnpm seed
```

### Run the Server

```bash
pnpm start:dev
```

## Tech Stack

| Name         | Description                                                                                              | Setup |
| ------------ | -------------------------------------------------------------------------------------------------------- | ----- |
| NestJS v11   | A progressive Node.js framework for building efficient, reliable, and scalable server-side applications. | ✅    |
| Fastify v5   | A fast and low overhead web framework, for Node.js.                                                      | ✅    |
| Class V&T    | class-validator and class-transformer for DTO                                                            | ✅    |
| Paseto       | A secure token type, better than JWT.                                                                    | ✅    |
| Prisma       | A DX and Performance first ORM.                                                                          | ✅    |
| PostgreSQL   | Advanced Relational SQL database.                                                                        | ✅    |
| Helmet       | XSS, SQL Injection security.                                                                             | ✅    |
| Rate Limiter | For throttling requests.                                                                                 | ✅    |
| Winston      | For logging.                                                                                             | ✅    |
| Nest CQRS    | For CQRS pattern implementation.                                                                         | ✅    |
| Jest         | For testing.                                                                                             | ✅    |

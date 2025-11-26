# NestJS Prisma Boilerplate

Boilerplate cho dự án NestJS với Prisma ORM, JWT Authentication và Swagger Documentation.

## Yêu cầu

- Node.js >= 18
- PostgreSQL
- npm hoặc yarn

## Cài đặt

### 1. Clone repository

```bash
git clone <repository-url>
cd nestjs-prisma-boiler-plate
```

### 2. Cài đặt dependencies

```bash
npm install
```

### 3. Cấu hình môi trường

Tạo file `.env` từ file mẫu:

```bash
cp .env.example .env
```

Cập nhật thông tin trong file `.env`:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/reclaim_db?schema=public"
JWT_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret-key
```

### 4. Setup database

Tạo database PostgreSQL:

```bash
createdb reclaim_db
```

Chạy migration (nếu có):

```bash
npx prisma migrate dev
```

Hoặc push schema:

```bash
npx prisma db push
```

Generate Prisma Client:

```bash
npx prisma generate
```

## Chạy ứng dụng

### Development mode

```bash
npm run start:dev
```

### Production mode

```bash
npm run build
npm run start:prod
```

## Truy cập

- API: http://localhost:3000/api/v1
- Swagger Documentation: http://localhost:3000/api/docs

## Scripts hữu ích

```bash
npm run lint          # Kiểm tra lỗi code
npm run format        # Format code với Prettier
npm test              # Chạy unit tests
npm run test:e2e      # Chạy e2e tests
```

## Cấu trúc thư mục

```
src/
├── app/
│   ├── modules/      # Feature modules (auth, user, etc.)
│   └── shared/       # Shared resources (guards, decorators, etc.)
├── db/               # Database schemas
└── main.ts           # Application entry point
```

## Tính năng

- JWT Authentication (Access & Refresh Token)
- Swagger API Documentation
- Global validation với class-validator
- Global exception filters
- Prisma ORM
- CORS enabled
- Helmet security headers

## License

UNLICENSED

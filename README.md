# BookSpace 📚

BookSpace adalah platform web sederhana untuk menampilkan daftar buku, detail buku, serta fitur autentikasi. Aplikasi ini memungkinkan pengguna untuk menjelajahi koleksi buku, mencari berdasarkan judul atau penulis, memfilter berdasarkan kategori, dan menandai buku favorit mereka.

## 🌟 Fitur Utama

- Autentikasi Pengguna: Login dan register dengan validasi JWT
- Dashboard Buku: Menampilkan daftar buku dengan grid layout yang responsif
- Pencarian & Filter: Cari buku berdasarkan judul/penulis dan filter berdasarkan kategori
- Detail Buku: Halaman detail lengkap untuk setiap buku
- Sistem Favorit: Tandai dan kelola buku favorit dengan penyimpanan lokal
- Dark Mode: Toggle antara tema terang dan gelap
- Responsive Design: Optimal di desktop, tablet, dan mobile

## 🛠️ Tech Stack

### Frontend

- Next.js 15 - React framework dengan App Router
- TypeScript
- TailwindCSS
- Lucide React

### State Management

- Zustand

### API & Authentication

- Next.js API Routes
- JSON Web Token (JWT)
- Mock API

### Development Tools

- ESLint
- Jest
- React Testing Library

## 🚀 Cara Menjalankan Lokal


### Prerequisites

- Node.js (versi 18 atau lebih baru)
- npm atau yarn package manager

### Langkah Instalasi


## Run Locally

Clone project

```bash
  git clone https://github.com/artesia0528/bookspace.git
```
Masuk ke project directory

```bash
  cd bookspace
```

Install dependencies

```bash
  npm install
```

Start server

```bash
  npm run dev
```

## Buat file .env di root directory

```bash
JWT_SECRET=your-super-secret-jwt-key-here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Demo Credentials
Untuk testing, gunakan kredensial berikut:

- Email: user@example.com
- Password: password123
- Atau buat akun baru melalui halaman register.

## 📁 Struktur Project
```bash
    bookspace/
    ├── src/
    │ ├── app/                  # Next.js App Router
    │ │ ├── api/                # API routes
    │ │ │ ├── auth/             # Authentication endpoints
    │ │ │ └── books/            # Books endpoints
    │ │ ├── auth/               # Auth pages (login, register)
    │ │ ├── dashboard/          # Dashboard page
    │ │ ├── books/              # Book detail pages
    │ │ ├── favorites/          # Favorites page
    │ │ └── globals.css         # Global styles
    │ ├── components/           # Reusable components
    │ │ ├── BookCard.tsx        # Book card component
    │ │ ├── Header.tsx          # Navigation header
    │ │ └── SearchFilter.tsx    # Search and filter component
    │ ├── lib/                  # Utility functions and types
    │ │ └── types.ts            # TypeScript interfaces
    │ └── store/                # State management
    │ └── useStore.ts           # Zustand store
    ├── **tests**/              # Unit tests
    ├── public/                 # Static assets
    └── package.json
```

## 🎯 Hal yang Dikembangkan

### 1. Sistem Autentikasi

- Login & Register: Form dengan validasi client-side dan server-side
- JWT Implementation: Token-based authentication dengan expire time
- Protected Routes: Middleware untuk melindungi halaman yang memerlukan autentikasi
- Form Validation:

- Email format validation
- Password minimal 6 karakter
- Confirm password matching

### 2. Dashboard & Book Management

- Book Display: Grid layout responsif untuk menampilkan daftar buku
- Search Functionality: Real-time search berdasarkan judul dan penulis
- Category Filter: Filter buku berdasarkan kategori (Fiction, Science, Technology, History)
- Loading States: Skeleton loading dan spinner untuk UX yang better 3. Book Detail System
- Dynamic Routing: Halaman detail dengan parameter ID buku
- Comprehensive Info: Menampilkan cover, judul, penulis, kategori, tahun terbit, dan deskripsi
- Favorite Toggle: Tombol untuk menambah/menghapus dari favorit
- Navigation: Back button dan breadcrumb navigation 4. Favorites Management
- Local Storage: Penyimpanan favorit menggunakan Zustand persist
- Favorites Page: Halaman khusus untuk menampilkan buku favorit
- Empty State: UI yang informatif ketika belum ada favorit
- Sync State: Sinkronisasi status favorit di seluruh aplikasi 5. UI/UX Features
- Dark Mode: Toggle tema dengan penyimpanan preferensi
- Responsive Design: Layout yang optimal di semua device
- Smooth Transitions: Animasi dan transisi yang halus
- Consistent Icons: Menggunakan Lucide React untuk konsistensi
- Loading States: Feedback visual untuk semua async operations

### 3. Mock API Development

• RESTful Endpoints:

- POST /api/auth/login - User authentication
- POST /api/auth/register - User registration
- GET /api/books - Get books with search and filter
- GET /api/books/[id] - Get book detail
  - Error Handling: Proper HTTP status codes dan error messages
  - Data Validation: Server-side validation untuk semua inputs

### 4. State Management

- Zustand Store: Centralized state untuk auth, books, dan favorites
- Persistence: Auto-save state ke localStorage


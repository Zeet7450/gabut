# Quick AI - AI-Powered Content Creation Platform

![Quick AI Logo](client/src/assets/logo.svg)

Quick AI adalah platform AI yang powerful untuk membuat konten berkualitas tinggi. Dengan berbagai tools AI yang canggih, Anda dapat menulis artikel, menghasilkan gambar, menghapus background, dan banyak lagi - semuanya dalam satu platform yang mudah digunakan.

## 🚀 Fitur Utama

### ✍️ AI Article Writer

- Generate artikel berkualitas tinggi dengan AI
- Pilihan panjang artikel (Short, Medium, Long)
- Interface yang user-friendly dengan preview real-time
- Mendukung berbagai topik dan niche

### 🎨 AI Image Generation

- Generate gambar dengan AI menggunakan Clipdrop API
- Berbagai style dan tema
- Upload dan publish hasil karya
- Kualitas tinggi dan cepat

### 🖼️ Background Removal

- Hapus background dari gambar secara otomatis
- Menggunakan Cloudinary AI
- Hasil yang akurat dan natural
- Cocok untuk foto produk dan profil

### ✂️ Object Removal

- Hapus objek yang tidak diinginkan dari gambar
- AI-powered object detection
- Hasil yang seamless dan natural
- Perfect untuk editing foto

### 📝 Resume Reviewer

- Review resume dengan AI
- Feedback konstruktif dan actionable
- Analisis struktur dan konten
- Tips untuk meningkatkan peluang diterima kerja

### 📰 Blog Title Generator

- Generate judul blog yang catchy
- Berbagai kategori dan style
- Optimized untuk SEO
- Ide kreatif yang menarik

## 🛠️ Teknologi yang Digunakan

### Frontend

- **React 19** - Modern React dengan hooks
- **Vite** - Fast build tool dan dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Clerk** - Authentication dan user management
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **Lucide React** - Beautiful icons
- **React Markdown** - Markdown rendering

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Clerk Express** - Authentication middleware
- **Neon Database** - PostgreSQL database
- **Cloudinary** - Image storage dan processing
- **OpenAI API** - AI text generation (Gemini)
- **Clipdrop API** - AI image generation
- **Multer** - File upload handling
- **PDF Parse** - PDF text extraction

## 📁 Struktur Project

```
quick-ai/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── assets/        # Images dan static files
│   │   └── App.jsx        # Main app component
│   ├── package.json
│   └── vercel.json
├── server/                 # Node.js Backend
│   ├── controllers/       # API controllers
│   ├── routes/           # API routes
│   ├── middlewares/      # Custom middlewares
│   ├── configs/          # Database dan service configs
│   ├── server.js         # Main server file
│   └── package.json
└── README.md
```

## 🚀 Cara Install dan Menjalankan

### Prerequisites

- Node.js (v18 atau lebih baru)
- npm atau yarn
- Akun Cloudinary
- Akun Clerk
- Akun Neon Database
- API Key Clipdrop
- API Key Gemini (Google AI)

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/quick-ai.git
cd quick-ai
```

### 2. Install Dependencies

#### Frontend

```bash
cd client
npm install
```

#### Backend

```bash
cd server
npm install
```

### 3. Environment Variables

#### Frontend (.env)

```env
VITE_BASE_URL=http://localhost:3000
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

#### Backend (.env)

```env
PORT=3000
DATABASE_URL=your_neon_database_url
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLERK_SECRET_KEY=your_clerk_secret_key
GEMINI_API_KEY=your_gemini_api_key
CLIPDROP_API_KEY=your_clipdrop_api_key
```

### 4. Database Setup

Buat tabel `creations` di Neon Database:

```sql
CREATE TABLE creations (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    prompt TEXT NOT NULL,
    content TEXT NOT NULL,
    type VARCHAR(50) NOT NULL,
    publish BOOLEAN DEFAULT false,
    likes TEXT[] DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 5. Menjalankan Aplikasi

#### Development Mode

Terminal 1 (Backend):

```bash
cd server
npm run server
```

Terminal 2 (Frontend):

```bash
cd client
npm run dev
```

#### Production Mode

Build frontend:

```bash
cd client
npm run build
```

Start server:

```bash
cd server
npm start
```

Aplikasi akan berjalan di:

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## 🔧 API Endpoints

### Authentication

Semua endpoint memerlukan authentication via Clerk.

### AI Tools

- `POST /api/ai/generate-article` - Generate artikel
- `POST /api/ai/generate-blog-title` - Generate judul blog
- `POST /api/ai/generate-image` - Generate gambar (Premium)
- `POST /api/ai/remove-image-background` - Hapus background (Premium)
- `POST /api/ai/remove-image-object` - Hapus objek (Premium)
- `POST /api/ai/resume-review` - Review resume (Premium)

### User Management

- `GET /api/user/get-user-creations` - Ambil creations user
- `GET /api/user/get-published-creations` - Ambil creations yang dipublish
- `POST /api/user/toggle-creation-publish` - Toggle like/unlike

## 💎 Pricing Plans

### Free Plan

- 10 AI generations per month
- Akses ke Article Writer dan Blog Title Generator
- Basic features

### Premium Plan

- Unlimited AI generations
- Akses ke semua tools (Image Generation, Background Removal, Object Removal, Resume Review)
- Priority support
- Advanced features

## 🎯 Cara Penggunaan

### 1. Registrasi/Login

- Daftar akun menggunakan Clerk
- Pilih plan yang sesuai

### 2. Generate Artikel

- Masuk ke "AI Article Writer"
- Masukkan topik artikel
- Pilih panjang artikel
- Klik "Generate Article"

### 3. Generate Gambar (Premium)

- Masuk ke "AI Image Generation"
- Masukkan prompt untuk gambar
- Pilih style dan tema
- Download hasil

### 4. Hapus Background (Premium)

- Upload gambar
- AI akan otomatis menghapus background
- Download hasil

## 🤝 Contributing

1. Fork repository ini
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Support

Jika mengalami masalah atau ada pertanyaan:

- Email: support@quickai.com
- GitHub Issues: [Create an issue](https://github.com/yourusername/quick-ai/issues)
- Documentation: [Quick AI Docs](https://docs.quickai.com)

## 🙏 Acknowledgments

- [OpenAI](https://openai.com) untuk AI text generation
- [Clipdrop](https://clipdrop.co) untuk AI image generation
- [Cloudinary](https://cloudinary.com) untuk image processing
- [Clerk](https://clerk.com) untuk authentication
- [Neon](https://neon.tech) untuk database hosting

---

**Dibuat dengan ❤️ untuk memudahkan content creation dengan AI**

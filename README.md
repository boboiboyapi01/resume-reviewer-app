# 🚀 AI-Powered Resume Reviewer

![Hero Section Demo](public/hero.webp)

Welcome to the **AI-Powered Resume Reviewer** repository! This is a premium-class modern web application that makes it easy for _job seekers_ to get instant feedback on their resumes/CVs using the powerful intelligence of **Google Gemini**.

Built with **Next.js App Router** for speed, polished with **Tailwind CSS & Framer Motion** for a beautiful _glassmorphism_ interface, and equipped with PDF and Word document parsing (_client-to-server_), this is an impressive ready-to-use prototype application.

## ✨ Key Features

- **Premium UI/UX:** Elegant and modern interface with luxurious indigo colors.
- **Drag & Drop Uploader:** Supports uploading `.pdf` and `.docx` files with interactive animations.
- **Secure Resume Processing:** AI processing is performed entirely on the _Backend/Server API_ (Next.js API Routes). Your _API key_ is 100% safe and never exposed to the user's _browser_.
- **Google Gemini 2.5 Flash Integration:** Leverages the latest AI model with a generous free tier for _developers_.
- **In-Depth Analysis:** Provides an average score (0-100), detects strengths, weaknesses, and _actionable recommendations_ based on ATS _(Applicant Tracking System)_ standards.

## 🛠️ Tech Stack

- **Framework:** [Next.js (v15 App Router)](https://nextjs.org)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Document Parsing:** `pdf-parse` (for PDF) and `mammoth` (for Word DOCX)
- **AI Engine:** [@google/generative-ai](https://www.npmjs.com/package/@google/generative-ai) (Google Gemini API)

## 🏃 Running Locally (Local Development)

Follow the steps below to try the application on your computer:

### 1. Install Node.js & Dependencies

Make sure _Node.js_ is installed on your computer. Then, open a terminal in this project _folder_ and run:

```bash
npm install
```

### 2. Get Your Google Gemini API Key (Free!)

- Go to [Google AI Studio](https://aistudio.google.com/app/apikey).
- Click the **"Create API key"** button.
- Copy your secret key.

### 3. Configure Environment File

- In the root folder of this project, create a file (or use an existing one) named `.env`.
- Add the _API key_ from the previous step in this format:

```env
GEMINI_API_KEY=YOUR_SECRET_KEY_HERE
```

### 4. Start the Development Server

```bash
npm run dev
```

Open your browser and navigate to [http://localhost:3000](http://localhost:3000). The application is ready to use!

---

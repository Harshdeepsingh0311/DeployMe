## 📌 Deploy Me
> This project demonstrates real-world skills in authentication, SSR, database design, cloud deployment, and scalable frontend architecture.

### **DeployMe – One-Click Developer Portfolio Builder**

> Build and deploy a professional portfolio website in minutes.
> No markdown. No templates. Just fill a form and go live.

---

## 🚀 Overview

DeployMe is a full-stack web application that allows users to create and deploy their personal portfolio websites by simply filling out a form. The platform automatically handles authentication, data storage, and deployment, removing the complexity of hosting and website setup.

---

## ✨ Key Features

* 🔐 Secure authentication (login, signup, password reset)
* 🧾 Form-based portfolio creation (no markdown required)
* 🌐 Public portfolio pages with unique URLs
* 🧠 Real-time updates & edits
* 🖼 Image upload and management
* 📱 Fully responsive UI
* ⚡ Fast performance with SSR & caching

---

## 🏗 Tech Stack

### Frontend

* **Next.js (App Router)**
* **TypeScript**
* **Tailwind CSS**
* **ShadCN UI**

### Backend / Infrastructure

* **Supabase**

  * Authentication
  * PostgreSQL database
  * Storage (images)
* **Vercel** (deployment & hosting)

---

## 🧠 System Architecture

```text
User → Next.js UI → Server Components / API Routes
                        ↓
                    Supabase
                (Auth + DB + Storage)
```

* Uses **SSR** for portfolio pages
* Uses **CSR** for dashboard & forms
* Secure route protection with middleware
* Row-level security (RLS) in Supabase

---

## 🔑 Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

---

## ▶️ Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/deployme.git
cd deployme
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Run the development server

```bash
npm run dev
```

App will be live at:

```
http://localhost:3000
```

---

## 🔐 Authentication Flow

* Email & password authentication via Supabase
* PKCE-based auth callback handling
* Password reset via branded email
* Protected routes using Next.js middleware

---

## 🖼 Image Handling

* Images uploaded to Supabase Storage
* Cached on portfolio pages
* Cache invalidation handled via versioned URLs

---

## 🧪 Validation & Security

* Form validation on client and server
* Supabase RLS policies to prevent unauthorized access
* Portfolio ownership verification before edit access

---

## 🚀 Deployment

* Hosted on **Vercel**
* Environment variables configured in Vercel dashboard
* Supabase connected to production database

---

## 🧩 Future Improvements

* Custom domains for portfolios
* SEO optimization controls
* Theme selection
* Analytics dashboard
* Resume PDF export

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create a feature branch
3. Commit changes
4. Open a pull request

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 🙌 Acknowledgements

* Next.js
* Supabase
* Vercel
* ShadCN UI


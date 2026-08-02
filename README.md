# CHARIS — Luxury AI Gift Concierge

> **"Where every gift tells a story"**

CHARIS is an AI-powered luxury gifting concierge engineered to replace transactional e-commerce browsing with personal, story-driven conversation. Clients dialogue with an AI Concierge that uncovers deep emotional intentions, recipient personality, and milestone nuances before curating handcrafted heirlooms.

---

## Technical Stack & Architecture

### Frontend (`/client`)
- **Framework**: Next.js 15 (App Router), React, TypeScript
- **Styling**: Tailwind CSS with custom Luxury Design System (Onyx Black `#0B090A`, Deep Burgundy `#4A0E22`, Champagne Gold `#D4AF37`, Playfair Display serif fonts)
- **Animations**: Framer Motion smooth page transitions and micro-interactions
- **Icons & UI**: Lucide React, Glassmorphism panels, glowing borders
- **State & API**: Zustand store with persistent token state & Axios client

### Backend (`/server`)
- **Framework**: Node.js, Express.js, TypeScript (Clean Architecture)
- **Database**: Prisma ORM with SQLite (dev) / PostgreSQL (production)
- **Security**: JWT authentication, bcrypt password hashing, Helmet security headers, CORS origin protection, centralized error handling
- **AI Abstraction (`AIService`)**:
  - Native **Ollama** LLM integration (supports local models: `Qwen2.5`, `Llama 3`, or `Mistral`)
  - Built-in **Smart Concierge Fallback Engine** for zero-downtime demonstration
  - **RAG Vector Knowledge Base Engine** for semantic gift similarity search

---

## AI Architecture & Concierge Capabilities

```
Client Dialogue ──► AIService Abstraction ──► Ollama (Qwen2.5/Llama3/Mistral)
                          │ (if offline)
                          └──► Smart Luxury Fallback Engine
                                      │
                                      ▼
                        RAG Gift Vector Knowledge Base ──► Bespoke Storytelling
```

1. **Intimate Dialogue Flow**: Collects recipient, occasion, personality, budget, and emotional goal.
2. **Context Memory**: Tracks chat state across turns and persists sessions in the Prisma database.
3. **RAG Knowledge Base**: Matches user vectors against luxury inventory (Horology, Fine Art, Niche Perfumes, Bespoke Leather, High Jewelry).
4. **AI Gift Card Message Generator**: Allows clients to Compose with Full AI, Polish Rough Drafts, or Write Manually.

---

## Quick Start & Setup Instructions

### 1. Prerequisites
- Node.js (v18+)
- (Optional) [Ollama](https://ollama.ai) with `qwen2.5` model pulled:
  ```bash
  ollama pull qwen2.5
  ```

### 2. Backend Setup (`/server`)
```bash
cd server
npm install
npx prisma db push
npx prisma db seed
npm run build
npm start # Starts server on http://localhost:5000
```
*Note: Demo User credentials seeded automatically: `client@charis.com` / `password123`*

### 3. Frontend Setup (`/client`)
```bash
cd client
npm install
npm run dev # Starts client on http://localhost:3000
```

---

## Application Pages & Features

- **`/` (Landing Page)**: Hero, Philosophy, How It Works, Interactive Dialogue Teaser, Luxury CTA.
- **`/login` & `/register`**: Luxury Auth suite with persistent JWT storage.
- **`/dashboard`**: Client Suite displaying active sessions, historical consultations, and saved heirlooms.
- **`/consultation`**: Conversational Chat UI with real-time attribute extraction & recommendations trigger.
- **`/recommendations`**: Top curated recommendations featuring "Why Chosen" and "Emotional Resonance" cards.
- **`/gift/[id]`**: High-res image gallery, craftsmanship story, symbolic meaning, delivery timeline, and AI Gift Note Generator.

---

## Environment Variables

### Server (`server/.env`)
```env
PORT=5000
NODE_ENV=development
DATABASE_URL="file:./dev.db"
JWT_SECRET="charis_luxury_ai_concierge_jwt_secret_2026_key"
JWT_EXPIRES_IN="7d"
CORS_ORIGIN="http://localhost:3000"
OLLAMA_BASE_URL="http://localhost:11434"
OLLAMA_MODEL="qwen2.5"
```

### Client (`client/.env.local`)
```env
NEXT_PUBLIC_API_URL="http://localhost:5000/api"
```

---

## Production Deployment

- **Frontend**: Deploy `/client` to **Vercel** with `NEXT_PUBLIC_API_URL` set to the backend endpoint.
- **Backend**: Deploy `/server` to **Render** / **Railway** with `DATABASE_URL` pointing to **Supabase PostgreSQL**.
- **Database**: Run `npx prisma db push` on Supabase to migrate schemas.

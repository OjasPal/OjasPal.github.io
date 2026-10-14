# Ojas Pal · Generative AI Portfolio

A modern, high-performance static developer portfolio website for **Ojas Pal (OP)**.
Target URL: [https://ojaspal.github.io](https://ojaspal.github.io)

Built with **React**, **Vite**, **TypeScript**, **Tailwind CSS**, and **Motion** (`motion/react`).
Features an **Obsidian Matte & Luminescent Cyan** design system with spatial UI depth, 3D card tilt, mouse spotlight tracking, and strict content honesty.

---

## 1. Quick Start (Running Locally)

### Prerequisites
- Node.js 20 or higher
- npm 10 or higher

### Steps
```bash
# 1. Clone your repository
git clone https://github.com/OjasPal/ojaspal.github.io.git
cd ojaspal.github.io

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Open in browser
# http://localhost:3000 (or the port Vite prints in your terminal)
```

### Useful Scripts
- `npm run dev`: Starts the local dev server.
- `npm run build`: Bundles the static production distribution to `dist/`.
- `npm run typecheck`: Validates TypeScript types across the entire project (`tsc --noEmit`).
- `npm run preview`: Previews the production build locally.

---

## 2. Where to Edit Content (Single Source of Truth)

All project text, skills, biography, and credentials live cleanly in `src/data/`. You can update any text without touching component code:

| File | Content |
| :--- | :--- |
| `src/data/profile.ts` | Name, brand, email, LinkedIn, GitHub, summary, hero text, and proof metrics |
| `src/data/projects.ts` | The 4 engineering projects: title, period, highlights, bullets, tech stack, and links |
| `src/data/skills.ts` | The 25 verified skills grouped across 6 categories |
| `src/data/credentials.ts` | USAR B.Tech education, GDG coordinator role, and Hack2Skill / IBM certifications |

> **Rule of Content Integrity:** If a URL or link is `null`, the button or link will automatically hide in the UI. When you publish a new demo or repository, simply add the URL to `links` in `src/data/projects.ts`.

---

## 3. Asset Contract (Files to Add & Where)

The site builds and displays intentional CSS and gradient fallbacks even when files are absent. When you have your assets ready, drop them directly into `public/`:

| Path | Recommended Spec | Description |
| :--- | :--- | :--- |
| `public/hero/hero-art.webp` | 1600 × 1400 px, ~200 KB WebP | Obsidian crystal vortex with cyan lightning on `#0B0C10` |
| `public/projects/personal-gemini-journal.webp` | 1600 × 1000 px (16:10), WebP | Screenshot of Personal Gemini Journal |
| `public/projects/medical-rag-chatbot.webp` | 1600 × 1000 px (16:10), WebP | Screenshot of Medical RAG Chatbot |
| `public/projects/ml-dl-portfolio.webp` | 1600 × 1000 px (16:10), WebP | Screenshot of ML-DL Streamlit Portfolio |
| `public/projects/evalai.webp` | 1600 × 1000 px (16:10), WebP | Screenshot of EvalAI interface |
| `public/resume/Ojas_Pal_Resume.pdf` | Standard 1-page PDF | Your resume for the PDF preview modal and download button |
| `public/og-image.png` | 1200 × 630 px PNG | OpenGraph social preview card for LinkedIn & Twitter |
| `public/favicon.svg` | SVG | Geometric OP monogram icon (already generated) |

---

## 4. Deploying to GitHub Pages (100% Free)

This site is engineered to be hosted for free on **GitHub Pages** from a user repository named `ojaspal.github.io`.

### Step 1: Create Repository
1. On GitHub, create a new public repository named exactly:  
   `ojaspal.github.io`
2. Initialize and push your local files:
   ```bash
   git remote add origin https://github.com/OjasPal/ojaspal.github.io.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Enable GitHub Actions Deployment
1. Go to your repository on GitHub: **Settings** → **Pages**.
2. Under **Build and deployment** → **Source**, select:  
   `GitHub Actions`.
3. The included workflow `.github/workflows/deploy.yml` will trigger automatically upon every push to `main`.
4. Monitor the build under the **Actions** tab. Once the deploy job completes, your portfolio will be live at:  
   `https://ojaspal.github.io`

---

## 5. Strict Zero-Cost Guarantee

This portfolio requires **$0.00** to host, maintain, and run indefinitely:
- **No Paid APIs or Models**: The portfolio is a client-side static application. No Gemini API key or backend server is required at runtime.
- **No Database or Auth Bills**: Runs without Firebase or SQL subscription costs.
- **Free Unlimited Static Hosting**: GitHub Pages offers free bandwidth and SSL certificate for user sites.
- **Free Google Fonts**: Space Grotesk, Inter, and JetBrains Mono are served directly with `font-display: swap`.

---

## 6. Architecture & Design Tokens

- **Palette**:
  - Obsidian Matte: `#0B0C10` (Background)
  - Onyx Glass: `#12141C` (Surfaces)
  - Soft Platinum: `#F2F4F8` (Headlines)
  - Muted Slate: `#8A90A0` (Secondary text)
  - Luminescent Cyan: `#38BDF8` (Accents, glows, focus rings)
  - Sub-Zero Border: `#1E2430` (Hairline structural borders)
- **Accessibility**: Visible focus rings (`focus-visible`), skip-to-content link, touch-friendly 44px targets, `prefers-reduced-motion` compliance, semantic HTML landmarks.
- **Motion Engineering**: Spring physics (`type: "spring"`, `stiffness: 300`, `damping: 20`), fine pointer gating via `useFinePointer` to prevent jumpy touch screen interactions.
